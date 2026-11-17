import os
from PIL import Image, ImageDraw, ImageFont

demos = [
    {
        'slug': 'parrilla',
        'title': 'El Fogón de Tigre',
        'subtitle': 'Cortes a las brasas, pastas caseras y tradición ribereña',
        'badge': 'PARRILLA & BODEGÓN · ZONA NORTE',
        'img': 'public/demos/parrilla/hero.webp',
        'out': 'public/demos/parrilla/og-image.jpg'
    },
    {
        'slug': 'barberia',
        'title': 'Barber Studio 96',
        'subtitle': 'Cortes clásicos, degradé moderno y cuidado de barba',
        'badge': 'BARBERÍA URBANA & SALÓN',
        'img': 'public/demos/barberia/hero.webp',
        'out': 'public/demos/barberia/og-image.jpg'
    },
    {
        'slug': 'taller',
        'title': 'Mecánica Integral Álvarez',
        'subtitle': 'Diagnóstico computarizado, inyección electrónica y frenos',
        'badge': 'TALLER MECÁNICO & DIAGNÓSTICO',
        'img': 'public/demos/taller/hero.webp',
        'out': 'public/demos/taller/og-image.jpg'
    },
    {
        'slug': 'dental',
        'title': 'Centro Odontológico Delta',
        'subtitle': 'Odontología integral, implantes, ortodoncia invisible y estética',
        'badge': 'CONSULTORIO DENTAL & ESTÉTICA',
        'img': 'public/demos/dental/hero.webp',
        'out': 'public/demos/dental/og-image.jpg'
    }
]

for d in demos:
    canvas = Image.new('RGB', (1200, 630), color='#0f0e17')
    
    if os.path.exists(d['img']):
        with Image.open(d['img']) as im:
            im = im.convert('RGB')
            im_ratio = im.width / im.height
            target_ratio = 1200 / 630
            if im_ratio > target_ratio:
                new_w = int(630 * im_ratio)
                im = im.resize((new_w, 630), Image.Resampling.LANCZOS)
                left = (new_w - 1200) // 2
                im = im.crop((left, 0, left + 1200, 630))
            else:
                new_h = int(1200 / im_ratio)
                im = im.resize((1200, new_h), Image.Resampling.LANCZOS)
                top = (new_h - 630) // 2
                im = im.crop((0, top, 1200, top + 630))
            
            overlay = Image.new('RGBA', (1200, 630), (0, 0, 0, 0))
            draw_ov = ImageDraw.Draw(overlay)
            for x in range(1200):
                alpha = int(255 * max(0.4, (1.0 - (x / 1200.0) * 0.7)))
                draw_ov.line([(x, 0), (x, 630)], fill=(15, 14, 23, alpha))
            
            canvas = Image.alpha_composite(im.convert('RGBA'), overlay).convert('RGB')

    draw = ImageDraw.Draw(canvas)
    
    font_large = None
    font_sub = None
    font_badge = None
    
    font_paths = [
        'C:/Windows/Fonts/arialbd.ttf',
        'C:/Windows/Fonts/segoeui.ttf',
        'C:/Windows/Fonts/calibrib.ttf'
    ]
    for fp in font_paths:
        if os.path.exists(fp):
            try:
                font_large = ImageFont.truetype(fp, 52)
                font_sub = ImageFont.truetype(fp, 24)
                font_badge = ImageFont.truetype(fp, 16)
                break
            except Exception:
                pass
    
    if not font_large:
        font_large = ImageFont.load_default()
        font_sub = ImageFont.load_default()
        font_badge = ImageFont.load_default()

    # Draw Badge
    draw.rectangle([70, 70, 480, 108], fill='#1e1b4b', outline='#5025c4', width=2)
    draw.text((85, 78), d['badge'], fill='#c4b5fd', font=font_badge)

    # Draw Title
    draw.text((70, 140), d['title'], fill='#ffffff', font=font_large)

    # Draw Subtitle
    draw.text((70, 220), d['subtitle'], fill='#cbd5e1', font=font_sub)

    # Draw footer branding bar
    draw.line([(70, 520), (1130, 520)], fill=(255, 255, 255), width=1)
    draw.text((70, 545), 'EJEMPLO DE WEB PROFESIONAL · DISEÑADO POR PRIMERA CUADRA', fill='#a78bfa', font=font_badge)
    draw.text((920, 545), 'primeracuadra.com.ar', fill='#94a3b8', font=font_badge)

    canvas.save(d['out'], 'JPEG', quality=92)
    print(f"Generated {d['out']} ({os.path.getsize(d['out'])} bytes)")

