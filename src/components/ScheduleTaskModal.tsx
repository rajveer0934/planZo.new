import React, { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  BookOpen,
  Sparkles,
  Flame,
  Check,
  Zap,
  Coffee,
  Laptop,
  Layers,
  ChevronDown,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ItemCategory } from '../types';

interface ScheduleTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDate?: string;
}

const SMART_STUDY_SUGGESTIONS = [
  { title: 'DSA: Binary Search Trees & AVL Traversals', category: 'study' as ItemCategory, duration: 60 },
  { title: 'Operating Systems: Process Sync & Semaphores', category: 'lecture' as ItemCategory, duration: 45 },
  { title: 'Database Systems: SQL Normalization & Joins', category: 'study' as ItemCategory, duration: 60 },
  { title: 'Web Development Lab: React Component Architecture', category: 'lab' as ItemCategory, duration: 90 },
  { title: 'Computer Networks Assignment: TCP Handshake Analysis', category: 'study' as ItemCategory, duration: 45 },
  { title: 'LeetCode Daily: Two Pointer & Sliding Window', category: 'study' as ItemCategory, duration: 45 },
  { title: 'GATE / Campus Placement Core Quiz', category: 'study' as ItemCategory, duration: 30 },
  { title: 'Post-Lecture Chai & Mental Reset', category: 'chill' as ItemCategory, duration: 25 },
];

