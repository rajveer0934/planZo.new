// PlanZo Sidebar Navigation
import React from 'react';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  Clock,
  CheckSquare,
  ShieldCheck,
  BookOpen,
  BarChart2,
  Bot,
  Settings,
  LogOut,
  Moon,
  Sun,
  X,
  Sparkles,
  Sliders,
} from 'lucide-react';

interface SidebarNavProps {
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

interface NavItem {
  id: 'home' | 'timeline' | 'tasks' | 'attendance' | 'academic' | 'analytics' | 'ai';
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  isMobileOpen,
  setIsMobileOpen,
  isDarkMode,
  setIsDarkMode,
}) => {
  const { activeView, setActiveView, profile, currentUser, signOut, setIsPersonalizationWizardOpen } = useApp();

  const primaryNav: NavItem[] = [
    { id: 'home', label: 'Overview', icon: LayoutDashboard },
    { id: 'timeline', label: 'My Day', icon: Clock },
    { id: 'tasks', label: 'Schedule and Tasks', icon: CheckSquare },
    { id: 'attendance', label: 'Attendance', icon: ShieldCheck },
    { id: 'academic', label: 'Academics', icon: BookOpen },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'ai', label: 'Sarthi AI', icon: Bot, badge: 'Copilot' },
  ];

  const handleNavClick = (viewId: any) => {
    setActiveView(viewId);
    if (isMobileOpen) {
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 z-40 bg-stone-950/60 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Persistent Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white dark:bg-[#0c1018] border-r border-stone-200/80 dark:border-stone-800/80 flex flex-col justify-between transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Header: Brand Wordmark */}
        <div>
          <div className="h-16 px-5 flex items-center justify-between border-b border-stone-100 dark:border-stone-800/80">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-700 dark:bg-teal-600 text-white flex items-center justify-center font-bold text-sm tracking-tight shadow-xs">
                P
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-stone-900 dark:text-stone-100 tracking-tight text-base font-display">
                    PLANZO
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-stone-100 dark:bg-stone-800 text-stone-500 font-semibold">
                    OS
                  </span>
                </div>
                <span className="text-[10px] text-stone-400 font-medium truncate max-w-[130px]">
                  B.Tech Workspace
                </span>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="p-1 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 lg:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-210px)] scrollbar-none">
            <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-400">
              Workspace
            </div>

            {primaryNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 font-bold'
                      : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100/80 dark:hover:bg-stone-850 hover:text-stone-900 dark:hover:text-stone-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-teal-700 dark:text-teal-400' : 'text-stone-400'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded font-bold bg-teal-100 dark:bg-teal-900/80 text-teal-800 dark:text-teal-200">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            <div className="pt-3 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-400">
              System
            </div>

            <button
              onClick={() => {
                setIsPersonalizationWizardOpen(true);
                if (isMobileOpen) setIsMobileOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-teal-800 dark:text-teal-300 bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/20 transition-colors cursor-pointer mb-1"
            >
              <div className="flex items-center gap-2.5">
                <Sliders className="w-4 h-4 text-teal-700 dark:text-teal-400" />
                <span>Routine & Tasks</span>
              </div>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded font-bold bg-teal-600 text-white">
                Setup
              </span>
            </button>

            <button
              onClick={() => handleNavClick('settings')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                activeView === 'settings'
                  ? 'bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 font-bold'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100/80 dark:hover:bg-stone-850 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              <Settings className={`w-4 h-4 ${activeView === 'settings' ? 'text-teal-700 dark:text-teal-400' : 'text-stone-400'}`} />
              <span>Settings</span>
            </button>
          </nav>
        </div>

        {/* Bottom Profile & Utilities */}
        <div className="p-3 border-t border-stone-100 dark:border-stone-800/80 space-y-2">
          {/* Quick Theme Toggle & Tagline */}
          <div className="flex items-center justify-between px-2 py-1 text-xs">
            <span className="text-[11px] text-stone-400 truncate max-w-[130px]">
              Theme mode
            </span>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-700 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 cursor-pointer"
              title="Toggle dark/light mode"
            >
              {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-stone-600" />}
            </button>
          </div>

          {/* Student Profile Card */}
          <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-200 flex items-center justify-center font-bold text-xs shrink-0">
                {((currentUser?.name || profile.name || 'S').trim())[0]?.toUpperCase()}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-stone-900 dark:text-stone-100 truncate">
                  {currentUser?.name || profile.name || 'B.Tech Student'}
                </div>
                <div className="text-[10px] text-stone-400 truncate">
                  Sem {profile.semester} · {profile.branch ? profile.branch.split(' ')[0] : 'CSE'}
                </div>
              </div>
            </div>

            <button
              onClick={signOut}
              className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors shrink-0 cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
