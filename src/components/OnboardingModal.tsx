import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  COLLEGES_LIST,
  BRANCHES_LIST,
  DEFAULT_HABITS,
} from '../data/btechData';
import { X, Check, Compass, Sparkles, Clock, ShieldCheck } from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose }) => {
  const { profile, updateProfile, recalibrateSchedule } = useApp();

  const [name, setName] = useState(profile.name || '');
  const [college, setCollege] = useState(profile.college || COLLEGES_LIST[0]);
  const [customCollege, setCustomCollege] = useState(profile.customCollege || '');
  const [branch, setBranch] = useState(profile.branch);
  const [semester, setSemester] = useState(profile.semester);
  const [wakeTime, setWakeTime] = useState(profile.wakeTime);
  const [sleepTime, setSleepTime] = useState(profile.sleepTime);
  const [selectedHabits, setSelectedHabits] = useState<string[]>(profile.selectedHabits);

  if (!isOpen) return null;

  const toggleHabit = (habit: string) => {
    if (selectedHabits.includes(habit)) {
      setSelectedHabits(selectedHabits.filter((h) => h !== habit));
    } else {
      if (selectedHabits.length < 4) {
        setSelectedHabits([...selectedHabits, habit]);
      }
    }
  };

  const handleSave = () => {
    const resolvedCollege = college === 'OTHERS' ? (customCollege.trim() || 'Engineering Institute') : college;
    updateProfile({
      name: name.trim() || profile.name || 'Student',
      college: resolvedCollege,
      customCollege: resolvedCollege,
      branch,
      semester,
      wakeTime,
      sleepTime,
      selectedHabits,
      onboarded: true,
    });
    recalibrateSchedule();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/50 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="max-w-lg w-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl p-6 space-y-5 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-teal-800 text-stone-100 flex items-center justify-center font-serif text-base font-bold">
              P
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                PlanZo Profile & Calibration
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Personalize your name, university, and daily academic rhythm.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 0. Student Name Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 flex items-center justify-between">
            <span>Your Name / Preferred Name</span>
            <span className="text-[11px] text-teal-700 dark:text-teal-400 font-normal">Displayed on your dashboard</span>
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name (e.g. Rahul Sharma)"
            className="w-full rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 p-2.5 text-xs text-stone-900 dark:text-stone-100 focus:outline-hidden focus:border-teal-500 font-medium"
          />
        </div>

        {/* 1. College Selection */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
            College / University
          </label>
          <select
            value={college}
            onChange={(e) => setCollege(e.target.value)}
            className="w-full rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 p-2.5 text-xs text-stone-900 dark:text-stone-100 focus:outline-hidden focus:border-teal-500 font-medium"
          >
            {COLLEGES_LIST.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          {/* If OTHERS selected, allow typing custom college */}
          {college === 'OTHERS' && (
            <input
              type="text"
              value={customCollege}
              onChange={(e) => setCustomCollege(e.target.value)}
              placeholder="Enter your Institute / University name"
              className="mt-2 w-full rounded-xl bg-stone-50 dark:bg-stone-800 border border-teal-500/70 p-2.5 text-xs text-stone-900 dark:text-stone-100 focus:outline-hidden font-medium"
            />
          )}
        </div>

        {/* 2. Branch & Semester */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
              Engineering Branch
            </label>
            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="w-full rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 p-2.5 text-xs text-stone-900 dark:text-stone-100 focus:outline-hidden focus:border-teal-500"
            >
              {BRANCHES_LIST.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
              Semester
            </label>
            <select
              value={semester}
              onChange={(e) => setSemester(Number(e.target.value))}
              className="w-full rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 p-2.5 text-xs text-stone-900 dark:text-stone-100 focus:outline-hidden focus:border-teal-500"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                <option key={s} value={s}>
                  Semester {s} ({s <= 2 ? '1st Year' : s <= 4 ? '2nd Year' : s <= 6 ? '3rd Year' : 'Final Year'})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 3. Sleep & Wake Hours */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-teal-600" />
              <span>Wake Time</span>
            </label>
            <input
              type="time"
              value={wakeTime}
              onChange={(e) => setWakeTime(e.target.value)}
              className="w-full rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 p-2 text-xs text-stone-900 dark:text-stone-100"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-teal-600" />
              <span>Sleep Goal</span>
            </label>
            <input
              type="time"
              value={sleepTime}
              onChange={(e) => setSleepTime(e.target.value)}
              className="w-full rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 p-2 text-xs text-stone-900 dark:text-stone-100"
            />
          </div>
        </div>

        {/* Footer save & submit trigger */}
        <div className="pt-2 flex items-center justify-end gap-2 border-t border-stone-100 dark:border-stone-800">
          <button
            onClick={onClose}
            className="px-3.5 py-2 rounded-xl text-xs font-medium text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-teal-800 text-stone-100 hover:bg-teal-700 dark:bg-teal-700 dark:hover:bg-teal-600 transition-colors shadow-xs"
          >
            Submit
          </button>
        </div>

      </div>
    </div>
  );
};
