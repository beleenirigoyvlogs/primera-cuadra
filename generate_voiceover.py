import asyncio
import edge_tts

VOICE = "es-AR-TomasNeural"  # Natural Argentine voice
OUTPUT_FILE = "voiceover_raw.mp3"

SCRIPT = (
    "¿Tenés un negocio y tus vecinos no te encuentran en Google? "
    "Tu competencia se está llevando todas las llamadas de tu zona. "
    "En Primera Cuadra te armamos tu página web propia y te posicionamos en el Top 3 de Google Maps. "
    "Todo listo en 4 días hábiles, y pagás el saldo recién cuando lo ves terminado. "
    "Escribinos al WhatsApp y pedí tu diagnóstico gratis hoy."
)

async def main():
    communicate = edge_tts.Communicate(SCRIPT, VOICE, rate="+6%")
    await communicate.save(OUTPUT_FILE)
    print("Voiceover generated:", OUTPUT_FILE)

if __name__ == "__main__":
    asyncio.run(main())
