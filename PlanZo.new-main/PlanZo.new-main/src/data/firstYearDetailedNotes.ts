import { SEM_1_DETAILED_NOTES } from './sem1DetailedNotes';
import { SEM_2_DETAILED_NOTES } from './sem2DetailedNotes';
import { SubjectFolderData } from '../types';

export interface UnitDetailedNote {
  unitNumber: number;
  unitTitle: string;
  weightage: string;
  summary: string;
  keyFormulas?: string[];
  keyConcepts: {
    heading: string;
    description: string;
    bulletPoints?: string[];
  }[];
  derivationsOrTheorems?: string[];
  frequentExamQuestions: string[];
}

export interface FirstYearSubjectNotesDetail {
  subjectId: string;
  subjectCode: string;
  subjectName: string;
  shortDescription: string;
  textbook: string;
  driveFolderUrl?: string;
  totalPdfPages: string;
  quickFormulas: {
    title: string;
    formula: string;
    note?: string;
  }[];
  units: UnitDetailedNote[];
}

export const OFFICIAL_FIRST_YEAR_DRIVE_LINK = '';

export const FIRST_YEAR_SUBJECT_NOTES_CATALOG: Record<string, FirstYearSubjectNotesDetail> = {
  ...SEM_1_DETAILED_NOTES,
  ...SEM_2_DETAILED_NOTES,
};

/**
 * Generates a SubjectFolderData object from a FirstYearSubjectNotesDetail entry
 */
export function generateSubjectFolderDataFromCatalog(
  detail: FirstYearSubjectNotesDetail
): SubjectFolderData {
  return {
    subjectId: detail.subjectId,
    topperNotes: detail.units.map((u) => ({
      id: `${detail.subjectId}-ch-${u.unitNumber}`,
      title: u.unitTitle,
      type: 'notes' as const,
      dateAdded: `${detail.subjectCode} · Chapter ${u.unitNumber}`,
      fileSizeOrPages: `Chapter ${u.unitNumber} · Complete Notes`,
      summary: `${u.summary}\n\n${u.keyConcepts
        .map(
          (c) =>
            `• ${c.heading}: ${c.description}${
              c.bulletPoints && c.bulletPoints.length > 0
                ? '\n  - ' + c.bulletPoints.join('\n  - ')
                : ''
            }`
        )
        .join('\n\n')}`,
      tags: [`Chapter ${u.unitNumber}`, detail.subjectCode],
    })),
    previousYearQuestions: detail.units.map((u) => ({
      id: `${detail.subjectId}-pyq-${u.unitNumber}`,
      title: `${detail.subjectCode} — ${u.unitTitle} Important Questions`,
      type: 'pyq' as const,
      dateAdded: `Chapter ${u.unitNumber}`,
      fileSizeOrPages: `${u.frequentExamQuestions.length} Questions`,
      summary: u.frequentExamQuestions.map((q, idx) => `Q${idx + 1}. ${q}`).join('\n\n'),
      tags: [`Chapter ${u.unitNumber}`, 'University Exam'],
      solved: true,
    })),
    labVivaQuestions: detail.units.slice(0, 5).map((u, idx) => ({
      id: `${detail.subjectId}-viva-${idx + 1}`,
      question:
        u.frequentExamQuestions[0] ||
        `Explain the core concepts of ${u.unitTitle}.`,
      answer: u.keyConcepts[0]
        ? `${u.keyConcepts[0].description} ${
            u.keyConcepts[0].bulletPoints ? u.keyConcepts[0].bulletPoints.join(' ') : ''
          }`
        : u.summary,
      importance: 'Important Chapter Question',
    })),
    assignments: detail.units.map((u) => ({
      id: `${detail.subjectId}-asg-${u.unitNumber}`,
      title: `${u.unitTitle} — Chapter Revision & Practice Problems`,
      dueDate: `Chapter ${u.unitNumber}`,
      completed: false,
      maxMarks: 10,
    })),
  };
}

/**
 * Helper to look up a subject's detailed notes by subject ID, code, or partial name.
 */
