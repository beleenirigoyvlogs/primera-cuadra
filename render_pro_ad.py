import os
import math
import subprocess
from PIL import Image, ImageDraw, ImageFont

# -------------------------------------------------------------
# Paths
# -------------------------------------------------------------
BRAIN_DIR = r"C:\Users\Beleen Iriigoy\.gemini\antigravity-ide\brain\c09fb9ed-75a3-463d-aa64-de93acc2cf44"
PROJECT_DIR = r"C:\Users\Beleen Iriigoy\.gemini\antigravity-ide\scratch\Primera-cuadra"
PUBLIC_DIR = os.path.join(PROJECT_DIR, "public")

OUTPUT_MP4 = os.path.join(PUBLIC_DIR, "anuncio-primera-cuadra.mp4")
OUTPUT_MP4_BRAIN = os.path.join(BRAIN_DIR, "anuncio-primera-cuadra.mp4")
MASTER_AUDIO = os.path.join(PROJECT_DIR, "master_soundtrack.wav")
LOGO_PATH = os.path.join(PUBLIC_DIR, "logo.jpg")

SCENE_PATHS = [
    os.path.join(BRAIN_DIR, "brand_scene1_hook_1789761239848.jpg"),
    os.path.join(BRAIN_DIR, "brand_scene2_pain_1789761326808.jpg"),
    os.path.join(BRAIN_DIR, "brand_scene3_solution_1789761408865.jpg"),
    os.path.join(BRAIN_DIR, "brand_scene4_guarantee_1789761460935.jpg"),
    os.path.join(BRAIN_DIR, "brand_scene5_cta_1789761515674.jpg")
]

WIDTH = 1080
HEIGHT = 1920
FPS = 30
TOTAL_DURATION = 25.0
TOTAL_FRAMES = int(TOTAL_DURATION * FPS)

# -------------------------------------------------------------
# Fonts
# -------------------------------------------------------------
FONT_BOLD = "C:/Windows/Fonts/arialbd.ttf"
FONT_REG = "C:/Windows/Fonts/arial.ttf"

font_brand_name = ImageFont.truetype(FONT_BOLD, 34)
font_brand_sub = ImageFont.truetype(FONT_REG, 24)
font_domain = ImageFont.truetype(FONT_BOLD, 26)

font_pill = ImageFont.truetype(FONT_BOLD, 32)
font_title = ImageFont.truetype(FONT_BOLD, 56)
font_sub = ImageFont.truetype(FONT_REG, 38)
font_btn = ImageFont.truetype(FONT_BOLD, 46)

# -------------------------------------------------------------
# Scene Definitions
# -------------------------------------------------------------
SCENES = [
    {
        "img_idx": 0,
        "duration": 4.2,
        "pill": "📍 ZONA NORTE Y BUENOS AIRES",
        "pill_bg": (234, 88, 12),  # warm vibrant orange
        "border_color": (249, 115, 22),
        "title": "¿TUS VECINOS TE\nENCUENTRAN EN GOOGLE?",
        "highlight": "ENCUENTRAN EN GOOGLE",
        "subtitle": "9 de cada 10 personas buscan servicios\ny negocios cerca desde su celular.",
    },
    {
        "img_idx": 1,
        "duration": 5.0,
        "pill": "⚠️ CLIENTES PERDIDOS EN TU ZONA",
        "pill_bg": (220, 38, 38),  # alert red
        "border_color": (239, 68, 68),
        "title": "TU COMPETENCIA SE LLEVA\nTODAS LAS LLAMADAS",
        "highlight": "TODAS LAS LLAMADAS",
        "subtitle": "Aparecen en el Top 3 de Google Maps\nmientras tu negocio queda invisible.",
    },
    {
        "img_idx": 2,
        "duration": 5.8,
        "pill": "🚀 LA SOLUCIÓN DEFINITIVA",
        "pill_bg": (37, 99, 235),  # vibrant tech blue
        "border_color": (59, 130, 246),
        "title": "PRIMERA CUADRA:\nWEB + MAPS TOP 3",
        "highlight": "WEB + MAPS TOP 3",
        "subtitle": "Página web propia a tu nombre (.com.ar)\n+ Posicionamiento en los primeros puestos.",
    },
    {
        "img_idx": 3,
        "duration": 5.3,
        "pill": "🛡️ ESQUEMA SEGURO 50/50",
        "pill_bg": (5, 150, 105),  # emerald
        "border_color": (16, 185, 129),
        "title": "TODO LISTO EN 4 DÍAS\nPAGO 100% PROTEGIDO",
        "highlight": "PAGO 100% PROTEGIDO",
        "subtitle": "Abonás el 50% de anticipo y el saldo\nrecién contra entrega conforme.",
    },
    {
        "img_idx": 4,
        "duration": 4.7,
        "pill": "💬 ATENCIÓN DIRECTA",
        "pill_bg": (22, 163, 74),  # WhatsApp green
        "border_color": (34, 197, 94),
        "title": "¡PEDÍ TU DIAGNÓSTICO\nGRATIS POR WHATSAPP!",
        "highlight": "DIAGNÓSTICO GRATIS",
        "subtitle": "Hacé clic en el botón de abajo y hablá\ndirecto con nuestro equipo hoy.",
        "has_cta_button": True
    },
]

