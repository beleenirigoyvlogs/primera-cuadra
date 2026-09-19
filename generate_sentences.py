import asyncio
import edge_tts
import os

VOICE = "es-AR-TomasNeural"

SENTENCES = [
    ("sentence_1.mp3", "¿Tenés un negocio en tu zona y tus vecinos no te encuentran en Google?"),
    ("sentence_2.mp3", "Tu competencia se está llevando todas las llamadas mientras tu negocio queda invisible."),
    ("sentence_3.mp3", "En Primera Cuadra te armamos tu página web propia y te posicionamos en el Top 3 de Google Maps."),
    ("sentence_4.mp3", "Todo listo en 4 días hábiles, y pagás el saldo recién cuando lo ves terminado."),
    ("sentence_5.mp3", "Tocá el botón de WhatsApp y pedí tu diagnóstico gratis hoy mismo.")
]

async def generate_sentence(filename, text):
    communicate = edge_tts.Communicate(text, VOICE, rate="+8%")
    await communicate.save(filename)
    print(f"Generated {filename}")

async def main():
    for fn, text in SENTENCES:
        await generate_sentence(fn, text)

if __name__ == "__main__":
    asyncio.run(main())
