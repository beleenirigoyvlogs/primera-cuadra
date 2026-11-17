import os
from PIL import Image

sdir = 'C:/Users/Beleen Iriigoy/Pictures/Screenshots'
output_dir = 'c:/Users/Beleen Iriigoy/.gemini/antigravity-ide/scratch/Primera-cuadra/public/thepoint'
os.makedirs(output_dir, exist_ok=True)

screens = [
    {
        'id': 'pos',
        'file': 'Captura de pantalla 2026-11-16 221655.png',
        'title': 'Punto de Venta (POS)'
    },
    {
        'id': 'dashboard',
        'file': 'Captura de pantalla 2026-11-16 221643.png',
        'title': 'Dashboard General'
    },
    {
        'id': 'stock',
        'file': 'Captura de pantalla 2026-11-16 221709.png',
        'title': 'Inventario & Stock'
    },
    {
        'id': 'compras',
        'file': 'Captura de pantalla 2026-11-16 221725.png',
        'title': 'Compras & Proveedores'
    },
    {
        'id': 'caja',
        'file': 'Captura de pantalla 2026-11-16 221733.png',
        'title': 'Caja Diaria'
    },
    {
        'id': 'gastos',
        'file': 'Captura de pantalla 2026-11-16 221743.png',
        'title': 'Gastos Operativos'
    },
    {
        'id': 'reportes',
        'file': 'Captura de pantalla 2026-11-16 221751.png',
        'title': 'Reportes & Estadísticas'
    },
    {
        'id': 'auditoria',
        'file': 'Captura de pantalla 2026-11-16 221921.png',
        'title': 'Historial & Auditoría'
    },
    {
        'id': 'backups',
        'file': 'Captura de pantalla 2026-11-16 221930.png',
        'title': 'Respaldos SQLite'
    }
]

print('=== 1. TAMAÑOS REALES DE CADA CAPTURA ORIGINAL ===')
for sc in screens:
    src_path = os.path.join(sdir, sc['file'])
    with Image.open(src_path) as img:
        size_kb = os.path.getsize(src_path) / 1024
        print(f"• {sc['title']} ({sc['id']}): {img.width} x {img.height} px | {size_kb:.1f} KB | Archivo: {sc['file']}")

print('\n=== 2. GENERANDO VERSIONES WEBP Y AVIF (CALIDAD 90, RESAMPLING LANCZOS) ===')
results = []

for sc in screens:
    src_path = os.path.join(sdir, sc['file'])
    with Image.open(src_path) as img:
        orig_w, orig_h = img.size
        # Generate widths: 1200, 1800, and full (orig_w)
        widths = [1200, 1800, orig_w]
        
        for w in widths:
            if w > orig_w:
                continue
            h = int(round(orig_h * (w / orig_w)))
            suffix = f"-{w}" if w != orig_w else "-full"
            
            # Resize
            resized = img.resize((w, h), Image.Resampling.LANCZOS)
            
            # 1. WebP
            webp_name = f"{sc['id']}{suffix}.webp"
            webp_path = os.path.join(output_dir, webp_name)
            resized.save(webp_path, 'WEBP', quality=90, method=6)
            webp_kb = os.path.getsize(webp_path) / 1024
            results.append({
                'screen': sc['id'],
                'variant': f"{w}px" if w != orig_w else "Original",
                'format': 'WebP',
                'dims': f"{w}x{h}",
                'size_kb': webp_kb,
                'file': webp_name
            })
            
            # Also keep default base name as the 1800 or full version for backward compatibility
            if suffix == "-full":
                base_webp = os.path.join(output_dir, f"{sc['id']}.webp")
                resized.save(base_webp, 'WEBP', quality=90, method=6)
            
            # 2. AVIF
            avif_name = f"{sc['id']}{suffix}.avif"
            avif_path = os.path.join(output_dir, avif_name)
            try:
                resized.save(avif_path, 'AVIF', quality=90)
                avif_kb = os.path.getsize(avif_path) / 1024
                results.append({
                    'screen': sc['id'],
                    'variant': f"{w}px" if w != orig_w else "Original",
                    'format': 'AVIF',
                    'dims': f"{w}x{h}",
                    'size_kb': avif_kb,
                    'file': avif_name
                })
            except Exception as e:
                print(f"Error saving AVIF for {avif_name}: {e}")

print(f"\nGeneradas {len(results)} versiones exitosamente en {output_dir}")
print("\n=== TABLA DE TAMAÑOS Y PESOS GENERADOS ===")
print(f"{'Módulo':<12} | {'Versión':<10} | {'Formato':<6} | {'Dimensiones':<12} | {'Peso (KB)':<10} | {'Archivo'}")
print("-" * 75)
for r in results:
    print(f"{r['screen']:<12} | {r['variant']:<10} | {r['format']:<6} | {r['dims']:<12} | {r['size_kb']:<10.1f} | {r['file']}")