# -------------------------------------------------------------
# Asset Preparation
# -------------------------------------------------------------
def prepare_assets():
    # 1. Base scene images
    prepared_scenes = []
    for sp in SCENE_PATHS:
        img = Image.open(sp).convert("RGB")
        w, h = img.size
        target_ratio = WIDTH / HEIGHT
        curr_ratio = w / h
        if curr_ratio > target_ratio:
            new_w = int(h * target_ratio)
            left = (w - new_w) // 2
            img = img.crop((left, 0, left + new_w, h))
        else:
            new_h = int(w / target_ratio)
            top = (h - new_h) // 2
            img = img.crop((0, top, w, top + new_h))
        img = img.resize((int(WIDTH * 1.12), int(HEIGHT * 1.12)), Image.Resampling.LANCZOS)
        prepared_scenes.append(img)

    # 2. Circular Branded Logo
    logo_raw = Image.open(LOGO_PATH).convert("RGBA")
    logo_size = 92
    logo_raw = logo_raw.resize((logo_size, logo_size), Image.Resampling.LANCZOS)
    
    # Make circular mask
    mask = Image.new("L", (logo_size, logo_size), 0)
    mdraw = ImageDraw.Draw(mask)
    mdraw.ellipse((0, 0, logo_size, logo_size), fill=255)
    
    logo_circle = Image.new("RGBA", (logo_size, logo_size), (0, 0, 0, 0))
    logo_circle.paste(logo_raw, (0, 0), mask)
    
    # Outer cyan glow ring
    logo_badge = Image.new("RGBA", (logo_size + 12, logo_size + 12), (0, 0, 0, 0))
    bdraw = ImageDraw.Draw(logo_badge)
    bdraw.ellipse((0, 0, logo_size + 11, logo_size + 11), outline=(14, 165, 233, 220), width=4)
    logo_badge.paste(logo_circle, (6, 6), logo_circle)

    return prepared_scenes, logo_badge

