import React, { useState } from 'react';
import {
  X,
  Lock,
  Mail,
  User,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
  Eye,
  EyeOff,
  BookOpen,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { COLLEGES_LIST, BRANCHES_LIST } from '../data/btechData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'signup' | 'signin';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, defaultMode = 'signup' }) => {
  const { signUp, signIn, currentUser, signOut } = useApp();
  const [mode, setMode] = useState<'signup' | 'signin'>(defaultMode);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [college, setCollege] = useState('SATI VIDISHA');
  const [branch, setBranch] = useState(BRANCHES_LIST[0]);
  const [semester, setSemester] = useState(1);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid student email address.');
      return;
    }

    if (!password || password.length < 4) {
      setErrorMsg('Password should be at least 4 characters.');
      return;
    }

    if (mode === 'signup') {
      if (!name.trim()) {
        setErrorMsg('Please enter your full name.');
        return;
      }

      signUp({
        name,
        email,
        password,
        college,
        branch,
        semester,
      });

      setSuccessMsg('Account created successfully! Welcome to PlanZo.');
      setTimeout(() => {
        setSuccessMsg('');
        onClose();
      }, 700);
    } else {
      signIn(email, password);
      setSuccessMsg('Welcome back! Logging into your workspace...');
      setTimeout(() => {
        setSuccessMsg('');
        onClose();
      }, 700);
    }
  };

  const handleQuickDemoLogin = () => {
    signIn('student.demo@planzo.edu', 'demo1234');
    setSuccessMsg('Logged in with Verified Student Demo Account!');
    setTimeout(() => {
      setSuccessMsg('');
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-white dark:bg-[#0d131f] border border-stone-200/90 dark:border-stone-800 rounded-3xl p-5 sm:p-6 w-full max-w-lg shadow-2xl space-y-5 max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 flex items-center justify-center font-bold text-sm shadow-xs">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <span>{currentUser?.isAuthenticated ? 'Student Account & Session' : mode === 'signup' ? 'Create Student Account' : 'Student Sign In'}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-bold border border-emerald-500/30">
                  {currentUser?.isAuthenticated ? 'Active' : mode === 'signup' ? 'New User' : 'Sign In'}
                </span>
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                {currentUser?.isAuthenticated
                  ? 'Your active PlanZo session synchronized with SATI Vidisha.'
                  : 'Access your timetable, attendance records, and syllabus.'}
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

        {/* If Currently Logged In: Show Account Summary */}
        {currentUser && currentUser.isAuthenticated && (
          <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/80 dark:bg-[#0c1017] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 flex items-center justify-center font-bold text-base font-mono">
                  {currentUser.name ? currentUser.name[0].toUpperCase() : 'S'}
                </div>
                <div>
                  <div className="font-bold text-stone-900 dark:text-stone-100 text-sm">
                    {currentUser.name}
                  </div>
                  <div className="text-[11px] text-stone-500 font-mono">
                    {currentUser.email}
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold">
                Logged In
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1 text-stone-600 dark:text-stone-400">
              <div>Semester: <strong className="text-stone-900 dark:text-stone-100">Semester {currentUser.semester}</strong></div>
              <div className="truncate">College: <strong className="text-stone-900 dark:text-stone-100">{currentUser.college}</strong></div>
            </div>

            <div className="pt-2 border-t border-stone-200/80 dark:border-stone-800 flex items-center justify-between">
              <span className="text-xs text-stone-500">Need to switch accounts?</span>
              <button
                type="button"
                onClick={() => {
                  signOut();
                  setSuccessMsg('Signed out successfully.');
                  setTimeout(() => setSuccessMsg(''), 1000);
                }}
                className="px-3 py-1.5 rounded-lg border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-semibold cursor-pointer transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}

        {/* Tab Switcher: Sign Up vs Sign In */}
        <div className="grid grid-cols-2 p-1 bg-stone-100 dark:bg-stone-900 rounded-xl gap-1 border border-stone-200/80 dark:border-stone-800">
          <button
            type="button"
            onClick={() => {
              setMode('signin');
              setErrorMsg('');
            }}
            className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              mode === 'signin'
                ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-xs'
                : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            Sign In / Switch
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setErrorMsg('');
            }}
            className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              mode === 'signup'
                ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-xs'
                : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            Create New Account
          </button>
        </div>

        {/* Feedback Messages */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-medium animate-fadeIn">
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-medium flex items-center gap-1.5 animate-fadeIn">
            <Check className="w-4 h-4" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          
          {mode === 'signup' && (
            <div className="space-y-1.5">
              <label className="font-semibold text-stone-700 dark:text-stone-300">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  required
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50/70 dark:bg-stone-900/60 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 font-medium transition-all"
                />
              </div>
            </div>
          )}

          {/* Email Address */}
          <div className="space-y-1.5">
            <label className="font-semibold text-stone-700 dark:text-stone-300 flex items-center justify-between">
              <span>College or Personal Email</span>
              <span className="text-[10px] font-mono text-stone-400">Syncs records</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@college.edu or gmail.com"
                required
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50/70 dark:bg-stone-900/60 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 font-medium transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="font-semibold text-stone-700 dark:text-stone-300">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50/70 dark:bg-stone-900/60 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 font-medium transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {mode === 'signup' && (
            <>
              {/* Branch */}
              <div className="space-y-1.5">
                <label className="font-semibold text-stone-700 dark:text-stone-300">
                  Engineering Branch
                </label>
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50/70 dark:bg-stone-900/60 text-stone-900 dark:text-stone-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 font-medium transition-all truncate cursor-pointer"
                >
                  {BRANCHES_LIST.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {/* Submit Action Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold flex items-center justify-center gap-2 transition-all active:scale-98 shadow-sm cursor-pointer mt-4"
          >
            <span>{mode === 'signup' ? 'Complete Student Registration' : 'Sign In to Workspace'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* 1-Click Demo Login Banner */}
        <div className="pt-2 border-t border-stone-100 dark:border-stone-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span>Fast test credentials:</span>
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline cursor-pointer flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>1-Click Verified Student Login</span>
            </button>
          </div>

          {currentUser?.isAuthenticated && (
            <div className="p-3 rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs">
              <div className="truncate">
                <span className="text-stone-400">Current active user: </span>
                <strong className="text-stone-900 dark:text-stone-100">{currentUser.name}</strong>
              </div>
              <button
                type="button"
                onClick={signOut}
                className="text-rose-600 dark:text-rose-400 hover:underline font-semibold cursor-pointer shrink-0 ml-2"
              >
                Log Out
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
