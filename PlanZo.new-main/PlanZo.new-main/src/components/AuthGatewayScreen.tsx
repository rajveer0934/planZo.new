// PlanZo Auth Gateway Screen
import React, { useState } from 'react';
import {
  Lock,
  User,
  Eye,
  EyeOff,
  Sun,
  Moon,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  GraduationCap,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { playTaskCompleteSound } from '../utils/audioSynth';
import { fireConfetti } from '../utils/audioVibes';

interface AuthGatewayScreenProps {
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
}

export const AuthGatewayScreen: React.FC<AuthGatewayScreenProps> = ({
  isDarkMode,
  setIsDarkMode,
}) => {
  const { signUp, signIn, setIsPersonalizationWizardOpen } = useApp();

  // Mode: 'login' | 'register'
  const [mode, setMode] = useState<'login' | 'register'>('login');

  // Login Form States (NO EMAIL OR MOBILE REQUIRED)
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Register Form States (NO EMAIL OR MOBILE REQUIRED)
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);

  // Status & Feedback States
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toggleTheme = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    if (next) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      localStorage.setItem('planzo_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      localStorage.setItem('planzo_theme', 'light');
    }
  };

  // 1. Handle Login
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const cleanId = loginIdentifier.trim();
    if (!cleanId) {
      setErrorMsg('Please enter your Student Name or Username.');
      return;
    }

    if (!loginPassword || loginPassword.length < 4) {
      setErrorMsg('Password must be at least 4 characters.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const ok = signIn(cleanId, loginPassword);
      setIsLoading(false);
      if (ok) {
        setSuccessMsg('Signing in to your student workspace...');
      }
    }, 350);
  };

  // 2. Handle Register (Direct Account Creation without Email or Mobile)
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const fName = firstName.trim();
    const lName = lastName.trim();

    if (!fName) {
      setErrorMsg('Please enter your First Name.');
      return;
    }

    if (!lName) {
      setErrorMsg('Please enter your Last Name.');
      return;
    }

    if (!registerPassword || registerPassword.length < 4) {
      setErrorMsg('Password must be at least 4 characters long.');
      return;
    }

    if (registerPassword !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please re-enter your password.');
      return;
    }

    setIsLoading(true);
    playTaskCompleteSound();
    fireConfetti(60);

    setTimeout(() => {
      signUp({
        name: `${fName} ${lName}`.trim(),
        firstName: fName,
        lastName: lName,
        password: registerPassword,
        isVerified: true,
      });

      setSuccessMsg(`Welcome, ${fName}! Your student workspace is ready.`);
      setIsLoading(false);

      // Open personalization setup wizard immediately after registration
      setTimeout(() => {
        setIsPersonalizationWizardOpen(true);
      }, 250);
    }, 400);
  };

  // Quick Demo Guest Login
  const handleQuickDemoLogin = () => {
    signIn('Demo Student', 'demo1234');
    setSuccessMsg('Signed in! Opening Routine & Task Setup Wizard...');
    setTimeout(() => {
      setIsPersonalizationWizardOpen(true);
    }, 250);
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-stone-50 dark:bg-[#070b12] text-stone-900 dark:text-stone-100 transition-colors">
      
      {/* Top Header */}
      <header className="w-full border-b border-stone-200/80 dark:border-stone-800 bg-white/90 dark:bg-[#0b0f17]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-teal-700 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              P
            </div>
            <div>
              <span className="font-bold text-sm tracking-tight text-stone-900 dark:text-stone-100">
                PlanZo
              </span>
              <span className="ml-1.5 text-[10px] font-mono px-1.5 py-0.5 rounded bg-teal-50 dark:bg-teal-950 text-teal-800 dark:text-teal-300 font-semibold border border-teal-200/50 dark:border-teal-800/50">
                B.Tech Student Workspace
              </span>
            </div>
          </div>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
            title="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-600" />}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 flex items-center justify-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Product Value Proposition */}
          <div className="lg:col-span-6 space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/80 border border-teal-200/80 dark:border-teal-800 text-teal-800 dark:text-teal-200 text-xs font-semibold">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Academic Routine & Attendance Management</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-900 dark:text-stone-100 leading-tight">
              Master Your Schedule,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-700 to-emerald-600 dark:from-teal-400 dark:to-emerald-400">
                Bunk Safely
              </span>{' '}
              & Never Miss Attendance.
            </h1>

            <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base leading-relaxed max-w-lg mx-auto lg:mx-0">
              Personalized timetable management with smart attendance tracking, guilt-free schedule recalibration, and one-tap daily college attendance marking.
            </p>

            <div className="grid grid-cols-2 gap-3 text-left pt-2 max-w-md mx-auto lg:mx-0">
              <div className="p-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-white/60 dark:bg-stone-900/60">
                <span className="font-bold text-stone-900 dark:text-stone-100 block">75% Attendance Guard</span>
                <span className="text-stone-500 text-[11px]">Real-time debarment margin & safe bunk calculus</span>
              </div>
              <div className="p-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-white/60 dark:bg-stone-900/60">
                <span className="font-bold text-stone-900 dark:text-stone-100 block">Guilt-Free Routine</span>
                <span className="text-stone-500 text-[11px]">Unified college block & dynamic task rebalancing</span>
              </div>
            </div>
          </div>

          {/* Right Column: Authentication Card */}
          <div className="lg:col-span-6 w-full max-w-md mx-auto">
            <div className="bg-white dark:bg-[#0c1017] border border-stone-200/90 dark:border-stone-800 rounded-2xl p-6 sm:p-7 shadow-xl space-y-5 transition-all">
              
              {/* Status Messages */}
              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-700 dark:text-rose-300 flex items-start gap-2 animate-fadeIn">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                  <span>{errorMsg}</span>
                </div>
              )}
              {successMsg && (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-xs text-emerald-700 dark:text-emerald-300 flex items-start gap-2 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                  <span>{successMsg}</span>
                </div>
              )}

              {/* Tab Switcher: Sign In vs Create Account */}
              <div className="flex items-center p-1 rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800">
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setErrorMsg('');
                    setSuccessMsg('');
                  }}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    mode === 'login'
                      ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-xs'
                      : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode('register');
                    setErrorMsg('');
                    setSuccessMsg('');
                  }}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    mode === 'register'
                      ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-xs'
                      : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
                  }`}
                >
                  Create Account
                </button>
              </div>

              {/* ================================================================= */}
              {/* TAB 1: SIGN IN (NO EMAIL OR MOBILE REQUIRED)                      */}
              {/* ================================================================= */}
              {mode === 'login' && (
                <div className="space-y-4 animate-fadeIn">
                  <div>
                    <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                      Sign In
                    </h2>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Enter your Student Name or Username and password to continue.
                    </p>
                  </div>

                  <form onSubmit={handleSignIn} className="space-y-3.5">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                        Student Name / Username
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={loginIdentifier}
                          onChange={(e) => setLoginIdentifier(e.target.value)}
                          placeholder="e.g. Rahul Sharma or Demo Student"
                          required
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50/60 dark:bg-stone-900/60 text-stone-900 dark:text-stone-100 text-xs focus:outline-hidden focus:ring-2 focus:ring-teal-500/50"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type={showLoginPassword ? 'text' : 'password'}
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          placeholder="••••••••"
                          required
                          className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50/60 dark:bg-stone-900/60 text-stone-900 dark:text-stone-100 text-xs focus:outline-hidden focus:ring-2 focus:ring-teal-500/50"
                        />
                        <button
                          type="button"
                          onClick={() => setShowLoginPassword(!showLoginPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 cursor-pointer"
                        >
                          {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer mt-1"
                    >
                      <span>{isLoading ? 'Authenticating...' : 'Sign In to Workspace'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </form>

                  {/* Quick 1-Click Demo Login */}
                  <div className="pt-3 border-t border-stone-100 dark:border-stone-800">
                    <button
                      type="button"
                      onClick={handleQuickDemoLogin}
                      className="w-full py-2.5 px-3 rounded-xl border border-teal-500/40 bg-teal-50/60 dark:bg-teal-950/40 text-teal-800 dark:text-teal-200 font-semibold text-xs hover:bg-teal-100/70 dark:hover:bg-teal-900/60 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <KeyRound className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
                      <span>⚡ Quick 1-Click Guest Login</span>
                    </button>
                  </div>
                </div>
              )}

              {/* ================================================================= */}
              {/* TAB 2: CREATE ACCOUNT (NO EMAIL OR MOBILE REQUIRED)               */}
              {/* ================================================================= */}
              {mode === 'register' && (
                <div className="space-y-4 animate-fadeIn">
                  <div>
                    <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                      Create Student Account
                    </h2>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Enter your name and password to get started immediately.
                    </p>
                  </div>

                  <form onSubmit={handleRegister} className="space-y-3">
                    {/* First Name & Last Name (2 columns) */}
                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                          First Name
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="e.g. Rahul"
                            required
                            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50/60 dark:bg-stone-900/60 text-stone-900 dark:text-stone-100 text-xs focus:outline-hidden focus:ring-2 focus:ring-teal-500/50"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="e.g. Sharma"
                          required
                          className="w-full px-3 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50/60 dark:bg-stone-900/60 text-stone-900 dark:text-stone-100 text-xs focus:outline-hidden focus:ring-2 focus:ring-teal-500/50"
                        />
                      </div>
                    </div>

                    {/* Create Password */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                        Create Password
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type={showRegisterPassword ? 'text' : 'password'}
                          value={registerPassword}
                          onChange={(e) => setRegisterPassword(e.target.value)}
                          placeholder="At least 4 characters"
                          required
                          className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50/60 dark:bg-stone-900/60 text-stone-900 dark:text-stone-100 text-xs focus:outline-hidden focus:ring-2 focus:ring-teal-500/50"
                        />
                        <button
                          type="button"
                          onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 cursor-pointer"
                        >
                          {showRegisterPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type={showRegisterPassword ? 'text' : 'password'}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Re-enter your password"
                          required
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50/60 dark:bg-stone-900/60 text-stone-900 dark:text-stone-100 text-xs focus:outline-hidden focus:ring-2 focus:ring-teal-500/50"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer mt-2"
                    >
                      <span>{isLoading ? 'Creating Account...' : 'Create Account & Continue →'}</span>
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-stone-200/80 dark:border-stone-800 py-4 text-center text-xs text-stone-500">
        <p>PlanZo • Engineering Academic Routines, Attendance & Task Management</p>
      </footer>
    </div>
  );
};