export const ScheduleTaskModal: React.FC<ScheduleTaskModalProps> = ({
  isOpen,
  onClose,
  defaultDate,
}) => {
  const { subjects, scheduleStudyBlock } = useApp();

  const todayStr = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(defaultDate || todayStr);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ItemCategory>('study');
  const [startTime, setStartTime] = useState('16:00');
  const [endTime, setEndTime] = useState('17:00');
  const [subjectId, setSubjectId] = useState(subjects[0]?.id || '');
  const [cognitiveWeight, setCognitiveWeight] = useState(3);
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleApplySuggestion = (sug: typeof SMART_STUDY_SUGGESTIONS[0]) => {
    setTitle(sug.title);
    setCategory(sug.category);
    // calculate end time based on start time + duration
    const [h, m] = startTime.split(':').map(Number);
    const endMinutes = h * 60 + m + sug.duration;
    const endH = Math.floor(endMinutes / 60) % 24;
    const endM = endMinutes % 60;
    setEndTime(`${endH.toString().padStart(2, '0')}:${endM.toString().padStart(2, '0')}`);
  };

  const setQuickDuration = (minutes: number) => {
    const [h, m] = startTime.split(':').map(Number);
    const endMinutes = h * 60 + m + minutes;
    const endH = Math.floor(endMinutes / 60) % 24;
    const endM = endMinutes % 60;
    setEndTime(`${endH.toString().padStart(2, '0')}:${endM.toString().padStart(2, '0')}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    scheduleStudyBlock({
      title: title.trim(),
      category,
      startTime,
      endTime,
      date,
      subjectId: subjectId || undefined,
      cognitiveWeight,
      notes: notes.trim() || undefined,
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 600);
  };

  const categories: { id: ItemCategory; label: string; icon: string; color: string }[] = [
    { id: 'study', label: 'Deep Study', icon: '🔥', color: 'border-emerald-500/50 text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40' },
    { id: 'lecture', label: 'Theory Lecture', icon: '📖', color: 'border-sky-500/50 text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/40' },
    { id: 'lab', label: 'College Lab', icon: '💻', color: 'border-indigo-500/50 text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/40' },
    { id: 'habit', label: 'Daily Habit', icon: '⚡', color: 'border-teal-500/50 text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/40' },
    { id: 'chill', label: 'Buffer / Break', icon: '☕', color: 'border-amber-500/50 text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-white dark:bg-[#0d131f] border border-stone-200/90 dark:border-stone-800 rounded-3xl p-5 sm:p-6 w-full max-w-lg shadow-2xl space-y-5 max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20 shadow-xs">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <span>Schedule Study Block</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                  Focus Quest
                </span>
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Lock in focused study sessions, lectures, or assignments with zero guilt.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="space-y-1.5">
          <div className="text-[11px] font-mono uppercase font-bold tracking-wider text-stone-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Fast Suggestions (Tap to fill)</span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none">
            {SMART_STUDY_SUGGESTIONS.map((sug, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleApplySuggestion(sug)}
                className="px-2.5 py-1 rounded-xl bg-stone-100 dark:bg-stone-850 hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 border border-stone-200/80 dark:border-stone-800 text-[11px] font-medium whitespace-nowrap transition-colors cursor-pointer"
              >
                {sug.title.split(':')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* Title */}
          <div className="space-y-1.5">
            <label className="font-semibold text-stone-700 dark:text-stone-300 flex items-center justify-between">
              <span>Task / Study Block Title</span>
              <span className="text-[10px] font-mono text-stone-400">Required</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. DSA: Binary Search Trees & LeetCode medium"
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50/70 dark:bg-stone-900/60 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 font-medium transition-all"
            />
          </div>

          {/* Category Pills */}
          <div className="space-y-1.5">
            <label className="font-semibold text-stone-700 dark:text-stone-300">
              Block Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={`p-2 rounded-xl border flex items-center gap-2 text-xs font-semibold transition-all cursor-pointer ${
                    category === cat.id
                      ? `${cat.color} ring-2 ring-emerald-500/40 shadow-xs font-bold`
                      : 'border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/30 text-stone-600 dark:text-stone-400 hover:border-stone-300'
                  }`}
                >
                  <span className="text-sm">{cat.icon}</span>
                  <span className="truncate">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Date & Course Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="font-semibold text-stone-700 dark:text-stone-300 flex items-center justify-between">
                <span>Date</span>
                <button
                  type="button"
                  onClick={() => setDate(todayStr)}
                  className="text-[10px] text-emerald-600 dark:text-emerald-400 hover:underline font-mono"
                >
                  Set to Today
                </button>
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50/70 dark:bg-stone-900/60 text-stone-900 dark:text-stone-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 font-mono transition-all cursor-pointer"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-stone-700 dark:text-stone-300">
                Related Course / Subject
              </label>
              <select
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50/70 dark:bg-stone-900/60 text-stone-900 dark:text-stone-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 font-medium transition-all truncate cursor-pointer"
              >
                <option value="">General / Self-Grind</option>
                {subjects.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name} ({sub.code})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Time Slots & Quick Duration buttons */}
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="font-semibold text-stone-700 dark:text-stone-300">
                  Start Time
                </label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50/70 dark:bg-stone-900/60 text-stone-900 dark:text-stone-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 font-mono transition-all cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-stone-700 dark:text-stone-300">
                  End Time
                </label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50/70 dark:bg-stone-900/60 text-stone-900 dark:text-stone-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 font-mono transition-all cursor-pointer"
                />
              </div>
            </div>

            {/* Quick Duration Buttons */}
            <div className="flex items-center gap-1.5 pt-0.5">
              <span className="text-[10px] text-stone-400 font-mono">Quick:</span>
              {[25, 45, 60, 90, 120].map((dur) => (
                <button
                  key={dur}
                  type="button"
                  onClick={() => setQuickDuration(dur)}
                  className="px-2 py-0.5 rounded-lg bg-stone-100 dark:bg-stone-850 hover:bg-stone-200 dark:hover:bg-stone-800 text-[10px] font-mono font-semibold text-stone-600 dark:text-stone-300 transition-colors cursor-pointer"
                >
                  +{dur}m
                </button>
              ))}
            </div>
          </div>

          {/* Cognitive Weight Intensity */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-stone-700 dark:text-stone-300">
                Cognitive Intensity Weight
              </label>
              <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                {cognitiveWeight === 1 ? '1 - Light Reading' : cognitiveWeight <= 3 ? `${cognitiveWeight} - Moderate Focus` : `${cognitiveWeight} - Brain-Burner Intensive 🔥`}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={cognitiveWeight}
              onChange={(e) => setCognitiveWeight(parseInt(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-stone-200 dark:bg-stone-800 rounded-lg"
            />
          </div>

          {/* Notes */}
          <div className="space-y-1.5">
            <label className="font-semibold text-stone-700 dark:text-stone-300 flex items-center justify-between">
              <span>Goal / Target Deliverable</span>
              <span className="text-[10px] text-stone-400">Optional</span>
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Solve at least 3 LeetCode problems or complete Lab diagram"
              className="w-full px-3.5 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50/70 dark:bg-stone-900/60 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 text-xs transition-all"
            />
          </div>

          {/* Submit */}
          <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 text-xs font-semibold transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 shadow-xs cursor-pointer"
            >
              {isSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Scheduled!</span>
                </>
              ) : (
                <>
                  <Calendar className="w-4 h-4" />
                  <span>Schedule Study Block</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
