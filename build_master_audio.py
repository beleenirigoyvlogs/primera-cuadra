import os
import math
import struct
import wave
import subprocess

SAMPLE_RATE = 44100
TOTAL_DURATION = 25.0
NUM_SAMPLES = int(SAMPLE_RATE * TOTAL_DURATION)

# Scene start times (seconds)
SCENE_STARTS = [0.0, 4.2, 9.2, 15.0, 20.3]
VOICE_OFFSETS = [0.15, 4.35, 9.35, 15.15, 20.45]
SENTENCE_FILES = [f"sentence_{i}.mp3" for i in range(1, 6)]

def convert_mp3_to_wav(mp3_path, wav_path):
    cmd = ["ffmpeg", "-y", "-i", mp3_path, "-ar", str(SAMPLE_RATE), "-ac", "1", wav_path]
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)

def load_wav_samples(wav_path):
    with wave.open(wav_path, "r") as wf:
        n_frames = wf.getnframes()
        data = wf.readframes(n_frames)
        samples = struct.unpack(f"<{n_frames}h", data)
        return [s / 32768.0 for s in samples]

def main():
    print("Converting sentences to WAV...")
    voice_tracks = []
    for i, sf in enumerate(SENTENCE_FILES):
        w_path = f"sentence_{i+1}.wav"
        convert_mp3_to_wav(sf, w_path)
        samples = load_wav_samples(w_path)
        voice_tracks.append((VOICE_OFFSETS[i], samples))
        if os.path.exists(w_path):
            os.remove(w_path)

    master = [0.0] * NUM_SAMPLES
    bpm = 124
    samples_per_beat = int(SAMPLE_RATE * (60.0 / bpm))

    # Determine speech intervals to duck background music
    is_speaking = [False] * NUM_SAMPLES
    for start_t, s_samples in voice_tracks:
        start_idx = int(start_t * SAMPLE_RATE)
        end_idx = min(NUM_SAMPLES, start_idx + len(s_samples))
        for j in range(start_idx, end_idx):
            is_speaking[j] = True

    # Build background music (modern upbeat commercial beat)
    print("Synthesizing ducked background music & SFX...")
    for t in range(NUM_SAMPLES):
        # Ducking envelope
        duck = 0.16 if is_speaking[t] else 0.38
        
        # Beat groove
        beat_pos = t % samples_per_beat
        beat_idx = t // samples_per_beat
        
        # Kick drum on 1 and 3
        kick = 0.0
        if beat_idx % 2 == 0:
            k_env = math.exp(-beat_pos / (SAMPLE_RATE * 0.08))
            k_freq = 130.0 * math.exp(-beat_pos / (SAMPLE_RATE * 0.035)) + 48.0
            kick = math.sin(2.0 * math.pi * k_freq * (beat_pos / SAMPLE_RATE)) * k_env * 0.55
            
        # Hi-hat on off-beats
        hihat = 0.0
        sub_beat = t % (samples_per_beat // 2)
        if (t // (samples_per_beat // 2)) % 2 == 1:
            hh_env = math.exp(-sub_beat / (SAMPLE_RATE * 0.022))
            noise = ((math.sin(t * 12345.67) * 43758.5453) % 1.0) * 2.0 - 1.0
            hihat = noise * hh_env * 0.18
            
        # Snare / Clap on beat 2 and 4
        snare = 0.0
        if beat_idx % 2 == 1:
            s_env = math.exp(-beat_pos / (SAMPLE_RATE * 0.07))
            noise = ((math.sin(t * 54321.12) * 23456.78) % 1.0) * 2.0 - 1.0
            snare = (math.sin(2.0 * math.pi * 180.0 * (beat_pos / SAMPLE_RATE)) * 0.3 + noise * 0.7) * s_env * 0.35

        # Bass groove (warm punchy bass)
        bass_notes = [55.0, 55.0, 65.4, 73.4, 55.0, 65.4, 82.4, 73.4]
        note = bass_notes[(beat_idx // 2) % len(bass_notes)]
        b_env = 0.35 + 0.15 * math.sin(2.0 * math.pi * 2.0 * (t / SAMPLE_RATE))
        bass = math.sin(2.0 * math.pi * note * (t / SAMPLE_RATE)) * b_env * 0.22

        # Ambient synth chord
        chords = [220.0, 277.18, 329.63] if (beat_idx % 8 < 4) else [261.63, 329.63, 392.0]
        pad = 0.0
        for f in chords:
            pad += math.sin(2.0 * math.pi * f * (t / SAMPLE_RATE)) * 0.04

        music_sample = (kick + hihat + snare + bass + pad) * duck

        # Sound effects (SFX) at scene transitions
        sfx = 0.0
        cur_sec = t / SAMPLE_RATE

        # SFX 1 (0.0s): High-tech digital swoosh
        if 0.0 <= cur_sec < 0.6:
            st = cur_sec
            sweep = 300.0 + 1200.0 * st
            sfx += math.sin(2.0 * math.pi * sweep * st) * math.exp(-st * 4.0) * 0.25

        # SFX 2 (4.2s): Alert pulse
        if 4.2 <= cur_sec < 4.8:
            st = cur_sec - 4.2
            sfx += math.sin(2.0 * math.pi * 440.0 * st) * math.exp(-st * 6.0) * 0.3

        # SFX 3 (9.2s): Positive success chime
        if 9.2 <= cur_sec < 10.2:
            st = cur_sec - 9.2
            sfx += (
                math.sin(2.0 * math.pi * 880.0 * st) * math.exp(-st * 3.5) * 0.25 +
                math.sin(2.0 * math.pi * 1320.0 * st) * math.exp(-st * 4.0) * 0.2
            )

        # SFX 4 (15.0s): Shield / metallic confirmation click
        if 15.0 <= cur_sec < 15.5:
            st = cur_sec - 15.0
            sfx += math.sin(2.0 * math.pi * 650.0 * st) * math.exp(-st * 8.0) * 0.35

        # SFX 5 (20.3s): WhatsApp notification pop chime
        if 20.3 <= cur_sec < 22.0:
            st = cur_sec - 20.3
            sfx += (
                math.sin(2.0 * math.pi * 1046.5 * st) * math.exp(-st * 3.0) * 0.45 +
                math.sin(2.0 * math.pi * 1567.98 * st) * math.exp(-st * 4.0) * 0.35
            )

        master[t] = music_sample + sfx

    # Mix in voiceover
    print("Overlaying voiceover tracks...")
    for start_t, s_samples in voice_tracks:
        start_idx = int(start_t * SAMPLE_RATE)
        for i, vs in enumerate(s_samples):
            idx = start_idx + i
            if idx < NUM_SAMPLES:
                # 1.35x gain on voiceover for crystal clear punch
                master[idx] = max(-0.96, min(0.96, master[idx] + vs * 1.35))

    # Fade out last 0.4s
    fade_len = int(SAMPLE_RATE * 0.4)
    for i in range(fade_len):
        factor = i / fade_len
        master[NUM_SAMPLES - 1 - i] *= factor

    # Save to WAV
    output_wav = "master_soundtrack.wav"
    with wave.open(output_wav, "w") as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(SAMPLE_RATE)
        raw = bytearray()
        for m in master:
            val = int(m * 32767.0)
            raw.extend(struct.pack("<h", val))
        wf.writeframes(raw)

    print(f"Master soundtrack created: {output_wav} ({TOTAL_DURATION}s)")

if __name__ == "__main__":
    main()
