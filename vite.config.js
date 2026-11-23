import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import authHandler from './api/demo-auth.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'demo-auth-api',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url && req.url.startsWith('/api/demo-auth')) {
            try {
              await authHandler(req, res);
            } catch (err) {
              console.error('Error handling /api/demo-auth in Vite dev server:', err);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Internal Server Error' }));
            }
            return;
          }
          next();
        });
      }
    }
  ],
})
