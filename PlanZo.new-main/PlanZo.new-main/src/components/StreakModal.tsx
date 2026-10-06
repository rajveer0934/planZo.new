// PlanZo Streak Modal
import React from 'react';
import {
  X,
  Flame,
  Shield,
  Trophy,
  Calendar,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface StreakModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StreakModal: React.FC<StreakModalProps> = ({ isOpen, onClose }) => {
  const { userStreak, scheduledTasks, getDateTaskStats, profile } = useApp();

  if (!isOpen) return null;

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-white dark:bg-[#0d131f] border border-stone-200/90 dark:border-stone-800 rounded-3xl p-5 sm:p-6 w-full max-w-xl shadow-2xl space-y-5 max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center border border-orange-500/20">
              <Flame className="w-5 h-5 fill-current animate-pulse" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <span>Academic Streak Intelligence</span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-orange-500/15 text-orange-600 dark:text-orange-400 border border-orange-500/30">
                  {userStreak} {userStreak === 1 ? 'Day' : 'Days'} Active
                </span>
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Synchronized with your monthly academic calendar. Every day followed is a day won.
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

        {/* Hero Streak Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-orange-500/15 via-amber-500/10 to-teal-500/10 border border-orange-500/30 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="text-[11px] font-mono uppercase tracking-wider text-orange-600 dark:text-orange-400 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Current Winning Streak</span>
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-stone-900 dark:text-white flex items-baseline gap-2">
                <span>{userStreak}</span>
                <span className="text-base sm:text-lg text-stone-500 dark:text-stone-400 font-normal">consecutive days</span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-300">
                {userStreak > 0
                  ? `You've maintained an unbroken academic rhythm for ${userStreak} consecutive days!`
                  : `Your streak tracker starts from today (${todayStr})! Complete today's planned tasks to ignite your Day 1 streak.`}
              </p>
            </div>

            {/* Streak Freeze & Multiplier Badges */}
            <div className="flex sm:flex-col gap-2 shrink-0">
              <div className="px-3 py-1.5 rounded-xl bg-white/80 dark:bg-stone-900/80 border border-stone-200 dark:border-stone-700 text-xs flex items-center gap-2 shadow-xs">
                <Shield className="w-4 h-4 text-cyan-500" />
                <div>
                  <div className="text-[10px] text-stone-400 uppercase font-mono">Streak Freezes</div>
                  <div className="font-bold text-stone-800 dark:text-stone-200">2 Available</div>
                </div>
              </div>

              <div className="px-3 py-1.5 rounded-xl bg-white/80 dark:bg-stone-900/80 border border-stone-200 dark:border-stone-700 text-xs flex items-center gap-2 shadow-xs">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                <div>
                  <div className="text-[10px] text-stone-400 uppercase font-mono">XP Multiplier</div>
                  <div className="font-bold text-emerald-600 dark:text-emerald-400">
                    {userStreak >= 10 ? '1.5x' : userStreak >= 5 ? '1.2x' : '1.0x'} Active
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Next Milestone Progress */}
          <div className="pt-2 border-t border-orange-500/20 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-stone-600 dark:text-stone-400">
                {userStreak < 7 ? 'Next Tier: 7 Days (Fortnight Spark)' : 'Next Tier: 21 Days (Habit Master)'}
              </span>
              <span className="font-bold text-orange-600 dark:text-orange-400">
                {userStreak < 7 ? `${7 - userStreak} Days to go` : `${21 - userStreak} Days to go`}
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-stone-200 dark:bg-stone-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-300"
                style={{ width: `${Math.min(100, Math.round(((userStreak % 7) / 7) * 100))}%` }}
              />
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Streak Activity Log
            </span>
            <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
              Live Tracker
            </span>
          </div>

          {userStreak === 0 ? (
            <div className="p-4 rounded-xl border border-dashed border-stone-300 dark:border-stone-800 text-center space-y-2 bg-stone-50/50 dark:bg-stone-900/20">
              <Flame className="w-6 h-6 text-orange-400 mx-auto opacity-75" />
              <div className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                No Streak History Recorded Yet
              </div>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 max-w-sm mx-auto">
                Your streak begins on the day of account creation ({profile.accountCreatedAt || todayStr}). As you complete your scheduled daily study and lecture blocks, each successful day will be recorded here!
              </p>
            </div>
          ) : (
            <div className="p-3 rounded-xl border border-stone-200/70 dark:border-stone-800/80 bg-stone-50/70 dark:bg-stone-900/40 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-[#22c55e] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0">
                  ✓
                </div>
                <div>
                  <div className="font-bold text-stone-900 dark:text-stone-100">
                    Day {userStreak} Conquered 🔥
                  </div>
                  <div className="text-[11px] text-stone-500 dark:text-stone-400">
                    Active streak maintained on {todayStr}
                  </div>
                </div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
                Followed
              </span>
            </div>
          )}
        </div>

        {/* Engineering Consistency Wisdom */}
        <div className="p-3 rounded-xl bg-stone-100 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 text-stone-600 dark:text-stone-300 text-xs space-y-1">
          <div className="font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            <span>Consistency Beats Genius</span>
          </div>
          <p className="text-[11px] leading-relaxed">
            "Semester exams and campus placements aren't cracked in one night. Studying 3 hours every day for 14 days is 10x more effective than an 18-hour cramming all-nighter."
          </p>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-white text-white dark:text-stone-900 text-xs font-bold transition-colors"
          >
            Keep Grinding 🔥
          </button>
        </div>

      </div>
    </div>
  );
};