# -------------------------------------------------------------
# Frame Renderer
# -------------------------------------------------------------
def render_frame(frame_idx, base_images, logo_badge):
    current_time = frame_idx / FPS
    
    # Find current scene
    cum_time = 0.0
    scene_idx = 0
    scene_time = 0.0
    for i, sc in enumerate(SCENES):
        if current_time < cum_time + sc["duration"] or i == len(SCENES) - 1:
            scene_idx = i
            scene_time = current_time - cum_time
            break
        cum_time += sc["duration"]
        
    scene = SCENES[scene_idx]
    progress = min(1.0, scene_time / scene["duration"])
    
    # Ken Burns effect (smooth subtle zoom)
    base_img = base_images[scene["img_idx"]]
    bw, bh = base_img.size
    scale = 1.0 + 0.06 * progress
    crop_w = int(WIDTH / scale)
    crop_h = int(HEIGHT / scale)
    cx = (bw - crop_w) // 2
    cy = int((bh - crop_h) * (0.35 + 0.15 * progress))
    
    frame = base_img.crop((cx, cy, cx + crop_w, cy + crop_h))
    frame = frame.resize((WIDTH, HEIGHT), Image.Resampling.LANCZOS)
    
    # Crossfade with previous scene (0.35s)
    if scene_idx > 0 and scene_time < 0.35:
        prev_scene = SCENES[scene_idx - 1]
        prev_base = base_images[prev_scene["img_idx"]]
        prev_frame = prev_base.crop(((bw - WIDTH) // 2, (bh - HEIGHT) // 2, (bw + WIDTH) // 2, (bh + HEIGHT) // 2))
        prev_frame = prev_frame.resize((WIDTH, HEIGHT))
        alpha = scene_time / 0.35
        frame = Image.blend(prev_frame, frame, alpha)

    # ---------------------------------------------------------
    # Lighting & Cinematic Vignette Overlays
    # ---------------------------------------------------------
    overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    odraw = ImageDraw.Draw(overlay)
    
    # Top dark gradient for header & title
    for y in range(650):
        factor = 1.0 - (y / 650.0) ** 1.2
        opacity = int(230 * factor)
        odraw.line([(0, y), (WIDTH, y)], fill=(8, 12, 22, opacity))
        
    # Bottom dark gradient for subtitle & CTA
    for y in range(HEIGHT - 700, HEIGHT):
        factor = (y - (HEIGHT - 700)) / 700.0
        opacity = int(240 * (factor ** 0.85))
        odraw.line([(0, y), (WIDTH, y)], fill=(8, 12, 22, opacity))

    frame = Image.alpha_composite(frame.convert("RGBA"), overlay)
    draw = ImageDraw.Draw(frame)

    # ---------------------------------------------------------
    # 1. High-Tech Top Progress Bar (Fills 0% to 100%)
    # ---------------------------------------------------------
    total_progress = min(1.0, current_time / TOTAL_DURATION)
    bar_w = int(WIDTH * total_progress)
    
    # Draw background track
    draw.rectangle([0, 0, WIDTH, 10], fill=(20, 30, 50, 180))
    # Draw active gradient bar
    for x in range(bar_w):
        x_ratio = x / WIDTH
        r = int(14 + (245 - 14) * x_ratio)
        g = int(165 + (158 - 165) * x_ratio)
        b = int(233 + (11 - 233) * x_ratio)
        draw.line([(x, 0), (x, 10)], fill=(r, g, b, 255))

    # ---------------------------------------------------------
    # 2. Consistent Brand Header (Logo + Primera Cuadra + Domain)
    # ---------------------------------------------------------
    header_y = 36
    # Paste circular logo
    frame.paste(logo_badge, (48, header_y), logo_badge)
    
    # Brand Name with Verified Checkmark
    draw.text((164, header_y + 8), "PRIMERA CUADRA", font=font_brand_name, fill=(255, 255, 255))
    # Verified badge (blue circle with check)
    v_cx, v_cy = 490, header_y + 24
    draw.ellipse((v_cx - 14, v_cy - 14, v_cx + 14, v_cy + 14), fill=(14, 165, 233))
    draw.line([(v_cx - 6, v_cy), (v_cx - 1, v_cy + 5), (v_cx + 7, v_cy - 4)], fill=(255, 255, 255), width=3)
    
    # Brand Subtitle
    draw.text((164, header_y + 48), "Páginas Web & Google Maps Top 3", font=font_brand_sub, fill=(148, 163, 184))

    # Domain Pill on Top Right
    dom_text = "primeracuadra.com.ar"
    dom_bbox = draw.textbbox((0, 0), dom_text, font=font_domain)
    dw = dom_bbox[2] - dom_bbox[0] + 36
    dh = dom_bbox[3] - dom_bbox[1] + 20
    dx = WIDTH - dw - 48
    dy = header_y + 16
    draw.rounded_rectangle([dx, dy, dx + dw, dy + dh], radius=dh // 2, fill=(15, 23, 42, 230), outline=(51, 65, 85, 200), width=2)
    draw.text((dx + 18, dy + 10), dom_text, font=font_domain, fill=(56, 189, 248))

    # ---------------------------------------------------------
    # 3. Kicker Pill Badge (Dynamic Scene Hook)
    # ---------------------------------------------------------
    pill_text = scene["pill"]
    pill_bbox = draw.textbbox((0, 0), pill_text, font=font_pill)
    pw = pill_bbox[2] - pill_bbox[0] + 48
    ph = pill_bbox[3] - pill_bbox[1] + 24
    px = (WIDTH - pw) // 2
    py = 180
    
    # Pill entrance animation (slight bounce down)
    if scene_time < 0.3:
        bounce = math.sin(scene_time / 0.3 * (math.pi / 2))
        py = int(140 + 40 * bounce)
        
    draw.rounded_rectangle([px, py, px + pw, py + ph], radius=ph // 2, fill=scene["pill_bg"])
    draw.text((px + 24, py + 12), pill_text, font=font_pill, fill=(255, 255, 255))

    # ---------------------------------------------------------
    # 4. Main Headline Card
    # ---------------------------------------------------------
    lines = scene["title"].split("\n")
    ty = py + ph + 24
    for line in lines:
        tbbox = draw.textbbox((0, 0), line, font=font_title)
        tw = tbbox[2] - tbbox[0]
        tx = (WIDTH - tw) // 2
        
        # Heavy drop shadow
        draw.text((tx + 4, ty + 4), line, font=font_title, fill=(0, 0, 0, 240))
        
        # Highlight logic
        is_highlight = any(h in line for h in ["ENCUENTRAN", "TODAS LAS LLAMADAS", "WEB + MAPS", "PAGO 100%", "DIAGNÓSTICO GRATIS"])
        col = (255, 230, 0) if is_highlight else (255, 255, 255)
        draw.text((tx, ty), line, font=font_title, fill=col)
        ty += 70

    # ---------------------------------------------------------
    # 5. Kinetic Subtitle Card (Lower Third)
    # ---------------------------------------------------------
    sub_lines = scene["subtitle"].split("\n")
    card_w = 980
    card_h = 160 if not scene.get("has_cta_button") else 140
    card_x = (WIDTH - card_w) // 2
    card_y = HEIGHT - 420 if not scene.get("has_cta_button") else HEIGHT - 490

    # Glassmorphic backdrop box
    draw.rounded_rectangle(
        [card_x, card_y, card_x + card_w, card_y + card_h],
        radius=24,
        fill=(10, 15, 28, 220),
        outline=scene["border_color"],
        width=3
    )

    sy = card_y + 24
    for sline in sub_lines:
        sbbox = draw.textbbox((0, 0), sline, font=font_sub)
        sw = sbbox[2] - sbbox[0]
        sx = (WIDTH - sw) // 2
        draw.text((sx + 2, sy + 2), sline, font=font_sub, fill=(0, 0, 0, 220))
        draw.text((sx, sy), sline, font=font_sub, fill=(241, 245, 249))
        sy += 50

    # ---------------------------------------------------------
    # 6. Pulsing WhatsApp CTA Button (Scene 5)
    # ---------------------------------------------------------
    if scene.get("has_cta_button"):
        btn_w = 840
        btn_h = 115
        bx = (WIDTH - btn_w) // 2
        by = HEIGHT - 240
        
        # Organic pulse breathing animation
        pulse = 1.0 + 0.035 * math.sin(current_time * 7.5)
        cur_w = int(btn_w * pulse)
        cur_h = int(btn_h * pulse)
        cur_bx = (WIDTH - cur_w) // 2
        cur_by = by - (cur_h - btn_h) // 2

        # Outer glowing aura
        draw.rounded_rectangle(
            [cur_bx - 6, cur_by - 6, cur_bx + cur_w + 6, cur_by + cur_h + 6],
            radius=(cur_h + 12) // 2,
            fill=(37, 211, 102, 100)
        )

        # Main button body
        draw.rounded_rectangle(
            [cur_bx, cur_by, cur_bx + cur_w, cur_by + cur_h],
            radius=cur_h // 2,
            fill=(37, 211, 102)
        )
        
        # White inner stroke
        draw.rounded_rectangle(
            [cur_bx + 3, cur_by + 3, cur_bx + cur_w - 3, cur_by + cur_h - 3],
            radius=cur_h // 2,
            outline=(255, 255, 255),
            width=3
        )
        
        btn_text = "💬 ENVIAR MENSAJE DE WHATSAPP"
        btbbox = draw.textbbox((0, 0), btn_text, font=font_btn)
        btw = btbbox[2] - btbbox[0]
        btx = (WIDTH - btw) // 2
        bty = cur_by + (cur_h - (btbbox[3] - btbbox[1])) // 2 - 5
        draw.text((btx, bty), btn_text, font=font_btn, fill=(255, 255, 255))

    return frame.convert("RGB")

# -------------------------------------------------------------
# Main Pipeline
# -------------------------------------------------------------
def main():
    print("Preparing assets and branded elements...")
    base_images, logo_badge = prepare_assets()
    
    print(f"Starting pro video render: {TOTAL_FRAMES} frames @ {FPS} fps ({TOTAL_DURATION}s)...")
    
    ffmpeg_cmd = [
        "ffmpeg",
        "-y",
        "-f", "rawvideo",
        "-vcodec", "rawvideo",
        "-s", f"{WIDTH}x{HEIGHT}",
        "-pix_fmt", "rgb24",
        "-r", str(FPS),
        "-i", "-",               # pipe raw RGB frames
        "-i", MASTER_AUDIO,      # synchronized master soundtrack
        "-c:v", "libx264",
        "-preset", "medium",
        "-crf", "19",            # pristine visual quality
        "-pix_fmt", "yuv420p",
        "-c:a", "aac",
        "-b:a", "256k",
        "-shortest",
        OUTPUT_MP4
    ]
    
    proc = subprocess.Popen(ffmpeg_cmd, stdin=subprocess.PIPE)
    
    for f in range(TOTAL_FRAMES):
        frame_img = render_frame(f, base_images, logo_badge)
        proc.stdin.write(frame_img.tobytes())
        if f % 75 == 0 or f == TOTAL_FRAMES - 1:
            pct = int((f + 1) / TOTAL_FRAMES * 100)
            print(f"Rendering: {pct}% ({f+1}/{TOTAL_FRAMES} frames)")
            
    proc.stdin.close()
    proc.wait()
    
    import shutil
    shutil.copyfile(OUTPUT_MP4, OUTPUT_MP4_BRAIN)
    
    print(f"PRO VIDEO COMPLETED!\n-> {OUTPUT_MP4}\n-> {OUTPUT_MP4_BRAIN}")

if __name__ == "__main__":
    main()
