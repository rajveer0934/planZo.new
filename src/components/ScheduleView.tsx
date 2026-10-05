import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Calendar as CalendarIcon,
  Clock,
  Coffee,
  Plus,
  Sparkles,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { MonthlyAcademicCalendar } from './MonthlyAcademicCalendar';
import { DailyTimeline } from './DailyTimeline';

interface ScheduleViewProps {
  onOpenAddTaskModal: () => void;
}

export const ScheduleView: React.FC<ScheduleViewProps> = ({ onOpenAddTaskModal }) => {
  const { profile, injectBufferZone, recalibrateSchedule, isRecalibrating } = useApp();
  const [scheduleMode, setScheduleMode] = useState<'daily' | 'monthly'>('daily');

  return (
    <div className="space-y-6">
      {/* College Fixed Timing & Schedule Mode Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200/80 dark:border-stone-800">
        <div>
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
            Schedule & Routine
          </h2>
          <p className="text-xs text-stone-500">
            {profile.customCollege || profile.college || 'Engineering College'} · {profile.collegeStart} to {profile.collegeEnd}
          </p>
        </div>

        {/* Mode Selector & Quick Actions */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 rounded-xl bg-stone-100 dark:bg-stone-850 border border-stone-200/70 dark:border-stone-800">
            <button
              onClick={() => setScheduleMode('daily')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                scheduleMode === 'daily'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                  : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'
              }`}
            >
              Daily Routine
            </button>
            <button
              onClick={() => setScheduleMode('monthly')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                scheduleMode === 'monthly'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                  : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'
              }`}
            >
              Monthly Calendar
            </button>
          </div>

          <button
            onClick={() => injectBufferZone()}
            className="p-2 rounded-lg border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
            title="Add a 25-minute calm buffer"
          >
            <Coffee className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          </button>
        </div>
      </div>

      {/* Render Selected View */}
      {scheduleMode === 'daily' ? (
        <DailyTimeline />
      ) : (
        <div className="space-y-4">
          <MonthlyAcademicCalendar />
        </div>
      )}
    </div>
  );
};
