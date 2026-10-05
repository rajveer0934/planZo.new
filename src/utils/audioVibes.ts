import confetti from 'canvas-confetti';

// Audio Context Singleton for satisfying clicks & ambient sound
let audioCtx: AudioContext | null = null;
let ambientOscillators: { stop: () => void } | null = null;
let currentAmbientType: 'rain' | 'lofi' | 'brownNoise' | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Satisfying Task Completion Chime (Pentatonic Major Chime)
export function playTaskCompleteSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Smooth chime chords: C5 (523Hz) -> E5 (659Hz) -> G5 (783Hz)
    const notes = [523.25, 659.25, 783.99];
    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + index * 0.07);
      
      gain.gain.setValueAtTime(0, now + index * 0.07);
      gain.gain.linearRampToValueAtTime(0.12, now + index * 0.07 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.07 + 0.5);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now + index * 0.07);
      osc.stop(now + index * 0.07 + 0.55);
    });
  } catch {
    // Graceful fallback if audio is not permitted by browser policy
  }
}

// Epic Streak / Level Up Fanfare
export function playLevelUpSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Notes: C5 -> G5 -> C6
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = index === 3 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, now + index * 0.09);
      
      gain.gain.setValueAtTime(0, now + index * 0.09);
      gain.gain.linearRampToValueAtTime(0.18, now + index * 0.09 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.09 + 0.8);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now + index * 0.09);
      osc.stop(now + index * 0.09 + 0.85);
    });
  } catch {
    // Ignore audio permission errors
  }
}

// Ambient Lo-Fi & Focus Generator (Zero MP3 dependencies)
export function startAmbientSound(type: 'rain' | 'lofi' | 'brownNoise', volume = 0.15) {
  stopAmbientSound();
  try {
    const ctx = getAudioContext();
    
    if (type === 'brownNoise' || type === 'rain') {
      // Procedural White/Brown Noise Buffer Generator
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;
      
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // Brown noise filter: integration of white noise
        output[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5; // Gain compensation
      }
      
      const whiteNoiseSource = ctx.createBufferSource();
      whiteNoiseSource.buffer = noiseBuffer;
      whiteNoiseSource.loop = true;
      
      // Filter for gentle rain / deep space
      const filter = ctx.createBiquadFilter();
      filter.type = type === 'rain' ? 'lowpass' : 'bandpass';
      filter.frequency.setValueAtTime(type === 'rain' ? 800 : 250, ctx.currentTime);
      
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(volume, ctx.currentTime);
      
      whiteNoiseSource.connect(filter);
      filter.connect(masterGain);
      masterGain.connect(ctx.destination);
      
      whiteNoiseSource.start();
      currentAmbientType = type;
      ambientOscillators = {
        stop: () => {
          try {
            whiteNoiseSource.stop();
            whiteNoiseSource.disconnect();
          } catch {}
        }
      };
    } else if (type === 'lofi') {
      // Soothing Warm Ambient Pad Chord (Fmaj7 - 174Hz, 220Hz, 261Hz, 329Hz)
      const frequencies = [174.61, 220.0, 261.63, 329.63];
      const oscNodes: OscillatorNode[] = [];
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(volume * 0.5, ctx.currentTime);
      
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, ctx.currentTime);
      
      frequencies.forEach((freq) => {
        const osc = ctx.createOscillator();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        osc.connect(filter);
        osc.start();
        oscNodes.push(osc);
      });
      
      filter.connect(masterGain);
      masterGain.connect(ctx.destination);
      
      currentAmbientType = 'lofi';
      ambientOscillators = {
        stop: () => {
          oscNodes.forEach((osc) => {
            try {
              osc.stop();
              osc.disconnect();
            } catch {}
          });
        }
      };
    }
  } catch {
    // Ignore
  }
}

export function stopAmbientSound() {
  if (ambientOscillators) {
    ambientOscillators.stop();
    ambientOscillators = null;
    currentAmbientType = null;
  }
}

export function getCurrentAmbientType(): 'rain' | 'lofi' | 'brownNoise' | null {
  return currentAmbientType;
}

// Confetti blast celebration
export function fireConfetti(count = 60) {
  try {
    confetti({
      particleCount: count,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#10b981', '#06b6d4', '#f59e0b', '#ec4899', '#8b5cf6'],
      ticks: 200,
    });
  } catch {
    // Fallback if canvas blocked
  }
}
