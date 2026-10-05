import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Menu,
  Plus,
  Flame,
  Zap,
  Headphones,
  Sparkles,
  Bot,
  Sliders,
} from 'lucide-react';

interface TopHeaderProps {
  onOpenMobileNav: () => void;
  onOpenScheduleModal: () => void;
  onOpenStreakModal: () => void;
  onOpenXpModal: () => void;
  onOpenLofiModal: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  onOpenMobileNav,
  onOpenScheduleModal,
  onOpenStreakModal,
  onOpenXpModal,
  onOpenLofiModal,
}) => {
  const { activeView, setActiveView, userStreak, userXp, setIsPersonalizationWizardOpen } = useApp();

  const viewTitles: Record<string, { title: string; subtitle: string }> = {
    home: { title: 'Overview', subtitle: 'Academic Command Center' },
    timeline: { title: 'My Day', subtitle: 'Time-Blocked Daily Routine' },
    tasks: { title: 'Tasks', subtitle: 'Priority Action Queue' },
    schedule: { title: 'Schedule', subtitle: 'Timetable & Academic Calendar' },
    attendance: { title: 'Attendance Guard', subtitle: '75% AICTE Monitoring' },
    academic: { title: 'Academic Vault', subtitle: 'Syllabus, PYQs & Notes' },
    analytics: { title: 'Analytics', subtitle: 'Productivity & Bandwidth' },
    ai: { title: 'Sarthi AI', subtitle: 'Senior B.Tech Mentor & Copilot' },
    settings: { title: 'Settings', subtitle: 'System & Academic Profile' },
  };

  const current = viewTitles[activeView] || viewTitles.home;

  return (
    <header className="sticky top-0 z-30 h-16 w-full bg-white/90 dark:bg-[#0c1018]/90 border-b border-stone-200/80 dark:border-stone-800/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between gap-4">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileNav}
          className="p-2 -ml-2 rounded-lg text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 lg:hidden cursor-pointer"
          aria-label="Open Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-bold text-stone-900 dark:text-stone-100 tracking-tight">
              {current.title}
            </h1>
            <span className="hidden sm:inline-block text-stone-300 dark:text-stone-700">·</span>
            <span className="hidden sm:inline-block text-xs text-stone-400 font-medium">
              {current.subtitle}
            </span>
          </div>
        </div>
      </div>

      {/* Right: Quick Indicators & Global Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Streak Indicator */}
        <button
          onClick={onOpenStreakModal}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-stone-200/70 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:border-amber-400/80 transition-colors text-xs font-semibold cursor-pointer"
          title="View Streak Milestones"
        >
          <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span className="font-mono tabular-nums">{userStreak}d</span>
        </button>

        {/* XP Indicator */}
        <button
          onClick={onOpenXpModal}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-stone-200/70 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:border-teal-400/80 transition-colors text-xs font-semibold cursor-pointer"
          title="View Engineering XP"
        >
          <Zap className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 fill-teal-600 dark:fill-teal-400" />
          <span className="font-mono tabular-nums">{userXp} XP</span>
        </button>

        {/* Lo-Fi Focus Music */}
        <button
          onClick={onOpenLofiModal}
          className="p-2 rounded-lg border border-stone-200/70 dark:border-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
          title="Focus Lo-Fi Beats & Ambient Sounds"
        >
          <Headphones className="w-4 h-4 text-teal-600 dark:text-teal-400" />
        </button>

        {/* Setup Wizard */}
        <button
          onClick={() => setIsPersonalizationWizardOpen(true)}
          className="hidden md:flex p-2 rounded-lg border border-stone-200/70 dark:border-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
          title="Configure Routine & Curriculum"
        >
          <Sliders className="w-4 h-4" />
        </button>

        {/* Primary Action: + Add Task */}
        <button
          onClick={onOpenScheduleModal}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-teal-700 hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Add Task</span>
        </button>
      </div>
    </header>
  );
};
