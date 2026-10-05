import React from 'react';
import { useApp } from '../context/AppContext';
import { Leaf, Sun, Wind } from 'lucide-react';

export const FocusGarden: React.FC = () => {
  const { timetable } = useApp();

  const totalTasks = timetable.length;
  const completedTasks = timetable.filter((t) => t.completed).length;
  const completedHabits = timetable.filter((t) => t.completed && t.category === 'habit').length;
  const completedStudy = timetable.filter((t) => t.completed && t.category === 'study').length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Visual plants & flowers data corresponding to mindful progress
  const flowerCount = Math.min(6, Math.max(1, Math.floor(completedTasks / 2)));
  const leafCount = Math.min(8, completedHabits * 2 + completedStudy * 2);

  return (
    <div className="rounded-2xl border border-stone-200/90 dark:border-stone-800 bg-linear-to-b from-stone-50/80 to-stone-100/50 dark:from-stone-900/60 dark:to-stone-950/40 p-5 shadow-xs transition-all relative overflow-hidden">
      
      {/* Garden Top Title & Stats */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Leaf className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span className="text-xs font-semibold text-stone-900 dark:text-stone-100 uppercase tracking-wider">
            Focus Garden
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
          <span>{completedTasks} of {totalTasks} Mindful Blocks Bloomed</span>
          <span className="font-mono text-emerald-700 dark:text-emerald-400 font-medium">({completionRate}%)</span>
        </div>
      </div>

      <p className="text-xs text-stone-500 dark:text-stone-400 mb-4">
        As you complete deep-work sprints and habits, your focus garden blooms. A gentle visual representation of your calm daily progress.
      </p>

      {/* SVG Canvas for Organic Plants and Bonsai Garden */}
      <div className="relative h-44 w-full rounded-xl bg-linear-to-t from-emerald-950/5 via-teal-900/2 to-transparent dark:from-emerald-950/30 dark:via-stone-900/40 dark:to-transparent flex items-end justify-center border border-emerald-900/10 dark:border-emerald-800/20 px-4 pb-2">
        
        {/* Subtle Ambient Sun & Breeze */}
        <div className="absolute top-3 left-4 flex items-center gap-1.5 text-stone-400 dark:text-stone-600">
          <Sun className="w-4 h-4 text-amber-500/70" />
          <span className="text-[11px] font-mono">Calm Morning Air</span>
        </div>

        <div className="absolute top-3 right-4 flex items-center gap-1 text-stone-400 dark:text-stone-600">
          <Wind className="w-3.5 h-3.5" />
          <span className="text-[11px]">{completedHabits} habits rooted</span>
        </div>

        <svg viewBox="0 0 600 160" className="w-full h-full max-h-36 overflow-visible">
          {/* Ground soil line */}
          <path
            d="M 20 148 Q 150 144, 300 148 T 580 148"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-stone-300 dark:text-stone-700"
          />

          {/* Plant 1: Center Lotus / Bonsai Stem */}
          <g className="transition-all duration-700 ease-out transform origin-bottom">
            {/* Trunk */}
            <path
              d="M 300 148 Q 295 110, 300 80 Q 305 60, 300 45"
              fill="none"
              stroke="#0f766e"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Branch Left */}
            <path
              d="M 298 100 Q 275 88, 255 92"
              fill="none"
              stroke="#0f766e"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Branch Right */}
            <path
              d="M 300 85 Q 325 72, 345 78"
              fill="none"
              stroke="#0f766e"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Central Blossom (grows with study sessions) */}
            <g transform="translate(300, 42)">
              <circle
                r={completedTasks >= 1 ? 9 : 4}
                className="fill-teal-500/40 dark:fill-teal-400/30 transition-all duration-500"
              />
              <circle
                r={completedTasks >= 2 ? 6 : 2}
                className="fill-emerald-400 dark:fill-emerald-500 transition-all duration-500"
              />
              <circle r="3" className="fill-amber-300" />
            </g>

            {/* Left Blossom */}
            {completedTasks >= 3 && (
              <g transform="translate(252, 90)">
                <circle r="6" className="fill-teal-400/60 dark:fill-teal-500/50" />
                <circle r="3" className="fill-amber-300" />
              </g>
            )}

            {/* Right Blossom */}
            {completedTasks >= 4 && (
              <g transform="translate(347, 76)">
                <circle r="6" className="fill-teal-400/60 dark:fill-teal-500/50" />
                <circle r="3" className="fill-amber-300" />
              </g>
            )}

            {/* Additional Leaves on Branches */}
            {leafCount >= 2 && (
              <ellipse cx="280" cy="94" rx="8" ry="4" transform="rotate(-15 280 94)" className="fill-emerald-600/70" />
            )}
            {leafCount >= 4 && (
              <ellipse cx="320" cy="78" rx="8" ry="4" transform="rotate(15 320 78)" className="fill-emerald-600/70" />
            )}
            {leafCount >= 6 && (
              <ellipse cx="295" cy="62" rx="7" ry="3.5" transform="rotate(-30 295 62)" className="fill-teal-600/70" />
            )}
            {leafCount >= 8 && (
              <ellipse cx="308" cy="56" rx="7" ry="3.5" transform="rotate(25 308 56)" className="fill-teal-600/70" />
            )}
          </g>

          {/* Plant 2: Left Sprout (Habits) */}
          <g transform="translate(180, 0)">
            <path
              d="M 0 148 Q -5 125, 0 108"
              fill="none"
              stroke="#059669"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {completedHabits >= 1 && (
              <ellipse cx="-4" cy="115" rx="7" ry="3.5" transform="rotate(-40 -4 115)" className="fill-emerald-500" />
            )}
            {completedHabits >= 2 && (
              <ellipse cx="4" cy="110" rx="7" ry="3.5" transform="rotate(35 4 110)" className="fill-emerald-600" />
            )}
            {completedHabits >= 3 && (
              <circle cx="0" cy="104" r="4" className="fill-amber-400" />
            )}
          </g>

          {/* Plant 3: Right Bamboo Stalk (Deep Work) */}
          <g transform="translate(420, 0)">
            <path
              d="M 0 148 Q 5 120, 0 95 Q -3 75, 0 65"
              fill="none"
              stroke="#047857"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            {completedStudy >= 1 && (
              <path d="M 0 115 Q 12 110, 18 114" fill="none" stroke="#059669" strokeWidth="2" />
            )}
            {completedStudy >= 1 && (
              <ellipse cx="18" cy="114" rx="6" ry="3" transform="rotate(10 18 114)" className="fill-emerald-500" />
            )}
            {completedStudy >= 2 && (
              <ellipse cx="-12" cy="85" rx="6" ry="3" transform="rotate(-20 -12 85)" className="fill-teal-500" />
            )}
          </g>

          {/* Stones / Zen Pebble balance */}
          <ellipse cx="120" cy="148" rx="14" ry="6" className="fill-stone-300 dark:fill-stone-700" />
          <ellipse cx="123" cy="142" rx="9" ry="4" className="fill-stone-400 dark:fill-stone-600" />
          <ellipse cx="480" cy="148" rx="16" ry="7" className="fill-stone-300 dark:fill-stone-700" />
          <ellipse cx="478" cy="141" rx="10" ry="4" className="fill-stone-400 dark:fill-stone-600" />
        </svg>

      </div>

      {/* Encouraging zero-guilt micro-text */}
      <div className="mt-2.5 flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400">
        <span>No penalty for missed slots · Every completed task nourishes your garden</span>
        <span>Tap any study block to enter Zen focus</span>
      </div>

    </div>
  );
};
