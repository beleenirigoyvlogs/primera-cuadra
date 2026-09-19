import asyncio
import edge_tts
import json

VOICE = "es-AR-TomasNeural"

SCRIPT = (
    "¿Tenés un negocio y tus vecinos no te encuentran en Google? "
    "Tu competencia se está llevando todas las llamadas de tu zona. "
    "En Primera Cuadra te armamos tu página web propia y te posicionamos en el Top 3 de Google Maps. "
    "Todo listo en 4 días hábiles, y pagás el saldo recién cuando lo ves terminado. "
    "Escribinos al WhatsApp y pedí tu diagnóstico gratis hoy."
)

async def main():
    communicate = edge_tts.Communicate(SCRIPT, VOICE, rate="+8%")
    submaker = edge_tts.SubMaker()
    
    with open("voiceover.mp3", "wb") as f:
        async for chunk in communicate.stream():
            if chunk["type"] == "audio":
                f.write(chunk["data"])
            elif chunk["type"] == "WordBoundary":
                submaker.feed(chunk)
                
    with open("subtitles.srt", "w", encoding="utf-8") as f:
        f.write(submaker.get_srt())
        
    print("SRT and MP3 created!")

if __name__ == "__main__":
    asyncio.run(main())
