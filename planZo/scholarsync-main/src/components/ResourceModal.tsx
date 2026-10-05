import React from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Play,
  BookOpen,
  ExternalLink,
  Clock,
  Sparkles,
  Wind,
} from 'lucide-react';

export const ResourceModal: React.FC = () => {
  const {
    selectedResourceForModal,
    setSelectedResourceForModal,
    startZenMode,
  } = useApp();

  if (!selectedResourceForModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/50 backdrop-blur-xs p-4">
      <div className="max-w-md w-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl p-5 space-y-4">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-red-100 dark:bg-red-950/60 text-red-600 flex items-center justify-center">
              <Play className="w-3.5 h-3.5 fill-current" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-900 dark:text-stone-100">
                Curated High-Yield Resource
              </span>
            </div>
          </div>

          <button
            onClick={() => setSelectedResourceForModal(null)}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Resource Details */}
        <div className="space-y-2">
          <h3 className="text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100 leading-snug">
            {selectedResourceForModal.title}
          </h3>

          <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
            <span className="font-medium text-stone-700 dark:text-stone-300">
              Instructor: {selectedResourceForModal.creatorOrAuthor}
            </span>
            {selectedResourceForModal.durationOrPages && (
              <>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1 font-mono">
                  <Clock className="w-3 h-3 text-stone-400" />
                  {selectedResourceForModal.durationOrPages}
                </span>
              </>
            )}
          </div>

          {selectedResourceForModal.description && (
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed pt-1">
              {selectedResourceForModal.description}
            </p>
          )}
        </div>

        {/* Actions: Watch on YouTube & Open in Zen Focus */}
        <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-end gap-2">
          <a
            href={selectedResourceForModal.url}
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-2 rounded-xl text-xs font-medium text-stone-700 dark:text-stone-200 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors flex items-center gap-1.5"
          >
            <span>Open Lecture</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={() => {
              setSelectedResourceForModal(null);
              startZenMode();
            }}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-teal-800 text-stone-100 hover:bg-teal-700 dark:bg-teal-700 dark:hover:bg-teal-600 transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Wind className="w-3.5 h-3.5 text-teal-300" />
            <span>Launch Zen Focus</span>
          </button>
        </div>

      </div>
    </div>
  );
};
