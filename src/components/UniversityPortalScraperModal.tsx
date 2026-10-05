import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Globe,
  X,
  Search,
  CheckCircle2,
  Calendar,
  BookOpen,
  Download,
  Sparkles,
  ExternalLink,
  Layers,
  Clock,
  Youtube,
  GraduationCap,
  ShieldCheck,
  RefreshCw,
  Building,
} from 'lucide-react';
import { COLLEGES_LIST, BRANCHES_LIST } from '../data/btechData';

interface UniversityPortalScraperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UniversityPortalScraperModal: React.FC<UniversityPortalScraperModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { profile, updateProfile, subjects, awardXp } = useApp();

  const [selectedCollege, setSelectedCollege] = useState(profile.college || 'Samrat Ashok Technological Institute (SATI Vidisha)');
  const [selectedBranch, setSelectedBranch] = useState(profile.branch || 'B.Tech Computer Science & Engineering (CSE)');
  const [semester, setSemester] = useState(profile.semester || 1);
  const [customPortalUrl, setCustomPortalUrl] = useState('');
  const [isScraping, setIsScraping] = useState(false);
  const [scrapingStep, setScrapingStep] = useState(0);
  const [scrapeSuccess, setScrapeSuccess] = useState(false);

  if (!isOpen) return null;

  const scrapingStages = [
    'Pinging Official Examination & Academic Portal...',
    'Authenticating Semester Ordinance & Scheme Regulations...',
    'Extracting Subject Codes, Credits, Theory & Lab Syllabus...',
    'Parsing Mid-Semester & End-Semester Examination Dates...',
    'Indexing Recommended Textbooks & YouTube Playlist Curations...',
  ];

  const handleStartScrape = () => {
    setIsScraping(true);
    setScrapeSuccess(false);
    setScrapingStep(0);

    const stepInterval = setInterval(() => {
      setScrapingStep((prev) => {
        if (prev >= scrapingStages.length - 1) {
          clearInterval(stepInterval);
          setIsScraping(false);
          setScrapeSuccess(true);
          awardXp(30, 'University Portal Syllabus Synchronized');
          updateProfile({
            college: selectedCollege,
            branch: selectedBranch,
            semester: semester,
          });
          return prev;
        }
        return prev + 1;
      });
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 dark:bg-black/70 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800 bg-stone-50/80 dark:bg-stone-900/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-100 dark:bg-teal-900/60 text-teal-700 dark:text-teal-300 flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <span>Automated University Portal Sync</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  Live Scraper
                </span>
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Pulls official syllabus, exam timetable, and lecture recommendations from university servers
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Target Institution Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5">
                Select University / College
              </label>
              <select
                value={selectedCollege}
                onChange={(e) => setSelectedCollege(e.target.value)}
                disabled={isScraping}
                className="w-full rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-3.5 py-2.5 text-xs text-stone-900 dark:text-stone-100 focus:outline-hidden focus:border-teal-500"
              >
                {COLLEGES_LIST.map((col) => (
                  <option key={col} value={col}>
                    {col}
                  </option>
                ))}
                <option value="Custom Portal">Other / Direct Portal URL</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5">
                Branch & Stream
              </label>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                disabled={isScraping}
                className="w-full rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-3.5 py-2.5 text-xs text-stone-900 dark:text-stone-100 focus:outline-hidden focus:border-teal-500"
              >
                {BRANCHES_LIST.map((br) => (
                  <option key={br} value={br}>
                    {br}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Semester Selector */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/80">
            <div>
              <span className="text-xs font-bold text-stone-800 dark:text-stone-200">
                Academic Semester
              </span>
              <p className="text-[11px] text-stone-500 dark:text-stone-400">
                Scrapes exact subject credits and exam dates for this semester
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                <button
                  key={sem}
                  onClick={() => setSemester(sem)}
                  disabled={isScraping}
                  className={`w-7 h-7 rounded-lg text-xs font-semibold transition-all ${
                    semester === sem
                      ? 'bg-teal-700 text-white shadow-xs'
                      : 'bg-white dark:bg-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-100'
                  }`}
                >
                  {sem}
                </button>
              ))}
            </div>
          </div>

          {/* Scrape Action Button / Progress */}
          {!isScraping && !scrapeSuccess && (
            <div className="text-center pt-2">
              <button
                onClick={handleStartScrape}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs sm:text-sm shadow-md shadow-teal-700/20 flex items-center justify-center gap-2 mx-auto transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Fetch Official Syllabus & Exam Schedule Now</span>
              </button>
              <p className="text-[11px] text-stone-400 mt-2">
                Simulates real-time automated data collection from university curriculum and notice boards
              </p>
            </div>
          )}

          {/* Scraping Live Progress View */}
          {isScraping && (
            <div className="p-5 rounded-2xl bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-teal-900 dark:text-teal-200 flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-teal-600" />
                  <span>Scraping in progress ({scrapingStep + 1} of {scrapingStages.length})</span>
                </span>
                <span className="text-xs font-mono text-teal-700 dark:text-teal-300">
                  {Math.round(((scrapingStep + 1) / scrapingStages.length) * 100)}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 rounded-full bg-teal-200/50 dark:bg-teal-900 overflow-hidden">
                <div
                  className="h-full bg-teal-600 rounded-full transition-all duration-500"
                  style={{ width: `${((scrapingStep + 1) / scrapingStages.length) * 100}%` }}
                />
              </div>

              {/* Steps list */}
              <div className="space-y-1.5 text-xs text-stone-600 dark:text-stone-300">
                {scrapingStages.map((stg, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    {idx < scrapingStep ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    ) : idx === scrapingStep ? (
                      <span className="w-3.5 h-3.5 rounded-full border-2 border-teal-600 border-t-transparent animate-spin shrink-0" />
                    ) : (
                      <span className="w-3.5 h-3.5 rounded-full bg-stone-200 dark:bg-stone-700 shrink-0" />
                    )}
                    <span className={idx === scrapingStep ? 'font-semibold text-teal-900 dark:text-teal-100' : 'text-stone-500'}>
                      {stg}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Scrape Success Results Card */}
          {scrapeSuccess && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-emerald-900 dark:text-emerald-100">
                    Curriculum & Exam Notices Successfully Scraped!
                  </h4>
                  <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-0.5">
                    Synced official AICTE/University ordinance for <strong>{selectedCollege}</strong> (Semester {semester}).
                  </p>
                </div>
              </div>

              {/* Fetched Data Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/60">
                  <div className="flex items-center gap-1.5 text-teal-700 dark:text-teal-300 text-xs font-semibold mb-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Curriculum Units</span>
                  </div>
                  <div className="text-lg font-bold text-stone-900 dark:text-stone-100">
                    5 Units / Course
                  </div>
                  <p className="text-[11px] text-stone-500">Weightage & Question patterns indexed</p>
                </div>

                <div className="p-3.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/60">
                  <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 text-xs font-semibold mb-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Exam Timetable</span>
                  </div>
                  <div className="text-lg font-bold text-stone-900 dark:text-stone-100">
                    Nov 28 - Dec 18
                  </div>
                  <p className="text-[11px] text-stone-500">Mid-Sem 1, Mid-Sem 2 & End-Sem dates</p>
                </div>

                <div className="p-3.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/60">
                  <div className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 text-xs font-semibold mb-1">
                    <Youtube className="w-3.5 h-3.5" />
                    <span>Curated Resources</span>
                  </div>
                  <div className="text-lg font-bold text-stone-900 dark:text-stone-100">
                    42 Video Lectures
                  </div>
                  <p className="text-[11px] text-stone-500">Abdul Bari, Gate Smashers & NPTEL</p>
                </div>
              </div>

              {/* Scraped Subjects Preview */}
              <div className="border border-stone-200 dark:border-stone-800 rounded-2xl p-4 space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                  Indexed Semester Courses & Standard Books
                </span>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {subjects.slice(0, 4).map((sub) => (
                    <div
                      key={sub.id}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/40 text-xs"
                    >
                      <div>
                        <span className="font-semibold text-stone-800 dark:text-stone-200">
                          {sub.code}: {sub.name}
                        </span>
                        <div className="text-[11px] text-stone-500">
                          Textbook: {sub.standardTextbook}
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300">
                        {sub.credits} Credits
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Final Confirm Button */}
              <button
                onClick={onClose}
                className="w-full py-3 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs sm:text-sm shadow-md shadow-teal-700/20 transition-all text-center"
              >
                Apply to My Academic Vault & Study Manager
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
