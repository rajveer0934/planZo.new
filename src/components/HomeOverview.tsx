import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Clock,
  ArrowRight,
  CheckCircle2,
  Calendar,
  ShieldCheck,
  ShieldAlert,
  Flame,
  Square,
  ChevronRight,
  GraduationCap,
  Play,
  RotateCcw,
  Sparkles,
  Coffee,
  BookOpen,
  Zap,
  Plus,
  X,
  Target,
  BarChart2,
  TrendingUp,
  AlertCircle,
  Activity,
  Sliders,
  Edit3,
} from 'lucide-react';
import { ScheduleTaskModal } from './ScheduleTaskModal';
import { StreakModal } from './StreakModal';
import { XpModal } from './XpModal';
import { LofiAudioModal } from './LofiAudioModal';
import { StudentAiChatbotModal } from './StudentAiChatbotModal';
import { UniversityPortalScraperModal } from './UniversityPortalScraperModal';
import { playTaskCompleteSound } from '../utils/audioSynth';
import { fireConfetti } from '../utils/audioVibes';

export const HomeOverview: React.FC = () => {
  const {
    profile,
    currentUser,
    timetable,
    attendance,
    overallAttendancePercentage,
    bandwidth,
    setActiveView,
    toggleItemComplete,
    snoozeItem,
    shiftItemToEvening,
    injectBufferZone,
    recalibrateSchedule,
    isRecalibrating,
    recalibrateNotice,
    clearRecalibrateNotice,
    startZenMode,
    userStreak,
    userXp,
    awardXp,
    subjects,
    setIsPersonalizationWizardOpen,
  } = useApp();

  // Modals state
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isStreakModalOpen, setIsStreakModalOpen] = useState(false);
  const [isXpModalOpen, setIsXpModalOpen] = useState(false);
  const [isLofiModalOpen, setIsLofiModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isScraperModalOpen, setIsScraperModalOpen] = useState(false);

  // Time calculations for live active/next task
  const now = new Date();
  const currentHours = now.getHours();
  const currentMinutes = currentHours * 60 + now.getMinutes();

  const getGreeting = () => {
    if (currentHours < 12) return 'Good morning';
    if (currentHours < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const parseMinutes = (timeStr: string) => {
    const [h, m] = timeStr.split(':').map(Number);
    return (h || 0) * 60 + (m || 0);
  };

  // 1. Classes vs Tasks separation
  const todayClasses = timetable.filter(
    (item) => item.category === 'lecture' || item.category === 'lab'
  );

  const priorityTasks = timetable.filter(
    (item) => item.category !== 'lecture' && item.category !== 'lab'
  );

  // Next Best Action determination
  const activeClass = todayClasses.find((item) => {
    const start = parseMinutes(item.startTime);
    const end = parseMinutes(item.endTime);
    return currentMinutes >= start && currentMinutes <= end;
  });

  const nextActionItem = activeClass ||
    timetable.find((item) => parseMinutes(item.startTime) >= currentMinutes && !item.completed) ||
    timetable.find((item) => !item.completed) ||
    timetable[0];

  // Productivity Metrics
  const completedCount = timetable.filter((item) => item.completed).length;
  const totalCount = timetable.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Attendance Calculations
  const isAttendanceSafe = overallAttendancePercentage >= 75;
  const totalAttended = attendance.reduce((acc, a) => acc + a.attendedClasses, 0);
  const totalConducted = attendance.reduce((acc, a) => acc + a.totalClasses, 0);
  const safeBunks = Math.max(0, Math.floor((4 * totalAttended - 3 * totalConducted) / 3));
  const classesNeededFor75 = Math.max(0, Math.ceil(3 * totalConducted - 4 * totalAttended));

  const handleTaskCheck = (id: string, currentlyCompleted: boolean) => {
    if (!currentlyCompleted) {
      playTaskCompleteSound();
      fireConfetti();
      awardXp(20, 'Task Completed');
    }
    toggleItemComplete(id);
  };

  return (
    <div className="space-y-6">
      {/* ========================================================================= */}
      {/* 1. TOP GREETING & CONTEXTUAL HEADER                                       */}
      {/* ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-stone-200/80 dark:border-stone-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight">
            {getGreeting()}, {currentUser?.firstName || profile.firstName || (profile.name?.trim() ? profile.name.trim().split(' ')[0] : (currentUser?.name?.trim() ? currentUser.name.trim().split(' ')[0] : 'Student'))}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Here's what needs your attention today.
          </p>
        </div>

        {/* Quick Utilities */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPersonalizationWizardOpen(true)}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-teal-700 hover:bg-teal-800 text-white transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            title="Setup your college timings, habits and tasks"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Setup Routine & Tasks</span>
          </button>

          <button
            onClick={() => injectBufferZone()}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-stone-100 dark:bg-stone-800 hover:bg-stone-200/80 text-stone-700 dark:text-stone-300 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Add a 25-minute calm buffer"
          >
            <Coffee className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span>+ Chill Buffer</span>
          </button>

          <button
            onClick={() => recalibrateSchedule('Manual Trigger')}
            disabled={isRecalibrating}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold border border-stone-200 dark:border-stone-700 hover:border-teal-500 text-stone-700 dark:text-stone-300 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Intelligently rebalance remaining tasks without guilt"
          >
            <Sparkles className={`w-3.5 h-3.5 ${isRecalibrating ? 'animate-spin text-teal-600' : 'text-teal-600 dark:text-teal-400'}`} />
            <span>{isRecalibrating ? 'Balancing...' : 'Recalibrate'}</span>
          </button>
        </div>
      </div>

      {/* Recalibrate Notice Banner */}
      {recalibrateNotice && (
        <div className="rounded-xl border border-teal-200/80 bg-teal-50/90 dark:border-teal-900/60 dark:bg-teal-950/40 p-3.5 flex items-center justify-between gap-3 text-xs shadow-xs animate-fadeIn">
          <div className="flex items-center gap-2 text-teal-900 dark:text-teal-200">
            <Sparkles className="w-4 h-4 text-teal-600 shrink-0" />
            <span><strong>Schedule Rebalanced: </strong>{recalibrateNotice}</span>
          </div>
          <button
            onClick={clearRecalibrateNotice}
            className="p-1 rounded-lg text-teal-700 dark:text-teal-400 hover:bg-teal-100 dark:hover:bg-teal-900 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. FIRST: NEXT BEST ACTION (Visually Dominant Hero)                       */}
      {/* ========================================================================= */}
      {nextActionItem && (
        <div className="relative rounded-2xl border border-teal-300 dark:border-teal-800 bg-gradient-to-r from-teal-50/70 via-white to-stone-50/40 dark:from-teal-950/40 dark:via-stone-900 dark:to-stone-900 p-5 sm:p-6 shadow-xs overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-teal-700 text-white">
                  Next Best Action
                </span>
                <span className="text-xs text-stone-500 font-mono">
                  {nextActionItem.startTime} – {nextActionItem.endTime}
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 truncate">
                {nextActionItem.title}
              </h2>

              <p className="text-xs text-stone-600 dark:text-stone-400 flex items-center gap-2">
                <span className="capitalize">{nextActionItem.category}</span>
                <span>·</span>
                <span>Weight: {nextActionItem.cognitiveWeight >= 4 ? 'Intensive' : 'Moderate'}</span>
                {nextActionItem.topic && (
                  <>
                    <span>·</span>
                    <span className="truncate">{nextActionItem.topic}</span>
                  </>
                )}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={() => startZenMode(nextActionItem)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-teal-700 hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500 text-white transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Start Focus</span>
              </button>

              <button
                onClick={() => handleTaskCheck(nextActionItem.id, nextActionItem.completed)}
                className="p-2 rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 transition-colors cursor-pointer"
                title="Mark Completed"
              >
                {nextActionItem.completed ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Square className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. ATTENDANCE STATUS & ACADEMIC MILESTONE (Prioritized at Top)             */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* Attendance Overview Card */}
        <div
          onClick={() => setActiveView('attendance')}
          className="rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-stone-900 p-5 shadow-xs flex flex-col justify-between hover:border-teal-500/60 transition-all cursor-pointer group"
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
                {isAttendanceSafe ? (
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                ) : (
                  <ShieldAlert className="w-4 h-4 text-amber-600" />
                )}
                <span>Attendance Status</span>
              </span>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                isAttendanceSafe
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                  : 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
              }`}>
                {isAttendanceSafe ? 'Safe (≥75%)' : 'Warning'}
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold font-mono text-stone-900 dark:text-stone-100 tabular-nums">
                {overallAttendancePercentage}%
              </span>
              <span className="text-xs text-stone-500">
                ({totalAttended}/{totalConducted} classes attended)
              </span>
            </div>

            <p className="text-xs text-stone-500 leading-relaxed">
              {isAttendanceSafe
                ? `You have a buffer of ${safeBunks} safe classes you can miss while keeping 75%.`
                : `Attend next ${classesNeededFor75} consecutive lectures to recover safe margin.`}
            </p>
          </div>

          <div className="pt-3 mt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-teal-700 dark:text-teal-400 font-semibold group-hover:underline">
            <span>Open Attendance Simulator & Subject Drill-down</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        {/* Upcoming Exam & Study Recommendation */}
        <div
          onClick={() => setActiveView('academic')}
          className="rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-stone-900 p-5 shadow-xs flex flex-col justify-between hover:border-teal-500/60 transition-all cursor-pointer group"
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-teal-600" />
                <span>Academic Milestone</span>
              </span>
              <span className="text-[11px] font-mono text-teal-700 dark:text-teal-400 font-bold">
                18 Days Left
              </span>
            </div>

            <div className="space-y-0.5">
              <div className="text-base font-bold text-stone-900 dark:text-stone-100">
                Mid-Semester Examination 1
              </div>
              <p className="text-xs text-stone-500">
                Units 1 & 2 high-yield theorems & solved PYQs
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-850 text-xs text-stone-600 dark:text-stone-300">
              💡 <strong>Pareto Recommendation:</strong> 45-min review on {subjects[0]?.code || 'CS-701'} will secure ~14 exam marks.
            </div>
          </div>

          <div className="pt-3 mt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-teal-700 dark:text-teal-400 font-semibold group-hover:underline">
            <span>Explore Academic Vault & PYQs</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 4. TODAY'S ADHERENCE (PRODUCTIVITY) & DAY STREAK / XP                     */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        
        {/* Productivity Summary */}
        <div className="rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-stone-900 p-5 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
              Today's Adherence
            </span>
            <span className="text-xs font-mono font-bold text-teal-700 dark:text-teal-400">
              {progressPercent}%
            </span>
          </div>

          <div className="text-xl font-bold text-stone-900 dark:text-stone-100">
            {completedCount} of {totalCount} completed
          </div>

          <div className="h-2 w-full rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-teal-600 transition-all duration-700"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="text-[11px] text-stone-500 flex items-center justify-between pt-1">
            <span>Mental Load: <strong>{bandwidth.status} ({bandwidth.densityScore}%)</strong></span>
            <button
              onClick={() => setActiveView('analytics')}
              className="text-teal-700 dark:text-teal-400 hover:underline font-semibold"
            >
              Full Analytics →
            </button>
          </div>
        </div>

        {/* XP and Day Streak */}
        <div className="rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-stone-900 p-5 shadow-xs flex items-center justify-between gap-4">
          <div
            onClick={() => setIsStreakModalOpen(true)}
            className="flex-1 cursor-pointer group"
          >
            <div className="flex items-center gap-1.5 text-xs text-stone-400 font-semibold mb-1">
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Day Streak</span>
            </div>
            <div className="text-2xl font-extrabold font-mono text-stone-900 dark:text-stone-100">
              {userStreak} Days
            </div>
            <div className="text-[11px] text-amber-600 dark:text-amber-400 group-hover:underline">
              Consistent focus
            </div>
          </div>

          <div className="h-10 w-px bg-stone-100 dark:bg-stone-800" />

          <div
            onClick={() => setIsXpModalOpen(true)}
            className="flex-1 cursor-pointer group text-right"
          >
            <div className="flex items-center justify-end gap-1.5 text-xs text-stone-400 font-semibold mb-1">
              <Zap className="w-3.5 h-3.5 text-teal-600 fill-teal-600" />
              <span>Engineering XP</span>
            </div>
            <div className="text-2xl font-extrabold font-mono text-teal-700 dark:text-teal-300">
              {userXp} XP
            </div>
            <div className="text-[11px] text-teal-600 dark:text-teal-400 group-hover:underline">
              Level {Math.max(1, Math.floor(userXp / 300) + 1)} Engineer
            </div>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 5. TODAY'S TASKS & TODAY'S CLASSES (Moved Below Key Status & Milestones)  */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* Today's Priority Tasks */}
        <div className="rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-stone-900 p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-stone-800">
            <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <span>Today's Tasks</span>
              <span className="text-xs font-mono font-normal text-stone-400">
                ({priorityTasks.filter((t) => t.completed).length}/{priorityTasks.length})
              </span>
            </h3>
            <button
              onClick={() => setActiveView('tasks')}
              className="text-xs text-teal-700 dark:text-teal-400 font-semibold hover:underline"
            >
              View All Tasks →
            </button>
          </div>

          <div className="space-y-2">
            {priorityTasks.slice(0, 4).map((task) => {
              const isCompleted = task.completed;
              return (
                <div
                  key={task.id}
                  className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                    isCompleted
                      ? 'border-stone-200/50 bg-stone-50/50 dark:border-stone-800/50 dark:bg-stone-850/30 opacity-60'
                      : 'border-stone-200/80 dark:border-stone-800 bg-stone-50/30 dark:bg-stone-850/40 hover:border-teal-400/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <button
                      onClick={() => handleTaskCheck(task.id, isCompleted)}
                      className="text-stone-400 hover:text-teal-600 transition-colors shrink-0"
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-teal-600 fill-teal-100 dark:fill-teal-950" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                    </button>
                    <span className={`text-xs font-medium truncate ${
                      isCompleted ? 'line-through text-stone-400' : 'text-stone-800 dark:text-stone-200'
                    }`}>
                      {task.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-[10px] font-mono text-stone-400">{task.startTime}</span>
                    <button
                      onClick={() => setActiveView('tasks')}
                      className="p-1 rounded-md text-stone-400 hover:text-teal-600 transition-colors"
                      title="Edit task in Schedule & Tasks"
                    >
                      <Edit3 className="w-3 h-3" />
                    </button>
                    {!isCompleted && (
                      <button
                        onClick={() => startZenMode(task)}
                        className="p-1 rounded-md text-stone-400 hover:text-teal-600"
                        title="Focus"
                      >
                        <Play className="w-3 h-3 fill-current" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Today's Classes */}
        <div className="rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-stone-900 p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-stone-800">
            <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <span>Today's Classes</span>
              <span className="text-xs font-mono font-normal text-stone-400">
                ({todayClasses.length} sessions)
              </span>
            </h3>
            <button
              onClick={() => setActiveView('schedule')}
              className="text-xs text-teal-700 dark:text-teal-400 font-semibold hover:underline"
            >
              Full Schedule →
            </button>
          </div>

          <div className="space-y-2">
            {todayClasses.length === 0 ? (
              <div className="text-center py-6 text-stone-400 text-xs">
                No classes scheduled for today.
              </div>
            ) : (
              todayClasses.map((cls) => {
                const isLive = activeClass?.id === cls.id;
                const isLab = cls.category === 'lab';
                return (
                  <div
                    key={cls.id}
                    className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                      isLive
                        ? 'border-teal-500 bg-teal-50/40 dark:border-teal-600 dark:bg-teal-950/30'
                        : 'border-stone-200/80 dark:border-stone-800 bg-stone-50/30 dark:bg-stone-850/40'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <button
                        onClick={() => handleTaskCheck(cls.id, cls.completed)}
                        className="text-stone-400 hover:text-teal-600 transition-colors shrink-0"
                      >
                        {cls.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-teal-600 fill-teal-100 dark:fill-teal-950" />
                        ) : (
                          <Square className="w-4 h-4" />
                        )}
                      </button>

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className={`text-xs font-semibold truncate ${
                            cls.completed ? 'line-through text-stone-400' : 'text-stone-800 dark:text-stone-200'
                          }`}>
                            {cls.title}
                          </span>
                          {isLive && (
                            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-teal-600 text-white font-bold">
                              LIVE
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-stone-400 font-mono mt-0.5">
                          {cls.startTime} – {cls.endTime} · {isLab ? 'Lab Practical' : 'Lecture'}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => startZenMode(cls)}
                      className="px-2 py-1 rounded-md text-[11px] font-semibold bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300"
                    >
                      Focus
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>

      {/* Modals */}
      <ScheduleTaskModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
      />
      <StreakModal
        isOpen={isStreakModalOpen}
        onClose={() => setIsStreakModalOpen(false)}
      />
      <XpModal
        isOpen={isXpModalOpen}
        onClose={() => setIsXpModalOpen(false)}
      />
      <LofiAudioModal
        isOpen={isLofiModalOpen}
        onClose={() => setIsLofiModalOpen(false)}
      />
      <StudentAiChatbotModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />
      <UniversityPortalScraperModal
        isOpen={isScraperModalOpen}
        onClose={() => setIsScraperModalOpen(false)}
      />
    </div>
  );
};
