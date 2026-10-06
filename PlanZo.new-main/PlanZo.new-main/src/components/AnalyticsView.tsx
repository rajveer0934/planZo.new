// PlanZo Analytics View
import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from 'recharts';
import {
  TrendingUp,
  CheckSquare,
  Calendar,
  Download,
  Check,
  Target,
  Trophy,
  Award,
  Flame,
  Zap,
} from 'lucide-react';

const DAILY_FOCUS_GOAL_STORAGE_KEY = 'planzo_daily_focus_goal_v1';

interface DailyFocusGoalState {
  text: string;
  completed: boolean;
  updatedDate: string;
}

interface DailyTaskChartDatum {
  dateStr: string;
  dayShort: string;
  dateLabel: string;
  xAxisLabel: string;
  completedTasks: number;
  totalTasks: number;
  isToday: boolean;
}

const CustomTaskTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data: DailyTaskChartDatum = payload[0].payload;
    return (
      <div className="rounded-2xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 px-3.5 py-2.5 shadow-lg text-xs">
        <div className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
          <span>{data.isToday ? 'Today' : data.dayShort}</span>
          <span className="text-stone-400 font-mono font-normal">({data.dateLabel})</span>
        </div>
        <div className="mt-1 flex items-center gap-2 font-mono">
          <span className="inline-block w-2 h-2 rounded-full bg-teal-600 dark:bg-teal-400" />
          <span className="text-stone-600 dark:text-stone-300">Completed Tasks:</span>
          <span className="font-bold text-teal-700 dark:text-teal-400">
            {data.completedTasks} {data.completedTasks === 1 ? 'task' : 'tasks'}
          </span>
        </div>
        {data.totalTasks > 0 && (
          <div className="mt-0.5 text-[11px] font-mono text-stone-400">
            Scheduled: {data.completedTasks} / {data.totalTasks} done
          </div>
        )}
      </div>
    );
  }
  return null;
};

