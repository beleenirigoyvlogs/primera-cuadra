import re

with open('src/data/demoSitesData.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace Unsplash URLs
content = re.sub(
    r"heroImage:\s*'https://images\.unsplash\.com/[^']+'",
    lambda m: m.group(0), # Keep placeholder, we do specific replacements below
    content
)

replacements = [
    # Parrilla
    ("heroImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1600&auto=format&fit=crop&q=80'", "heroImage: '/demos/parrilla/hero.webp'"),
    ("https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80", "/demos/parrilla/gallery_1.webp"),
    ("https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80", "/demos/parrilla/gallery_2.webp"),
    ("https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&auto=format&fit=crop&q=80", "/demos/parrilla/gallery_3.webp"),
    ("https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&auto=format&fit=crop&q=80", "/demos/parrilla/gallery_4.webp"),
    ("https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&auto=format&fit=crop&q=80", "/demos/parrilla/gallery_5.webp"),
    ("https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&auto=format&fit=crop&q=80", "/demos/parrilla/gallery_6.webp"),

    # Barberia
    ("heroImage: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1600&auto=format&fit=crop&q=80'", "heroImage: '/demos/barberia/hero.webp'"),
    ("https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=80", "/demos/barberia/gallery_1.webp"),
    ("https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&auto=format&fit=crop&q=80", "/demos/barberia/gallery_2.webp"),
    ("https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&auto=format&fit=crop&q=80", "/demos/barberia/gallery_3.webp"),
    ("https://images.unsplash.com/photo-1517832606589-7157460866ac?w=800&auto=format&fit=crop&q=80", "/demos/barberia/gallery_4.webp"),
    ("https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&auto=format&fit=crop&q=80", "/demos/barberia/gallery_5.webp"),
    ("https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&auto=format&fit=crop&q=80", "/demos/barberia/gallery_6.webp"),

    # Taller
    ("heroImage: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1600&auto=format&fit=crop&q=80'", "heroImage: '/demos/taller/hero.webp'"),
    ("https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&auto=format&fit=crop&q=80", "/demos/taller/gallery_1.webp"),
    ("https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=800&auto=format&fit=crop&q=80", "/demos/taller/gallery_2.webp"),
    ("https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=800&auto=format&fit=crop&q=80", "/demos/taller/gallery_3.webp"),
    ("https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&auto=format&fit=crop&q=80", "/demos/taller/gallery_4.webp"),
    ("https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=800&auto=format&fit=crop&q=80", "/demos/taller/gallery_5.webp"),
    ("https://images.unsplash.com/photo-1613214149922-f1809c99b414?w=800&auto=format&fit=crop&q=80", "/demos/taller/gallery_6.webp"),

    # Dental
    ("heroImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1600&auto=format&fit=crop&q=80'", "heroImage: '/demos/dental/hero.webp'"),
    ("https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&auto=format&fit=crop&q=80", "/demos/dental/gallery_1.webp"),
    ("https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&auto=format&fit=crop&q=80", "/demos/dental/gallery_2.webp"),
    ("https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=800&auto=format&fit=crop&q=80", "/demos/dental/gallery_3.webp"),
    ("https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&auto=format&fit=crop&q=80", "/demos/dental/gallery_4.webp"),
    ("https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=80", "/demos/dental/gallery_5.webp"),
    ("https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80", "/demos/dental/gallery_6.webp")
]

for src, dst in replacements:
    content = content.replace(src, dst)

with open('src/data/demoSitesData.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated demoSitesData.js successfully!")
