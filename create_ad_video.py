import os
import math
import struct
import wave
import subprocess
from PIL import Image, ImageDraw, ImageFont, ImageFilter

# -------------------------------------------------------------
# Paths
# -------------------------------------------------------------
BRAIN_DIR = r"C:\Users\Beleen Iriigoy\.gemini\antigravity-ide\brain\c09fb9ed-75a3-463d-aa64-de93acc2cf44"
PROJECT_DIR = r"C:\Users\Beleen Iriigoy\.gemini\antigravity-ide\scratch\Primera-cuadra"
PUBLIC_DIR = os.path.join(PROJECT_DIR, "public")

OUTPUT_MP4 = os.path.join(PUBLIC_DIR, "anuncio-primera-cuadra.mp4")
OUTPUT_MP4_BRAIN = os.path.join(BRAIN_DIR, "anuncio-primera-cuadra.mp4")
TEMP_WAV = os.path.join(PROJECT_DIR, "temp_audio.wav")

IMG_SCENE1 = os.path.join(BRAIN_DIR, "ad_scene1_search_1789756556842.jpg")
IMG_SCENE2 = os.path.join(BRAIN_DIR, "ad_scene2_competition_1789756624278.jpg")
IMG_SCENE3 = os.path.join(BRAIN_DIR, "ad_scene3_solution_1789756655313.jpg")
IMG_SCENE4 = os.path.join(BRAIN_DIR, "ad_scene4_cta_1789756691579.jpg")

WIDTH = 1080
HEIGHT = 1920
FPS = 30
TOTAL_DURATION = 15.2  # seconds
TOTAL_FRAMES = int(TOTAL_DURATION * FPS)

