with open('src/components/TripodMockup.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove nautica block from RUBRO_TEMPLATES
import re
content = re.sub(r'  nautica: \{[\s\S]*?\n  \},', '', content)

# 2. Clean emoji labels in RUBRO_TEMPLATES
content = content.replace("label: '✂️ Peluquería / Barber'", "label: 'Peluquería & Barbería'")
content = content.replace("label: '⚖️ Estudios & Abogados'", "label: 'Estudios & Profesionales'")
content = content.replace("label: '🚗 Talleres & Mecánica'", "label: 'Talleres & Mecánica'")
content = content.replace("label: '🩺 Salud & Odontología'", "label: 'Salud & Odontología'")
content = content.replace("label: '🍕 Gastronomía & Bares'", "label: 'Gastronomía & Bares'")
content = content.replace("label: '🏬 Comercios & Locales'", "label: 'Comercios & Locales'")

# 3. Domain slug default
content = content.replace("if (!name) return 'tu-marca.com.ar';", "if (!name) return 'tunegocio.com.ar';")
content = content.replace("return clean ? `${clean}.com.ar` : 'tu-marca.com.ar';", "return clean ? `${clean}.com.ar` : 'tunegocio.com.ar';")

# 4. Remove nautica from useEffect niche sync
nautica_sync = """      if (niche.id === 'nautica') {
        setBrandName('Guardería Náutica Delta');
        setRubroTag('Guardería Náutica & Alquiler de Lanchas');
        setCity('Tigre & San Fernando');
        setManualTemplateId('nautica');
      } else """
content = content.replace(nautica_sync, "      ")

# 5. Remove generic phrase:
generic_old = """Ofrecemos el mejor servicio de {rubroTag.toLowerCase()} en {city}. Atención personalizada, calidad garantizada y respuesta inmediata."""
generic_new = """Diseño tu página web para que muestres tus servicios y recibas mensajes directo a tu WhatsApp."""
content = content.replace(generic_old, generic_new)

# 6. First person singular updates in TripodMockup
content = content.replace("Diseñamos y adaptamos la web al 100% de lo que vos ofrecés.", "Diseño y adapto la web al 100% de lo que ofrecés.")
content = content.replace("Podemos adaptar esta propuesta a tu marca, productos, servicios y forma de trabajar.", "Puedo adaptar esta propuesta a tu marca, productos, servicios y forma de trabajar.")
content = content.replace("¡Hola Primera Cuadra! Estuve viendo el simulador de presencia digital para mi negocio \"${brandName}\" (${rubroTag} en ${city}). Me gustaría recibir una propuesta comercial y ver cómo podemos arrancar.", "¡Hola Belén! Estuve viendo el simulador de presencia digital para mi negocio \"${brandName}\" (${rubroTag} en ${city}). Me gustaría recibir una propuesta comercial y ver cómo empezamos.")

with open('src/components/TripodMockup.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("TripodMockup.jsx updated successfully!")

