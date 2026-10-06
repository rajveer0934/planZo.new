// PlanZo XP Modal
import React from 'react';
import {
  X,
  Trophy,
  Zap,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Code,
  Flame,
  Award,
  BookOpen,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface XpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const XpModal: React.FC<XpModalProps> = ({ isOpen, onClose }) => {
  const { userXp, userStreak, overallAttendancePercentage } = useApp();

  if (!isOpen) return null;

  const currentXp = userXp;

  const getLevelInfo = (xp: number) => {
    if (xp >= 2000) {
      return { level: 5, name: 'Semester Demon', nextLevelXp: 3000, minXp: 2000 };
    } else if (xp >= 1200) {
      return { level: 4, name: 'Code & Theory Scholar', nextLevelXp: 2000, minXp: 1200 };
    } else if (xp >= 700) {
      return { level: 3, name: 'Academic Sprint Pro', nextLevelXp: 1200, minXp: 700 };
    } else if (xp >= 300) {
      return { level: 2, name: 'Campus Navigator', nextLevelXp: 700, minXp: 300 };
    } else {
      return { level: 1, name: 'Freshman Explorer', nextLevelXp: 300, minXp: 0 };
    }
  };

  const levelInfo = getLevelInfo(currentXp);
  const xpPercentage = Math.min(
    100,
    Math.round(((currentXp - levelInfo.minXp) / Math.max(1, levelInfo.nextLevelXp - levelInfo.minXp)) * 100)
  );

  const badges = [
    { name: '75% Gatekeeper', desc: 'No debar risk all semester', icon: '🛡️', unlocked: overallAttendancePercentage >= 75 && currentXp > 0 },
    { name: 'Zen Master', desc: 'Clock first deep focus sessions', icon: '🧘', unlocked: currentXp >= 150 },
    { name: 'Campus Navigator', desc: 'Reach 300 XP (Level 2)', icon: '⚡', unlocked: currentXp >= 300 },
    { name: 'Sprint Pro', desc: 'Reach 700 XP (Level 3)', icon: '🚀', unlocked: currentXp >= 700 },
    { name: '14d Firebug', desc: 'Unbroken fortnight streak (14 days)', icon: '🔥', unlocked: userStreak >= 14 },
    { name: 'Semester Demon', desc: 'Reach 2,000 XP (Level 5)', icon: '👑', unlocked: currentXp >= 2000 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-white dark:bg-[#0d131f] border border-stone-200/90 dark:border-stone-800 rounded-3xl p-5 sm:p-6 w-full max-w-xl shadow-2xl space-y-5 max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/20">
              <Trophy className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <span>Academic XP & Rank Matrix</span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                  Level {levelInfo.level}
                </span>
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Earn XP for every lecture attended, assignment cleared, and focus block conquered.
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

        {/* Level Progression Hero */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-500/15 via-orange-500/10 to-teal-500/10 border border-amber-500/30 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="text-[11px] font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Level {levelInfo.level} · {levelInfo.name}</span>
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-stone-900 dark:text-white flex items-baseline gap-2">
                <span>{currentXp}</span>
                <span className="text-base sm:text-lg text-stone-500 dark:text-stone-400 font-normal">
                  / {levelInfo.nextLevelXp} XP
                </span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-300">
                {currentXp === 0
                  ? 'Start by completing your first study session or marking attendance to earn XP!'
                  : `${Math.max(0, levelInfo.nextLevelXp - currentXp)} XP remaining to reach Level ${levelInfo.level + 1}`}
              </p>
            </div>

            <div className="flex sm:flex-col gap-2 shrink-0">
              <div className="px-3 py-1.5 rounded-xl bg-white/80 dark:bg-stone-900/80 border border-stone-200 dark:border-stone-700 text-xs flex items-center gap-2 shadow-xs">
                <Zap className="w-4 h-4 text-amber-500" />
                <div>
                  <div className="text-[10px] text-stone-400 uppercase font-mono">Tasks Reward</div>
                  <div className="font-bold text-stone-800 dark:text-stone-200">+25 XP / Task</div>
                </div>
              </div>

              <div className="px-3 py-1.5 rounded-xl bg-white/80 dark:bg-stone-900/80 border border-stone-200 dark:border-stone-700 text-xs flex items-center gap-2 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <div>
                  <div className="text-[10px] text-stone-400 uppercase font-mono">Lecture Attendance</div>
                  <div className="font-bold text-stone-800 dark:text-stone-200">+15 XP / Class</div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="pt-2 border-t border-amber-500/20 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-stone-600 dark:text-stone-400">Level Progress</span>
              <span className="font-bold text-amber-600 dark:text-amber-400">{xpPercentage}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-stone-200 dark:bg-stone-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300"
                style={{ width: `${xpPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Badges Matrix */}
        <div className="space-y-2">
          <span className="font-mono font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 text-xs">
            Badges & Achievements
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {badges.map((b) => (
              <div
                key={b.name}
                className={`p-2.5 rounded-xl border transition-all ${
                  b.unlocked
                    ? 'border-amber-500/40 bg-amber-500/10 text-stone-900 dark:text-stone-100'
                    : 'border-stone-200 dark:border-stone-800/80 bg-stone-50/50 dark:bg-stone-900/20 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-base">{b.icon}</span>
                  <span
                    className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold ${
                      b.unlocked
                        ? 'bg-amber-500 text-stone-950'
                        : 'bg-stone-200 dark:bg-stone-800 text-stone-500'
                    }`}
                  >
                    {b.unlocked ? 'Unlocked' : 'Locked'}
                  </span>
                </div>
                <div className="font-bold text-xs">{b.name}</div>
                <div className="text-[10px] text-stone-500 dark:text-stone-400 truncate">{b.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="space-y-2">
          <span className="font-mono font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 text-xs">
            Recent XP Log
          </span>
          {currentXp === 0 ? (
            <div className="p-4 rounded-xl border border-dashed border-stone-300 dark:border-stone-800 text-center space-y-1 bg-stone-50/50 dark:bg-stone-900/20">
              <Zap className="w-5 h-5 text-amber-500 mx-auto opacity-75" />
              <div className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                0 XP Recorded
              </div>
              <p className="text-[11px] text-stone-500 dark:text-stone-400">
                Complete your timetable tasks, attend classes, or complete study sprints to record your XP gains!
              </p>
            </div>
          ) : (
            <div className="p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/40 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Active semester points accumulated</span>
              </div>
              <span className="font-mono font-bold text-amber-600 dark:text-amber-400">+{currentXp} XP</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-white text-white dark:text-stone-900 text-xs font-bold transition-colors cursor-pointer"
          >
            Close Matrix
          </button>
        </div>

      </div>
    </div>
  );
};
