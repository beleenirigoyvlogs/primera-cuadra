import crypto from 'node:crypto';

// In-memory rate-limiter: IP -> { attempts: number, lockedUntil: number }
const loginAttempts = new Map();
const MAX_ATTEMPTS = 5;
const LOCKOUT_TIME_MS = 15 * 60 * 1000; // 15 minutes
const SESSION_DURATION_SECONDS = 4 * 60 * 60; // 4 hours

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return req.headers['x-real-ip'] || req.socket?.remoteAddress || '127.0.0.1';
}

function parseCookies(cookieHeader) {
  const cookies = {};
  if (!cookieHeader) return cookies;
  const pairs = cookieHeader.split(';');
  for (const pair of pairs) {
    const idx = pair.indexOf('=');
    if (idx < 0) continue;
    const key = pair.slice(0, idx).trim();
    const val = pair.slice(idx + 1).trim();
    cookies[key] = decodeURIComponent(val);
  }
  return cookies;
}

function signSession(username, secret) {
  const exp = Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS;
  const payload = Buffer.from(JSON.stringify({ u: username, exp })).toString('base64url');
  const signature = crypto.createHmac('sha256', secret).update(payload).digest('base64url');
  return `${payload}.${signature}`;
}

function verifySession(token, secret) {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [payloadB64, signature] = parts;
  const expectedSig = crypto.createHmac('sha256', secret).update(payloadB64).digest('base64url');
  
  // Timing safe comparison
  const sigBuf = Buffer.from(signature);
  const expBuf = Buffer.from(expectedSig);
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf-8'));
    if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

async function parseBody(req) {
  if (req.body && typeof req.body === 'object') {
    return req.body;
  }
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return new Promise((resolve) => {
    let data = '';
    req.on('data', chunk => { data += chunk; });
    req.on('end', () => {
      try {
        resolve(JSON.parse(data));
      } catch {
        resolve({});
      }
    });
    req.on('error', () => resolve({}));
  });
}

function sendResponse(res, status, data, headers = {}) {
  for (const [key, val] of Object.entries(headers)) {
    res.setHeader(key, val);
  }
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  res.end(JSON.stringify(data));
}

export default async function handler(req, res) {
  // Config from environment
  const VALID_USER = process.env.DEMO_USER || 'admin';
  const VALID_PASS_HASH = process.env.DEMO_PASS_HASH;
  const VALID_PASSWORD = process.env.DEMO_PASSWORD || 'PrimeraCuadra2026';
  const SESSION_SECRET = process.env.SESSION_SECRET || 'primera-cuadra-showroom-secret-salt-2026';

  const clientIp = getClientIp(req);
  const now = Date.now();
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

  // 1. GET: Verify active session cookie
  if (req.method === 'GET') {
    const cookies = parseCookies(req.headers.cookie);
    const sessionToken = cookies['pc_demo_session'];
    const session = verifySession(sessionToken, SESSION_SECRET);

    if (session) {
      return sendResponse(res, 200, { authenticated: true, user: session.u });
    }
    return sendResponse(res, 401, { authenticated: false });
  }

  // 2. POST / DELETE: Logout
  if (req.method === 'DELETE' || url.searchParams.get('action') === 'logout') {
    return sendResponse(
      res,
      200,
      { success: true, message: 'Sesión cerrada' },
      { 'Set-Cookie': 'pc_demo_session=; Path=/; Max-Age=0; HttpOnly; SameSite=Strict' }
    );
  }

  // 3. POST: Login
  if (req.method === 'POST') {
    // Check rate limit
    const attemptInfo = loginAttempts.get(clientIp);
    if (attemptInfo && attemptInfo.lockedUntil > now) {
      const remainingMin = Math.ceil((attemptInfo.lockedUntil - now) / 60000);
      return sendResponse(res, 429, {
        error: `Demasiados intentos fallidos. Bloqueado temporalmente. Intente nuevamente en ${remainingMin} minuto(s).`
      });
    }

    const body = await parseBody(req);
    const { username, password } = body;

    if (!username || !password) {
      return sendResponse(res, 400, { error: 'Usuario y contraseña requeridos' });
    }

    // Compare user safely
    const userMatch = crypto.timingSafeEqual(
      crypto.createHash('sha256').update(String(username)).digest(),
      crypto.createHash('sha256').update(String(VALID_USER)).digest()
    );

    // Compare password safely:
    // If DEMO_PASS_HASH is set, hash the incoming password with SHA-256 and compare against DEMO_PASS_HASH.
    // Otherwise, compare incoming password hash with VALID_PASSWORD hash.
    const inputPassHash = crypto.createHash('sha256').update(String(password)).digest('hex');
    let passMatch = false;

    if (VALID_PASS_HASH) {
      passMatch = crypto.timingSafeEqual(
        Buffer.from(inputPassHash, 'utf-8'),
        Buffer.from(VALID_PASS_HASH, 'utf-8')
      );
    } else {
      const expectedPassHash = crypto.createHash('sha256').update(String(VALID_PASSWORD)).digest('hex');
      passMatch = crypto.timingSafeEqual(
        Buffer.from(inputPassHash, 'utf-8'),
        Buffer.from(expectedPassHash, 'utf-8')
      );
    }

    if (userMatch && passMatch) {
      // Clear brute-force records for this IP
      loginAttempts.delete(clientIp);

      const isSecure = req.headers['x-forwarded-proto'] === 'https' || req.connection?.encrypted;
      const cookieVal = signSession(username, SESSION_SECRET);
      const cookieHeader = `pc_demo_session=${cookieVal}; Path=/; Max-Age=${SESSION_DURATION_SECONDS}; HttpOnly; SameSite=Strict${isSecure ? '; Secure' : ''}`;

      return sendResponse(res, 200, { success: true, user: username }, { 'Set-Cookie': cookieHeader });
    }

    // Failed attempt: record and increment
    const currentAttempts = (attemptInfo?.attempts || 0) + 1;
    let lockedUntil = 0;
    if (currentAttempts >= MAX_ATTEMPTS) {
      lockedUntil = now + LOCKOUT_TIME_MS;
    }
    loginAttempts.set(clientIp, { attempts: currentAttempts, lockedUntil });

    const attemptsLeft = Math.max(0, MAX_ATTEMPTS - currentAttempts);
    const errorMsg = attemptsLeft > 0
      ? `Usuario o contraseña incorrectos. Quedan ${attemptsLeft} intento(s).`
      : `Demasiados intentos fallidos. Su acceso ha sido bloqueado temporalmente por 15 minutos.`;

    return sendResponse(res, 401, { error: errorMsg, attemptsLeft });
  }

  return sendResponse(res, 405, { error: 'Método no permitido' });
}
