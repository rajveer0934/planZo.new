import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TimetableItem } from '../types';
import {
  CheckCircle2,
  Circle,
  Clock,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Coffee,
  BookOpen,
  Laptop,
  Flame,
  Plus,
  X,
  Play,
  RotateCcw,
  CalendarPlus,
  Edit3,
  Check,
  Trash2,
} from 'lucide-react';
import { playTaskCompleteSound } from '../utils/audioSynth';
import { fireConfetti } from '../utils/audioVibes';
import { ScheduleTaskModal } from './ScheduleTaskModal';

export const DailyTimeline: React.FC = () => {
  const {
    timetable,
    setTimetable,
    toggleItemComplete,
    snoozeItem,
    shiftItemToEvening,
    recalibrateSchedule,
    isRecalibrating,
    recalibrateNotice,
    clearRecalibrateNotice,
    startZenMode,
    setSelectedResourceForModal,
  } = useApp();

  const [filter, setFilter] = useState<'all' | 'study' | 'habit' | 'chill'>('all');
  const [activeShiftMenuId, setActiveShiftMenuId] = useState<string | null>(null);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  // Inline editing state for tasks in DailyTimeline
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editCategory, setEditCategory] = useState<TimetableItem['category']>('study');
  const [editStartTime, setEditStartTime] = useState('');
  const [editEndTime, setEditEndTime] = useState('');
  const [editNotes, setEditNotes] = useState('');

  const handleStartEdit = (item: TimetableItem) => {
    setEditingItemId(item.id);
    setEditTitle(item.title);
    setEditCategory(item.category);
    setEditStartTime(item.startTime);
    setEditEndTime(item.endTime);
    setEditNotes(item.notes || '');
  };

  const handleSaveEdit = (itemId: string) => {
    if (!editTitle.trim()) return;
    setTimetable((prev) =>
      prev
        .map((t) =>
          t.id === itemId
            ? {
                ...t,
                title: editTitle.trim(),
                category: editCategory,
                startTime: editStartTime || t.startTime,
                endTime: editEndTime || t.endTime,
                notes: editNotes.trim() || undefined,
              }
            : t
        )
        .sort((a, b) => a.startTime.localeCompare(b.startTime))
    );
    setEditingItemId(null);
    playTaskCompleteSound();
  };

  const handleDeleteItem = (itemId: string) => {
    setTimetable((prev) => prev.filter((t) => t.id !== itemId));
    if (editingItemId === itemId) {
      setEditingItemId(null);
    }
  };

  const handleToggle = (item: TimetableItem) => {
    toggleItemComplete(item.id);
    if (!item.completed) {
      playTaskCompleteSound();
      fireConfetti(35);
    }
  };

  const filteredItems = timetable.filter((item) => {
    if (filter === 'all') return true;
    if (filter === 'study') return item.category === 'study' || item.category === 'lecture' || item.category === 'lab';
    if (filter === 'habit') return item.category === 'habit';
    if (filter === 'chill') return item.category === 'chill';
    return true;
  });

  const getCategoryMeta = (category: TimetableItem['category']) => {
    switch (category) {
      case 'lecture':
        return { label: 'Lecture', icon: BookOpen, color: 'text-sky-600 dark:text-sky-400' };
      case 'lab':
        return { label: 'College Lab', icon: Laptop, color: 'text-indigo-600 dark:text-indigo-400' };
      case 'study':
        return { label: 'Deep Study', icon: Flame, color: 'text-emerald-600 dark:text-emerald-400' };
      case 'habit':
        return { label: 'Daily Habit', icon: Sparkles, color: 'text-teal-600 dark:text-teal-400' };
      case 'chill':
        return { label: 'Buffer Zone', icon: Coffee, color: 'text-amber-600 dark:text-amber-400' };
      default:
        return { label: 'Task', icon: Clock, color: 'text-stone-600' };
    }
  };

  return (
    <div className="space-y-4">
      
      {/* Dynamic Auto-Correction Notice (Guilt-Free Reassurance) */}
      {recalibrateNotice && (
        <div className="rounded-xl border border-teal-200/80 bg-teal-50/90 dark:border-teal-900/60 dark:bg-teal-950/60 p-3.5 flex items-start justify-between gap-3 text-xs text-teal-900 dark:text-teal-100 transition-all">
          <div className="flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-teal-700 dark:text-teal-400 mt-0.5 shrink-0" />
            <div>
              <span className="font-semibold">Gentle Adjustment: </span>
              <span>{recalibrateNotice}</span>
            </div>
          </div>
          <button
            onClick={clearRecalibrateNotice}
            className="text-teal-700 dark:text-teal-400 hover:text-teal-900 dark:hover:text-teal-200 p-0.5"
            aria-label="Dismiss notice"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Control Bar: Interactive Tabs & Auto-Recalibration */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        
        {/* Interactive Segmented Controls for Filtering */}
        <div className="flex items-center gap-1 p-1 bg-stone-100 dark:bg-stone-800/80 rounded-xl w-fit">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              filter === 'all'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            Full Day ({timetable.length})
          </button>
          <button
            onClick={() => setFilter('study')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              filter === 'study'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            Academics
          </button>
          <button
            onClick={() => setFilter('habit')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              filter === 'habit'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            Habits
          </button>
          <button
            onClick={() => setFilter('chill')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              filter === 'chill'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            Buffer Zones
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Schedule Task Button */}
          <button
            onClick={() => setIsScheduleModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-stone-950 transition-colors shadow-2xs cursor-pointer"
          >
            <CalendarPlus className="w-3.5 h-3.5" />
            <span>+ Schedule Task</span>
          </button>

          {/* Global Recalibrate Button */}
          <button
            onClick={() => recalibrateSchedule()}
            disabled={isRecalibrating}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 border border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors cursor-pointer"
            title="Automatically adjust remaining day schedule without penalty"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isRecalibrating ? 'animate-spin' : ''}`} />
            <span>Auto-Recalibrate Day</span>
          </button>
        </div>

      </div>

      {/* Chronological List of Time Blocks */}
      <div className="space-y-3 pt-2">
        {filteredItems.map((item, index) => {
          const meta = getCategoryMeta(item.category);
          const Icon = meta.icon;

          if (editingItemId === item.id) {
            return (
              <div
                key={item.id}
                className="p-4 rounded-2xl border-2 border-teal-500 bg-teal-50/50 dark:bg-teal-950/40 space-y-3 shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-teal-800 dark:text-teal-200">
                    Edit Schedule Task
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleSaveEdit(item.id)}
                      className="px-2.5 py-1 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center gap-1 cursor-pointer shadow-xs transition-colors"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Save</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingItemId(null)}
                      className="px-2.5 py-1 rounded-lg bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 text-xs font-semibold cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteItem(item.id)}
                      className="p-1 rounded-lg text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-950/60 transition-colors cursor-pointer"
                      title="Delete task from schedule"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-stone-700 dark:text-stone-300">
                    Task / Activity Name
                  </label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs font-semibold text-stone-900 dark:text-stone-100 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div>
                    <label className="text-[10px] font-semibold text-stone-500 dark:text-stone-400 block mb-1">
                      Start Time
                    </label>
                    <input
                      type="time"
                      value={editStartTime}
                      onChange={(e) => setEditStartTime(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs font-mono font-semibold"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold text-stone-500 dark:text-stone-400 block mb-1">
                      End Time
                    </label>
                    <input
                      type="time"
                      value={editEndTime}
                      onChange={(e) => setEditEndTime(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs font-mono font-semibold"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold text-stone-500 dark:text-stone-400 block mb-1">
                      Category
                    </label>
                    <select
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value as any)}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs font-medium cursor-pointer"
                    >
                      <option value="study">Deep Study</option>
                      <option value="habit">Daily Habit</option>
                      <option value="lecture">Theory Lecture</option>
                      <option value="lab">College Lab</option>
                      <option value="chill">Buffer Zone</option>
                      <option value="assignment">Assignment</option>
                    </select>
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div
              key={item.id}
              className={`pop-hover-item p-4 rounded-2xl border transition-all cursor-pointer ${
                item.completed
                  ? 'bg-stone-50/60 dark:bg-stone-900/30 border-stone-200/50 dark:border-stone-800/40 opacity-70'
                  : 'bg-white dark:bg-stone-900 border-stone-200/80 dark:border-stone-800 shadow-xs hover:border-teal-400 dark:hover:border-teal-500 hover:bg-gradient-to-r hover:from-teal-50/80 hover:via-white hover:to-emerald-50/50 dark:hover:from-teal-950/60 dark:hover:via-stone-850 dark:hover:to-emerald-950/30 hover:shadow-md'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                
                {/* Left Side: Time Badge + Icon + Details */}
                <div className="flex items-start gap-3.5 min-w-0 flex-1">
                  
                  {/* Category Accent Indicator */}
                  <div className={`p-2 rounded-xl bg-stone-100 dark:bg-stone-800/80 ${meta.color} shrink-0 mt-0.5`}>
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs font-bold text-stone-500 dark:text-stone-400">
                        {item.startTime} – {item.endTime}
                      </span>
                      <span className="text-stone-300 dark:text-stone-700">·</span>
                      <span className="text-xs font-semibold text-stone-600 dark:text-stone-400">
                        {meta.label}
                      </span>

                      {item.snoozed && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 font-medium">
                          Shifted +30m
                        </span>
                      )}
                    </div>

                    <h4
                      className={`text-sm font-bold tracking-tight ${
                        item.completed
                          ? 'line-through text-stone-400 dark:text-stone-500'
                          : 'text-stone-900 dark:text-stone-100'
                      }`}
                    >
                      {item.title}
                    </h4>

                    {item.topic && (
                      <p className="text-xs text-stone-500 dark:text-stone-400">
                        Topic: {item.topic}
                      </p>
                    )}

                    {item.notes && (
                      <p className="text-xs text-stone-400 dark:text-stone-500 italic">
                        "{item.notes}"
                      </p>
                    )}

                    {/* Integrated Resource Badge (YouTube or PDF) */}
                    {item.resource && (
                      <button
                        onClick={() => setSelectedResourceForModal(item.resource)}
                        className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 hover:underline pt-1 cursor-pointer"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Curated Material: {item.resource.title}</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Right Side: Quick Action Pills (Shift, Zen Mode, Edit, Checkbox) */}
                <div className="flex items-center gap-2 shrink-0">
                  
                  {!item.completed && (
                    <div className="flex items-center gap-1">
                      
                      {/* Launch Zen Mode Button */}
                      <button
                        onClick={() => startZenMode(item)}
                        className="p-1.5 rounded-lg text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                        title="Focus Mode (Full Screen Ambient)"
                      >
                        <Play className="w-4 h-4" />
                      </button>

                      {/* Quick Snooze +30m Button */}
                      <button
                        onClick={() => snoozeItem(item.id, 30)}
                        className="px-2 py-1 rounded-lg text-xs font-mono font-medium text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                        title="Running late? Snooze slot by 30 mins"
                      >
                        +30m
                      </button>

                      {/* Shift to Night Slot Button */}
                      <button
                        onClick={() => shiftItemToEvening(item.id)}
                        className="px-2 py-1 rounded-lg text-xs font-medium text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                        title="Shift to Evening Study Session"
                      >
                        Shift to Night
                      </button>

                    </div>
                  )}

                  {/* Edit Button */}
                  <button
                    onClick={() => handleStartEdit(item)}
                    className="p-1.5 rounded-lg text-stone-400 hover:text-teal-600 dark:hover:text-teal-300 hover:bg-teal-50 dark:hover:bg-teal-950/40 transition-colors cursor-pointer"
                    title="Edit task name and timings"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>

                  {/* Primary Complete Button */}
                  <button
                    onClick={() => handleToggle(item)}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer active:scale-90 ${
                      item.completed
                        ? 'text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
                        : 'text-stone-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                    }`}
                    title={item.completed ? 'Mark incomplete' : 'Complete task'}
                  >
                    {item.completed ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                  </button>

                </div>

              </div>

            </div>
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12 border border-dashed border-stone-300 dark:border-stone-800 rounded-2xl">
          <p className="text-xs text-stone-500">No items match this filter.</p>
        </div>
      )}

      {/* Schedule Study Block Modal */}
      <ScheduleTaskModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
      />

    </div>
  );
};