export function getSubjectNotesDetail(
  subjectId: string,
  subjectCode?: string,
  subjectName?: string
): FirstYearSubjectNotesDetail {
  if (FIRST_YEAR_SUBJECT_NOTES_CATALOG[subjectId]) {
    return FIRST_YEAR_SUBJECT_NOTES_CATALOG[subjectId];
  }

  const codeUpper = (subjectCode || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
  const nameLower = (subjectName || '').toLowerCase();

  // Exact code matches for Sem 1 & Sem 2
  if (codeUpper.includes('CHB101') || codeUpper.includes('BT101') || nameLower.includes('chemistry')) {
    return FIRST_YEAR_SUBJECT_NOTES_CATALOG['sub-applied-chem'];
  }
  if (codeUpper.includes('PYB101') || codeUpper.includes('BT201') || nameLower.includes('physics')) {
    return FIRST_YEAR_SUBJECT_NOTES_CATALOG['sub-applied-phys'];
  }
  if (
    codeUpper.includes('MAB102') ||
    codeUpper.includes('BT202') ||
    nameLower.includes('mathematics-ii') ||
    nameLower.includes('mathematics ii') ||
    nameLower.includes('maths-ii') ||
    nameLower.includes('probability') ||
    nameLower.includes('differential equation')
  ) {
    return FIRST_YEAR_SUBJECT_NOTES_CATALOG['sub-maths-2'];
  }
  if (
    codeUpper.includes('MAB101') ||
    codeUpper.includes('BT102') ||
    nameLower.includes('mathematics') ||
    nameLower.includes('calculus') ||
    nameLower.includes('linear algebra')
  ) {
    return FIRST_YEAR_SUBJECT_NOTES_CATALOG['sub-maths'];
  }
  if (
    codeUpper.includes('CSA103') ||
    nameLower.includes('data structure') ||
    nameLower.includes('dsa')
  ) {
    return FIRST_YEAR_SUBJECT_NOTES_CATALOG['sub-dsa'];
  }
  if (
    codeUpper.includes('CSA101') ||
    codeUpper.includes('BT205') ||
    nameLower.includes('computer science') ||
    nameLower.includes('programming in c') ||
    nameLower.includes('fundamental of computer')
  ) {
    return FIRST_YEAR_SUBJECT_NOTES_CATALOG['sub-cs'];
  }
  if (
    codeUpper.includes('ECB101') ||
    nameLower.includes('digital system') ||
    nameLower.includes('digital logic') ||
    nameLower.includes('switching')
  ) {
    return FIRST_YEAR_SUBJECT_NOTES_CATALOG['sub-edc'];
  }
  if (
    codeUpper.includes('EEB101') ||
    codeUpper.includes('BT104') ||
    nameLower.includes('electrical') ||
    nameLower.includes('beee')
  ) {
    return FIRST_YEAR_SUBJECT_NOTES_CATALOG['sub-beee'];
  }
  if (
    codeUpper.includes('MEB102') ||
    codeUpper.includes('BT203') ||
    nameLower.includes('mechanical') ||
    nameLower.includes('bme')
  ) {
    return FIRST_YEAR_SUBJECT_NOTES_CATALOG['sub-bme'];
  }
  if (
    codeUpper.includes('ITC101') ||
    nameLower.includes('python')
  ) {
    return FIRST_YEAR_SUBJECT_NOTES_CATALOG['sub-python'];
  }
  if (
    codeUpper.includes('CSA104') ||
    nameLower.includes('system software') ||
    nameLower.includes('linux')
  ) {
    return FIRST_YEAR_SUBJECT_NOTES_CATALOG['sub-sys-soft'];
  }
  if (
    codeUpper.includes('HSB101') ||
    codeUpper.includes('BT103') ||
    nameLower.includes('communication') ||
    nameLower.includes('english')
  ) {
    return FIRST_YEAR_SUBJECT_NOTES_CATALOG['sub-comm-skills'];
  }

  // Fallback to Applied Chemistry if no specific match
  return FIRST_YEAR_SUBJECT_NOTES_CATALOG['sub-applied-chem'];
}
