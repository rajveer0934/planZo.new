import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  CheckSquare,
  Square,
  CheckCircle2,
  Clock,
  Plus,
  Play,
  RotateCcw,
  Sparkles,
  Filter,
  Check,
  Calendar,
  AlertCircle,
  Tag,
} from 'lucide-react';
import { playTaskCompleteSound } from '../utils/audioSynth';
import { fireConfetti } from '../utils/audioVibes';
import { TimetableItem } from '../types';

interface TasksViewProps {
  onOpenAddTaskModal: () => void;
}

export const TasksView: React.FC<TasksViewProps> = ({ onOpenAddTaskModal }) => {
  const {
    timetable,
    toggleItemComplete,
    snoozeItem,
    shiftItemToEvening,
    startZenMode,
    awardXp,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'today' | 'upcoming' | 'completed'>('today');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'study' | 'habit' | 'assignment'>('all');

  const handleToggle = (item: TimetableItem) => {
    if (!item.completed) {
      playTaskCompleteSound();
      fireConfetti();
      awardXp(20, 'Task Completed');
    }
    toggleItemComplete(item.id);
  };

  // Filter tasks based on activeTab
  const todayTasks = timetable.filter((t) => !t.completed);
  const completedTasks = timetable.filter((t) => t.completed);

  // Filter list by tab and category
  let currentList = activeTab === 'completed' ? completedTasks : todayTasks;

  if (categoryFilter !== 'all') {
    currentList = currentList.filter((item) => {
      if (categoryFilter === 'study') return item.category === 'study' || item.category === 'lecture' || item.category === 'lab';
      if (categoryFilter === 'habit') return item.category === 'habit';
      if (categoryFilter === 'assignment') return item.category === 'assignment';
      return true;
    });
  }

  // Determine priority label from cognitiveWeight
  const getPriority = (weight: number) => {
    if (weight >= 4) return { label: 'High', class: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-900' };
    if (weight === 3) return { label: 'Medium', class: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-900' };
    return { label: 'Normal', class: 'text-stone-600 dark:text-stone-400 bg-stone-100 dark:bg-stone-800 border-stone-200 dark:border-stone-700' };
  };

  return (
    <div className="space-y-5">
      {/* Header with Stats & Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200/80 dark:border-stone-800">
        <div>
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
            Schedule & Tasks
          </h2>
          <p className="text-xs text-stone-500">
            {todayTasks.length} pending · {completedTasks.length} completed today
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-stone-100 dark:bg-stone-850 border border-stone-200/70 dark:border-stone-800">
          <button
            onClick={() => setActiveTab('today')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'today'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'
            }`}
          >
            Today ({todayTasks.length})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'completed'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'
            }`}
          >
            Completed ({completedTasks.length})
          </button>
        </div>
      </div>

      {/* Category Filter Pills & Add Button */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
          <button
            onClick={() => setCategoryFilter('all')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              categoryFilter === 'all'
                ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold'
                : 'bg-stone-100 dark:bg-stone-850 text-stone-600 dark:text-stone-400 hover:bg-stone-200/70'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setCategoryFilter('study')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              categoryFilter === 'study'
                ? 'bg-teal-700 text-white font-bold'
                : 'bg-stone-100 dark:bg-stone-850 text-stone-600 dark:text-stone-400 hover:bg-stone-200/70'
            }`}
          >
            Study & Labs
          </button>
          <button
            onClick={() => setCategoryFilter('habit')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              categoryFilter === 'habit'
                ? 'bg-teal-700 text-white font-bold'
                : 'bg-stone-100 dark:bg-stone-850 text-stone-600 dark:text-stone-400 hover:bg-stone-200/70'
            }`}
          >
            Habits & DSA
          </button>
          <button
            onClick={() => setCategoryFilter('assignment')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              categoryFilter === 'assignment'
                ? 'bg-teal-700 text-white font-bold'
                : 'bg-stone-100 dark:bg-stone-850 text-stone-600 dark:text-stone-400 hover:bg-stone-200/70'
            }`}
          >
            Assignments
          </button>
        </div>

        <button
          onClick={onOpenAddTaskModal}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Task</span>
        </button>
      </div>

      {/* Task List / Rows */}
      {currentList.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-stone-200 dark:border-stone-800 rounded-2xl p-8 space-y-3">
          <div className="w-10 h-10 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-400 flex items-center justify-center mx-auto">
            <CheckSquare className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-stone-800 dark:text-stone-200">
              {activeTab === 'completed' ? 'No completed tasks yet' : 'Your day is clear'}
            </h4>
            <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
              {activeTab === 'completed'
                ? 'Check off tasks as you finish them to build momentum.'
                : 'Add your first task to stay ahead of upcoming deadlines.'}
            </p>
          </div>
          {activeTab !== 'completed' && (
            <button
              onClick={onOpenAddTaskModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold shadow-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Task</span>
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          {currentList.map((item) => {
            const isCompleted = item.completed;
            const priority = getPriority(item.cognitiveWeight || 2);

            return (
              <div
                key={item.id}
                className={`p-3.5 sm:p-4 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                  isCompleted
                    ? 'border-stone-200/50 bg-stone-50/50 dark:border-stone-800/50 dark:bg-stone-900/30 opacity-60'
                    : 'border-stone-200/80 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-teal-500/50 shadow-2xs'
                }`}
              >
                {/* Left: Checkbox + Title + Meta */}
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <button
                    onClick={() => handleToggle(item)}
                    className="p-1 rounded-lg text-stone-400 hover:text-teal-600 transition-colors shrink-0 cursor-pointer"
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-teal-600 dark:text-teal-400 fill-teal-100 dark:fill-teal-950" />
                    ) : (
                      <Square className="w-5 h-5 text-stone-400 hover:text-teal-600" />
                    )}
                  </button>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-xs sm:text-sm font-semibold truncate ${
                        isCompleted ? 'line-through text-stone-400' : 'text-stone-900 dark:text-stone-100'
                      }`}>
                        {item.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-stone-500 mt-0.5">
                      <span className="font-mono">{item.startTime} – {item.endTime}</span>
                      <span>·</span>
                      <span className="capitalize">{item.category}</span>
                      {item.topic && (
                        <>
                          <span>·</span>
                          <span className="truncate max-w-[200px]">{item.topic}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Priority Badge & Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border ${priority.class}`}>
                    {priority.label}
                  </span>

                  {!isCompleted && (
                    <button
                      onClick={() => startZenMode(item)}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-teal-50 dark:bg-teal-950/70 text-teal-800 dark:text-teal-200 border border-teal-200/80 dark:border-teal-800/60 hover:bg-teal-100 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span className="hidden sm:inline">Focus</span>
                    </button>
                  )}

                  {!isCompleted && (
                    <button
                      onClick={() => snoozeItem(item.id, 30)}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                      title="Snooze 30 mins"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
