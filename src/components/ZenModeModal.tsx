import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  CheckCircle2,
  CloudRain,
  Radio,
  Trees,
  Waves,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import {
  playAmbientSound,
  stopAmbientSound,
  setAmbientVolume,
  getAmbientStatus,
  playTaskCompleteSound,
} from '../utils/audioSynth';
import { fireConfetti } from '../utils/audioVibes';

export const ZenModeModal: React.FC = () => {
  const {
    zenModeOpen,
    setZenModeOpen,
    activeZenTask,
    toggleItemComplete,
  } = useApp();

  // Timer states
  const [durationMinutes, setDurationMinutes] = useState(25);
  const [secondsRemaining, setSecondsRemaining] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  // Ambient sound states
  const [ambientSound, setAmbientSound] = useState<'rain' | 'whitenoise' | 'forest' | 'waves' | 'none'>('none');
  const [soundVolume, setSoundVolume] = useState(0.3);
  const [isMuted, setIsMuted] = useState(false);

  // Scratchpad notes
  const [scratchpad, setScratchpad] = useState('');

  // Sync timer when duration changes
  useEffect(() => {
    setSecondsRemaining(durationMinutes * 60);
    setIsRunning(false);
  }, [durationMinutes]);

  // Timer countdown tick
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && secondsRemaining > 0) {
      timer = setInterval(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
    } else if (secondsRemaining === 0 && isRunning) {
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, secondsRemaining]);

  // Clean up sound on unmount or close
  useEffect(() => {
    if (!zenModeOpen) {
      stopAmbientSound();
      setAmbientSound('none');
      setIsRunning(false);
    }
  }, [zenModeOpen]);

  if (!zenModeOpen) return null;

  const handleSoundToggle = (type: 'rain' | 'whitenoise' | 'forest' | 'waves') => {
    if (ambientSound === type) {
      stopAmbientSound();
      setAmbientSound('none');
    } else {
      playAmbientSound(type, soundVolume);
      setAmbientSound(type);
      setIsMuted(false);
    }
  };

  const handleVolumeChange = (vol: number) => {
    setSoundVolume(vol);
    setAmbientVolume(vol);
    if (vol === 0) setIsMuted(true);
    else setIsMuted(false);
  };

  const handleCompleteActiveTask = () => {
    if (activeZenTask) {
      toggleItemComplete(activeZenTask.id);
      playTaskCompleteSound();
      fireConfetti(70);
    }
    setZenModeOpen(false);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/95 text-stone-100 backdrop-blur-xl transition-all p-4 sm:p-6">
      
      {/* Top Controls: Close button & Zen Indicator */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
        <div className="flex items-center gap-2 text-stone-400 text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono uppercase tracking-widest text-[11px]">Zen Focus Chamber</span>
        </div>

        <button
          onClick={() => setZenModeOpen(false)}
          className="p-2 rounded-xl text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
          aria-label="Exit Zen Mode"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Focus Container */}
      <div className="max-w-xl w-full mx-auto flex flex-col items-center text-center space-y-8">
        
        {/* Active Task Information */}
        <div className="space-y-2">
          <div className="text-xs uppercase font-mono tracking-wider text-teal-400">
            Current Single-Task Focus
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100 tracking-tight max-w-lg">
            {activeZenTask?.title || 'Deep Academic Focus Sprint'}
          </h2>
          {activeZenTask?.topic && (
            <p className="text-sm text-stone-400 max-w-md mx-auto">
              Topic: <span className="text-stone-200">{activeZenTask.topic}</span>
            </p>
          )}

          {/* Quick link to associated YouTube video / notes if any */}
          {activeZenTask?.resource && (
            <a
              href={activeZenTask.resource.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-teal-300 hover:text-teal-100 underline underline-offset-4 pt-1"
            >
              <span>Watch lecture video: {activeZenTask.resource.title}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>

        {/* Minimalist Circular / Digit Timer */}
        <div className="flex flex-col items-center space-y-4">
          <div className="font-mono text-6xl sm:text-7xl font-extralight tracking-tighter text-stone-100">
            {formatTime(secondsRemaining)}
          </div>

          {/* Timer Mode Selectors: 25m Pomodoro, 50m Flow, 15m Sprint */}
          <div className="flex items-center gap-2 p-1 rounded-xl bg-stone-900 border border-stone-800 text-xs">
            <button
              onClick={() => setDurationMinutes(15)}
              className={`px-3 py-1 rounded-lg transition-colors ${
                durationMinutes === 15 ? 'bg-stone-800 text-teal-300 font-semibold' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              15m Sprint
            </button>
            <button
              onClick={() => setDurationMinutes(25)}
              className={`px-3 py-1 rounded-lg transition-colors ${
                durationMinutes === 25 ? 'bg-stone-800 text-teal-300 font-semibold' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              25m Focus
            </button>
            <button
              onClick={() => setDurationMinutes(50)}
              className={`px-3 py-1 rounded-lg transition-colors ${
                durationMinutes === 50 ? 'bg-stone-800 text-teal-300 font-semibold' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              50m Deep Flow
            </button>
          </div>

          {/* Timer Play / Pause / Reset Controls */}
          <div className="flex items-center gap-4 pt-2">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="w-14 h-14 rounded-full bg-stone-100 text-stone-900 hover:bg-white flex items-center justify-center shadow-lg transition-transform active:scale-95"
              aria-label={isRunning ? 'Pause Timer' : 'Start Timer'}
            >
              {isRunning ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-0.5" />}
            </button>

            <button
              onClick={() => {
                setIsRunning(false);
                setSecondsRemaining(durationMinutes * 60);
              }}
              className="p-3 rounded-full bg-stone-900 text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition-colors"
              title="Reset Timer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Ambient Sound Generators (Direct Web Audio synth) */}
        <div className="space-y-2 w-full max-w-sm">
          <div className="text-[11px] uppercase font-mono tracking-wider text-stone-400">
            Calming Ambient Soundscape
          </div>

          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => handleSoundToggle('rain')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs transition-colors border ${
                ambientSound === 'rain'
                  ? 'border-teal-500 bg-teal-950 text-teal-200'
                  : 'border-stone-800 bg-stone-900 text-stone-400 hover:text-stone-200'
              }`}
            >
              <CloudRain className="w-3.5 h-3.5" />
              <span>Rain</span>
            </button>

            <button
              onClick={() => handleSoundToggle('whitenoise')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs transition-colors border ${
                ambientSound === 'whitenoise'
                  ? 'border-teal-500 bg-teal-950 text-teal-200'
                  : 'border-stone-800 bg-stone-900 text-stone-400 hover:text-stone-200'
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              <span>White Noise</span>
            </button>

            <button
              onClick={() => handleSoundToggle('waves')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs transition-colors border ${
                ambientSound === 'waves'
                  ? 'border-teal-500 bg-teal-950 text-teal-200'
                  : 'border-stone-800 bg-stone-900 text-stone-400 hover:text-stone-200'
              }`}
            >
              <Waves className="w-3.5 h-3.5" />
              <span>Waves</span>
            </button>

            <button
              onClick={() => handleSoundToggle('forest')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs transition-colors border ${
                ambientSound === 'forest'
                  ? 'border-teal-500 bg-teal-950 text-teal-200'
                  : 'border-stone-800 bg-stone-900 text-stone-400 hover:text-stone-200'
              }`}
            >
              <Trees className="w-3.5 h-3.5" />
              <span>Breeze</span>
            </button>
          </div>

          {/* Volume Slider if audio is playing */}
          {ambientSound !== 'none' && (
            <div className="flex items-center justify-center gap-3 pt-2 text-stone-400 text-xs">
              <Volume2 className="w-3.5 h-3.5" />
              <input
                type="range"
                min="0"
                max="0.8"
                step="0.05"
                value={soundVolume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-32 accent-teal-400 cursor-pointer"
              />
            </div>
          )}
        </div>

        {/* Scratchpad & Task Completion */}
        <div className="w-full max-w-sm space-y-3">
          <textarea
            value={scratchpad}
            onChange={(e) => setScratchpad(e.target.value)}
            placeholder="Quick scratchpad: formulas, quick thoughts, or questions to ask the professor..."
            rows={2}
            className="w-full rounded-xl bg-stone-900/80 border border-stone-800 text-xs p-3 text-stone-200 placeholder-stone-500 focus:outline-hidden focus:border-teal-500 resize-none"
          />

          <button
            onClick={handleCompleteActiveTask}
            className="w-full py-2.5 rounded-xl bg-teal-700 hover:bg-teal-600 text-stone-100 text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Complete Task & Bloom Focus Garden</span>
          </button>
        </div>

      </div>

    </div>
  );
};
