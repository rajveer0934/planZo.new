import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  BookOpen,
  ChevronRight,
  Layers,
  Sparkles,
  FileText,
  Award,
  Check,
  Copy,
} from 'lucide-react';
import { SubjectCourse } from '../types';
import { getBranchSemesterSubjects } from '../data/branchCurriculumData';
import { getFoundationSemesterSubjects } from '../data/foundationSubjects';
import { ALL_8_SEMESTERS } from '../data/btechData';
import { SubjectNotesModal } from './SubjectNotesModal';
import {
  getSubjectNotesDetail,
  FirstYearSubjectNotesDetail,
  UnitDetailedNote,
} from '../data/firstYearDetailedNotes';

export const AcademicHub: React.FC = () => {
  const { profile, subjects } = useApp();

  const [currentSemester, setCurrentSemester] = useState<number>(profile.semester || 1);

  // For Semester 1 and Semester 2, always show the exact 5 Sem 1 or 5 Sem 2 subjects from the curriculum.
  // For Semesters 3-8, show user's selected subjects if matching current semester, otherwise branch curriculum.
  const activeSemesterSubjects: SubjectCourse[] =
    currentSemester === 1 || currentSemester === 2
      ? getFoundationSemesterSubjects(currentSemester)
      : currentSemester === (profile.semester || 1) && subjects && subjects.length > 0
      ? subjects
      : getBranchSemesterSubjects(
          profile.branch || 'Computer Science & Engineering (CSE)',
          currentSemester
        );

  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(() => {
    return activeSemesterSubjects[0]?.id || 'sub-applied-chem';
  });

  const [selectedChapterNum, setSelectedChapterNum] = useState<number>(1);
  const [copiedFormula, setCopiedFormula] = useState<string | null>(null);

  // Dedicated Subject Notes Modal State (opens when clicking any subject icon card)
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
  const [modalSubject, setModalSubject] = useState<SubjectCourse | null>(null);

  useEffect(() => {
    if (activeSemesterSubjects.length > 0) {
      const exists = activeSemesterSubjects.some((s) => s.id === selectedSubjectId);
      if (!exists) {
        setSelectedSubjectId(activeSemesterSubjects[0].id);
        setSelectedChapterNum(1);
      }
    }
  }, [currentSemester, activeSemesterSubjects, selectedSubjectId]);

  const activeSubject =
    activeSemesterSubjects.find((s) => s.id === selectedSubjectId) ||
    activeSemesterSubjects[0];

  const notesDetail: FirstYearSubjectNotesDetail | null = activeSubject
    ? getSubjectNotesDetail(activeSubject.id, activeSubject.code, activeSubject.name)
    : null;

  const isFirstYearMatch =
    notesDetail &&
    (notesDetail.subjectId === activeSubject?.id ||
      notesDetail.subjectCode.toUpperCase() === activeSubject?.code.toUpperCase());

  const chaptersList: UnitDetailedNote[] =
    isFirstYearMatch && notesDetail
      ? notesDetail.units
      : (activeSubject?.modules || []).map((mod, idx) => ({
          unitNumber: idx + 1,
          unitTitle: mod.title.startsWith('Chapter')
            ? mod.title
            : `Chapter ${idx + 1}: ${mod.title.replace(/^Unit[- ]*[IVX0-9]+[: ]*/i, '')}`,
          weightage: `${mod.weightagePercentage || 20}%`,
          summary: mod.topics.map((t) => t.name).join(' • '),
          keyFormulas: [],
          keyConcepts: mod.topics.map((t) => ({
            heading: t.name,
            description: `Complete chapter notes and core engineering concepts for ${t.name} under ${activeSubject?.name}.`,
            bulletPoints: [],
          })),
          derivationsOrTheorems: [],
          frequentExamQuestions: mod.topics.map(
            (t) => `Explain the principles, architecture, and applications of ${t.name}.`
          ),
        }));

  const activeChapter: UnitDetailedNote =
    chaptersList.find((c) => c.unitNumber === selectedChapterNum) || chaptersList[0];

  const handleCopyFormula = (formulaText: string) => {
    navigator.clipboard.writeText(formulaText);
    setCopiedFormula(formulaText);
    setTimeout(() => setCopiedFormula(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* 1. Page Header with Semester Selector (Sem 1, Sem 2, etc.) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-stone-200/80 dark:border-stone-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            Academic Vault
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Select Semester and click any Subject Icon to view its 5 Chapter-Wise Notes
          </p>
        </div>

        {/* Semester Selector */}
        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-xl p-1 bg-stone-100 dark:bg-stone-850 border border-stone-200/80 dark:border-stone-800">
            <button
              type="button"
              onClick={() => {
                setCurrentSemester(1);
                const s1 = getFoundationSemesterSubjects(1);
                if (s1.length > 0) setSelectedSubjectId(s1[0].id);
                setSelectedChapterNum(1);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currentSemester === 1
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              SEM 1 (5 Subjects)
            </button>
            <button
              type="button"
              onClick={() => {
                setCurrentSemester(2);
                const s2 = getFoundationSemesterSubjects(2);
                if (s2.length > 0) setSelectedSubjectId(s2[0].id);
                setSelectedChapterNum(1);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currentSemester === 2
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              SEM 2 (5 Subjects)
            </button>
          </div>

          <select
            value={currentSemester}
            onChange={(e) => {
              const sem = Number(e.target.value);
              setCurrentSemester(sem);
              const subs =
                sem === 1 || sem === 2
                  ? getFoundationSemesterSubjects(sem)
                  : sem === (profile.semester || 1) && subjects && subjects.length > 0
                  ? subjects
                  : getBranchSemesterSubjects(
                      profile.branch || 'Computer Science & Engineering (CSE)',
                      sem
                    );
              if (subs.length > 0) setSelectedSubjectId(subs[0].id);
              setSelectedChapterNum(1);
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

      {/* 2. Subject Icons Grid (5 Subjects for Sem 1 / Sem 2) */}
      <div>
        <div className="flex items-center justify-between pb-2">
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
            Semester {currentSemester} Subjects ({activeSemesterSubjects.length} Subjects · 5 Chapters Each)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {activeSemesterSubjects.map((sub) => {
            const isSelected = sub.id === activeSubject?.id;
            return (
              <button
                key={sub.id}
                onClick={() => {
                  setSelectedSubjectId(sub.id);
                  setSelectedChapterNum(1);
                  setModalSubject(sub);
                  setIsNotesModalOpen(true);
                }}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer group hover:shadow-md flex flex-col justify-between ${
                  isSelected
                    ? 'border-teal-600 bg-teal-50/70 dark:bg-teal-950/40 text-stone-900 dark:text-stone-100 ring-2 ring-teal-500/40 shadow-xs'
                    : 'border-stone-200/80 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:border-teal-400/60'
                }`}
                title={sub.name}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-teal-700 dark:text-teal-300">
                      {sub.code}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400">
                      5 Chapters
                    </span>
                  </div>
                  <div
                    className="text-xs sm:text-sm font-bold line-clamp-2 mt-1.5 group-hover:text-teal-600 dark:group-hover:text-teal-300 transition-colors"
                    title={sub.name}
                  >
                    {sub.name}
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between text-[11px] font-bold text-teal-700 dark:text-teal-300">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Open Chapters</span>
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Selected Subject Name Header + 5 Chapters View */}
      {activeSubject && (
        <div className="rounded-3xl border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-xs overflow-hidden">
          {/* Top Subject Name Banner */}
          <div className="p-5 sm:p-6 border-b border-stone-200/80 dark:border-stone-800 bg-gradient-to-r from-teal-50/50 via-white to-stone-50 dark:from-teal-950/20 dark:via-stone-900 dark:to-stone-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-lg text-xs font-mono font-bold bg-teal-600 text-white">
                  {activeSubject.code}
                </span>
                <span className="text-xs text-stone-500 font-mono">
                  Semester {currentSemester} · {chaptersList.length} Chapters
                </span>
              </div>
              <h2 className="text-lg sm:text-2xl font-black text-stone-900 dark:text-stone-100">
                {activeSubject.name}
              </h2>
            </div>

            <button
              onClick={() => {
                setModalSubject(activeSubject);
                setIsNotesModalOpen(true);
              }}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-teal-700 hover:bg-teal-800 text-white transition-all shadow-xs flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <BookOpen className="w-4 h-4" />
              <span>Full Screen Chapter Notes</span>
            </button>
          </div>

          {/* 5 Chapter Tabs */}
          <div className="px-5 sm:px-6 py-3 border-b border-stone-200/80 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-850/60 flex items-center gap-2 overflow-x-auto scrollbar-none">
            {chaptersList.map((ch) => {
              const isSelected = ch.unitNumber === selectedChapterNum;
              return (
                <button
                  key={ch.unitNumber}
                  onClick={() => setSelectedChapterNum(ch.unitNumber)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200/80 dark:border-stone-700 hover:border-teal-400'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Chapter {ch.unitNumber}</span>
                </button>
              );
            })}
          </div>

          {/* Selected Chapter Notes Body */}
          {activeChapter && (
            <div className="p-5 sm:p-6 space-y-6">
              {/* Chapter Title & Overview */}
              <div className="p-5 rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-850/50 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-mono font-bold text-teal-700 dark:text-teal-300">
                    {activeSubject.name} · Chapter {activeChapter.unitNumber}
                  </span>
                  {activeChapter.weightage && (
                    <span className="text-xs font-mono text-stone-500">
                      Weightage: {activeChapter.weightage}
                    </span>
                  )}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100">
                  {activeChapter.unitTitle}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                  {activeChapter.summary}
                </p>
              </div>

              {/* Chapter Key Formulas */}
              {activeChapter.keyFormulas && activeChapter.keyFormulas.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Chapter {activeChapter.unitNumber} Key Formulas & Equations</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {activeChapter.keyFormulas.map((formula, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl border border-teal-200/80 dark:border-teal-900/60 bg-teal-50/40 dark:bg-teal-950/20 flex items-start justify-between gap-3"
                      >
                        <div className="font-mono text-xs font-bold text-teal-900 dark:text-teal-200">
                          {formula}
                        </div>
                        <button
                          onClick={() => handleCopyFormula(formula)}
                          className="p-1.5 rounded-lg text-teal-600 dark:text-teal-400 hover:bg-teal-100 dark:hover:bg-teal-900/50 transition-colors shrink-0 cursor-pointer"
                          title="Copy formula"
                        >
                          {copiedFormula === formula ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Chapter Topics & Detailed Notes */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-teal-600" />
                  <span>Chapter {activeChapter.unitNumber} Detailed Notes</span>
                </h4>

                <div className="space-y-3">
                  {activeChapter.keyConcepts.map((concept, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-xs space-y-2.5"
                    >
                      <h5 className="font-bold text-sm text-stone-900 dark:text-stone-100 flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span>{concept.heading}</span>
                      </h5>
                      <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                        {concept.description}
                      </p>
                      {concept.bulletPoints && concept.bulletPoints.length > 0 && (
                        <ul className="space-y-1.5 pl-5 list-disc marker:text-teal-600 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
                          {concept.bulletPoints.map((bp, bIdx) => (
                            <li key={bIdx}>{bp}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Derivations & Proofs */}
              {activeChapter.derivationsOrTheorems &&
                activeChapter.derivationsOrTheorems.length > 0 && (
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-teal-600" />
                      <span>Chapter {activeChapter.unitNumber} Key Derivations & Proofs</span>
                    </h4>
                    <div className="p-4 rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-850/40 space-y-2">
                      {activeChapter.derivationsOrTheorems.map((d, dIdx) => (
                        <div
                          key={dIdx}
                          className="flex items-start gap-2 text-xs text-stone-700 dark:text-stone-300"
                        >
                          <span className="font-mono font-bold text-teal-600 dark:text-teal-400">
                            •
                          </span>
                          <span>{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* Chapter Important Questions */}
              {activeChapter.frequentExamQuestions &&
                activeChapter.frequentExamQuestions.length > 0 && (
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Chapter {activeChapter.unitNumber} Practice Questions</span>
                    </h4>
                    <div className="space-y-2">
                      {activeChapter.frequentExamQuestions.map((q, qIdx) => {
                        const questionText = typeof q === 'string' ? q : (q as any).question;
                        return (
                          <div
                            key={qIdx}
                            className="p-3.5 rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-850/40 flex items-start gap-3"
                          >
                            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800 shrink-0">
                              Q{qIdx + 1}
                            </span>
                            <p className="text-xs sm:text-sm font-semibold text-stone-800 dark:text-stone-200">
                              {questionText}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
            </div>
          )}
        </div>
      )}

      {/* Subject Chapter-Wise Notes Modal */}
      <SubjectNotesModal
        isOpen={isNotesModalOpen}
        onClose={() => setIsNotesModalOpen(false)}
        subject={modalSubject || activeSubject}
      />
    </div>
  );
};
