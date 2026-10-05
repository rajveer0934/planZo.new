import React from 'react';
import { useApp } from '../context/AppContext';
import { Shield, Sparkles, Coffee, AlertCircle, Heart } from 'lucide-react';

export const MentalBandwidthMeter: React.FC = () => {
  const { bandwidth, injectBufferZone, recalibrateSchedule, isRecalibrating } = useApp();

  const getMeterColor = () => {
    if (bandwidth.densityScore <= 35) return 'from-emerald-500 to-teal-600';
    if (bandwidth.densityScore <= 65) return 'from-teal-600 to-sky-600';
    if (bandwidth.densityScore <= 80) return 'from-amber-500 to-orange-500';
    return 'from-rose-500 to-red-600';
  };

  const getStatusText = () => {
    switch (bandwidth.status) {
      case 'calm':
        return 'Cognitive Load: Light & Restorative';
      case 'balanced':
        return 'Cognitive Load: Balanced Flow';
      case 'dense':
        return 'Cognitive Load: Elevated Density';
      case 'overload':
        return 'Cognitive Load: High Burnout Risk';
    }
  };

  return (
    <div className="rounded-2xl border border-stone-200/90 dark:border-stone-800 bg-white/70 dark:bg-stone-900/60 p-5 shadow-xs backdrop-blur-xs transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Left: Score & Visual Meter */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-teal-700 dark:text-teal-400" />
              <span className="text-xs font-semibold text-stone-900 dark:text-stone-100 uppercase tracking-wider">
                Mental Bandwidth Meter
              </span>
            </div>
            <span className="text-xs font-medium text-stone-500 dark:text-stone-400">
              {bandwidth.densityScore}% Density
            </span>
          </div>

          {/* Smooth Gradient Fill Bar */}
          <div className="h-2.5 w-full bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden p-0.5">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${getMeterColor()} transition-all duration-700 ease-out`}
              style={{ width: `${bandwidth.densityScore}%` }}
            />
          </div>

          {/* Calming contextual guidance */}
          <div className="mt-2.5 flex items-start gap-2 text-xs text-stone-600 dark:text-stone-300">
            {bandwidth.status === 'overload' ? (
              <AlertCircle className="w-3.5 h-3.5 text-rose-500 mt-0.5 shrink-0" />
            ) : (
              <Heart className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 mt-0.5 shrink-0" />
            )}
            <p className="leading-relaxed">
              <span className="font-semibold text-stone-800 dark:text-stone-200">{getStatusText()}: </span>
              {bandwidth.recommendation}
            </p>
          </div>
        </div>

        {/* Right: Quick Buffer / Recalibrate Actions */}
        <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100 dark:border-stone-800">
          <button
            onClick={() => injectBufferZone()}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-200 hover:bg-teal-100/80 transition-colors border border-teal-200/50 dark:border-teal-800/50"
            title="Inject a calm 25-minute buffer zone into your schedule"
          >
            <Coffee className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span>+ Chill Block</span>
          </button>

          <button
            onClick={() => recalibrateSchedule()}
            disabled={isRecalibrating}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200/70 transition-colors border border-stone-200/70 dark:border-stone-700"
            title="Intelligently auto-adjust remaining tasks without guilt"
          >
            <Sparkles className={`w-3.5 h-3.5 ${isRecalibrating ? 'animate-spin text-teal-600' : 'text-stone-500'}`} />
            <span>{isRecalibrating ? 'Balancing...' : 'Auto-Recalibrate'}</span>
          </button>
        </div>

      </div>

      {/* Summary Metrics row */}
      <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800/80 flex flex-wrap items-center gap-4 text-xs text-stone-500 dark:text-stone-400">
        <div>
          <span>Deep Study: </span>
          <span className="font-medium text-stone-800 dark:text-stone-200">
            {Math.round(bandwidth.totalStudyMinutes / 60)} hrs
          </span>
        </div>
        <span>·</span>
        <div>
          <span>College Lab: </span>
          <span className="font-medium text-stone-800 dark:text-stone-200">
            {(bandwidth.totalLabMinutes / 60).toFixed(1)} hrs
          </span>
        </div>
        <span>·</span>
        <div>
          <span>Buffer Zones: </span>
          <span className="font-medium text-teal-700 dark:text-teal-400">
            {bandwidth.bufferMinutes} mins scheduled
          </span>
        </div>
      </div>
    </div>
  );
};
