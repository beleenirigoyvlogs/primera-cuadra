import os
from PIL import Image, ImageDraw, ImageFont

def generate_og_image():
    width = 1200
    height = 630
    
    # 1. Base image with brand dark background
    im = Image.new('RGBA', (width, height), (11, 10, 20, 255))
    draw = ImageDraw.Draw(im)
    
    # 2. Draw subtle radial glow in the top-right / center
    # Create radial gradient on an overlay
    glow = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    
    center_x, center_y = 700, 200
    for r in range(450, 0, -5):
        alpha = int(45 * (1 - r / 450))
        glow_draw.ellipse(
            [center_x - r, center_y - r, center_x + r, center_y + r],
            fill=(103, 61, 230, alpha)
        )
    im = Image.alpha_composite(im, glow)
    draw = ImageDraw.Draw(im)
    
    # 3. Draw subtle grid of dots
    for x in range(40, width, 32):
        for y in range(40, height, 32):
            draw.ellipse([x, y, x + 2, y + 2], fill=(255, 255, 255, 14))

    # 4. Load brand logo
    logo_path = 'public/logo.webp'
    if os.path.exists(logo_path):
        logo = Image.open(logo_path).convert('RGBA')
        logo = logo.resize((100, 100), Image.Resampling.LANCZOS)
        # Create circular mask for logo
        mask = Image.new('L', (100, 100), 0)
        mask_draw = ImageDraw.Draw(mask)
        mask_draw.ellipse((0, 0, 100, 100), fill=255)
        
        # Paste logo at top-left
        im.paste(logo, (80, 70), mask)
        
        # Draw border ring around logo
        draw.ellipse([78, 68, 182, 172], outline=(167, 139, 250, 180), width=3)
    
    # Try to load high quality fonts, fallback to default if not found
    try:
        font_brand = ImageFont.truetype('arialbd.ttf', 38)
        font_tag = ImageFont.truetype('arialbd.ttf', 18)
        font_h1 = ImageFont.truetype('arialbd.ttf', 56)
        font_p = ImageFont.truetype('arial.ttf', 24)
        font_pill = ImageFont.truetype('arialbd.ttf', 20)
    except:
        font_brand = ImageFont.load_default()
        font_tag = ImageFont.load_default()
        font_h1 = ImageFont.load_default()
        font_p = ImageFont.load_default()
        font_pill = ImageFont.load_default()
    
    # Brand title next to logo
    draw.text((200, 85), "PRIMERA CUADRA", font=font_brand, fill=(255, 255, 255, 255))
    draw.text((202, 135), "PRESENCIA DIGITAL PARA COMERCIOS & PROFESIONALES", font=font_tag, fill=(167, 139, 250, 240))
    
    # Badge strip
    draw.rounded_rectangle([80, 205, 470, 245], radius=20, fill=(103, 61, 230, 45), outline=(167, 139, 250, 120), width=1)
    draw.text((105, 216), "✦ TIGRE, BUENOS AIRES · PARA TODO EL PAÍS", font=font_tag, fill=(196, 181, 253, 255))
    
    # Main Headline (3 lines with purple highlight)
    draw.text((80, 265), "Que te encuentren.", font=font_h1, fill=(255, 255, 255, 255))
    draw.text((80, 335), "Que te conozcan.", font=font_h1, fill=(255, 255, 255, 255))
    draw.text((80, 405), "Que te contacten.", font=font_h1, fill=(167, 139, 250, 255))
    
    # Subtitle
    draw.text((80, 485), "Páginas web a medida, optimización en Google Maps y WhatsApp Business.", font=font_p, fill=(209, 213, 219, 240))
    draw.text((80, 520), "Entrega en 4 días hábiles · Sin costos ocultos · Dominio propio incluido.", font=font_p, fill=(156, 163, 175, 220))
    
    # 3 Pills at bottom
    pills = [
        ("🌐 Web Mobile-First", 80),
        ("📍 Google Maps", 360),
        ("💬 WhatsApp Directo", 580)
    ]
    for text, px in pills:
        draw.rounded_rectangle([px, 565, px + 210, 605], radius=10, fill=(30, 25, 55, 220), outline=(103, 61, 230, 120), width=1)
        draw.text((px + 20, 575), text, font=font_pill, fill=(243, 244, 246, 255))
        
    # URL watermark bottom right
    draw.text((920, 575), "primeracuadra.com.ar", font=font_tag, fill=(167, 139, 250, 180))
    
    # Convert RGBA to RGB for saving as PNG
    rgb_im = Image.new('RGB', (width, height), (11, 10, 20))
    rgb_im.paste(im, mask=im.split()[3])
    rgb_im.save('public/og-image.png', 'PNG', optimize=True)
    print("Created public/og-image.png (1200x630)")

if __name__ == '__main__':
    generate_og_image()

