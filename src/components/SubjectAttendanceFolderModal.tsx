import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  ShieldAlert,
  ShieldCheck,
  CheckCircle,
  XCircle,
  AlertTriangle,
  RotateCcw,
  Plus,
  Percent,
  Search,
  Filter,
  Sparkles,
  BookOpen,
  Coffee,
} from 'lucide-react';

export const SubjectAttendanceFolderModal: React.FC = () => {
  const {
    isAttendanceModalOpen,
    setIsAttendanceModalOpen,
    attendance,
    markAttendance,
    adjustAttendanceCount,
    calculateBunkStatus,
    overallAttendancePercentage,
  } = useApp();

  const [medicalBuffer, setMedicalBuffer] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'theory' | 'lab' | 'danger'>('all');
  const [editingSubjectId, setEditingSubjectId] = useState<string | null>(null);
  const [editAttended, setEditAttended] = useState<number>(0);
  const [editTotal, setEditTotal] = useState<number>(0);

  if (!isAttendanceModalOpen) return null;

  const targetThreshold = medicalBuffer ? 65 : 75;
  const isOverallSafe = overallAttendancePercentage >= targetThreshold;

  // Filter subjects based on search & category
  const filteredSubjects = attendance.filter((sub) => {
    const matchesSearch =
      sub.subjectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.subjectCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (sub.professorName && sub.professorName.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    const calc = calculateBunkStatus(sub.attendedClasses, sub.totalClasses, targetThreshold);

    if (filterType === 'theory') return !sub.isLab;
    if (filterType === 'lab') return sub.isLab;
    if (filterType === 'danger') return !calc.isSafe;
    return true;
  });

  const dangerCount = attendance.filter((s) => {
    const c = calculateBunkStatus(s.attendedClasses, s.totalClasses, targetThreshold);
    return !c.isSafe;
  }).length;

  const handleStartEdit = (sub: (typeof attendance)[0]) => {
    setEditingSubjectId(sub.subjectId);
    setEditAttended(sub.attendedClasses);
    setEditTotal(sub.totalClasses);
  };

  const handleSaveEdit = (subjectId: string) => {
    adjustAttendanceCount(subjectId, editAttended, editTotal);
    setEditingSubjectId(null);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 dark:bg-stone-950/80 backdrop-blur-sm animate-fadeIn"
    >
      <div
        className="w-full max-w-4xl max-h-[92vh] bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="p-5 sm:p-6 border-b border-stone-200 dark:border-stone-800 flex items-start justify-between gap-4 bg-stone-50/70 dark:bg-stone-900/90">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300">
                <Percent className="w-4 h-4" />
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-teal-700 dark:text-teal-400 font-bold">
                Subject-Wise Attendance Folder
              </span>
              <span className="text-stone-300 dark:text-stone-700">•</span>
              <span className="text-xs text-stone-500 font-mono">B.Tech 75% Rulebook</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 tracking-tight">
              Subject Attendance & Safe Bunk Breakdown
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400">
              Manage lectures, calculate safe bunks, and keep all subjects safely above the debar threshold.
            </p>
          </div>

          <button
            onClick={() => setIsAttendanceModalOpen(false)}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-200/50 dark:hover:bg-stone-800 transition-colors shrink-0"
            title="Close Attendance Folder"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Aggregate Banner & Controls */}
        <div className="p-5 border-b border-stone-100 dark:border-stone-800/80 bg-white dark:bg-stone-900 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-stone-50 dark:bg-stone-800/50 p-4 rounded-2xl border border-stone-200/70 dark:border-stone-700/60">
            <div className="flex items-center gap-4">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg shrink-0 shadow-xs ${
                  isOverallSafe
                    ? 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300'
                    : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                }`}
              >
                {isOverallSafe ? <ShieldCheck className="w-7 h-7" /> : <ShieldAlert className="w-7 h-7" />}
              </div>

              <div>
                <div className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                  Aggregate Attendance Status
                </div>
                <div className="flex items-baseline gap-2">
                  <span
                    className={`text-3xl sm:text-4xl font-extrabold font-mono tracking-tight ${
                      isOverallSafe ? 'text-teal-700 dark:text-teal-400' : 'text-rose-600 dark:text-rose-400'
                    }`}
                  >
                    {overallAttendancePercentage}%
                  </span>
                  <span className="text-xs text-stone-500 font-mono">/ {targetThreshold}% target</span>
                </div>
                <div className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">
                  {isOverallSafe ? (
                    <span className="text-teal-700 dark:text-teal-400 font-medium">
                      All clear! You are safely above the university exam eligibility criteria.
                    </span>
                  ) : (
                    <span className="text-rose-600 dark:text-rose-400 font-medium">
                      Attention required: {dangerCount} subject{dangerCount > 1 ? 's' : ''} currently below 75%.
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Medical Buffer Switch */}
            <div className="shrink-0 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMedicalBuffer(!medicalBuffer)}
                className={`px-3.5 py-2 rounded-xl border text-xs font-semibold transition-all flex items-center gap-2 ${
                  medicalBuffer
                    ? 'border-amber-500 bg-amber-50 text-amber-900 dark:bg-amber-950 dark:text-amber-200'
                    : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                <span>Medical Buffer (65%)</span>
                {medicalBuffer && (
                  <span className="font-mono text-[10px] bg-amber-200/90 dark:bg-amber-900 px-1.5 py-0.5 rounded">
                    Active
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Search & Category Filter Tabs */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Search subject or code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-hidden focus:ring-1 focus:ring-teal-600"
              />
            </div>

            <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto text-xs pb-1 sm:pb-0">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  filterType === 'all'
                    ? 'bg-teal-800 text-stone-100 dark:bg-teal-700 font-semibold'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:text-stone-900'
                }`}
              >
                All ({attendance.length})
              </button>
              <button
                onClick={() => setFilterType('theory')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  filterType === 'theory'
                    ? 'bg-teal-800 text-stone-100 dark:bg-teal-700 font-semibold'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:text-stone-900'
                }`}
              >
                Theory
              </button>
              <button
                onClick={() => setFilterType('lab')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  filterType === 'lab'
                    ? 'bg-teal-800 text-stone-100 dark:bg-teal-700 font-semibold'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:text-stone-900'
                }`}
              >
                Labs
              </button>
              <button
                onClick={() => setFilterType('danger')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  filterType === 'danger'
                    ? 'bg-rose-700 text-stone-100 font-semibold'
                    : 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
                }`}
              >
                Below 75% ({dangerCount})
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Subject Grid */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {filteredSubjects.length === 0 ? (
            <div className="text-center py-12 text-stone-500 dark:text-stone-400 text-xs">
              No subjects found matching your criteria.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredSubjects.map((sub) => {
                const calc = calculateBunkStatus(sub.attendedClasses, sub.totalClasses, targetThreshold);
                const isDanger = !calc.isSafe;
                const isBorderline = calc.isSafe && calc.safeToBunk === 0;
                const isEditing = editingSubjectId === sub.subjectId;

                return (
                  <div
                    key={sub.subjectId}
                    className={`rounded-2xl border p-4 sm:p-5 transition-all shadow-xs flex flex-col justify-between ${
                      isDanger
                        ? 'border-rose-300 bg-rose-50/40 dark:border-rose-900/60 dark:bg-rose-950/20'
                        : isBorderline
                        ? 'border-amber-300 bg-amber-50/30 dark:border-amber-900/60 dark:bg-amber-950/20'
                        : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900'
                    }`}
                  >
                    <div>
                      {/* Subject Top Row */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2 text-xs">
                            <span className="font-mono font-bold text-teal-800 dark:text-teal-400">
                              {sub.subjectCode}
                            </span>
                            {sub.isLab ? (
                              <span className="px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 text-[10px] font-semibold">
                                Practical / Lab
                              </span>
                            ) : (
                              <span className="px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 text-[10px]">
                                Theory
                              </span>
                            )}
                          </div>
                          <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 leading-snug">
                            {sub.subjectName}
                          </h4>
                          {sub.professorName && (
                            <p className="text-[11px] text-stone-500 dark:text-stone-400">
                              Prof: {sub.professorName}
                            </p>
                          )}
                        </div>

                        {/* Large Subject Percentage */}
                        <div className="text-right shrink-0">
                          <div
                            className={`text-2xl font-bold font-mono tracking-tight ${
                              isDanger
                                ? 'text-rose-600 dark:text-rose-400'
                                : isBorderline
                                ? 'text-amber-600 dark:text-amber-400'
                                : 'text-teal-700 dark:text-teal-400'
                            }`}
                          >
                            {calc.percentage}%
                          </div>
                          <div className="text-[11px] text-stone-500 font-mono">
                            {sub.attendedClasses}/{sub.totalClasses} Attended
                          </div>
                        </div>
                      </div>

                      {/* Progress Bar with 75% target threshold mark */}
                      <div className="relative mt-3.5 h-2.5 w-full bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden p-0.5">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isDanger ? 'bg-rose-500' : isBorderline ? 'bg-amber-500' : 'bg-teal-600'
                          }`}
                          style={{ width: `${Math.min(100, calc.percentage)}%` }}
                        />
                        <div
                          className="absolute top-0 bottom-0 w-0.5 bg-stone-400 dark:bg-stone-500 z-10"
                          style={{ left: `${targetThreshold}%` }}
                          title={`${targetThreshold}% Criteria Threshold`}
                        />
                      </div>

                      {/* Bunk Outcome Message */}
                      <div className="mt-3 py-1.5 px-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/50 flex items-center justify-between text-xs">
                        <span className="text-stone-600 dark:text-stone-400 font-medium">
                          {isDanger ? 'Target Deficit:' : 'Debar Safe Margin:'}
                        </span>
                        <span
                          className={`font-semibold font-mono ${
                            isDanger
                              ? 'text-rose-600 dark:text-rose-400'
                              : isBorderline
                              ? 'text-amber-600 dark:text-amber-400'
                              : 'text-teal-700 dark:text-teal-400'
                          }`}
                        >
                          {calc.statusLabel}
                        </span>
                      </div>
                    </div>

                    {/* Action Bar: + Attended, + Missed, or Custom Adjust */}
                    <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between gap-2">
                      {isEditing ? (
                        <div className="flex items-center gap-2 w-full">
                          <div className="flex items-center gap-1 text-xs">
                            <input
                              type="number"
                              min="0"
                              value={editAttended}
                              onChange={(e) => setEditAttended(Number(e.target.value))}
                              className="w-12 p-1 text-center font-mono rounded border border-stone-300 dark:border-stone-700 text-xs bg-white dark:bg-stone-800"
                            />
                            <span>/</span>
                            <input
                              type="number"
                              min="1"
                              value={editTotal}
                              onChange={(e) => setEditTotal(Number(e.target.value))}
                              className="w-12 p-1 text-center font-mono rounded border border-stone-300 dark:border-stone-700 text-xs bg-white dark:bg-stone-800"
                            />
                          </div>
                          <button
                            onClick={() => handleSaveEdit(sub.subjectId)}
                            className="px-2.5 py-1 text-[11px] bg-teal-800 text-white rounded-lg font-medium ml-auto"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingSubjectId(null)}
                            className="px-2 py-1 text-[11px] text-stone-500 rounded-lg hover:underline"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <>
                          <button
                            onClick={() => handleStartEdit(sub)}
                            className="text-[11px] text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 underline font-mono"
                          >
                            Edit counts
                          </button>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => markAttendance(sub.subjectId, 'present')}
                              className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-teal-50 dark:bg-teal-950/80 text-teal-800 dark:text-teal-200 border border-teal-200 dark:border-teal-800 hover:bg-teal-100 transition-colors flex items-center gap-1"
                              title="Mark 1 Class Attended"
                            >
                              <Plus className="w-3 h-3" />
                              <span>Attended</span>
                            </button>

                            <button
                              onClick={() => markAttendance(sub.subjectId, 'absent')}
                              className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-rose-50 dark:bg-rose-950/80 text-rose-800 dark:text-rose-200 border border-rose-200 dark:border-rose-900/60 hover:bg-rose-100 transition-colors flex items-center gap-1"
                              title="Mark 1 Class Missed / Bunked"
                            >
                              <X className="w-3 h-3" />
                              <span>Bunked</span>
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-stone-500 dark:text-stone-400">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Attendance changes auto-recalculate your safe bunks in real-time.</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAttendanceModalOpen(false)}
              className="px-4 py-2 rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 font-medium transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
