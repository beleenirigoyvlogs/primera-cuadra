import os
import urllib.request
from PIL import Image

def optimize_logo():
    print("Optimizing logo...")
    logo_path = 'public/logo.webp'
    if os.path.exists(logo_path):
        im = Image.open(logo_path)
        im.resize((96, 96), Image.Resampling.LANCZOS).save('public/logo-96.webp', 'WEBP', quality=90)
        im.resize((48, 48), Image.Resampling.LANCZOS).save('public/logo-48.webp', 'WEBP', quality=90)
        print("Logo resized to 96x96 and 48x48 webp")

def convert_thepoint_images():
    print("Converting The Point screenshots to WebP...")
    tp_dir = 'public/thepoint'
    if os.path.exists(tp_dir):
        for f in os.listdir(tp_dir):
            if f.endswith('.jpg'):
                src = os.path.join(tp_dir, f)
                dst = os.path.join(tp_dir, f.replace('.jpg', '.webp'))
                im = Image.open(src)
                im.save(dst, 'WEBP', quality=85)
                print(f"Converted {f} to {os.path.basename(dst)}")

def download_and_convert_demo_images():
    print("Downloading and converting demo site images to public/demos/...")
    
    demos = {
        'parrilla': {
            'hero': 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&auto=format&fit=crop&q=80',
            'gallery': [
                'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&auto=format&fit=crop&q=80'
            ]
        },
        'barberia': {
            'hero': 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200&auto=format&fit=crop&q=80',
            'gallery': [
                'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1517832606589-7157460866ac?w=800&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&auto=format&fit=crop&q=80'
            ]
        },
        'taller': {
            'hero': 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1200&auto=format&fit=crop&q=80',
            'gallery': [
                'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=800&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=800&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=800&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1613214149922-f1809c99b414?w=800&auto=format&fit=crop&q=80'
            ]
        },
        'dental': {
            'hero': 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&auto=format&fit=crop&q=80',
            'gallery': [
                'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=800&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80'
            ]
        }
    }

    headers = {'User-Agent': 'Mozilla/5.0'}
    
    for rubro, data in demos.items():
        out_dir = os.path.join('public', 'demos', rubro)
        os.makedirs(out_dir, exist_ok=True)
        
        # Download Hero
        hero_target = os.path.join(out_dir, 'hero.webp')
        if not os.path.exists(hero_target):
            try:
                print(f"Downloading {rubro} hero...")
                req = urllib.request.Request(data['hero'], headers=headers)
                with urllib.request.urlopen(req) as resp, open('tmp_hero.jpg', 'wb') as f:
                    f.write(resp.read())
                im = Image.open('tmp_hero.jpg')
                im.thumbnail((1200, 800), Image.Resampling.LANCZOS)
                im.save(hero_target, 'WEBP', quality=82)
                os.remove('tmp_hero.jpg')
            except Exception as e:
                print(f"Error downloading {rubro} hero: {e}")
        
        # Download Gallery
        for idx, g_url in enumerate(data['gallery']):
            g_target = os.path.join(out_dir, f'gallery_{idx+1}.webp')
            if not os.path.exists(g_target):
                try:
                    print(f"Downloading {rubro} gallery {idx+1}...")
                    req = urllib.request.Request(g_url, headers=headers)
                    with urllib.request.urlopen(req) as resp, open(f'tmp_g_{idx}.jpg', 'wb') as f:
                        f.write(resp.read())
                    im = Image.open(f'tmp_g_{idx}.jpg')
                    im.thumbnail((800, 600), Image.Resampling.LANCZOS)
                    im.save(g_target, 'WEBP', quality=80)
                    os.remove(f'tmp_g_{idx}.jpg')
                except Exception as e:
                    print(f"Error downloading {rubro} gallery {idx+1}: {e}")

if __name__ == '__main__':
    optimize_logo()
    convert_thepoint_images()
    download_and_convert_demo_images()
    print("Done!")

