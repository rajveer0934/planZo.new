// PlanZo Monthly Academic Calendar
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Calendar as CalendarIcon,
  CheckCircle2,
  Circle,
  Clock,
  Trash2,
  X,
  Sparkles,
} from 'lucide-react';
import { ItemCategory } from '../types';
import { playTaskCompleteSound } from '../utils/audioSynth';
import { fireConfetti } from '../utils/audioVibes';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const WEEKDAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export const MonthlyAcademicCalendar: React.FC = () => {
  const {
    profile,
    currentUser,
    scheduledTasks,
    addTaskForDate,
    toggleTaskForDate,
    deleteTaskForDate,
    getDateTaskStats,
  } = useApp();

  const today = new Date();
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState<number>(today.getMonth()); // 0-indexed
  const [selectedDateStr, setSelectedDateStr] = useState<string>(() => {
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  });

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDate, setNewTaskDate] = useState(selectedDateStr);
  const [newTaskCategory, setNewTaskCategory] = useState<ItemCategory>('study');
  const [newTaskStartTime, setNewTaskStartTime] = useState('10:00');
  const [newTaskEndTime, setNewTaskEndTime] = useState('11:00');
  const [newTaskWeight, setNewTaskWeight] = useState(3);

  // Month navigation
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const handleTodayJump = () => {
    setCurrentYear(today.getFullYear());
    setCurrentMonth(today.getMonth());
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    setSelectedDateStr(todayStr);
  };

  // Days calculations
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); // 0 for Sunday
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

  // Create date string helper
  const formatDateKey = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const todayKey = formatDateKey(today.getFullYear(), today.getMonth(), today.getDate());

  // Task follow-up color calculation (light green to red range)
  const getDaySquareStyling = (dateKey: string) => {
    const isToday = dateKey === todayKey;
    const isSelected = dateKey === selectedDateStr;
    const targetDate = new Date(dateKey + 'T00:00:00');
    const todayDate = new Date(todayKey + 'T00:00:00');
    const isPast = targetDate < todayDate;
    const isFuture = targetDate > todayDate;

    // Account creation date boundary: everything before account creation is clean/neutral!
    const creationDateStr = currentUser?.accountCreatedAt || profile.accountCreatedAt || todayKey;
    const creationDate = new Date(creationDateStr + 'T00:00:00');
    const isBeforeAccountCreation = targetDate < creationDate;

    const stats = getDateTaskStats(dateKey);

    // 1. If date is before the user created their account: completely neutral, no green/red!
    if (isBeforeAccountCreation) {
      return {
        bg: isSelected
          ? 'bg-stone-200 dark:bg-stone-700 ring-2 ring-emerald-500'
          : 'bg-stone-50/50 dark:bg-stone-900/20 text-stone-300 dark:text-stone-600 hover:bg-stone-100 dark:hover:bg-stone-850/40',
        text: 'text-stone-300 dark:text-stone-600 font-normal',
        tooltip: 'Before account creation',
        rate: null,
      };
    }

    // 2. If future date
    if (isFuture) {
      return {
        bg: isSelected
          ? 'bg-stone-200 dark:bg-stone-700 ring-2 ring-emerald-500'
          : stats.total > 0
          ? 'bg-stone-50 dark:bg-stone-800/80 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200/60 dark:border-stone-700/60'
          : 'bg-white/40 dark:bg-stone-900/40 hover:bg-stone-100 dark:hover:bg-stone-800/70 border border-stone-200/40 dark:border-stone-800/50',
        text: 'text-stone-700 dark:text-stone-300 font-semibold',
        tooltip: stats.total > 0 ? `${stats.total} tasks planned` : 'No tasks scheduled',
        rate: null,
      };
    }

    // 3. If Today:
    if (isToday) {
      if (stats.total === 0) {
        return {
          bg: isSelected
            ? 'bg-emerald-500/20 ring-2 ring-emerald-500 text-emerald-800 dark:text-emerald-200 font-bold'
            : 'bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/20',
          text: 'text-emerald-700 dark:text-emerald-300 font-bold',
          tooltip: 'Today: Ready to schedule tasks',
          rate: null,
        };
      }

      if (stats.percentage >= 70) {
        return {
          bg: isSelected
            ? 'bg-[#22c55e] text-white ring-2 ring-stone-900 dark:ring-white scale-105 shadow-md'
            : 'bg-[#22c55e] hover:bg-[#16a34a] text-white shadow-xs hover:scale-105',
          text: 'text-white font-bold',
          tooltip: `Today: ${stats.completed}/${stats.total} followed (${stats.percentage}%)`,
          rate: stats.percentage,
        };
      } else if (stats.percentage >= 35) {
        return {
          bg: isSelected
            ? 'bg-[#fb923c] text-white ring-2 ring-stone-900 dark:ring-white scale-105 shadow-md'
            : 'bg-[#fb923c] hover:bg-[#f97316] text-white shadow-xs hover:scale-105',
          text: 'text-white font-bold',
          tooltip: `Today: ${stats.completed}/${stats.total} followed (${stats.percentage}%)`,
          rate: stats.percentage,
        };
      } else {
        // Today in progress - NOT RED!
        return {
          bg: isSelected
            ? 'bg-emerald-500/25 ring-2 ring-emerald-500 text-emerald-800 dark:text-emerald-200 font-bold'
            : 'bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/20',
          text: 'text-emerald-700 dark:text-emerald-300 font-bold',
          tooltip: `Today: ${stats.total} tasks planned (In Progress)`,
          rate: stats.percentage,
        };
      }
    }

    // 4. Past days between account creation and yesterday
    if (stats.total === 0) {
      return {
        bg: isSelected
          ? 'bg-stone-200 dark:bg-stone-700 ring-2 ring-emerald-500'
          : 'bg-stone-100/60 dark:bg-stone-850/60 text-stone-400 dark:text-stone-500 hover:bg-stone-200/60',
        text: 'text-stone-400 dark:text-stone-500',
        tooltip: 'Free / Rest day',
        rate: 0,
      };
    }

    const rate = stats.percentage;

    // Followed, ~50%, or Missed
    if (rate >= 70) {
      return {
        bg: isSelected
          ? 'bg-[#22c55e] text-white ring-2 ring-stone-900 dark:ring-white scale-105 shadow-md'
          : 'bg-[#22c55e] hover:bg-[#16a34a] text-white shadow-xs hover:scale-105',
        text: 'text-white font-bold',
        tooltip: `${stats.completed}/${stats.total} followed (${rate}% - Followed)`,
        rate,
      };
    } else if (rate >= 35) {
      return {
        bg: isSelected
          ? 'bg-[#fb923c] text-white ring-2 ring-stone-900 dark:ring-white scale-105 shadow-md'
          : 'bg-[#fb923c] hover:bg-[#f97316] text-white shadow-xs hover:scale-105',
        text: 'text-white font-bold',
        tooltip: `${stats.completed}/${stats.total} followed (${rate}% - ~50% Work)`,
        rate,
      };
    } else {
      return {
        bg: isSelected
          ? 'bg-[#ef4444] text-white ring-2 ring-stone-900 dark:ring-white scale-105 shadow-md'
          : 'bg-[#ef4444] hover:bg-[#dc2626] text-white shadow-xs hover:scale-105',
        text: 'text-white font-bold',
        tooltip: `${stats.completed}/${stats.total} followed (${rate}% - Missed)`,
        rate,
      };
    }
  };

  // Open add task modal prefilled for chosen date
  const handleOpenAddForDate = (dateKey?: string) => {
    const target = dateKey || selectedDateStr;
    setNewTaskDate(target);
    setNewTaskTitle('');
    setIsAddModalOpen(true);
  };

  const handleSaveNewTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    addTaskForDate({
      title: newTaskTitle.trim(),
      date: newTaskDate,
      category: newTaskCategory,
      startTime: newTaskStartTime,
      endTime: newTaskEndTime,
      completed: false,
      cognitiveWeight: newTaskWeight,
    });

    setIsAddModalOpen(false);
    setSelectedDateStr(newTaskDate);
  };

  // Selected Day tasks
  const selectedDayTasks = scheduledTasks[selectedDateStr] || [];
  const selectedStats = getDateTaskStats(selectedDateStr);

  return (
    <div className="bg-white dark:bg-[#0c1017] flex flex-col justify-between h-full max-w-full overflow-hidden">
      
      {/* Top Header: Month & Year Picker + Plus Button */}
      <div className="flex items-center justify-between gap-1 sm:gap-2 pb-3 border-b border-stone-100 dark:border-stone-800 min-w-0">
        
        {/* Month & Year Navigation with Year Selector */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 flex items-center justify-center shrink-0">
            <CalendarIcon className="w-3.5 h-3.5" />
          </div>

          <div className="min-w-0 flex items-center gap-1.5">
            <span className="font-bold text-stone-900 dark:text-stone-100 text-sm sm:text-base leading-none">
              {MONTH_NAMES[currentMonth]}
            </span>

            {/* Year Selector */}
            <select
              value={currentYear}
              onChange={(e) => setCurrentYear(Number(e.target.value))}
              className="bg-transparent font-bold text-stone-700 dark:text-stone-300 text-xs sm:text-sm cursor-pointer focus:outline-hidden hover:text-stone-900 dark:hover:text-stone-100 font-mono shrink-0"
              title="Change Year"
            >
              {[2024, 2025, 2026, 2027, 2028, 2029, 2030].map((yr) => (
                <option key={yr} value={yr} className="bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100">
                  {yr}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Controls: Previous/Next Month & + Add Task */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={handleTodayJump}
            className="px-2 py-1 text-xs font-mono font-medium rounded-md bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
            title="Jump to today"
          >
            Today
          </button>

          <button
            onClick={handlePrevMonth}
            className="p-1.5 rounded-md text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            aria-label="Previous month"
            title="Previous month"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={handleNextMonth}
            className="p-1.5 rounded-md text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            aria-label="Next month"
            title="Next month"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => handleOpenAddForDate()}
            className="ml-1 inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-950 text-xs font-medium transition-colors shadow-xs shrink-0"
            title="Add task for selected date"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>

      {/* Weekday Row */}
      <div className="grid grid-cols-7 gap-1 sm:gap-1.5 pt-2 pb-1 text-center w-full max-w-full">
        {WEEKDAY_NAMES.map((name, i) => (
          <div
            key={name + i}
            className={`text-[10px] sm:text-[11px] font-mono font-bold max-w-[38px] sm:max-w-[42px] mx-auto ${
              i === 0 || i === 6 ? 'text-stone-400 dark:text-stone-500' : 'text-stone-600 dark:text-stone-400'
            }`}
          >
            {name}
          </div>
        ))}
      </div>

      {/* Monthly Grid of Square Day Boxes (Slightly larger comfortable size) */}
      <div className="grid grid-cols-7 gap-1 sm:gap-1.5 py-1 w-full max-w-full">
        {/* Previous Month Padding Days */}
        {Array.from({ length: firstDayOfMonth }).map((_, index) => {
          const prevDayNum = daysInPrevMonth - firstDayOfMonth + index + 1;
          return (
            <div
              key={`prev-${index}`}
              className="h-8 sm:h-9.5 w-full max-w-[38px] sm:max-w-[42px] mx-auto rounded-lg sm:rounded-xl flex items-center justify-center text-[10px] sm:text-[11px] font-mono text-stone-300 dark:text-stone-700 select-none opacity-40"
            >
              {prevDayNum}
            </div>
          );
        })}

        {/* Days of Current Month */}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const dayNum = index + 1;
          const dateKey = formatDateKey(currentYear, currentMonth, dayNum);
          const isToday = dateKey === todayKey;
          const isSelected = dateKey === selectedDateStr;
          const styling = getDaySquareStyling(dateKey);

          return (
            <button
              key={dateKey}
              onClick={() => setSelectedDateStr(dateKey)}
              title={`${dateKey}: ${styling.tooltip}`}
              className={`group relative h-8 sm:h-9.5 w-full max-w-[38px] sm:max-w-[42px] mx-auto rounded-lg sm:rounded-xl flex flex-col items-center justify-center transition-all duration-150 cursor-pointer ${
                styling.bg
              } ${
                isToday
                  ? 'ring-2 ring-teal-600 dark:ring-teal-400 ring-offset-1 dark:ring-offset-stone-900 font-extrabold'
                  : ''
              } ${
                isSelected && !isToday
                  ? 'ring-2 ring-stone-900 dark:ring-white ring-offset-1 dark:ring-offset-stone-900'
                  : ''
              }`}
            >
              <span className={`text-[11px] sm:text-xs md:text-[13px] font-mono tracking-tight leading-none ${styling.text}`}>
                {dayNum}
              </span>

              {/* Indicator dot if task exists */}
              {styling.rate !== null && (
                <span className="mt-0.5 w-1 h-1 rounded-full opacity-80 bg-current" />
              )}
            </button>
          );
        })}
      </div>

      {/* 3-Tier Color Progression Legend (Red: Missed, Little Orange: ~50% Work, Green: Followed) */}
      <div className="pt-2 pb-1.5 border-t border-stone-100 dark:border-stone-800 mt-2 max-w-full">
        <div className="grid grid-cols-3 gap-1 sm:gap-2 text-center text-[9px] sm:text-[10px] font-mono font-semibold max-w-full">
          <div className="flex items-center justify-center gap-1 py-1 px-0.5 rounded-lg bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 border border-red-200/60 dark:border-red-800/40 min-w-0">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#ef4444] shrink-0" />
            <span className="truncate">Missed</span>
          </div>
          <div className="flex items-center justify-center gap-1 py-1 px-0.5 rounded-lg bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-400 border border-orange-200/60 dark:border-orange-800/40 min-w-0">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#fb923c] shrink-0" />
            <span className="truncate">~50% Work</span>
          </div>
          <div className="flex items-center justify-center gap-1 py-1 px-0.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40 min-w-0">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#22c55e] shrink-0" />
            <span className="truncate">Followed</span>
          </div>
        </div>
      </div>

      {/* Selected Day Inspector & Mini Task Manager */}
      <div className="mt-2 p-2.5 sm:p-3 rounded-2xl bg-stone-50/80 dark:bg-stone-850/60 border border-stone-200/70 dark:border-stone-800/80 space-y-2 max-w-full min-w-0">
        
        <div className="flex items-center justify-between text-xs gap-1">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="font-bold text-stone-800 dark:text-stone-200 truncate">
              {new Date(selectedDateStr + 'T00:00:00').toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                weekday: 'short',
              })}
            </span>
            {selectedStats.total > 0 && (
              <span
                className={`text-[9px] sm:text-[10px] px-1 sm:px-1.5 py-0.5 rounded font-mono font-bold shrink-0 ${
                  selectedStats.percentage >= 70
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    : selectedStats.percentage >= 35
                    ? 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300'
                    : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                }`}
              >
                {selectedStats.completed}/{selectedStats.total} ({selectedStats.percentage}%)
              </span>
            )}
          </div>

          <button
            onClick={() => handleOpenAddForDate(selectedDateStr)}
            className="text-[11px] text-teal-700 dark:text-teal-400 hover:underline font-semibold flex items-center gap-0.5 shrink-0"
          >
            <Plus className="w-3 h-3" />
            <span>Schedule</span>
          </button>
        </div>

        {/* Selected Day Task Items */}
        {selectedDayTasks.length === 0 ? (
          <div className="text-[11px] text-stone-400 py-1 text-center font-medium">
            No tasks scheduled for this day.{' '}
            <button
              onClick={() => handleOpenAddForDate(selectedDateStr)}
              className="text-teal-600 dark:text-teal-400 hover:underline font-semibold"
            >
              Add one now
            </button>
          </div>
        ) : (
          <div className="max-h-28 overflow-y-auto space-y-1.5 pr-1 max-w-full">
            {selectedDayTasks.map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between text-[11px] p-1.5 rounded-lg bg-white dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800/60 gap-2 min-w-0"
              >
                <div className="flex items-center gap-2 truncate min-w-0 flex-1">
                  <button
                    onClick={() => {
                      toggleTaskForDate(selectedDateStr, t.id);
                      if (!t.completed) {
                        playTaskCompleteSound();
                        fireConfetti(30);
                      }
                    }}
                    className="text-stone-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:scale-110 active:scale-95 shrink-0 transition-transform cursor-pointer"
                    title={t.completed ? 'Mark incomplete' : 'Mark complete'}
                  >
                    {t.completed ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Circle className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <span className={`truncate min-w-0 font-medium ${t.completed ? 'line-through text-stone-400' : 'text-stone-800 dark:text-stone-200'}`}>
                    {t.title}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 text-[10px] text-stone-400 font-mono">
                  <span>{t.startTime}</span>
                  <button
                    onClick={() => deleteTaskForDate(selectedDateStr, t.id)}
                    className="text-stone-400 hover:text-rose-600 p-0.5 rounded"
                    title="Delete task"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Task Scheduling Dialog / Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-5 sm:p-6 w-full max-w-md shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-stone-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-teal-950 text-teal-800 dark:text-teal-300 flex items-center justify-center">
                  <Plus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 dark:text-stone-100 text-base">
                    Schedule Task / Study Block
                  </h3>
                  <p className="text-[11px] text-stone-500">
                    Add to academic routine & track follow-up
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNewTask} className="space-y-3.5 text-xs">
              
              {/* Task Title */}
              <div>
                <label className="block text-[11px] font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Task Title or Subject Topic *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. DSA: Binary Search Trees & AVL or Microprocessor Lab"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50/70 dark:bg-stone-850 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 font-medium transition-all"
                />
              </div>

              {/* Date Input */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={newTaskDate}
                    onChange={(e) => setNewTaskDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50/70 dark:bg-stone-850 text-stone-900 dark:text-stone-100 font-mono focus:outline-hidden focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Category
                  </label>
                  <select
                    value={newTaskCategory}
                    onChange={(e) => setNewTaskCategory(e.target.value as ItemCategory)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50/70 dark:bg-stone-850 text-stone-900 dark:text-stone-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 cursor-pointer"
                  >
                    <option value="study">Study Sprint</option>
                    <option value="lecture">Lecture</option>
                    <option value="lab">Lab Practical</option>
                    <option value="assignment">Assignment</option>
                    <option value="habit">Habit / Prep</option>
                    <option value="chill">Chill / Break</option>
                  </select>
                </div>
              </div>

              {/* Timing */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={newTaskStartTime}
                    onChange={(e) => setNewTaskStartTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50/70 dark:bg-stone-850 text-stone-900 dark:text-stone-100 font-mono focus:outline-hidden focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    End Time
                  </label>
                  <input
                    type="time"
                    value={newTaskEndTime}
                    onChange={(e) => setNewTaskEndTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50/70 dark:bg-stone-850 text-stone-900 dark:text-stone-100 font-mono focus:outline-hidden focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 cursor-pointer"
                  />
                </div>
              </div>

              {/* Cognitive Weight */}
              <div>
                <div className="flex items-center justify-between text-[11px] font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  <span>Mental Intensity Level</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">Level {newTaskWeight}/5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={newTaskWeight}
                  onChange={(e) => setNewTaskWeight(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-end gap-2 border-t border-stone-100 dark:border-stone-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold shadow-xs transition-all active:scale-95 cursor-pointer"
                >
                  Schedule Task
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