# -------------------------------------------------------------
# 1. Synthesize Catchy Modern Upbeat Tech Beat Audio (WAV)
# -------------------------------------------------------------
def generate_audio(output_wav, duration_sec):
    sample_rate = 44100
    num_samples = int(sample_rate * duration_sec)
    bpm = 124
    samples_per_beat = int(sample_rate * (60.0 / bpm))
    
    samples = [0.0] * num_samples
    
    # 1. Kick drum & Hi-Hat pattern
    for t in range(num_samples):
        beat_pos = t % samples_per_beat
        beat_idx = t // samples_per_beat
        
        # Kick on every beat
        kick_env = math.exp(-beat_pos / (sample_rate * 0.08))
        kick_freq = 140.0 * math.exp(-beat_pos / (sample_rate * 0.04)) + 45.0
        kick = math.sin(2.0 * math.pi * kick_freq * (beat_pos / sample_rate)) * kick_env * 0.6
        
        # Hi-hat on off-beats (8th notes)
        sub_beat = (t % (samples_per_beat // 2))
        hihat = 0.0
        if (t // (samples_per_beat // 2)) % 2 == 1:
            hh_env = math.exp(-sub_beat / (sample_rate * 0.025))
            # Pseudo white noise
            noise = ((math.sin(t * 12345.67) * 43758.5453) % 1.0) * 2.0 - 1.0
            hihat = noise * hh_env * 0.22
            
        # Bassline (Simple driving electronic bass groove)
        bass_notes = [55.0, 55.0, 65.4, 73.4, 55.0, 55.0, 82.4, 73.4]
        note_idx = (beat_idx // 2) % len(bass_notes)
        bass_freq = bass_notes[note_idx]
        bass_env = 0.4 + 0.2 * math.sin(2.0 * math.pi * 2.0 * (t / sample_rate))
        bass = math.sin(2.0 * math.pi * bass_freq * (t / sample_rate)) * bass_env * 0.25
        
        # Synth chord pad (ambient futuristic progression)
        chord_freqs = [220.0, 277.18, 329.63] if (beat_idx % 8 < 4) else [261.63, 329.63, 392.0]
        pad = 0.0
        for f in chord_freqs:
            pad += math.sin(2.0 * math.pi * f * (t / sample_rate)) * 0.05
            
        # Ending chime / notification bell at 11.5s
        chime = 0.0
        chime_start = int(11.4 * sample_rate)
        if t >= chime_start:
            dt = (t - chime_start) / sample_rate
            if dt < 3.0:
                chime = (
                    math.sin(2.0 * math.pi * 1046.5 * dt) * math.exp(-dt * 2.5) * 0.4 +
                    math.sin(2.0 * math.pi * 1567.98 * dt) * math.exp(-dt * 3.0) * 0.3
                )
                
        val = kick + hihat + bass + pad + chime
        # Soft clipping limiter
        samples[t] = max(-0.95, min(0.95, val))
        
    # Fade in & out
    fade_len = int(sample_rate * 0.3)
    for i in range(fade_len):
        factor = i / fade_len
        samples[i] *= factor
        samples[num_samples - 1 - i] *= factor
        
    # Write to WAV
    with wave.open(output_wav, "w") as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(sample_rate)
        raw_data = bytearray()
        for s in samples:
            int_val = int(s * 32767.0)
            raw_data.extend(struct.pack("<h", int_val))
        wf.writeframes(raw_data)
    print("Audio WAV created successfully!")

# -------------------------------------------------------------
# 2. Frame Drawing with PIL
# -------------------------------------------------------------
# Load base images and crop/scale to 1080x1920
def prepare_base_images():
    raw_paths = [IMG_SCENE1, IMG_SCENE2, IMG_SCENE3, IMG_SCENE4]
    prepared = []
    for p in raw_paths:
        img = Image.open(p).convert("RGB")
        # Resize to cover 1080x1920 with slight margin for zoom (1.1x)
        w, h = img.size
        target_ratio = WIDTH / HEIGHT
        curr_ratio = w / h
        if curr_ratio > target_ratio:
            # too wide
            new_w = int(h * target_ratio)
            left = (w - new_w) // 2
            img = img.crop((left, 0, left + new_w, h))
        else:
            # too tall
            new_h = int(w / target_ratio)
            top = (h - new_h) // 2
            img = img.crop((0, top, w, top + new_h))
        # Base size slightly larger for smooth Ken Burns zoom
        img = img.resize((int(WIDTH * 1.12), int(HEIGHT * 1.12)), Image.Resampling.LANCZOS)
        prepared.append(img)
    return prepared

# Load Fonts
FONT_BOLD_PATH = "C:/Windows/Fonts/arialbd.ttf"
FONT_REG_PATH = "C:/Windows/Fonts/arial.ttf"

font_pill = ImageFont.truetype(FONT_BOLD_PATH, 36)
font_title = ImageFont.truetype(FONT_BOLD_PATH, 58)
font_sub = ImageFont.truetype(FONT_REG_PATH, 40)
font_btn = ImageFont.truetype(FONT_BOLD_PATH, 46)

SCENES = [
    {
        "img_idx": 0,
        "duration": 3.8,
        "pill": "📍 ZONA NORTE Y GBA",
        "pill_bg": (234, 88, 12),  # vibrant orange
        "pill_fg": (255, 255, 255),
        "title": "¿TUS VECINOS TE\nENCUENTRAN EN GOOGLE?",
        "title_highlight": "ENCUENTRAN EN GOOGLE",
        "subtitle": "9 de cada 10 personas buscan negocios\ncerca desde su celular.",
    },
    {
        "img_idx": 1,
        "duration": 3.8,
        "pill": "⚠️ ALERTA DE CLIENTES",
        "pill_bg": (220, 38, 38),  # red
        "pill_fg": (255, 255, 255),
        "title": "TU COMPETENCIA SE LLEVA\nTODAS LAS LLAMADAS",
        "title_highlight": "TODAS LAS LLAMADAS",
        "subtitle": "Aparecen en el Top 3 de Google Maps\nmientras tu negocio queda invisible.",
    },
    {
        "img_idx": 2,
        "duration": 3.8,
        "pill": "🚀 LA SOLUCIÓN DEFINITIVA",
        "pill_bg": (37, 99, 235),  # blue
        "pill_fg": (255, 255, 255),
        "title": "PRIMERA CUADRA:\nWEB + MAPS EN 4 DÍAS",
        "title_highlight": "WEB + MAPS EN 4 DÍAS",
        "subtitle": "Página web propia a tu nombre (.com.ar)\n+ WhatsApp Business configurado.",
    },
    {
        "img_idx": 3,
        "duration": 3.8,
        "pill": "🛡️ PAGO SEGURO 50/50",
        "pill_bg": (16, 185, 129),  # emerald green
        "pill_fg": (255, 255, 255),
        "title": "¡PEDÍ TU DIAGNÓSTICO\nGRATIS POR WHATSAPP!",
        "title_highlight": "DIAGNÓSTICO GRATIS",
        "subtitle": "Pagás el saldo recién contra entrega.\n¡Escribinos y arrancamos hoy!",
        "has_cta_button": True
    },
]

def render_frame(frame_idx, base_images):
    current_time = frame_idx / FPS
    
    # Determine scene
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
    
    # Ken Burns effect: subtle zoom
    base_img = base_images[scene["img_idx"]]
    bw, bh = base_img.size
    
    # Zoom from 1.0 to 1.08
    scale = 1.0 + 0.07 * progress
    crop_w = int(WIDTH / scale)
    crop_h = int(HEIGHT / scale)
    
    # Slight upward pan
    cx = (bw - crop_w) // 2
    cy = int((bh - crop_h) * (0.3 + 0.2 * progress))
    
    frame = base_img.crop((cx, cy, cx + crop_w, cy + crop_h))
    frame = frame.resize((WIDTH, HEIGHT), Image.Resampling.LANCZOS)
    
    # Crossfade with previous scene in first 0.4 seconds (if not scene 0)
    if scene_idx > 0 and scene_time < 0.4:
        prev_scene = SCENES[scene_idx - 1]
        prev_base = base_images[prev_scene["img_idx"]]
        prev_frame = prev_base.crop(((bw - WIDTH) // 2, (bh - HEIGHT) // 2, (bw + WIDTH) // 2, (bh + HEIGHT) // 2))
        prev_frame = prev_frame.resize((WIDTH, HEIGHT))
        alpha = scene_time / 0.4
        frame = Image.blend(prev_frame, frame, alpha)

    # Dark gradient overlays (top and bottom) so text is 100% crisp and readable
    overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    odraw = ImageDraw.Draw(overlay)
    
    # Top dark gradient
    for y in range(580):
        opacity = int(220 * (1.0 - (y / 580.0) ** 1.3))
        odraw.line([(0, y), (WIDTH, y)], fill=(10, 15, 28, opacity))
        
    # Bottom dark gradient
    for y in range(HEIGHT - 650, HEIGHT):
        factor = (y - (HEIGHT - 650)) / 650.0
        opacity = int(235 * (factor ** 0.8))
        odraw.line([(0, y), (WIDTH, y)], fill=(10, 15, 28, opacity))

    frame = Image.alpha_composite(frame.convert("RGBA"), overlay)
    draw = ImageDraw.Draw(frame)

    # ---------------------------------------------------------
    # Draw Animated UI Cards & Typography
    # ---------------------------------------------------------
    # 1. Header Pill (Category/Kicker)
    pill_text = scene["pill"]
    pill_bbox = draw.textbbox((0, 0), pill_text, font=font_pill)
    pw = pill_bbox[2] - pill_bbox[0] + 50
    ph = pill_bbox[3] - pill_bbox[1] + 28
    px = (WIDTH - pw) // 2
    py = 160
    
    # Draw pill shadow & body
    draw.rounded_rectangle([px, py, px + pw, py + ph], radius=ph // 2, fill=scene["pill_bg"])
    draw.text((px + 25, py + 14), pill_text, font=font_pill, fill=scene["pill_fg"])

    # 2. Main Title Card (Centered, high impact)
    lines = scene["title"].split("\n")
    ty = 230
    for line in lines:
        tbbox = draw.textbbox((0, 0), line, font=font_title)
        tw = tbbox[2] - tbbox[0]
        tx = (WIDTH - tw) // 2
        
        # Text shadow for maximum legibility
        draw.text((tx + 3, ty + 3), line, font=font_title, fill=(0, 0, 0, 200))
        
        # Color highlight
        color = (255, 230, 0) if any(h in line for h in ["ENCUENTRAN", "TODAS LAS LLAMADAS", "WEB + MAPS", "DIAGNÓSTICO GRATIS"]) else (255, 255, 255)
        draw.text((tx, ty), line, font=font_title, fill=color)
        ty += 74

    # 3. Subtitle Card (at the bottom)
    sub_lines = scene["subtitle"].split("\n")
    sy = HEIGHT - 380 if not scene.get("has_cta_button") else HEIGHT - 460
    for sline in sub_lines:
        sbbox = draw.textbbox((0, 0), sline, font=font_sub)
        sw = sbbox[2] - sbbox[0]
        sx = (WIDTH - sw) // 2
        draw.text((sx + 2, sy + 2), sline, font=font_sub, fill=(0, 0, 0, 240))
        draw.text((sx, sy), sline, font=font_sub, fill=(240, 245, 255))
        sy += 52

    # 4. CTA Button (on last scene)
    if scene.get("has_cta_button"):
        btn_w = 780
        btn_h = 110
        bx = (WIDTH - btn_w) // 2
        by = HEIGHT - 230
        
        # Pulsing scale effect
        pulse = 1.0 + 0.03 * math.sin(current_time * 8.0)
        cur_w = int(btn_w * pulse)
        cur_h = int(btn_h * pulse)
        cur_bx = (WIDTH - cur_w) // 2
        cur_by = by - (cur_h - btn_h) // 2

        # WhatsApp Green Button
        draw.rounded_rectangle(
            [cur_bx, cur_by, cur_bx + cur_w, cur_by + cur_h],
            radius=cur_h // 2,
            fill=(37, 211, 102)  # Official WhatsApp Green
        )
        # Inner border
        draw.rounded_rectangle(
            [cur_bx + 2, cur_by + 2, cur_bx + cur_w - 2, cur_by + cur_h - 2],
            radius=cur_h // 2,
            outline=(255, 255, 255),
            width=3
        )
        
        btn_text = "💬 ENVIAR MENSAJE"
        btbbox = draw.textbbox((0, 0), btn_text, font=font_btn)
        btw = btbbox[2] - btbbox[0]
        btx = (WIDTH - btw) // 2
        bty = cur_by + (cur_h - (btbbox[3] - btbbox[1])) // 2 - 5
        draw.text((btx, bty), btn_text, font=font_btn, fill=(255, 255, 255))

    # 5. Top Bar Branding
    draw.text((60, 60), "PRIMERA CUADRA", font=ImageFont.truetype(FONT_BOLD_PATH, 32), fill=(255, 255, 255, 220))
    draw.text((WIDTH - 390, 60), "primeracuadra.com.ar", font=ImageFont.truetype(FONT_REG_PATH, 28), fill=(200, 215, 255, 190))

    return frame.convert("RGB")

# -------------------------------------------------------------
# 3. Render Pipeline to FFmpeg
# -------------------------------------------------------------
def main():
    print("Preparing audio...")
    generate_audio(TEMP_WAV, TOTAL_DURATION)
    
    print("Preparing base images...")
    base_images = prepare_base_images()
    
    print(f"Starting video render ({TOTAL_FRAMES} frames @ {FPS} fps)...")
    
    # FFmpeg command taking raw RGB24 frames from stdin and combining with WAV audio
    ffmpeg_cmd = [
        "ffmpeg",
        "-y",
        "-f", "rawvideo",
        "-vcodec", "rawvideo",
        "-s", f"{WIDTH}x{HEIGHT}",
        "-pix_fmt", "rgb24",
        "-r", str(FPS),
        "-i", "-",               # video stream from pipe
        "-i", TEMP_WAV,          # audio stream
        "-c:v", "libx264",
        "-preset", "medium",
        "-crf", "20",
        "-pix_fmt", "yuv420p",
        "-c:a", "aac",
        "-b:a", "192k",
        "-shortest",
        OUTPUT_MP4
    ]
    
    proc = subprocess.Popen(ffmpeg_cmd, stdin=subprocess.PIPE)
    
    for f in range(TOTAL_FRAMES):
        frame_img = render_frame(f, base_images)
        proc.stdin.write(frame_img.tobytes())
        if f % 45 == 0 or f == TOTAL_FRAMES - 1:
            pct = int((f + 1) / TOTAL_FRAMES * 100)
            print(f"Render progress: {pct}% ({f+1}/{TOTAL_FRAMES} frames)")
            
    proc.stdin.close()
    proc.wait()
    
    # Copy to brain dir
    import shutil
    shutil.copyfile(OUTPUT_MP4, OUTPUT_MP4_BRAIN)
    
    if os.path.exists(TEMP_WAV):
        os.remove(TEMP_WAV)
        
    print(f"DONE! Video saved to:\n1. {OUTPUT_MP4}\n2. {OUTPUT_MP4_BRAIN}")

if __name__ == "__main__":
    main()
