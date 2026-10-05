// Web Audio API ambient sound generator & synthesizer for Focus & Lo-Fi
// Zero network dependencies, 100% reliable client-side synthesis + device file player

export type AmbientSoundType =
  | 'flute'
  | 'rituals'
  | 'instrumental'
  | 'rain'
  | 'waves'
  | 'forest'
  | 'whitenoise'
  | 'custom'
  | 'none';

let audioCtx: AudioContext | null = null;
let activeSourceNode: AudioNode | null = null;
let activeGainNode: GainNode | null = null;
let ambientIntervalId: number | null = null;
let isPlaying = false;
let currentSoundType: AmbientSoundType = 'none';

// Dedicated HTML5 Audio element for custom device audio uploads
let customAudioEl: HTMLAudioElement | null = null;
let customAudioTrackName: string = 'Custom Audio';

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// 1. Indian Classical Flute (Bansuri Meditative Raag Synth)
function startFluteSynth(ctx: AudioContext, masterGain: GainNode) {
  // Tanpura / drone base (E3: 164.81 Hz and B3: 246.94 Hz)
  const droneOsc1 = ctx.createOscillator();
  const droneOsc2 = ctx.createOscillator();
  const droneGain = ctx.createGain();

  droneOsc1.type = 'triangle';
  droneOsc1.frequency.setValueAtTime(164.81, ctx.currentTime);
  droneOsc2.type = 'sine';
  droneOsc2.frequency.setValueAtTime(246.94, ctx.currentTime);

  droneGain.gain.setValueAtTime(0.06, ctx.currentTime);
  droneOsc1.connect(droneGain);
  droneOsc2.connect(droneGain);
  droneGain.connect(masterGain);

  droneOsc1.start();
  droneOsc2.start();

  // Bansuri Melodic notes in Raag Yaman / Bhupali scale
  // E4 (329.63), F#4 (369.99), G#4 (415.30), B4 (493.88), C#5 (554.37), E5 (659.25)
  const melodyNotes = [329.63, 369.99, 415.30, 493.88, 554.37, 493.88, 415.30, 329.63];
  let noteIndex = 0;

  const playFlutePhrase = () => {
    if (!isPlaying || currentSoundType !== 'flute') return;
    const now = ctx.currentTime;
    const freq = melodyNotes[noteIndex % melodyNotes.length];
    noteIndex++;

    const osc = ctx.createOscillator();
    const vibratoLFO = ctx.createOscillator();
    const vibratoGain = ctx.createGain();
    const noteGain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    // Bansuri wave: warm sine with gentle overtones
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Warm woodwind filter
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, now);

    // Subtle 5.2Hz human breath vibrato
    vibratoLFO.frequency.setValueAtTime(5.2, now);
    vibratoGain.gain.setValueAtTime(4.5, now);
    vibratoLFO.connect(vibratoGain);
    vibratoGain.connect(osc.frequency);

    // Gentle meend (sliding portamento) & attack/decay envelope
    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.linearRampToValueAtTime(0.18, now + 0.4);
    noteGain.gain.exponentialRampToValueAtTime(0.001, now + 3.2);

    osc.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(masterGain);

    osc.start(now);
    vibratoLFO.start(now);
    osc.stop(now + 3.4);
    vibratoLFO.stop(now + 3.4);
  };

  playFlutePhrase();
  const timer = window.setInterval(playFlutePhrase, 3600);
  ambientIntervalId = timer as unknown as number;

  return {
    stop: () => {
      try {
        droneOsc1.stop();
        droneOsc2.stop();
        droneOsc1.disconnect();
        droneOsc2.disconnect();
      } catch (e) {}
    }
  };
}

