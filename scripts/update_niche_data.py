with open('src/data/nicheData.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
skip_nautica = False

for line in lines:
    if line.strip().startswith('nautica:'):
        skip_nautica = True
        continue
    if skip_nautica:
        if line.strip().startswith('profesional:'):
            skip_nautica = False
        else:
            continue
    
    # Emojis in badges
    line = line.replace("badge: '⚖️ ESTUDIOS, ABOGADOS & CONTADORES'", "badge: 'ESTUDIOS, ABOGADOS & CONTADORES'")
    line = line.replace("badge: '✂️ PELUQUERÍAS, BARBERÍAS & ESTÉTICA'", "badge: 'PELUQUERÍAS, BARBERÍAS & ESTÉTICA'")
    line = line.replace("badge: '🏬 COMERCIOS, TALLERES & FERRETERÍAS'", "badge: 'COMERCIOS, TALLERES & FERRETERÍAS'")
    line = line.replace("badge: '🩺 SALUD, ODONTOLOGÍA & CONSULTORIOS'", "badge: 'SALUD, ODONTOLOGÍA & CONSULTORIOS'")
    line = line.replace("badge: '☕ GASTRONOMÍA, RESTAURANTES & CAFETERÍAS'", "badge: 'GASTRONOMÍA, RESTAURANTES & CAFETERÍAS'")
    
    # Plural verbs & "MÁS ELEGIDO"
    line = line.replace("badge: 'TU PÁGINA WEB PROPIA • MÁS ELEGIDO'", "badge: 'TU PÁGINA WEB PROPIA • RECOMENDADO'")
    line = line.replace("Ajustamos y dejamos impecable", "Ajusto y dejo impecable")
    line = line.replace("¿Podemos coordinar?", "¿Cómo empezamos?")
    
    new_lines.append(line)

with open('src/data/nicheData.js', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("nicheData.js updated!")

