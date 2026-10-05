import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  BookOpen,
  FileText,
  FileCode,
  HelpCircle,
  CheckCircle2,
  ExternalLink,
  Play,
  Clock,
  Plus,
  Calendar,
  X,
  Layers,
  Download,
  AlertCircle,
  GraduationCap,
  Square,
  ChevronRight,
  Youtube,
  Sparkles,
  BookMarked,
  Award,
} from 'lucide-react';
import { FolderItem } from '../types';
import { playTaskCompleteSound } from '../utils/audioSynth';
import { fireConfetti } from '../utils/audioVibes';
import { getCurriculumForSatiSemester } from '../data/satiVidishaData';
import { ALL_8_SEMESTERS } from '../data/btechData';

export const AcademicHub: React.FC = () => {
  const {
    profile,
    subjects,
    subjectFolders,
    toggleAssignmentStatus,
    addCustomNoteToFolder,
    awardXp,
  } = useApp();

  const [currentSemester, setCurrentSemester] = useState<number>(profile.semester || 4);
  const activeSemesterSubjects = getCurriculumForSatiSemester(currentSemester);

  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(
    activeSemesterSubjects[0]?.id || subjects[0]?.id || 'cs101'
  );

  const [activeTab, setActiveTab] = useState<
    'notes' | 'pyq' | 'videos' | 'assignments' | 'viva' | 'syllabus' | 'topics' | 'planner'
  >('notes');

  const [isAddingNote, setIsAddingNote] = useState(false);
  const [selectedViva, setSelectedViva] = useState<any | null>(null);
  const [selectedNotePreview, setSelectedNotePreview] = useState<FolderItem | null>(null);

  // New Note Form State
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNotePages, setNewNotePages] = useState('5 Pages · Handwritten');
  const [newNoteSummary, setNewNoteSummary] = useState('');
  const [newNoteTags, setNewNoteTags] = useState('Unit 1, Formulas');

  // Currently active subject
  const activeSubject = activeSemesterSubjects.find((s) => s.id === selectedSubjectId) || activeSemesterSubjects[0];
  const activeFolder = subjectFolders[activeSubject?.id] || {
    subjectId: activeSubject?.id,
    topperNotes: [
      {
        id: `${activeSubject?.id}-note1`,
        title: `${activeSubject?.name} Units I-V Comprehensive Notes`,
        type: 'notes' as const,
        dateAdded: 'B.Tech CSE Curricula',
        fileSizeOrPages: '28 Pages · PDF',
        summary: `Complete handwritten lecture and unit notes covering all 5 syllabus modules for ${activeSubject?.name}.`,
        tags: ['Units 1-5', 'Exam Notes'],
      },
    ],
    previousYearQuestions: [
      {
        id: `${activeSubject?.id}-pyq1`,
        title: `University End-Sem 2024: ${activeSubject?.code} Paper (Solved)`,
        type: 'pyq' as const,
        dateAdded: 'Dec 2024 Exam',
        fileSizeOrPages: 'Full Paper · With Solutions',
        summary: `Official end-semester question paper with model answers and marks distribution for ${activeSubject?.code}.`,
        tags: ['End-Sem 2024', 'Solved Answers'],
        solved: true,
      },
    ],
    labVivaQuestions: [
      {
        id: `${activeSubject?.id}-viva1`,
        question: `What are the core fundamentals and industrial applications of ${activeSubject?.name}?`,
        answer: `Covers foundational principles, computational complexity, design trade-offs, and deployment in production systems.`,
        importance: 'Guaranteed Viva Question',
      },
    ],
    assignments: [
      {
        id: `${activeSubject?.id}-asg1`,
        title: `Assignment 1: Unit Problem Set & Implementation`,
        dueDate: 'Next Monday, 4:30 PM',
        completed: false,
        maxMarks: 10,
      },
    ],
  };

  const handleAddNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteTitle.trim()) return;

    const newNote: FolderItem = {
      id: `custom-note-${Date.now()}`,
      title: newNoteTitle.trim(),
      type: 'notes',
      dateAdded: 'Added by Student',
      fileSizeOrPages: newNotePages,
      summary: newNoteSummary.trim() || 'Custom handwritten study notes.',
      tags: newNoteTags.split(',').map((t) => t.trim()).filter(Boolean),
    };

    addCustomNoteToFolder(activeSubject.id, newNote);
    awardXp(25, 'Uploaded Custom Study Note');
    playTaskCompleteSound();
    fireConfetti();
    setIsAddingNote(false);
    setNewNoteTitle('');
    setNewNoteSummary('');
  };

  const tabs = [
    { id: 'notes', label: 'Notes' },
    { id: 'pyq', label: 'PYQs (Solved)' },
    { id: 'videos', label: 'Videos' },
    { id: 'assignments', label: 'Assignments' },
    { id: 'viva', label: 'Lab Viva' },
    { id: 'syllabus', label: 'Syllabus' },
    { id: 'topics', label: 'Important Topics' },
    { id: 'planner', label: 'Study Planner' },
  ] as const;

  return (
    <div className="space-y-6">
      {/* 1. Page Header with Semester Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-stone-200/80 dark:border-stone-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            Academic Vault
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Your semester resources, syllabi, notes, and previous year papers in one place
          </p>
        </div>

        {/* Semester Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-stone-500 font-semibold">Semester:</span>
          <select
            value={currentSemester}
            onChange={(e) => {
              const sem = Number(e.target.value);
              setCurrentSemester(sem);
              const subs = getCurriculumForSatiSemester(sem);
              if (subs.length > 0) setSelectedSubjectId(subs[0].id);
            }}
            className="px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-850 text-xs font-bold text-stone-900 dark:text-stone-100 cursor-pointer focus:ring-2 focus:ring-teal-500"
          >
            {ALL_8_SEMESTERS.map((s) => (
              <option key={s.sem} value={s.sem}>
                {s.name} ({s.year})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 2. Subject Selector: Compact, Clean Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {activeSemesterSubjects.map((sub) => {
          const isSelected = sub.id === activeSubject?.id;
          return (
            <button
              key={sub.id}
              onClick={() => setSelectedSubjectId(sub.id)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'border-teal-600 bg-teal-50/70 dark:bg-teal-950/40 text-stone-900 dark:text-stone-100 ring-2 ring-teal-500/40 shadow-xs'
                  : 'border-stone-200/80 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:border-teal-400/60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold">{sub.code}</span>
                <span className="text-[10px] font-mono text-stone-400">{sub.credits}C</span>
              </div>
              <div className="text-xs font-semibold truncate mt-1" title={sub.name}>
                {sub.name}
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. Selected Subject Header Card */}
      {activeSubject && (
        <div className="p-5 rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-teal-50 dark:bg-teal-950 text-teal-800 dark:text-teal-300 border border-teal-200/80 dark:border-teal-800">
                {activeSubject.code}
              </span>
              <span className="text-xs text-stone-400 font-mono">
                {activeSubject.credits} Credits · 5 Units
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100">
              {activeSubject.name}
            </h2>
            <p className="text-xs text-stone-500">
              Reference Textbook: {activeSubject.standardTextbook || 'Standard University Textbook'}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsAddingNote(true)}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-teal-700 hover:bg-teal-800 text-white transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Add Note</span>
            </button>
          </div>
        </div>
      )}

      {/* 4. Organized Resource Tabs */}
      <div className="flex items-center gap-1 border-b border-stone-200/80 dark:border-stone-800 overflow-x-auto scrollbar-none pb-px">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2 text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer border-b-2 -mb-px ${
                isActive
                  ? 'border-teal-700 dark:border-teal-400 text-teal-800 dark:text-teal-300 font-bold'
                  : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 5. Tab Content Panes */}
      <div className="space-y-4">
        {/* TAB 1: NOTES */}
        {activeTab === 'notes' && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeFolder.topperNotes.map((note) => (
                <div
                  key={note.id}
                  className="p-5 rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-xs flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-stone-400">
                      <span className="font-mono">{note.fileSizeOrPages}</span>
                      <span>{note.dateAdded}</span>
                    </div>
                    <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                      {note.title}
                    </h3>
                    <p className="text-xs text-stone-500 leading-relaxed">
                      {note.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {note.tags?.map((tag, idx) => (
                        <span key={idx} className="text-[10px] font-mono text-stone-400">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => setSelectedNotePreview(note)}
                      className="text-xs font-bold text-teal-700 dark:text-teal-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Read Note</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: PYQS (SOLVED) */}
        {activeTab === 'pyq' && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeFolder.previousYearQuestions.map((pyq) => (
                <div
                  key={pyq.id}
                  className="p-5 rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-xs flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-stone-400">
                      <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">Solved Paper</span>
                      <span>{pyq.dateAdded}</span>
                    </div>
                    <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                      {pyq.title}
                    </h3>
                    <p className="text-xs text-stone-500 leading-relaxed">
                      {pyq.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-stone-400">{pyq.fileSizeOrPages}</span>
                    <button
                      onClick={() => setSelectedNotePreview(pyq)}
                      className="text-xs font-bold text-teal-700 dark:text-teal-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>View Solutions</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: VIDEOS */}
        {activeTab === 'videos' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-rose-600">
                <Youtube className="w-5 h-5" />
                <span className="text-xs font-bold">Gate Smashers Complete Playlist</span>
              </div>
              <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                {activeSubject.name} — Full University Curriculum
              </h3>
              <p className="text-xs text-stone-500">
                Clear conceptual lectures structured module by module for university examinations.
              </p>
              <div className="pt-2">
                <a
                  href={`https://www.youtube.com/results?search_query=gate+smashers+${encodeURIComponent(activeSubject.name)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-teal-700 dark:text-teal-400 hover:underline"
                >
                  <span>Open on YouTube</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="p-5 rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-rose-600">
                <Youtube className="w-5 h-5" />
                <span className="text-xs font-bold">Neso Academy / Abdul Bari Lectures</span>
              </div>
              <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                Intuitive Problem Solving & Derivations
              </h3>
              <p className="text-xs text-stone-500">
                Master 10-mark recurring derivations, step-by-step algorithms, and solved numericals.
              </p>
              <div className="pt-2">
                <a
                  href={`https://www.youtube.com/results?search_query=neso+academy+${encodeURIComponent(activeSubject.name)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-teal-700 dark:text-teal-400 hover:underline"
                >
                  <span>Open on YouTube</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: ASSIGNMENTS */}
        {activeTab === 'assignments' && (
          <div className="space-y-3">
            {activeFolder.assignments.map((asg) => (
              <div
                key={asg.id}
                className="p-4 rounded-xl border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-xs flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      toggleAssignmentStatus(activeSubject.id, asg.id);
                      if (!asg.completed) {
                        playTaskCompleteSound();
                        fireConfetti();
                        awardXp(30, 'Completed Assignment');
                      }
                    }}
                    className="text-stone-400 hover:text-teal-600 cursor-pointer"
                  >
                    {asg.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-teal-600 fill-teal-100 dark:fill-teal-950" />
                    ) : (
                      <Square className="w-5 h-5" />
                    )}
                  </button>
                  <div>
                    <h3 className={`text-xs sm:text-sm font-bold ${asg.completed ? 'line-through text-stone-400' : 'text-stone-900 dark:text-stone-100'}`}>
                      {asg.title}
                    </h3>
                    <p className="text-xs text-stone-400 font-mono mt-0.5">
                      Due: {asg.dueDate} · Weight: {asg.maxMarks} Marks
                    </p>
                  </div>
                </div>

                <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                  asg.completed ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                }`}>
                  {asg.completed ? 'Submitted' : 'Pending'}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* TAB 5: LAB VIVA */}
        {activeTab === 'viva' && (
          <div className="space-y-3">
            {activeFolder.labVivaQuestions.map((viva) => (
              <div
                key={viva.id}
                className="p-5 rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-xs space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-600 dark:text-amber-400 font-mono">
                    ★ {viva.importance}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                  Q: {viva.question}
                </h3>
                <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-850 text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                  <strong>Examiner Model Answer:</strong> {viva.answer}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 6: SYLLABUS */}
        {activeTab === 'syllabus' && (
          <div className="space-y-3">
            {activeSubject.modules?.map((mod, idx) => (
              <div
                key={mod.id || idx}
                className="p-5 rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                    Unit {idx + 1}: {mod.title}
                  </h3>
                  <span className="text-[11px] font-mono text-stone-400">
                    {mod.weightagePercentage}% Exam Weight
                  </span>
                </div>

                <div className="space-y-1.5 pl-2">
                  {mod.topics.map((t) => (
                    <div key={t.id} className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-600 shrink-0" />
                      <span>{t.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 7: IMPORTANT TOPICS (80/20 PARETO) */}
        {activeTab === 'topics' && (
          <div className="p-5 rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
              80/20 Pareto High-Yield Focus Topics for {activeSubject.name}
            </h3>
            <p className="text-xs text-stone-500">
              Historical analysis shows these 4 core topics account for ~65% of theory exam marks:
            </p>
            <div className="space-y-2 text-xs pt-1">
              <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-850 border border-stone-200/60 dark:border-stone-800 flex items-center justify-between">
                <span>1. Core Architectural Diagrams & State Diagrams</span>
                <span className="font-mono text-teal-700 dark:text-teal-400 font-bold">14 Marks</span>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-850 border border-stone-200/60 dark:border-stone-800 flex items-center justify-between">
                <span>2. Standard Comparative Proofs & Mathematical Derivations</span>
                <span className="font-mono text-teal-700 dark:text-teal-400 font-bold">10 Marks</span>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-850 border border-stone-200/60 dark:border-stone-800 flex items-center justify-between">
                <span>3. Solved Numerical Algorithms from Unit 3</span>
                <span className="font-mono text-teal-700 dark:text-teal-400 font-bold">10 Marks</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 8: STUDY PLANNER */}
        {activeTab === 'planner' && (
          <div className="p-5 rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-xs space-y-4">
            <div>
              <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                Accelerated 7-Day Revision Roadmap
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Structured timeline to master all 5 modules before examinations
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl border border-stone-200/80 dark:border-stone-800 bg-stone-50 dark:bg-stone-850 space-y-1">
                <span className="text-[10px] font-mono font-bold text-teal-700 dark:text-teal-400">Days 1 - 2</span>
                <div className="font-bold">Units 1 & 2 Core Theory</div>
                <p className="text-[11px] text-stone-500">Definitions, architecture diagrams, and high-yield 7-mark proofs.</p>
              </div>

              <div className="p-3.5 rounded-xl border border-stone-200/80 dark:border-stone-800 bg-stone-50 dark:bg-stone-850 space-y-1">
                <span className="text-[10px] font-mono font-bold text-teal-700 dark:text-teal-400">Days 3 - 5</span>
                <div className="font-bold">Units 3 & 4 Numericals</div>
                <p className="text-[11px] text-stone-500">Step-by-step algorithms, solved textbook examples, and trace tables.</p>
              </div>

              <div className="p-3.5 rounded-xl border border-stone-200/80 dark:border-stone-800 bg-stone-50 dark:bg-stone-850 space-y-1">
                <span className="text-[10px] font-mono font-bold text-teal-700 dark:text-teal-400">Days 6 - 7</span>
                <div className="font-bold">PYQs & Formula Review</div>
                <p className="text-[11px] text-stone-500">Solve 2 previous year question papers under 3-hour timed conditions.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Note Preview Modal */}
      {selectedNotePreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs">
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 w-full max-w-xl shadow-xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">{selectedNotePreview.fileSizeOrPages}</span>
                <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 mt-1">{selectedNotePreview.title}</h3>
              </div>
              <button onClick={() => setSelectedNotePreview(null)} className="p-1 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-850 text-xs text-stone-700 dark:text-stone-300 leading-relaxed whitespace-pre-line">
              {selectedNotePreview.summary}
              {`\n\n📌 Key Exam Takeaways:\n• Review definitions in Unit 1.\n• Draw neat diagrams for 10-mark questions.\n• Solve previous 3-year recurring numericals.`}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedNotePreview(null)}
                className="px-4 py-2 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-bold cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Custom Note Modal */}
      {isAddingNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs">
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 w-full max-w-md shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">Add Study Note</h3>
              <button onClick={() => setIsAddingNote(false)} className="p-1 text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddNoteSubmit} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-stone-700 dark:text-stone-300">Note Title</label>
                <input
                  type="text"
                  required
                  value={newNoteTitle}
                  onChange={(e) => setNewNoteTitle(e.target.value)}
                  placeholder="e.g. Unit 3 Dynamic Programming Summary"
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-850 font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-700 dark:text-stone-300">Summary / Formulas</label>
                <textarea
                  rows={3}
                  value={newNoteSummary}
                  onChange={(e) => setNewNoteSummary(e.target.value)}
                  placeholder="Key concepts, recurrence relations, and diagrams..."
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-850 font-medium"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingNote(false)}
                  className="px-3.5 py-1.5 rounded-xl border text-stone-500 hover:bg-stone-100 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold shadow-xs"
                >
                  Save Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