// 2. Melodic Hindu Rituals & Vedic Chants (136.1Hz Cosmic Om Resonance + Brass Temple Bell Ghanti)
function startRitualSynth(ctx: AudioContext, masterGain: GainNode) {
  // Sacred Om fundamental frequency (136.1 Hz Earth year / Om frequency)
  const omOsc = ctx.createOscillator();
  const omHarmonic = ctx.createOscillator();
  const omGain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  omOsc.type = 'sine';
  omOsc.frequency.setValueAtTime(136.1, ctx.currentTime);
  omHarmonic.type = 'sine';
  omHarmonic.frequency.setValueAtTime(272.2, ctx.currentTime); // 1st octave harmonic

  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(500, ctx.currentTime);

  omGain.gain.setValueAtTime(0.15, ctx.currentTime);

  omOsc.connect(filter);
  omHarmonic.connect(filter);
  filter.connect(omGain);
  omGain.connect(masterGain);

  omOsc.start();
  omHarmonic.start();

  // Temple Brass Bell (Ghanti) Chime generator (Pure resonance bell frequencies)
  const bellFrequencies = [1046.5, 1318.5, 1567.98, 2093.0]; // C6, E6, G6, C7
  const ringTempleBell = () => {
    if (!isPlaying || currentSoundType !== 'rituals') return;
    const now = ctx.currentTime;
    const bellFreq = bellFrequencies[Math.floor(Math.random() * bellFrequencies.length)];

    const bellOsc = ctx.createOscillator();
    const bellOvertone = ctx.createOscillator();
    const bellGain = ctx.createGain();

    bellOsc.type = 'sine';
    bellOsc.frequency.setValueAtTime(bellFreq, now);

    bellOvertone.type = 'sine';
    bellOvertone.frequency.setValueAtTime(bellFreq * 2.76, now); // Metallic chime ratio

    bellGain.gain.setValueAtTime(0.0001, now);
    bellGain.gain.linearRampToValueAtTime(0.12, now + 0.02);
    bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 4.0);

    bellOsc.connect(bellGain);
    bellOvertone.connect(bellGain);
    bellGain.connect(masterGain);

    bellOsc.start(now);
    bellOvertone.start(now);
    bellOsc.stop(now + 4.2);
    bellOvertone.stop(now + 4.2);
  };

  ringTempleBell();
  const timer = window.setInterval(ringTempleBell, 4500);
  ambientIntervalId = timer as unknown as number;

  return {
    stop: () => {
      try {
        omOsc.stop();
        omHarmonic.stop();
        omOsc.disconnect();
        omHarmonic.disconnect();
      } catch (e) {}
    }
  };
}

// 3. Instrumental Calm Tune (Acoustic strings & Rhodes chords)
function startInstrumentalSynth(ctx: AudioContext, masterGain: GainNode) {
  // Soothing chord progressions (Cmaj9 -> Am9 -> Fmaj7 -> Gsus4)
  const chords = [
    [261.63, 329.63, 392.00, 493.88], // Cmaj7
    [220.00, 261.63, 329.63, 392.00], // Am7
    [174.61, 220.00, 261.63, 329.63], // Fmaj7
    [196.00, 246.94, 293.66, 392.00], // G
  ];
  let chordIndex = 0;

  const playChord = () => {
    if (!isPlaying || currentSoundType !== 'instrumental') return;
    const now = ctx.currentTime;
    const currentChord = chords[chordIndex % chords.length];
    chordIndex++;

    currentChord.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.08);

      gain.gain.setValueAtTime(0.0001, now + i * 0.08);
      gain.gain.linearRampToValueAtTime(0.05, now + i * 0.08 + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.5);

      osc.connect(gain);
      gain.connect(masterGain);

      osc.start(now + i * 0.08);
      osc.stop(now + 4.8);
    });
  };

  playChord();
  const timer = window.setInterval(playChord, 5000);
  ambientIntervalId = timer as unknown as number;

  return {
    stop: () => {}
  };
}

// 4. Play Ambient Sound
let activeSynthCleanup: (() => void) | null = null;

