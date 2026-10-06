// PlanZo 75% Attendance Tracker
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sliders,
  Info,
  Check,
  X,
  TrendingUp,
} from 'lucide-react';
import { playTaskCompleteSound } from '../utils/audioSynth';

export const AttendanceTracker: React.FC = () => {
  const {
    profile,
    attendance,
    markAttendance,
    adjustAttendanceCount,
    calculateBunkStatus,
    overallAttendancePercentage,
  } = useApp();

  const [medicalBuffer, setMedicalBuffer] = useState(false);
  const [simulatedBunks, setSimulatedBunks] = useState(0);

  const targetThreshold = medicalBuffer ? 65 : 75;

  const totalAttended = attendance.reduce((sum, a) => sum + a.attendedClasses, 0);
  const totalConducted = attendance.reduce((sum, a) => sum + a.totalClasses, 0);
  const simulatedConducted = totalConducted + simulatedBunks;
  const simulatedPercentage = simulatedConducted > 0 
    ? Math.round((totalAttended / simulatedConducted) * 100) 
    : overallAttendancePercentage;

  const isOverallSafe = (simulatedBunks > 0 ? simulatedPercentage : overallAttendancePercentage) >= targetThreshold;

  // Subjects at risk count
  const atRiskCount = attendance.filter((sub) => {
    const pct = sub.totalClasses > 0 ? (sub.attendedClasses / sub.totalClasses) * 100 : 100;
    return pct < targetThreshold;
  }).length;

  // Total safe bunks across all subjects
  const overallSafeBunks = Math.max(0, Math.floor((4 * totalAttended - 3 * totalConducted) / 3));

  const handleMarkPresent = (subjectId: string) => {
    markAttendance(subjectId, 'present');
    playTaskCompleteSound();
  };

  const handleMarkAbsent = (subjectId: string) => {
    markAttendance(subjectId, 'absent');
  };

  return (
    <div className="space-y-6">
      {/* 1. Header with Medical Condonation Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-stone-200/80 dark:border-stone-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            Attendance Monitoring & Debarment Guard
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            {profile.customCollege || profile.college || 'Engineering College'} · AICTE 75% Mandatory Attendance Math
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setMedicalBuffer(!medicalBuffer)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
              medicalBuffer
                ? 'border-amber-400 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-200'
                : 'border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-850 text-stone-600 dark:text-stone-400 hover:bg-stone-50'
            }`}
          >
            <span>Medical / Fest Condonation (65%)</span>
            {medicalBuffer && <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />}
          </button>
        </div>
      </div>

      {/* 2. Top Overview: 4 Clean Executive Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Overall Attendance */}
        <div className="p-5 rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span>Overall Attendance</span>
            {isOverallSafe ? (
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            ) : (
              <ShieldAlert className="w-4 h-4 text-rose-600" />
            )}
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-stone-900 dark:text-stone-100 tabular-nums">
            {simulatedBunks > 0 ? simulatedPercentage : overallAttendancePercentage}%
          </div>
          <div className="text-[11px] text-stone-400">
            {totalAttended}/{totalConducted} classes attended
          </div>
        </div>

        {/* 75% Target */}
        <div className="p-5 rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-xs space-y-1">
          <div className="text-xs text-stone-500">Required Target</div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-stone-900 dark:text-stone-100 tabular-nums">
            {targetThreshold}%
          </div>
          <div className="text-[11px] text-stone-400">
            {medicalBuffer ? 'Condonation active' : 'AICTE Regulatory Standard'}
          </div>
        </div>

        {/* Subjects at Risk */}
        <div className="p-5 rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-xs space-y-1">
          <div className="text-xs text-stone-500">Subjects At Risk</div>
          <div className={`text-2xl sm:text-3xl font-extrabold font-mono tabular-nums ${
            atRiskCount > 0 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'
          }`}>
            {atRiskCount}
          </div>
          <div className="text-[11px] text-stone-400">
            {atRiskCount === 0 ? 'All courses safe' : `${atRiskCount} courses under ${targetThreshold}%`}
          </div>
        </div>

        {/* Classes that can be missed */}
        <div className="p-5 rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-xs space-y-1">
          <div className="text-xs text-stone-500">Classes Can Be Missed</div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-stone-900 dark:text-stone-100 tabular-nums">
            {overallSafeBunks}
          </div>
          <div className="text-[11px] text-stone-400">
            Safe bunk allowance across courses
          </div>
        </div>
      </div>

      {/* 3. Interactive Bunk Simulator */}
      <div className="p-5 rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 flex items-center justify-center shrink-0 font-bold">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100">
              Absence Impact Simulator
            </h4>
            <p className="text-xs text-stone-500">
              Simulate the mathematical impact of skipping upcoming lectures on your eligibility
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-stone-600 dark:text-stone-300 whitespace-nowrap">
            Simulate skipping <strong>{simulatedBunks}</strong> classes:
          </span>
          <input
            type="range"
            min="0"
            max="12"
            value={simulatedBunks}
            onChange={(e) => setSimulatedBunks(Number(e.target.value))}
            className="w-32 sm:w-40 accent-teal-600 cursor-pointer"
          />
          {simulatedBunks > 0 && (
            <button
              onClick={() => setSimulatedBunks(0)}
              className="text-xs text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 underline cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* 4. Subject Cards List with Visual Status: Safe, Warning, At Risk */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {attendance.map((sub) => {
          const calc = calculateBunkStatus(sub.attendedClasses, sub.totalClasses, targetThreshold);
          const pct = calc.percentage;

          let status: 'safe' | 'warning' | 'risk' = 'safe';
          if (pct < targetThreshold) {
            status = 'risk';
          } else if (pct < targetThreshold + 4) {
            status = 'warning';
          }

          const statusBadge = {
            safe: { label: 'Safe', class: 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-800/60', icon: ShieldCheck },
            warning: { label: 'Warning', class: 'bg-amber-50 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 border-amber-200/80 dark:border-amber-800/60', icon: AlertTriangle },
            risk: { label: 'At Risk', class: 'bg-rose-50 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300 border-rose-200/80 dark:border-rose-800/60', icon: ShieldAlert },
          }[status];

          const StatusIcon = statusBadge.icon;

          return (
            <div
              key={sub.subjectId}
              className={`rounded-2xl border p-5 shadow-xs flex flex-col justify-between transition-all ${
                status === 'risk'
                  ? 'border-rose-300 dark:border-rose-900 bg-rose-50/15 dark:bg-rose-950/10'
                  : 'border-stone-200/80 dark:border-stone-800 bg-white dark:bg-stone-900'
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-stone-700 dark:text-stone-300">
                        {sub.subjectCode}
                      </span>
                      {sub.isLab && (
                        <span className="text-[10px] font-mono text-stone-400">· Practical Lab</span>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 mt-0.5">
                      {sub.subjectName}
                    </h3>
                    {sub.professorName && (
                      <p className="text-[11px] text-stone-400 font-mono mt-0.5">
                        {sub.professorName}
                      </p>
                    )}
                  </div>

                  {/* Percentage & Status Tag */}
                  <div className="text-right shrink-0 space-y-1">
                    <div className="text-2xl font-extrabold font-mono text-stone-900 dark:text-stone-100 tabular-nums">
                      {pct}%
                    </div>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${statusBadge.class}`}>
                      <StatusIcon className="w-3 h-3" />
                      <span>{statusBadge.label}</span>
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-3.5 h-1.5 w-full bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      status === 'risk' ? 'bg-rose-500' : status === 'warning' ? 'bg-amber-500' : 'bg-teal-600'
                    }`}
                    style={{ width: `${Math.min(100, pct)}%` }}
                  />
                </div>

                {/* Calculation Message */}
                <p className="text-xs text-stone-600 dark:text-stone-400 mt-2.5">
                  {sub.attendedClasses} / {sub.totalClasses} classes · Target: {targetThreshold}%
                </p>
                <p className={`text-xs mt-0.5 ${status === 'risk' ? 'text-rose-700 dark:text-rose-400 font-medium' : 'text-stone-500'}`}>
                  {calc.statusLabel}
                </p>
              </div>

              {/* Bottom Quick Controls */}
              <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between gap-2">
                {/* Manual adjust count */}
                <div className="flex items-center gap-1 text-xs text-stone-500">
                  <span className="text-[11px]">Edit:</span>
                  <button
                    onClick={() => adjustAttendanceCount(sub.subjectId, sub.attendedClasses - 1, sub.totalClasses - 1)}
                    disabled={sub.attendedClasses <= 0}
                    className="w-6 h-6 rounded border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 flex items-center justify-center font-mono font-bold text-xs disabled:opacity-30 cursor-pointer"
                    title="Subtract 1 attended"
                  >
                    -
                  </button>
                  <button
                    onClick={() => adjustAttendanceCount(sub.subjectId, sub.attendedClasses + 1, sub.totalClasses + 1)}
                    className="w-6 h-6 rounded border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 flex items-center justify-center font-mono font-bold text-xs cursor-pointer"
                    title="Add 1 attended"
                  >
                    +
                  </button>
                </div>

                {/* Mark Present / Absent buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleMarkAbsent(sub.subjectId)}
                    className="px-2.5 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-medium cursor-pointer"
                  >
                    Missed (+0)
                  </button>
                  <button
                    onClick={() => handleMarkPresent(sub.subjectId)}
                    className="px-3 py-1.5 rounded-lg bg-teal-700 hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500 text-white text-xs font-semibold shadow-xs cursor-pointer"
                  >
                    Attended (+1)
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 5. Policy Regulations Note */}
      <div className="rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/40 p-4 text-xs text-stone-600 dark:text-stone-400 space-y-1.5">
        <div className="flex items-center gap-2 text-stone-900 dark:text-stone-100 font-bold">
          <Info className="w-4 h-4 text-teal-600" />
          <span>Institutional Attendance Regulation Norms</span>
        </div>
        <p className="leading-relaxed">
          Under standard university regulations, minimum 75% attendance is required to be certified for end-semester theory and laboratory examinations. In authorized medical emergencies or state/national youth festivals, condonation up to 10% may be granted by the Academic Council upon submission of attested documents.
        </p>
      </div>
    </div>
  );
};
