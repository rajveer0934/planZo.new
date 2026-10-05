import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Upload,
  Music,
  Sparkles,
  Headphones,
  Check,
} from 'lucide-react';
import {
  playAmbientSound,
  stopAmbientSound,
  setAmbientVolume,
  getAmbientStatus,
  AmbientSoundType,
} from '../utils/audioSynth';

interface LofiAudioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LofiAudioModal: React.FC<LofiAudioModalProps> = ({ isOpen, onClose }) => {
  const [activeType, setActiveType] = useState<AmbientSoundType | 'custom'>('none');
  const [volume, setVolume] = useState(0.25);
  const [customAudioName, setCustomAudioName] = useState<string | null>(null);
  const [customAudioUrl, setCustomAudioUrl] = useState<string | null>(null);
  const [isCustomPlaying, setIsCustomPlaying] = useState(false);

  const customAudioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync initial state
  useEffect(() => {
    if (isOpen) {
      const status = getAmbientStatus();
      if (status.isPlaying) {
        setActiveType(status.currentSoundType);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelectPreset = (type: AmbientSoundType) => {
    // Stop custom audio if playing
    if (customAudioRef.current) {
      customAudioRef.current.pause();
      setIsCustomPlaying(false);
    }

    if (activeType === type) {
      stopAmbientSound();
      setActiveType('none');
    } else {
      playAmbientSound(type, volume);
      setActiveType(type);
    }
  };

  const handleVolumeChange = (v: number) => {
    setVolume(v);
    setAmbientVolume(v);
    if (customAudioRef.current) {
      customAudioRef.current.volume = v;
    }
  };

  const handleCustomAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      stopAmbientSound();
      const url = URL.createObjectURL(file);
      setCustomAudioUrl(url);
      setCustomAudioName(file.name);
      setActiveType('custom');
      setIsCustomPlaying(true);

      if (customAudioRef.current) {
        customAudioRef.current.src = url;
        customAudioRef.current.volume = volume;
        customAudioRef.current.play();
      }
    }
  };

  const toggleCustomAudio = () => {
    if (!customAudioRef.current) return;
    if (isCustomPlaying) {
      customAudioRef.current.pause();
      setIsCustomPlaying(false);
      setActiveType('none');
    } else {
      stopAmbientSound();
      customAudioRef.current.play();
      setIsCustomPlaying(true);
      setActiveType('custom');
    }
  };

  const soundPresets: {
    id: AmbientSoundType;
    title: string;
    description: string;
    badge: string;
    icon: string;
  }[] = [
    {
      id: 'flute',
      title: 'Divine Bamboo Flute (Bansuri)',
      description: 'Meditative Raag Yaman acoustic flute with warm breathing drone.',
      badge: 'Calm Focus',
      icon: '🪈',
    },
    {
      id: 'rituals',
      title: 'Sacred Hindu Rituals & Temple Chimes',
      description: '136.1Hz Cosmic Om fundamental drone with periodic bronze temple bells & tanpura.',
      badge: 'Spiritual Calm',
      icon: '🪕',
    },
    {
      id: 'instrumental',
      title: 'Calm Neo-Classical Instrumental',
      description: 'Harmonious Fmaj7 & Cmaj7 soothing piano synth ambient chords.',
      badge: 'Study Flow',
      icon: '🎹',
    },
    {
      id: 'rain',
      title: 'Gentle Monsoon Rain',
      description: 'Relaxing Indian monsoon rain filter for intense programming & reading.',
      badge: 'Ambient White Noise',
      icon: '🌧️',
    },
    {
      id: 'waves',
      title: 'Ocean Flow Waves',
      description: 'Soothing rhythmic ocean tide wash to dissolve exam stress.',
      badge: 'Deep Relaxation',
      icon: '🌊',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-fadeIn">
      {/* Hidden audio element for custom uploaded music */}
      <audio
        ref={customAudioRef}
        loop
        onEnded={() => setIsCustomPlaying(false)}
      />

      <div className="bg-white dark:bg-[#0c1017] border border-stone-200 dark:border-stone-800 rounded-3xl p-5 sm:p-6 w-full max-w-lg shadow-2xl space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex items-center justify-center shadow-sm">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <span>Focus Beats & Meditative Audio</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold">
                  B.Tech Edition
                </span>
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Flute, Hindu temple chants, ambient rain or your own device audio.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Presets List */}
        <div className="space-y-2.5 max-h-[46vh] overflow-y-auto pr-1">
          {soundPresets.map((preset) => {
            const isCurrent = activeType === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset.id)}
                className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                  isCurrent
                    ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 shadow-xs'
                    : 'border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-[#0e141f] hover:border-emerald-400/50'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-2xl shrink-0">{preset.icon}</span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-stone-900 dark:text-stone-100 truncate">
                        {preset.title}
                      </span>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-stone-200/80 dark:bg-stone-800 text-stone-600 dark:text-stone-300 shrink-0">
                        {preset.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400 truncate mt-0.5">
                      {preset.description}
                    </p>
                  </div>
                </div>

                <div className="shrink-0">
                  {isCurrent ? (
                    <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold bg-emerald-100 dark:bg-emerald-900/60 px-2 py-1 rounded-xl">
                      <div className="flex items-center gap-0.5">
                        <span className="w-0.5 h-3 bg-current animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-0.5 h-2 bg-current animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-0.5 h-3 bg-current animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                      <span>Active</span>
                    </div>
                  ) : (
                    <Play className="w-4 h-4 text-stone-400 group-hover:text-emerald-500" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Upload Custom Audio from Device */}
        <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-[#0e141f] border border-dashed border-stone-300 dark:border-stone-700 space-y-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleCustomAudioUpload}
            accept="audio/*"
            className="hidden"
          />

          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 flex items-center justify-center shrink-0">
                <Upload className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-stone-900 dark:text-stone-100 truncate">
                  {customAudioName ? `Device Track: ${customAudioName}` : 'Play Any Audio from Device'}
                </div>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 truncate">
                  Select your favorite study songs, chants, or podcasts (MP3, WAV, M4A).
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {customAudioName && (
                <button
                  onClick={toggleCustomAudio}
                  className="px-2.5 py-1 rounded-xl bg-emerald-600 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
                >
                  {isCustomPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isCustomPlaying ? 'Pause' : 'Play'}</span>
                </button>
              )}

              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-2.5 py-1.5 rounded-xl border border-stone-300 dark:border-stone-700 hover:bg-stone-200/60 dark:hover:bg-stone-800 text-xs font-semibold text-stone-700 dark:text-stone-300 transition-colors cursor-pointer"
              >
                {customAudioName ? 'Change File' : 'Choose Audio'}
              </button>
            </div>
          </div>
        </div>

        {/* Volume & Stop Controls */}
        <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-1">
            <Volume2 className="w-4 h-4 text-stone-400 shrink-0" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => handleVolumeChange(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <span className="text-xs font-mono font-medium text-stone-400 w-8 text-right">
              {Math.round(volume * 100)}%
            </span>
          </div>

          {activeType !== 'none' && (
            <button
              onClick={() => {
                stopAmbientSound();
                if (customAudioRef.current) {
                  customAudioRef.current.pause();
                  setIsCustomPlaying(false);
                }
                setActiveType('none');
              }}
              className="px-3 py-1.5 rounded-xl bg-stone-200 dark:bg-stone-800 hover:bg-rose-100 dark:hover:bg-rose-950/60 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:text-rose-600 transition-colors cursor-pointer"
            >
              Stop Sound
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