export const AnalyticsView: React.FC = () => {
  const {
    profile,
    bandwidth,
    overallAttendancePercentage,
    userXp,
    userStreak,
    timetable,
    toggleItemComplete,
    scheduledTasks,
    awardXp,
  } = useApp();

  const [reportExported, setReportExported] = useState(false);

  // Daily Focus Goal State persisted in localStorage
  const [dailyFocusGoal, setDailyFocusGoal] = useState<DailyFocusGoalState>(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    try {
      const saved = localStorage.getItem(DAILY_FOCUS_GOAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          text: typeof parsed.text === 'string' ? parsed.text : '',
          completed: parsed.updatedDate === todayStr ? Boolean(parsed.completed) : false,
          updatedDate: todayStr,
        };
      }
    } catch (e) {
      console.error('Failed to read daily focus goal from localStorage', e);
    }
    return {
      text: '',
      completed: false,
      updatedDate: todayStr,
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem(DAILY_FOCUS_GOAL_STORAGE_KEY, JSON.stringify(dailyFocusGoal));
    } catch (e) {
      console.error('Failed to save daily focus goal to localStorage', e);
    }
  }, [dailyFocusGoal]);

  const handleFocusGoalTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    const todayStr = new Date().toISOString().split('T')[0];
    setDailyFocusGoal((prev) => ({
      ...prev,
      text: newText,
      updatedDate: todayStr,
    }));
  };

  const handleToggleFocusGoalComplete = () => {
    const todayStr = new Date().toISOString().split('T')[0];
    setDailyFocusGoal((prev) => {
      const nextCompleted = !prev.completed;
      if (nextCompleted && prev.text.trim()) {
        awardXp(20, `Daily Focus Goal Achieved: ${prev.text.trim()}`);
      }
      return {
        ...prev,
        completed: nextCompleted,
        updatedDate: todayStr,
      };
    });
  };

  // Compute Past 7 Days Task Completion Data for Recharts BarChart
  const past7DaysTaskData = useMemo<DailyTaskChartDatum[]>(() => {
    const days: DailyTaskChartDatum[] = [];

    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];

    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const dayShort = d.toLocaleDateString('en-US', { weekday: 'short' });
      const dateLabel = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const isToday = dateStr === todayStr;

      if (isToday) {
        const completedFromTimetable = timetable.filter((t) => t.completed).length;
        const totalFromTimetable = timetable.length;
        const scheduledForToday = scheduledTasks[dateStr] || [];
        const completedFromScheduled = scheduledForToday.filter((t) => t.completed).length;
        const completedTasks = Math.max(completedFromTimetable, completedFromScheduled);
        const totalTasks = Math.max(totalFromTimetable, scheduledForToday.length, completedTasks);

        days.push({
          dateStr,
          dayShort,
          dateLabel,
          xAxisLabel: `Today (${dateLabel})`,
          completedTasks,
          totalTasks,
          isToday: true,
        });
      } else {
        const tasksForDay = scheduledTasks[dateStr] || [];
        const completedTasks = tasksForDay.filter((t) => t.completed).length;
        const totalTasks = tasksForDay.length;

        days.push({
          dateStr,
          dayShort,
          dateLabel,
          xAxisLabel: `${dayShort} (${dateLabel})`,
          completedTasks,
          totalTasks,
          isToday: false,
        });
      }
    }

    return days;
  }, [timetable, scheduledTasks]);

  const totalWeeklyTasksDone = past7DaysTaskData.reduce((sum, d) => sum + d.completedTasks, 0);
  const averageDailyTasksDone = (totalWeeklyTasksDone / 7).toFixed(1);
  const peakTaskDay = useMemo(() => {
    return past7DaysTaskData.reduce(
      (best, cur) => (cur.completedTasks >= best.completedTasks ? cur : best),
      past7DaysTaskData[0]
    );
  }, [past7DaysTaskData]);

  const maxTaskDomain = useMemo(() => {
    const maxVal = Math.max(...past7DaysTaskData.map((d) => d.completedTasks), 4);
    return Math.ceil((maxVal + 1) / 2) * 2;
  }, [past7DaysTaskData]);

  const todayCompletedCount = timetable.filter((t) => t.completed).length;
  const todayTotalCount = timetable.length;
  const todayAdherenceRate =
    todayTotalCount > 0 ? Math.round((todayCompletedCount / todayTotalCount) * 1000) / 10 : 0;

  // Compute Best Day, Best Week, Longest Streak of Completing Minimum 7 Tasks, and 7+ Task Target Status
  const milestoneMetrics = useMemo(() => {
    const todayStr = new Date().toISOString().split('T')[0];

    // Collect all known dates with completed task counts
    const dateCountMap: Record<string, number> = {};
    for (const [dateKey, tasks] of Object.entries(scheduledTasks)) {
      if (Array.isArray(tasks)) {
        dateCountMap[dateKey] = tasks.filter((t) => t.completed).length;
      }
    }
    // Ensure today's live count is up to date
    dateCountMap[todayStr] = Math.max(dateCountMap[todayStr] || 0, todayCompletedCount);

    // Also include all past 7 days
    for (const d of past7DaysTaskData) {
      dateCountMap[d.dateStr] = Math.max(dateCountMap[d.dateStr] || 0, d.completedTasks);
    }

    const sortedDates = Object.keys(dateCountMap).sort();

    // 1. Best Day
    let bestDayDate = todayStr;
    let bestDayCount = dateCountMap[todayStr] || 0;
    for (const dt of sortedDates) {
      if ((dateCountMap[dt] || 0) >= bestDayCount) {
        bestDayCount = dateCountMap[dt] || 0;
        bestDayDate = dt;
      }
    }
    const bestDayLabel =
      bestDayDate === todayStr
        ? 'Today'
        : new Date(bestDayDate + 'T00:00:00').toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          });

    // 2. Best Week (max 7-day rolling window across history, or current 7-day total)
    let bestWeekTotal = totalWeeklyTasksDone;
    if (sortedDates.length > 0) {
      for (let i = 0; i < sortedDates.length; i++) {
        const startDt = new Date(sortedDates[i] + 'T00:00:00');
        let windowSum = 0;
        for (let offset = 0; offset < 7; offset++) {
          const cur = new Date(startDt);
          cur.setDate(startDt.getDate() + offset);
          const key = cur.toISOString().split('T')[0];
          windowSum += dateCountMap[key] || 0;
        }
        if (windowSum > bestWeekTotal) {
          bestWeekTotal = windowSum;
        }
      }
    }

    // 3. Longest Streak of completing minimum 7 tasks/day
    let longestMin7Streak = 0;
    let currentRun = 0;
    let prevDateObj: Date | null = null;

    for (const dt of sortedDates) {
      const count = dateCountMap[dt] || 0;
      const curDateObj = new Date(dt + 'T00:00:00');

      if (count >= 7) {
        if (prevDateObj) {
          const diffDays = Math.round(
            (curDateObj.getTime() - prevDateObj.getTime()) / (1000 * 60 * 60 * 24)
          );
          if (diffDays === 1) {
            currentRun += 1;
          } else {
            currentRun = 1;
          }
        } else {
          currentRun = 1;
        }
        if (currentRun > longestMin7Streak) {
          longestMin7Streak = currentRun;
        }
        prevDateObj = curDateObj;
      } else {
        currentRun = 0;
        prevDateObj = null;
      }
    }

    // 4. Days with 7+ Tasks Completed (or Active 7-Task Goal Progress Today)
    const totalSevenPlusDays = sortedDates.filter((dt) => (dateCountMap[dt] || 0) >= 7).length;

    return {
      bestDayCount,
      bestDayLabel,
      bestWeekTotal,
      longestMin7Streak,
      totalSevenPlusDays,
    };
  }, [scheduledTasks, todayCompletedCount, past7DaysTaskData, totalWeeklyTasksDone]);

  const handleExportSummaryReport = () => {
    const reportDate = new Date().toLocaleString('en-IN', {
      dateStyle: 'long',
      timeStyle: 'short',
    });
    const studentName = profile.name || 'B.Tech Student';
    const studentCollege = profile.customCollege || profile.college || 'Engineering Institute';
    const studentBranch = profile.branch || 'Computer Science & Engineering';
    const studentSemester = profile.semester || 1;

    const sevenDayBreakdownLines = past7DaysTaskData
      .map(
        (d) =>
          `  - ${d.dayShort.padEnd(4)} (${d.dateLabel.padEnd(6)}): ${d.completedTasks} completed${
            d.totalTasks > 0 ? ` / ${d.totalTasks} scheduled` : ''
          }${d.isToday ? ' [TODAY]' : ''}`
      )
      .join('\n');

    const completedTodayList =
      timetable
        .filter((t) => t.completed)
        .map((t) => `  [x] ${t.startTime} - ${t.endTime}: ${t.title} (${t.category.toUpperCase()})`)
        .join('\n') || '  (No tasks marked completed yet today)';

    const pendingTodayList =
      timetable
        .filter((t) => !t.completed)
        .map((t) => `  [ ] ${t.startTime} - ${t.endTime}: ${t.title} (${t.category.toUpperCase()})`)
        .join('\n') || '  (All scheduled tasks completed for today!)';

    const reportContent = `====================================================================
           PLANZO ACADEMIC & STUDY PERFORMANCE SUMMARY REPORT
====================================================================
Generated On      : ${reportDate}
Student Name      : ${studentName}
Institute         : ${studentCollege}
Branch & Semester : ${studentBranch} — Semester ${studentSemester}
====================================================================

1. OVERALL STUDENT VITALS & GAMIFICATION
--------------------------------------------------------------------
- Overall Attendance : ${overallAttendancePercentage}%
- Experience (XP)    : ${userXp} XP
- Active Streak      : ${userStreak} Day(s)

2. TODAY'S TASK PERFORMANCE (${new Date().toISOString().split('T')[0]})
--------------------------------------------------------------------
- Daily Focus Goal   : ${dailyFocusGoal.text.trim() ? `"${dailyFocusGoal.text.trim()}" [${dailyFocusGoal.completed ? 'COMPLETED' : 'IN PROGRESS'}]` : 'Not set'}
- Tasks Completed    : ${todayCompletedCount} of ${todayTotalCount} (${todayAdherenceRate}%)
- Study Time Planned : ${bandwidth.totalStudyMinutes} mins
- Lab Time Planned   : ${bandwidth.totalLabMinutes} mins
- Buffer / Rest Time : ${bandwidth.bufferMinutes} mins

Completed Tasks Today:
${completedTodayList}

Pending Tasks Today:
${pendingTodayList}

3. PROGRESS CHART OF LAST SEVEN DAYS
--------------------------------------------------------------------
- 7-Day Total Completed : ${totalWeeklyTasksDone} tasks
- Daily Average         : ${averageDailyTasksDone} tasks/day
- Most Productive Day   : ${peakTaskDay.isToday ? 'Today' : `${peakTaskDay.dayShort} (${peakTaskDay.dateLabel})`} (${peakTaskDay.completedTasks} tasks)

Day-by-Day Record:
${sevenDayBreakdownLines}
====================================================================
`;

    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const dateStamp = new Date().toISOString().split('T')[0];
    link.href = url;
    link.download = `PlanZo-Study-Performance-Report-${dateStamp}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setReportExported(true);
    awardXp(10, 'Exported Study Performance Summary Report');
    setTimeout(() => setReportExported(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* 1. Concise Table of Tasks (Completed tasks marked, uncompleted tasks unmarked) */}
      <div className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-3.5 sm:p-4 shadow-xs space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-teal-700 dark:text-teal-400" />
            <h2 className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100">
              Today&apos;s Tasks
            </h2>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
              {todayCompletedCount}/{todayTotalCount} Done
            </span>
          </div>

          <button
            onClick={handleExportSummaryReport}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-semibold border transition-all cursor-pointer ${
              reportExported
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'bg-teal-700 hover:bg-teal-800 text-white border-teal-700'
            }`}
            title="Download summary report"
          >
            {reportExported ? (
              <>
                <Check className="w-3 h-3" />
                <span>Saved</span>
              </>
            ) : (
              <>
                <Download className="w-3 h-3" />
                <span>Export Report</span>
              </>
            )}
          </button>
        </div>

        {/* Ultra-Concise Tasks Table */}
        <div className="max-h-44 overflow-y-auto rounded-xl border border-stone-200/80 dark:border-stone-800">
          <table className="w-full text-left border-collapse text-[11px]">
            <thead className="sticky top-0 z-10 bg-stone-50 dark:bg-stone-800 text-stone-500 dark:text-stone-400 border-b border-stone-200/80 dark:border-stone-800">
              <tr>
                <th className="py-1.5 px-2.5 font-semibold w-8 text-center">✓</th>
                <th className="py-1.5 px-2.5 font-semibold">Task</th>
                <th className="py-1.5 px-2.5 font-semibold text-right w-24">Time</th>
                <th className="py-1.5 px-2.5 font-semibold text-right w-20">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800/60">
              {timetable.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-3 text-center text-stone-400">
                    No tasks for today.
                  </td>
                </tr>
              ) : (
                timetable.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => toggleItemComplete(item.id)}
                    className={`transition-colors cursor-pointer ${
                      item.completed
                        ? 'bg-emerald-50/30 dark:bg-emerald-950/15'
                        : 'hover:bg-stone-50 dark:hover:bg-stone-800/40'
                    }`}
                  >
                    <td className="py-1.5 px-2.5 text-center">
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => toggleItemComplete(item.id)}
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`Mark ${item.title} as completed`}
                        className="w-3.5 h-3.5 rounded border-stone-300 dark:border-stone-700 text-teal-700 accent-teal-600 cursor-pointer align-middle"
                      />
                    </td>
                    <td className="py-1.5 px-2.5 font-medium max-w-[200px] sm:max-w-md truncate">
                      <span
                        className={
                          item.completed
                            ? 'line-through text-stone-400 dark:text-stone-500'
                            : 'text-stone-800 dark:text-stone-200'
                        }
                      >
                        {item.title}
                      </span>
                    </td>
                    <td className="py-1.5 px-2.5 font-mono text-[10px] text-stone-400 text-right whitespace-nowrap">
                      {item.startTime}
                    </td>
                    <td className="py-1.5 px-2.5 text-right whitespace-nowrap">
                      {item.completed ? (
                        <span className="inline-flex items-center gap-0.5 text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                          <Check className="w-2.5 h-2.5" />
                          Done
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-stone-400 dark:text-stone-500">
                          Pending
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Compact Daily Focus Goal Row */}
        <div className="pt-1 flex items-center gap-2">
          <input
            type="checkbox"
            checked={dailyFocusGoal.completed}
            onChange={handleToggleFocusGoalComplete}
            aria-label="Mark Daily Focus Goal as completed"
            className="w-3.5 h-3.5 rounded border-stone-300 dark:border-stone-700 text-teal-700 accent-teal-600 cursor-pointer shrink-0"
          />
          <Target className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400 shrink-0" />
          <span className="text-[11px] font-bold text-stone-700 dark:text-stone-300 shrink-0">
            Focus Goal:
          </span>
          <input
            type="text"
            value={dailyFocusGoal.text}
            onChange={handleFocusGoalTextChange}
            placeholder="Set today's #1 focus goal..."
            className={`w-full rounded-lg bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 px-2.5 py-1 text-[11px] focus:outline-hidden focus:border-teal-500 ${
              dailyFocusGoal.completed
                ? 'line-through text-stone-400 dark:text-stone-500'
                : 'text-stone-900 dark:text-stone-100 placeholder-stone-400'
            }`}
          />
        </div>
      </div>

      {/* 2. Tagline: Progress Chart of Last Seven Days */}
      <div className="px-1 pt-1 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-teal-700 dark:text-teal-400" />
          <h3 className="text-sm sm:text-base font-bold tracking-tight text-stone-900 dark:text-stone-100">
            Progress Chart of Last Seven Days
          </h3>
        </div>
        <span className="text-xs font-mono text-stone-500 dark:text-stone-400">
          {totalWeeklyTasksDone} tasks completed · Avg {averageDailyTasksDone}/day
        </span>
      </div>

      {/* 3. Recharts Composed Chart Showing Completed Tasks Bars + Trend Line Over Blocks */}
      <div className="rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-5 sm:p-6 shadow-xs space-y-5">
        <div className="w-full h-72 pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={past7DaysTaskData}
              margin={{ top: 24, right: 16, left: -12, bottom: 8 }}
              barSize={38}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#78716c"
                strokeOpacity={0.2}
              />
              <XAxis
                dataKey="xAxisLabel"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#78716c', fontSize: 11, fontFamily: 'JetBrains Mono, monospace' }}
                dy={8}
              />
              <YAxis
                allowDecimals={false}
                domain={[0, maxTaskDomain]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#78716c', fontSize: 11, fontFamily: 'JetBrains Mono, monospace' }}
              />
              <Tooltip
                content={<CustomTaskTooltip />}
                cursor={{ fill: 'rgba(20, 184, 166, 0.08)', radius: 12 }}
              />
              <Bar
                dataKey="completedTasks"
                name="Completed Tasks"
                radius={[10, 10, 4, 4]}
                animationDuration={650}
              >
                {past7DaysTaskData.map((entry) => (
                  <Cell
                    key={entry.dateStr}
                    fill={
                      entry.isToday
                        ? '#0f766e'
                        : entry.completedTasks > 0
                        ? '#14b8a6'
                        : '#d6d3d1'
                    }
                  />
                ))}
                <LabelList
                  dataKey="completedTasks"
                  position="top"
                  offset={10}
                  formatter={(val: number) => `${val}`}
                  style={{
                    fill: '#0f766e',
                    fontSize: 11,
                    fontWeight: 700,
                    fontFamily: 'JetBrains Mono, monospace',
                  }}
                />
              </Bar>
              <Line
                type="monotone"
                dataKey="completedTasks"
                name="Trend"
                stroke="#f59e0b"
                strokeWidth={2.5}
                dot={{
                  r: 4,
                  fill: '#f59e0b',
                  stroke: '#ffffff',
                  strokeWidth: 2,
                }}
                activeDot={{
                  r: 6,
                  fill: '#d97706',
                  stroke: '#ffffff',
                  strokeWidth: 2,
                }}
                animationDuration={800}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Graph Summary Footer */}
        <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500 dark:text-stone-400">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
            <span>
              Today&apos;s Progress:{' '}
              <strong className="text-stone-900 dark:text-stone-100">
                {todayCompletedCount} of {todayTotalCount} tasks done
              </strong>
            </span>
          </span>
          <span>
            Most Productive Day:{' '}
            <strong className="text-stone-900 dark:text-stone-100">
              {peakTaskDay.isToday ? 'Today' : `${peakTaskDay.dayShort} (${peakTaskDay.dateLabel})`} —{' '}
              {peakTaskDay.completedTasks} {peakTaskDay.completedTasks === 1 ? 'task' : 'tasks'}
            </strong>
          </span>
          <span>
            7-Day Total:{' '}
            <strong className="text-teal-700 dark:text-teal-400">
              {totalWeeklyTasksDone} tasks completed
            </strong>
          </span>
        </div>
      </div>

      {/* 4. Four Icons Milestone Table: Best Day, Best Week, Longest Streak (Min 7 Tasks), and Min 7 Tasks Daily Target */}
      <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden shadow-xs">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-stone-200/80 dark:divide-stone-800">
          {/* Icon 1: Best Day */}
          <div className="p-4 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200/70 dark:border-amber-900/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Trophy className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 block">
                Best Day
              </span>
              <div className="text-sm sm:text-base font-bold font-mono text-stone-900 dark:text-stone-100 truncate">
                {milestoneMetrics.bestDayCount} {milestoneMetrics.bestDayCount === 1 ? 'Task' : 'Tasks'}
              </div>
              <span className="text-[11px] text-stone-500 dark:text-stone-400 block truncate">
                {milestoneMetrics.bestDayLabel}
              </span>
            </div>
          </div>

          {/* Icon 2: Best Week */}
          <div className="p-4 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200/70 dark:border-teal-900/60 text-teal-700 dark:text-teal-400 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 block">
                Best Week
              </span>
              <div className="text-sm sm:text-base font-bold font-mono text-stone-900 dark:text-stone-100 truncate">
                {milestoneMetrics.bestWeekTotal} {milestoneMetrics.bestWeekTotal === 1 ? 'Task' : 'Tasks'}
              </div>
              <span className="text-[11px] text-stone-500 dark:text-stone-400 block truncate">
                Peak 7-day output
              </span>
            </div>
          </div>

          {/* Icon 3: Longest Streak of Completing Minimum 7 Tasks */}
          <div className="p-4 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/60 border border-orange-200/70 dark:border-orange-900/60 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
              <Flame className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 block">
                Longest Streak (7+ Tasks)
              </span>
              <div className="text-sm sm:text-base font-bold font-mono text-stone-900 dark:text-stone-100 truncate">
                {milestoneMetrics.longestMin7Streak}{' '}
                {milestoneMetrics.longestMin7Streak === 1 ? 'Day' : 'Days'}
              </div>
              <span className="text-[11px] text-stone-500 dark:text-stone-400 block truncate">
                Min 7 tasks/day streak
              </span>
            </div>
          </div>

          {/* Icon 4: Minimum 7 Tasks Daily Benchmark */}
          <div className="p-4 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/70 dark:border-emerald-900/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 block">
                Min 7 Tasks Target
              </span>
              <div className="text-sm sm:text-base font-bold font-mono text-stone-900 dark:text-stone-100 truncate">
                {Math.min(todayCompletedCount, 7)} / 7 Today
              </div>
              <span className="text-[11px] text-stone-500 dark:text-stone-400 block truncate">
                {todayCompletedCount >= 7
                  ? '7+ daily target hit!'
                  : `${7 - todayCompletedCount} more to hit 7 tasks`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
