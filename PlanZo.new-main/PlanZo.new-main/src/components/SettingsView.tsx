// PlanZo Settings View
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  GraduationCap,
  Moon,
  Sun,
  Bell,
  Clock,
  Bot,
  Database,
  Shield,
  Save,
  Check,
  Download,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { ALL_8_SEMESTERS } from '../data/btechData';

interface SettingsViewProps {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  isDarkMode,
  setIsDarkMode,
}) => {
  const { profile, updateProfile, currentUser, timetable, attendance } = useApp();

  const [activeSection, setActiveSection] = useState<'account' | 'academic' | 'appearance' | 'study' | 'data'>('academic');

  // Form states
  const [name, setName] = useState(profile.name || '');
  const [college, setCollege] = useState(profile.customCollege || profile.college || '');
  const [branch, setBranch] = useState(profile.branch || 'Computer Science & Engineering');
  const [semester, setSemester] = useState(profile.semester || 4);
  const [wakeTime, setWakeTime] = useState(profile.wakeTime || '07:00');
  const [sleepTime, setSleepTime] = useState(profile.sleepTime || '23:30');
  const [collegeStart, setCollegeStart] = useState(profile.collegeStart || '10:30');
  const [collegeEnd, setCollegeEnd] = useState(profile.collegeEnd || '17:30');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveAcademic = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      college,
      customCollege: college,
      branch,
      semester,
      wakeTime,
      sleepTime,
      collegeStart,
      collegeEnd,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleExportData = () => {
    const data = {
      profile,
      currentUser,
      timetable,
      attendance,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `planzo-academic-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-stone-200/80 dark:border-stone-800">
        <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
          System Settings
        </h2>
        <p className="text-xs text-stone-500">
          Manage your account profile, college regulations, and study parameters
        </p>
      </div>

      {/* Main Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left Subnav */}
        <div className="md:col-span-3 space-y-1">
          <button
            onClick={() => setActiveSection('academic')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              activeSection === 'academic'
                ? 'bg-teal-50 dark:bg-teal-950/70 text-teal-800 dark:text-teal-300 font-bold'
                : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-850'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span>Academic Profile</span>
          </button>

          <button
            onClick={() => setActiveSection('account')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              activeSection === 'account'
                ? 'bg-teal-50 dark:bg-teal-950/70 text-teal-800 dark:text-teal-300 font-bold'
                : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-850'
            }`}
          >
            <User className="w-4 h-4 text-stone-400" />
            <span>Account Details</span>
          </button>

          <button
            onClick={() => setActiveSection('appearance')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              activeSection === 'appearance'
                ? 'bg-teal-50 dark:bg-teal-950/70 text-teal-800 dark:text-teal-300 font-bold'
                : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-850'
            }`}
          >
            <Moon className="w-4 h-4 text-stone-400" />
            <span>Appearance</span>
          </button>

          <button
            onClick={() => setActiveSection('study')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              activeSection === 'study'
                ? 'bg-teal-50 dark:bg-teal-950/70 text-teal-800 dark:text-teal-300 font-bold'
                : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-850'
            }`}
          >
            <Clock className="w-4 h-4 text-stone-400" />
            <span>Routine & Study Hours</span>
          </button>

          <button
            onClick={() => setActiveSection('data')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              activeSection === 'data'
                ? 'bg-teal-50 dark:bg-teal-950/70 text-teal-800 dark:text-teal-300 font-bold'
                : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-850'
            }`}
          >
            <Database className="w-4 h-4 text-stone-400" />
            <span>Data & Privacy</span>
          </button>
        </div>

        {/* Right Settings Panel */}
        <div className="md:col-span-9 bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 rounded-2xl p-6 shadow-xs">
          {/* Section: Academic Profile */}
          {activeSection === 'academic' && (
            <form onSubmit={handleSaveAcademic} className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                  Academic Profile & Curricula
                </h3>
                <p className="text-xs text-stone-500">
                  Used to populate your semester syllabus, exam countdowns, and daily schedule
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                    Student Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-850 text-xs font-medium text-stone-900 dark:text-stone-100 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                    College / University
                  </label>
                  <input
                    type="text"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-850 text-xs font-medium text-stone-900 dark:text-stone-100 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                    Engineering Branch
                  </label>
                  <input
                    type="text"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-850 text-xs font-medium text-stone-900 dark:text-stone-100 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                    Current Semester
                  </label>
                  <select
                    value={semester}
                    onChange={(e) => setSemester(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-850 text-xs font-bold text-stone-900 dark:text-stone-100 focus:outline-hidden focus:ring-2 focus:ring-teal-500 cursor-pointer"
                  >
                    {ALL_8_SEMESTERS.map((s) => (
                      <option key={s.sem} value={s.sem}>
                        {s.name} ({s.year})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                {savedSuccess ? (
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <Check className="w-4 h-4" />
                    <span>Changes saved successfully</span>
                  </span>
                ) : <span />}

                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          )}

          {/* Section: Account */}
          {activeSection === 'account' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                  Account Details
                </h3>
                <p className="text-xs text-stone-500">
                  Your local workspace session credentials
                </p>
              </div>

              <div className="space-y-3 pt-2 text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 dark:bg-stone-850 border border-stone-200/60 dark:border-stone-800">
                  <div>
                    <div className="font-semibold text-stone-700 dark:text-stone-300">Student Identity</div>
                    <div className="text-stone-500 font-mono mt-0.5">{currentUser?.name || 'Enrolled Student'}</div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-bold">
                    Active Session
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 dark:bg-stone-850 border border-stone-200/60 dark:border-stone-800">
                  <div>
                    <div className="font-semibold text-stone-700 dark:text-stone-300">Joined On</div>
                    <div className="text-stone-500 font-mono mt-0.5">{currentUser?.joinedAt || '2026 Academic Batch'}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section: Appearance */}
          {activeSection === 'appearance' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                  Appearance
                </h3>
                <p className="text-xs text-stone-500">
                  Choose your interface theme
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setIsDarkMode(false)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    !isDarkMode
                      ? 'border-teal-600 bg-teal-50/30 ring-2 ring-teal-500/40'
                      : 'border-stone-200 dark:border-stone-700 hover:border-stone-400'
                  }`}
                >
                  <Sun className="w-5 h-5 text-amber-500 mb-2" />
                  <div className="text-xs font-bold text-stone-900 dark:text-stone-100">Light Mode</div>
                  <div className="text-[11px] text-stone-500 mt-0.5">High-contrast daytime study</div>
                </button>

                <button
                  type="button"
                  onClick={() => setIsDarkMode(true)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    isDarkMode
                      ? 'border-teal-500 bg-teal-950/30 ring-2 ring-teal-500/40'
                      : 'border-stone-200 dark:border-stone-700 hover:border-stone-400'
                  }`}
                >
                  <Moon className="w-5 h-5 text-teal-400 mb-2" />
                  <div className="text-xs font-bold text-stone-900 dark:text-stone-100">Dark Mode</div>
                  <div className="text-[11px] text-stone-500 mt-0.5">Late-night coding & library focus</div>
                </button>
              </div>
            </div>
          )}

          {/* Section: Routine & Study */}
          {activeSection === 'study' && (
            <form onSubmit={handleSaveAcademic} className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                  College Routine & Working Hours
                </h3>
                <p className="text-xs text-stone-500">
                  Timings automatically applied to calibrate your day and avoid burnout
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                    College Starts At
                  </label>
                  <input
                    type="time"
                    value={collegeStart}
                    onChange={(e) => setCollegeStart(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs font-bold text-stone-900 dark:text-emerald-400 focus:outline-hidden focus:ring-2 focus:ring-teal-500 font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                    College Ends At
                  </label>
                  <input
                    type="time"
                    value={collegeEnd}
                    onChange={(e) => setCollegeEnd(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs font-bold text-stone-900 dark:text-emerald-400 focus:outline-hidden focus:ring-2 focus:ring-teal-500 font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                    Wake-Up Time
                  </label>
                  <input
                    type="time"
                    value={wakeTime}
                    onChange={(e) => setWakeTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs font-bold text-stone-900 dark:text-emerald-400 focus:outline-hidden focus:ring-2 focus:ring-teal-500 font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                    Sleep Time
                  </label>
                  <input
                    type="time"
                    value={sleepTime}
                    onChange={(e) => setSleepTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs font-bold text-stone-900 dark:text-emerald-400 focus:outline-hidden focus:ring-2 focus:ring-teal-500 font-mono"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Update Routine</span>
                </button>
              </div>
            </form>
          )}

          {/* Section: Data & Privacy */}
          {activeSection === 'data' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                  Data & Privacy
                </h3>
                <p className="text-xs text-stone-500">
                  Offline-first student privacy. All records remain encrypted locally on your browser.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="p-4 rounded-xl border border-stone-200/80 dark:border-stone-800 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-stone-900 dark:text-stone-100">
                      Export PlanZo Workspace (JSON)
                    </div>
                    <div className="text-[11px] text-stone-500 mt-0.5">
                      Download a full backup of your attendance records, timetable, and habits.
                    </div>
                  </div>
                  <button
                    onClick={handleExportData}
                    className="px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export JSON</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
