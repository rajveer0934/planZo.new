import React, { useState, useEffect } from 'react';
import {
  X,
  BookOpen,
  Sparkles,
  FileText,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Award,
  Layers,
} from 'lucide-react';
import { SubjectCourse } from '../types';
import {
  getSubjectNotesDetail,
  FirstYearSubjectNotesDetail,
  UnitDetailedNote,
} from '../data/firstYearDetailedNotes';

interface SubjectNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  subject: SubjectCourse | null;
}

export const SubjectNotesModal: React.FC<SubjectNotesModalProps> = ({
  isOpen,
  onClose,
  subject,
}) => {
  const [selectedUnitNum, setSelectedUnitNum] = useState<number>(1);
  const [expandedConceptIdx, setExpandedConceptIdx] = useState<number | null>(0);
  const [copiedFormula, setCopiedFormula] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && subject) {
      setSelectedUnitNum(1);
      setExpandedConceptIdx(0);
    }
  }, [isOpen, subject?.id]);

  if (!isOpen || !subject) return null;

  const notesDetail: FirstYearSubjectNotesDetail = getSubjectNotesDetail(
    subject.id,
    subject.code,
    subject.name
  );

  // If the subject is from Sem 3-8 and doesn't match a 1st-year catalog entry, build 5 chapters from its modules
  const isFirstYearMatch =
    notesDetail.subjectId === subject.id ||
    notesDetail.subjectCode.toUpperCase() === subject.code.toUpperCase();

  const unitsList: UnitDetailedNote[] = isFirstYearMatch
    ? notesDetail.units
    : (subject.modules || []).map((mod, idx) => ({
        unitNumber: idx + 1,
        unitTitle: mod.title.startsWith('Chapter')
          ? mod.title
          : `Chapter ${idx + 1}: ${mod.title.replace(/^Unit[- ]*[IVX0-9]+[: ]*/i, '')}`,
        weightage: `${mod.weightagePercentage || 20}%`,
        summary: mod.topics.map((t) => t.name).join(' • '),
        keyFormulas: [],
        keyConcepts: mod.topics.map((t) => ({
          heading: t.name,
          description: `Complete chapter notes and core engineering concepts for ${t.name} under ${subject.name}.`,
          bulletPoints: [],
        })),
        derivationsOrTheorems: [],
        frequentExamQuestions: mod.topics.map(
          (t) => `Explain the principles, architecture, and applications of ${t.name}.`
        ),
      }));

  const activeUnit: UnitDetailedNote =
    unitsList.find((u) => u.unitNumber === selectedUnitNum) || unitsList[0];

  const handleCopyFormula = (formulaText: string) => {
    navigator.clipboard.writeText(formulaText);
    setCopiedFormula(formulaText);
    setTimeout(() => setCopiedFormula(null), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/65 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
    >
      <div className="relative w-full max-w-5xl my-auto rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden text-stone-900 dark:text-stone-100">
        {/* 1. Clean Subject Header (Only Subject Name & Code, no external links) */}
        <div className="px-5 sm:px-7 py-4 border-b border-stone-200/80 dark:border-stone-800 flex items-start justify-between gap-4 bg-gradient-to-r from-teal-50/60 via-white to-indigo-50/40 dark:from-teal-950/20 dark:via-stone-900 dark:to-indigo-950/20">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-lg text-xs font-mono font-bold bg-teal-600 text-white shadow-xs">
                {subject.code}
              </span>
              <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700">
                {unitsList.length} Chapters
              </span>
            </div>

            <h2
              id="modal-title"
              className="text-lg sm:text-2xl font-black tracking-tight text-stone-900 dark:text-stone-100"
            >
              {subject.name}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2. Chapter Selector Bar (Chapters 1 to 5) */}
        <div className="px-5 sm:px-7 py-3 border-b border-stone-200/80 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-850/60 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {unitsList.map((u) => {
            const isSelected = u.unitNumber === selectedUnitNum;
            return (
              <button
                key={u.unitNumber}
                onClick={() => {
                  setSelectedUnitNum(u.unitNumber);
                  setExpandedConceptIdx(0);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200/80 dark:border-stone-700 hover:border-teal-400'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Chapter {u.unitNumber}</span>
              </button>
            );
          })}
        </div>

        {/* 3. Main Chapter-Wise Notes Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
          {activeUnit && (
            <div className="space-y-6">
              {/* Active Chapter Title & Summary Card */}
              <div className="p-5 rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-850/60 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-mono font-bold text-teal-700 dark:text-teal-300">
                    Chapter {activeUnit.unitNumber} of {unitsList.length}
                  </span>
                  {activeUnit.weightage && (
                    <span className="text-xs font-semibold text-stone-500">
                      Weightage: {activeUnit.weightage}
                    </span>
                  )}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100">
                  {activeUnit.unitTitle}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                  {activeUnit.summary}
                </p>
              </div>

              {/* Essential Formulas for this Chapter */}
              {activeUnit.keyFormulas && activeUnit.keyFormulas.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Chapter {activeUnit.unitNumber} Key Formulas & Equations</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {activeUnit.keyFormulas.map((formula, fIdx) => (
                      <div
                        key={fIdx}
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

              {/* Chapter-Wise Detailed Notes & Topics */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-teal-600" />
                  <span>Chapter {activeUnit.unitNumber} Detailed Notes</span>
                </h4>

                <div className="space-y-3">
                  {activeUnit.keyConcepts.map((concept, cIdx) => {
                    const isExpanded = expandedConceptIdx === cIdx || expandedConceptIdx === -1;
                    return (
                      <div
                        key={cIdx}
                        className="rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden shadow-xs"
                      >
                        <button
                          onClick={() =>
                            setExpandedConceptIdx(expandedConceptIdx === cIdx ? null : cIdx)
                          }
                          className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-stone-50/60 dark:hover:bg-stone-850/50 transition-colors cursor-pointer"
                        >
                          <span className="font-bold text-sm text-stone-900 dark:text-stone-100 flex items-center gap-2.5">
                            <span className="w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                              {cIdx + 1}
                            </span>
                            <span>{concept.heading}</span>
                          </span>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-stone-400 shrink-0" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                          )}
                        </button>

                        {isExpanded && (
                          <div className="px-5 pb-5 pt-2 border-t border-stone-100 dark:border-stone-800 space-y-3 text-xs sm:text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                            <p>{concept.description}</p>

                            {concept.bulletPoints && concept.bulletPoints.length > 0 && (
                              <ul className="space-y-2 pl-4 list-disc marker:text-teal-600">
                                {concept.bulletPoints.map((bp, bpIdx) => (
                                  <li key={bpIdx}>{bp}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Derivations & Theorems */}
              {activeUnit.derivationsOrTheorems &&
                activeUnit.derivationsOrTheorems.length > 0 && (
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-teal-600" />
                      <span>Key Derivations, Proofs & Diagrams in Chapter {activeUnit.unitNumber}</span>
                    </h4>
                    <div className="p-4 rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-850/40 space-y-2">
                      {activeUnit.derivationsOrTheorems.map((d, dIdx) => (
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

              {/* Important Chapter Questions */}
              {activeUnit.frequentExamQuestions &&
                activeUnit.frequentExamQuestions.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Chapter {activeUnit.unitNumber} Important Questions</span>
                    </h4>

                    <div className="space-y-2.5">
                      {activeUnit.frequentExamQuestions.map((q, qIdx) => {
                        const questionText = typeof q === 'string' ? q : (q as any).question;
                        return (
                          <div
                            key={qIdx}
                            className="p-4 rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-850/40 flex items-start gap-3"
                          >
                            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800 shrink-0">
                              Q{qIdx + 1}
                            </span>
                            <p className="text-xs sm:text-sm font-semibold text-stone-800 dark:text-stone-200 leading-relaxed">
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

        {/* 4. Clean Footer */}
        <div className="px-5 sm:px-7 py-3 border-t border-stone-200/80 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-850/50 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-stone-500">
            <BookOpen className="w-4 h-4 text-teal-600" />
            <span>
              <strong className="text-stone-700 dark:text-stone-300">{subject.name}</strong> · Chapter {activeUnit?.unitNumber || 1} of {unitsList.length}
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 font-bold shadow-xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
