import os
from PIL import Image, ImageDraw, ImageFont

def generate_og_image():
    width = 1200
    height = 630
    
    # 1. Base image with brand dark background #18161E
    im = Image.new('RGBA', (width, height), (24, 22, 30, 255))
    draw = ImageDraw.Draw(im)
    
    # 2. Draw subtle brand purple glow in the top-right / hero area
    glow = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    
    center_x, center_y = 900, 220
    for r in range(500, 0, -6):
        alpha = int(40 * (1 - r / 500))
        glow_draw.ellipse(
            [center_x - r, center_y - r, center_x + r, center_y + r],
            fill=(103, 61, 230, alpha)
        )
    im = Image.alpha_composite(im, glow)
    draw = ImageDraw.Draw(im)
    
    # 3. Decorative subtle striped pattern or dot grid
    for x in range(40, width, 32):
        for y in range(40, height, 32):
            draw.ellipse([x, y, x + 2, y + 2], fill=(244, 242, 236, 12))
            
    # Draw bottom accent line in violet #673DE6
    draw.rectangle([0, height - 6, width, height], fill=(103, 61, 230, 255))

    # 4. Load brand new logo: primera-cuadra-logo-blanco.png
    logo_path = 'public/brand/primera-cuadra-logo-blanco.png'
    if os.path.exists(logo_path):
        logo = Image.open(logo_path).convert('RGBA')
        # Target height = 52px, keeping aspect ratio (~352px wide)
        target_h = 52
        target_w = int(logo.width * (target_h / logo.height))
        logo_resized = logo.resize((target_w, target_h), Image.Resampling.LANCZOS)
        im.paste(logo_resized, (80, 75), logo_resized)
    
    # Fonts loading
    font_paths = [
        'C:/Windows/Fonts/segoeuib.ttf',
        'C:/Windows/Fonts/arialbd.ttf',
        'C:/Windows/Fonts/calibrib.ttf'
    ]
    font_bold = None
    font_reg = None
    for fp in font_paths:
        if os.path.exists(fp):
            try:
                font_brand_sub = ImageFont.truetype(fp, 15)
                font_tag = ImageFont.truetype(fp, 18)
                font_h1 = ImageFont.truetype(fp, 54)
                font_p = ImageFont.truetype(fp.replace('b.ttf', '.ttf'), 23)
                font_pill = ImageFont.truetype(fp, 18)
                font_bold = True
                break
            except Exception:
                pass
                
    if not font_bold:
        font_brand_sub = ImageFont.load_default()
        font_tag = ImageFont.load_default()
        font_h1 = ImageFont.load_default()
        font_p = ImageFont.load_default()
        font_pill = ImageFont.load_default()
    
    # Kicker / Badge strip
    draw.rounded_rectangle([80, 165, 520, 203], radius=6, fill=(103, 61, 230, 60), outline=(164, 139, 255, 140), width=1)
    draw.text((95, 175), "✦ PRESENCIA DIGITAL · TIGRE, GBA Y CABA", font=font_tag, fill=(164, 139, 255, 255))
    
    # Main Headline (Oswald-styled uppercase titles)
    draw.text((80, 230), "TU NEGOCIO EN LA PRIMERA CUADRA.", font=font_h1, fill=(244, 242, 236, 255))
    draw.text((80, 298), "WEB, GOOGLE MAPS Y WHATSAPP.", font=font_h1, fill=(164, 139, 255, 255))
    
    # Subtitle / Value proposition
    draw.text((80, 395), "Diseño web profesional de alta velocidad para comercios y profesionales.", font=font_p, fill=(244, 242, 236, 230))
    draw.text((80, 432), "Entrega en 4 días hábiles · Sin costos mensuales sorpresa · Trato directo con Belén.", font=font_p, fill=(179, 175, 166, 220))
    
    # 3 Pills at bottom
    pills = [
        ("🌐 Web Mobile-First", 80),
        ("📍 Google Maps Optimizado", 370),
        ("💬 WhatsApp de Ventas", 700)
    ]
    for text, px in pills:
        draw.rounded_rectangle([px, 495, px + 265, 542], radius=6, fill=(38, 35, 46, 240), outline=(103, 61, 230, 140), width=1)
        draw.text((px + 20, 508), text, font=font_pill, fill=(244, 242, 236, 255))
        
    # URL watermark bottom right
    draw.text((950, 570), "primeracuadra.com.ar", font=font_tag, fill=(164, 139, 255, 200))
    
    # Convert RGBA to RGB for saving as PNG
    rgb_im = Image.new('RGB', (width, height), (24, 22, 30))
    rgb_im.paste(im, mask=im.split()[3])
    rgb_im.save('public/og-image.png', 'PNG', optimize=True)
    print("Created public/og-image.png (1200x630)")

if __name__ == '__main__':
    generate_og_image()