export function playAmbientSound(type: AmbientSoundType, volume: number = 0.25) {
  stopAmbientSound();
  if (type === 'none') return;

  const ctx = getAudioContext();
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(volume, ctx.currentTime);
  gain.connect(ctx.destination);
  activeGainNode = gain;
  isPlaying = true;
  currentSoundType = type;

  if (type === 'flute') {
    const handle = startFluteSynth(ctx, gain);
    activeSynthCleanup = handle.stop;
  } else if (type === 'rituals') {
    const handle = startRitualSynth(ctx, gain);
    activeSynthCleanup = handle.stop;
  } else if (type === 'instrumental') {
    const handle = startInstrumentalSynth(ctx, gain);
    activeSynthCleanup = handle.stop;
  } else if (type === 'rain' || type === 'waves' || type === 'forest' || type === 'whitenoise') {
    // Generate pink or brown noise for natural elements
    const bufferSize = 2 * ctx.sampleRate;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      if (type === 'whitenoise') {
        output[i] = white * 0.15;
      } else if (type === 'rain' || type === 'forest') {
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
        b6 = white * 0.115926;
      } else {
        b0 = (b0 + 0.02 * white) / 1.02;
        output[i] = b0 * 0.5;
      }
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    const filter = ctx.createBiquadFilter();
    if (type === 'rain') {
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1000, ctx.currentTime);
    } else if (type === 'forest') {
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(800, ctx.currentTime);
    } else if (type === 'waves') {
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, ctx.currentTime);
    } else {
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2500, ctx.currentTime);
    }

    noiseSource.connect(filter);
    filter.connect(gain);
    noiseSource.start();
    activeSourceNode = noiseSource;
  }
}

// 5. Custom Audio Upload Player (Device File)
export function playCustomAudio(dataUrlOrBlobUrl: string, trackName: string = 'Custom Audio', volume: number = 0.5) {
  stopAmbientSound();

  if (!customAudioEl) {
    customAudioEl = new Audio();
  }

  customAudioEl.src = dataUrlOrBlobUrl;
  customAudioEl.volume = Math.max(0, Math.min(1, volume));
  customAudioEl.loop = true;
  customAudioTrackName = trackName;

  customAudioEl.play().catch((err) => {
    console.warn('Playback prevented or requires user gesture:', err);
  });

  isPlaying = true;
  currentSoundType = 'custom';
}

export function pauseCustomAudio() {
  if (customAudioEl) {
    customAudioEl.pause();
  }
  isPlaying = false;
  currentSoundType = 'none';
}

export function stopAmbientSound() {
  if (ambientIntervalId !== null) {
    clearInterval(ambientIntervalId);
    ambientIntervalId = null;
  }

  if (activeSynthCleanup) {
    try {
      activeSynthCleanup();
    } catch (e) {}
    activeSynthCleanup = null;
  }

  if (activeSourceNode) {
    try {
      (activeSourceNode as AudioScheduledSourceNode).stop();
      activeSourceNode.disconnect();
    } catch (e) {}
    activeSourceNode = null;
  }

  if (activeGainNode) {
    try {
      activeGainNode.disconnect();
    } catch (e) {}
    activeGainNode = null;
  }

  if (customAudioEl) {
    try {
      customAudioEl.pause();
    } catch (e) {}
  }

  isPlaying = false;
  currentSoundType = 'none';
}

export function setAmbientVolume(vol: number) {
  const safeVol = Math.max(0, Math.min(1, vol));
  if (activeGainNode && audioCtx) {
    activeGainNode.gain.setValueAtTime(safeVol, audioCtx.currentTime);
  }
  if (customAudioEl) {
    customAudioEl.volume = safeVol;
  }
}

export function getAmbientStatus(): { isPlaying: boolean; currentSoundType: AmbientSoundType; trackName?: string } {
  return {
    isPlaying,
    currentSoundType,
    trackName: currentSoundType === 'custom' ? customAudioTrackName : undefined,
  };
}

// Satisfying Pentatonic Major Chime on Task Checkoff
export function playTaskCompleteSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
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
  } catch (e) {
    // Graceful fallback
  }
}
