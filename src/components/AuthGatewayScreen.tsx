import React, { useState, useEffect, useRef } from 'react';
import {
  Lock,
  Mail,
  User,
  Eye,
  EyeOff,
  Sun,
  Moon,
  Phone,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  CheckCircle2,
  Sparkles,
  AlertCircle,
  KeyRound,
  Smartphone,
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

  // Mode: 'login' | 'register' | 'otp'
  const [mode, setMode] = useState<'login' | 'register' | 'otp'>('login');

  // Login Form States
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Register Form States
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [phone, setPhone] = useState('');

  // OTP Verification States
  const [generatedOtp, setGeneratedOtp] = useState<string>('');
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [otpTimer, setOtpTimer] = useState<number>(45);
  const [canResend, setCanResend] = useState<boolean>(false);
  const [simulatedSmsToast, setSimulatedSmsToast] = useState<string | null>(null);

  // Status & Feedback States
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer countdown effect for OTP
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (mode === 'otp' && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [mode, otpTimer]);

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

    const cleanEmail = loginEmail.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      setErrorMsg('Please enter a valid university or personal email address.');
      return;
    }

    if (!loginPassword || loginPassword.length < 4) {
      setErrorMsg('Password must be at least 4 characters.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const ok = signIn(cleanEmail, loginPassword);
      setIsLoading(false);
      if (ok) {
        setSuccessMsg('Signing in to your student workspace...');
      }
    }, 400);
  };

  // 2. Handle Proceed to OTP Verification
  const handleProceedToOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!firstName.trim()) {
      setErrorMsg('Please enter your First Name.');
      return;
    }

    if (!lastName.trim()) {
      setErrorMsg('Please enter your Last Name.');
      return;
    }

    const cleanEmail = registerEmail.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    if (!registerPassword || registerPassword.length < 4) {
      setErrorMsg('Password must be at least 4 characters long.');
      return;
    }

    // Clean and validate 10-digit phone
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    // Generate 6-digit random verification code
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    setOtpDigits(['', '', '', '', '', '']);
    setOtpTimer(45);
    setCanResend(false);

    // Simulated SMS Delivery Toast
    setSimulatedSmsToast(`📲 PlanZo Security OTP: Your 6-digit code is ${newOtp}`);

    setMode('otp');
    setTimeout(() => {
      otpInputRefs.current[0]?.focus();
    }, 150);
  };

  // 3. Handle Resend OTP
  const handleResendOtp = () => {
    if (!canResend) return;
    setErrorMsg('');
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    setOtpDigits(['', '', '', '', '', '']);
    setOtpTimer(45);
    setCanResend(false);
    setSimulatedSmsToast(`📲 New verification OTP sent: ${newOtp}`);
    otpInputRefs.current[0]?.focus();
  };

  // 4. Handle OTP Input Typing
  const handleDigitChange = (index: number, val: string) => {
    setErrorMsg('');
    const cleaned = val.replace(/\D/g, '');
    
    // Support multi-character pasting
    if (cleaned.length > 1) {
      const pasted = cleaned.slice(0, 6).split('');
      const newDigits = [...otpDigits];
      for (let i = 0; i < 6; i++) {
        newDigits[i] = pasted[i] || '';
      }
      setOtpDigits(newDigits);
      const nextIndex = Math.min(pasted.length, 5);
      otpInputRefs.current[nextIndex]?.focus();
      return;
    }

    const newDigits = [...otpDigits];
    newDigits[index] = cleaned.slice(-1);
    setOtpDigits(newDigits);

    // Auto-advance
    if (cleaned && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  // Handle Backspace on OTP
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  // Quick auto-fill generated OTP
  const handleAutoFillOtp = () => {
    if (!generatedOtp) return;
    const digits = generatedOtp.split('');
    setOtpDigits(digits);
    setErrorMsg('');
    otpInputRefs.current[5]?.focus();
  };

  // 5. Final OTP Verification & Registration
  const handleVerifyOtpAndRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const enteredCode = otpDigits.join('');
    if (enteredCode.length !== 6) {
      setErrorMsg('Please enter all 6 digits of the OTP code.');
      return;
    }

    if (enteredCode !== generatedOtp) {
      setErrorMsg('Incorrect OTP code. Please enter the valid 6-digit code shown in your notification.');
      return;
    }

    // Success! Verify and create account with exact name
    setIsLoading(true);
    playTaskCompleteSound();
    fireConfetti(60);

    const fName = firstName.trim();
    const lName = lastName.trim();
    const cleanPhone = phone.replace(/\D/g, '');
    const cleanEmail = registerEmail.trim().toLowerCase();

    setTimeout(() => {
      signUp({
        name: `${fName} ${lName}`.trim(),
        firstName: fName,
        lastName: lName,
        email: cleanEmail,
        password: registerPassword,
        phone: cleanPhone,
        isVerified: true,
      });

      setSuccessMsg(`Welcome, ${fName}! Your account is verified.`);
      setIsLoading(false);

      // Open personalization setup wizard for new student after a short delay
      setTimeout(() => {
        setIsPersonalizationWizardOpen(true);
      }, 300);
    }, 600);
  };

  // Quick Demo Guest Login
  const handleQuickDemoLogin = () => {
    signIn('student.demo@planzo.edu', 'demo1234');
    setSuccessMsg('Signed in with Demo Student Account...');
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
              <span className="text-[11px] text-stone-500 dark:text-stone-400 ml-2">
                B.Tech Student Operating System
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 transition-colors cursor-pointer"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-600" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex-1 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Purpose & Institutional Grounding */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/70 border border-teal-200 dark:border-teal-800 text-teal-800 dark:text-teal-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span>Autonomous Engineering Academic System</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-900 dark:text-stone-100 leading-tight">
            Academic Routine & Attendance Command Center
          </h1>

          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 leading-relaxed max-w-lg">
            Purpose-built for engineering undergraduates: regulatory 75% attendance protection, guilt-free schedule recalibration, and complete semester resource vault.
          </p>

          <div className="grid grid-cols-2 gap-3 max-w-md pt-2 text-xs">
            <div className="p-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-white/60 dark:bg-stone-900/60">
              <span className="font-bold text-stone-900 dark:text-stone-100 block">75% Attendance Guard</span>
              <span className="text-stone-500 text-[11px]">Real-time debarment margin & safe bunk calculus</span>
            </div>
            <div className="p-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-white/60 dark:bg-stone-900/60">
              <span className="font-bold text-stone-900 dark:text-stone-100 block">Guilt-Free Routine</span>
              <span className="text-stone-500 text-[11px]">Dynamic rebalancing without stress or backlog anxiety</span>
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

            {/* ================================================================= */}
            {/* SLIDE 1: LOGIN ONLY (No confusing tab switcher)                   */}
            {/* ================================================================= */}
            {mode === 'login' && (
              <div className="space-y-5 animate-fadeIn">
                <div>
                  <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                    Sign In
                  </h2>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Welcome back! Enter your credentials to access your student command center.
                  </p>
                </div>

                <form onSubmit={handleSignIn} className="space-y-3.5">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="e.g. rahul@satiengg.in"
                        required
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50/60 dark:bg-stone-900/60 text-stone-900 dark:text-stone-100 text-xs focus:outline-hidden focus:ring-2 focus:ring-teal-500/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <label className="font-semibold text-stone-700 dark:text-stone-300">
                        Password
                      </label>
                    </div>
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

                  {/* Bottom Question: Do not have an account? Register here */}
                  <div className="pt-4 border-t border-stone-100 dark:border-stone-800 text-center space-y-3">
                    <p className="text-xs text-stone-600 dark:text-stone-400">
                      Don't have an account?{' '}
                      <button
                        type="button"
                        onClick={() => {
                          setMode('register');
                          setErrorMsg('');
                          setSuccessMsg('');
                        }}
                        className="font-bold text-teal-700 dark:text-teal-400 hover:underline cursor-pointer inline-flex items-center gap-0.5"
                      >
                        <span>Register here</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </p>

                    <div>
                      <button
                        type="button"
                        onClick={handleQuickDemoLogin}
                        className="text-[11px] text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 underline cursor-pointer"
                      >
                        Explore in Guest / Demo Mode
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {/* ================================================================= */}
            {/* SLIDE 2: REGISTER ACCOUNT (First Name, Last Name, Email, Pass, Phone) */}
            {/* ================================================================= */}
            {mode === 'register' && (
              <div className="space-y-5 animate-fadeIn">
                <div>
                  <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                    Create Student Account
                  </h2>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Enter your academic details. We'll send an OTP to verify your mobile & email.
                  </p>
                </div>

                <form onSubmit={handleProceedToOtp} className="space-y-3">
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

                  {/* Email Address */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        placeholder="e.g. rahul.sharma@college.edu"
                        required
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50/60 dark:bg-stone-900/60 text-stone-900 dark:text-stone-100 text-xs focus:outline-hidden focus:ring-2 focus:ring-teal-500/50"
                      />
                    </div>
                  </div>

                  {/* Password */}
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

                  {/* Phone Number with +91 country prefix */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 flex items-center justify-between">
                      <span>Mobile Phone Number</span>
                      <span className="text-[10px] text-teal-700 dark:text-teal-400 font-mono">OTP will be sent</span>
                    </label>
                    <div className="flex gap-2">
                      <div className="px-3 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-100/70 dark:bg-stone-850 text-stone-700 dark:text-stone-300 font-mono font-semibold text-xs flex items-center gap-1 shrink-0">
                        <span>🇮🇳</span>
                        <span>+91</span>
                      </div>
                      <div className="relative flex-1">
                        <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          maxLength={10}
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                          placeholder="9876543210"
                          required
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50/60 dark:bg-stone-900/60 text-stone-900 dark:text-stone-100 text-xs font-mono focus:outline-hidden focus:ring-2 focus:ring-teal-500/50"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <span>Send Verification OTP</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  {/* Bottom Link: Already have an account? Sign in here */}
                  <div className="pt-4 border-t border-stone-100 dark:border-stone-800 text-center">
                    <p className="text-xs text-stone-600 dark:text-stone-400">
                      Already have an account?{' '}
                      <button
                        type="button"
                        onClick={() => {
                          setMode('login');
                          setErrorMsg('');
                          setSuccessMsg('');
                        }}
                        className="font-bold text-teal-700 dark:text-teal-400 hover:underline cursor-pointer inline-flex items-center gap-0.5"
                      >
                        <span>Sign in here</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </p>
                  </div>
                </form>
              </div>
            )}

            {/* ================================================================= */}
            {/* SLIDE 3: OTP VERIFICATION SYSTEM                                  */}
            {/* ================================================================= */}
            {mode === 'otp' && (
              <div className="space-y-5 animate-fadeIn">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-50 dark:bg-teal-950/70 border border-teal-200 dark:border-teal-800 text-teal-800 dark:text-teal-300 text-[11px] font-bold mb-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                    <span>Security Verification</span>
                  </div>
                  <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                    Verify Phone & Email
                  </h2>
                  <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">
                    We sent a 6-digit verification code to <span className="font-semibold text-stone-800 dark:text-stone-200">+91 {phone}</span> and <span className="font-semibold text-stone-800 dark:text-stone-200">{registerEmail}</span>.
                  </p>
                </div>

                {/* Simulated SMS & Email Notification Card */}
                {simulatedSmsToast && (
                  <div className="p-3.5 rounded-xl border border-teal-300 dark:border-teal-800 bg-teal-50/80 dark:bg-teal-950/40 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 font-bold text-teal-900 dark:text-teal-200">
                        <Smartphone className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                        <span>PlanZo Security SMS / Email</span>
                      </div>
                      <span className="text-[10px] font-mono text-teal-700 dark:text-teal-400 bg-teal-200/50 dark:bg-teal-900 px-1.5 py-0.5 rounded">
                        Just now
                      </span>
                    </div>

                    <div className="font-mono text-xs text-stone-800 dark:text-stone-200 flex items-center justify-between">
                      <span>Your OTP: <strong className="text-teal-700 dark:text-teal-400 text-sm tracking-wider">{generatedOtp}</strong></span>
                      <button
                        type="button"
                        onClick={handleAutoFillOtp}
                        className="px-2 py-1 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-[11px] font-bold cursor-pointer transition-colors"
                      >
                        ⚡ Auto-fill OTP
                      </button>
                    </div>
                  </div>
                )}

                {/* 6 Digit Input Boxes */}
                <form onSubmit={handleVerifyOtpAndRegister} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 text-center block">
                      Enter 6-Digit OTP Code
                    </label>
                    <div className="flex items-center justify-center gap-2">
                      {otpDigits.map((digit, idx) => (
                        <input
                          key={idx}
                          ref={(el) => {
                            otpInputRefs.current[idx] = el;
                          }}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleDigitChange(idx, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(idx, e)}
                          className="w-10 sm:w-11 h-12 text-center text-lg font-mono font-bold rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-hidden focus:ring-2 focus:ring-teal-500 transition-all"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Resend Timer */}
                  <div className="flex items-center justify-between text-xs px-1">
                    <span className="text-stone-500">
                      {otpTimer > 0 ? (
                        <>Resend code in <strong className="font-mono text-stone-700 dark:text-stone-300">{otpTimer}s</strong></>
                      ) : (
                        'Did not receive code?'
                      )}
                    </span>
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={!canResend}
                      className={`font-bold transition-colors cursor-pointer flex items-center gap-1 ${
                        canResend
                          ? 'text-teal-700 dark:text-teal-400 hover:underline'
                          : 'text-stone-400 cursor-not-allowed'
                      }`}
                    >
                      <RefreshCw className={`w-3 h-3 ${!canResend ? 'opacity-40' : ''}`} />
                      <span>Resend OTP</span>
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <span>{isLoading ? 'Verifying...' : 'Verify OTP & Activate Workspace'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="pt-3 border-t border-stone-100 dark:border-stone-800 text-center">
                    <button
                      type="button"
                      onClick={() => {
                        setMode('register');
                        setErrorMsg('');
                      }}
                      className="text-xs font-semibold text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 inline-flex items-center gap-1 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Edit Phone or Email</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

          </div>
        </div>

      </main>

      {/* Institutional Footer */}
      <footer className="w-full border-t border-stone-200/80 dark:border-stone-800 py-4 bg-white/50 dark:bg-[#070b12]/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone-400">
          <div>PlanZo · Autonomous Engineering Academic Planner</div>
          <div>B.Tech Student Operating System · Real-time Attendance & Routine</div>
        </div>
      </footer>

    </div>
  );
};
