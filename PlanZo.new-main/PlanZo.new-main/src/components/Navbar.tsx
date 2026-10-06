// PlanZo Top Navbar
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sun,
  Moon,
  CalendarPlus,
  Sliders,
  UserCheck,
  Clock,
  ShieldCheck,
  BarChart3,
  BookOpen,
  Menu,
  X,
  Flame,
  Zap,
  Bot,
  Headphones,
  LineChart,
} from 'lucide-react';
import { AuthModal } from './AuthModal';
import { ScheduleTaskModal } from './ScheduleTaskModal';
import { StreakModal } from './StreakModal';
import { XpModal } from './XpModal';
import { StudentAiChatbotModal } from './StudentAiChatbotModal';
import { LofiAudioModal } from './LofiAudioModal';

interface NavbarProps {
  onOpenOnboarding: () => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenOnboarding, isDarkMode, setIsDarkMode }) => {
  const {
    activeView,
    setActiveView,
    currentUser,
    setIsPersonalizationWizardOpen,
    userStreak,
    userXp,
  } = useApp();

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isStreakModalOpen, setIsStreakModalOpen] = useState(false);
  const [isXpModalOpen, setIsXpModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isLofiModalOpen, setIsLofiModalOpen] = useState(false);

  const toggleTheme = () => {
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);
    if (nextMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  };

  const navLinks = [
    { id: 'home', label: 'Overview', icon: BarChart3 },
    { id: 'timeline', label: 'Routine', icon: Clock },
    { id: 'academic', label: 'Academic Vault', icon: BookOpen },
    { id: 'attendance', label: '75% Attendance', icon: ShieldCheck },
    { id: 'analytics', label: 'Analytics', icon: LineChart },
  ] as const;

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-stone-200/90 dark:border-stone-800 bg-white/95 dark:bg-[#0c1017]/95 backdrop-blur-md transition-colors">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-3">
            
            {/* Zone 1: Brand Logo & Tagline */}
            <div className="flex items-center gap-3 min-w-0">
              {/* Brand Logo & Wordmark */}
              <button
                onClick={() => {
                  setActiveView('home');
                  setIsMobileNavOpen(false);
                }}
                className="flex items-center gap-2.5 cursor-pointer shrink-0 group text-left"
                title="Go to Overview"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-teal-700 to-emerald-600 dark:from-teal-600 dark:to-emerald-500 text-white flex items-center justify-center font-bold text-sm tracking-tight shadow-xs">
                  P
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-base text-stone-900 dark:text-stone-100 tracking-tight">
                      PlanZo
                    </span>
                    <span className="hidden xl:inline text-[10px] font-mono px-1.5 py-0.2 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400">
                      B.Tech
                    </span>
                  </div>
                  <p className="hidden md:block text-[10px] text-teal-700 dark:text-teal-400 font-medium tracking-tight">
                    For the student, by the student, to the student
                  </p>
                </div>
              </button>
            </div>

            {/* Zone 2: Navigation Links (Center) */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((item) => {
                const isActive = activeView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveView(item.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100'
                        : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-50 dark:hover:bg-stone-850'
                    }`}
                  >
                    <item.icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: Gamification Badges & Tools (Right) */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              
              {/* Streak Counter */}
              <button
                onClick={() => setIsStreakModalOpen(true)}
                className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 border border-amber-200/60 dark:border-amber-900/60 hover:scale-105 transition-transform"
                title="Current Daily Streak"
              >
                <Flame className="w-3.5 h-3.5 fill-current" />
                <span>{userStreak}</span>
              </button>

              {/* XP Counter */}
              <button
                onClick={() => setIsXpModalOpen(true)}
                className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/50 border border-teal-200/60 dark:border-teal-900/60 hover:scale-105 transition-transform"
                title="Current XP Score"
              >
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>{userXp}</span>
              </button>

              {/* Sarthi AI Button */}
              <button
                onClick={() => setIsAiModalOpen(true)}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-teal-700 to-emerald-600 hover:from-teal-800 hover:to-emerald-700 text-white shadow-xs transition-all"
                title="Open Sarthi AI Student Copilot"
              >
                <Bot className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Sarthi AI</span>
              </button>

              {/* Lofi Beats */}
              <button
                onClick={() => setIsLofiModalOpen(true)}
                className="p-1.5 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                title="Focus Ambient Lo-Fi Audio"
              >
                <Headphones className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              </button>

              {/* + Add Task */}
              <button
                onClick={() => setIsScheduleModalOpen(true)}
                className="hidden md:inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-950 text-xs font-semibold transition-colors shadow-xs"
              >
                <CalendarPlus className="w-3.5 h-3.5" />
                <span>+ Task</span>
              </button>

              {/* Auth / Account */}
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-colors border ${
                  currentUser?.isAuthenticated
                    ? 'border-emerald-500/40 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                    : 'border-stone-200 dark:border-stone-700 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="hidden sm:inline max-w-[70px] truncate">
                  {currentUser?.name ? currentUser.name.split(' ')[0] : 'Account'}
                </span>
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-1.5 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
                className="lg:hidden p-1.5 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                {isMobileNavOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>

            </div>

          </div>

          {/* Mobile Drawer */}
          {isMobileNavOpen && (
            <div className="lg:hidden py-3 border-t border-stone-200 dark:border-stone-800 space-y-1 animate-fadeIn">
              {navLinks.map((item) => {
                const isActive = activeView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveView(item.id);
                      setIsMobileNavOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                      isActive
                        ? 'bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100'
                        : 'text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-850'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}

              <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex flex-col gap-1">
                <button
                  onClick={() => {
                    setIsMobileNavOpen(false);
                    setIsAiModalOpen(true);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-teal-700 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-950/60"
                >
                  <Bot className="w-4 h-4" />
                  <span>Sarthi AI Copilot</span>
                </button>

                <button
                  onClick={() => {
                    setIsMobileNavOpen(false);
                    setIsPersonalizationWizardOpen(true);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-850"
                >
                  <Sliders className="w-4 h-4" />
                  <span>Academic Personalization Settings</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </header>

      {/* Embedded Modals */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
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
      <StudentAiChatbotModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />
      <LofiAudioModal
        isOpen={isLofiModalOpen}
        onClose={() => setIsLofiModalOpen(false)}
      />
    </>
  );
};
