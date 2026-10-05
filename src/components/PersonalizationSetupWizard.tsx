import React, { useState } from 'react';
import {
  GraduationCap,
  Sparkles,
  BookOpen,
  Clock,
  Check,
  ArrowRight,
  ArrowLeft,
  Flame,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Layers,
  ChevronRight,
  Compass,
  Trophy,
  Edit3,
  Trash2,
  Plus,
  RotateCcw,
  Laptop,
  Coffee,
  Square,
  AlertCircle,
  Star,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import {
  SATI_SEMESTER_CURRICULA,
  SATI_SUBJECT_FOLDERS_DATA,
  getCurriculumForSatiSemester,
} from '../data/satiVidishaData';
import { FOUNDATION_ENGINEERING_SUBJECTS } from '../data/foundationSubjects';
import { getBranchSemesterSubjects } from '../data/branchCurriculumData';
import { SubjectCourse, SubjectAttendance, TimetableItem, ItemCategory } from '../types';
import { playTaskCompleteSound } from '../utils/audioSynth';
import { fireConfetti } from '../utils/audioVibes';

export interface StudentHabitItem {
  id: string;
  title: string;
  desc: string;
  icon: string;
  category: string;
  badge: string;
}

export const STUDENT_TEN_HABITS: StudentHabitItem[] = [
  {
    id: 'habit-dsa',
    title: 'Daily Coding / DSA Practice',
    desc: 'Solve 1-2 coding problems on LeetCode/GeeksforGeeks daily',
    icon: '💻',
    category: 'Skills & Tech',
    badge: 'High Impact',
  },
  {
    id: 'habit-gym',
    title: 'Gym / Workout / Physical Fitness',
    desc: '45m physical exercise, gym or workout to sustain mental energy (Morning)',
    icon: '🏋️‍♂️',
    category: 'Health & Energy',
    badge: 'Subah Fitness',
  },
  {
    id: 'habit-outdoor',
    title: 'Outdoor Walk, Running & Sports (Fresh Air)',
    desc: '30-40m outdoor brisk walk, jogging or outdoor sports to decompress (Shaam)',
    icon: '🌳',
    category: 'Outdoor & Health',
    badge: 'Shaam Outdoor',
  },
  {
    id: 'habit-hydration',
    title: 'Daily Hydration (3L+ Water)',
    desc: 'Maintain steady water intake to avoid fatigue during long lectures',
    icon: '💧',
    category: 'Health & Energy',
    badge: 'Essential',
  },
  {
    id: 'habit-deepwork',
    title: 'Deep Work: No-Phone Study Block (45m)',
    desc: 'Distraction-free focus sprint with notifications turned off',
    icon: '📵',
    category: 'Academics',
    badge: 'Focus',
  },
  {
    id: 'habit-revision',
    title: 'Formula & Concept Sheet Revision',
    desc: '15 min active recall of engineering formulas, laws and derivations',
    icon: '🔄',
    category: 'Academics',
    badge: 'Exams',
  },
  {
    id: 'habit-communication',
    title: 'English Speaking & Soft Skills Practice',
    desc: 'Practice spoken English, GD communication and technical pitch',
    icon: '🗣️',
    category: 'Career & Prep',
    badge: 'Interviews',
  },
  {
    id: 'habit-tech-news',
    title: 'Tech News & Technical Paper Reading',
    desc: 'Read latest AI advancements, open-source tech blogs & research papers',
    icon: '📰',
    category: 'Skills & Tech',
    badge: 'Knowledge',
  },
  {
    id: 'habit-meditation',
    title: 'Mindful Breathing / Meditation (10m)',
    desc: 'Mental reset and calmness before starting or after returning from college',
    icon: '🧘',
    category: 'Mental Wellness',
    badge: 'Calm',
  },
  {
    id: 'habit-reading',
    title: 'Reading Non-Academic / Mindset Books',
    desc: 'Read 15-20 pages of self-growth, mindset, finance or career books',
    icon: '📖',
    category: 'Personal Growth',
    badge: 'Mindset',
  },
  {
    id: 'habit-journaling',
    title: 'Night Journaling & Tomorrow Planning',
    desc: 'Reflect on today\'s learnings and lock in top 3 priorities for tomorrow',
    icon: '📝',
    category: 'Discipline',
    badge: 'Routine',
  },
];

interface PersonalizationSetupWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onPlanGenerated?: () => void;
}

export const PersonalizationSetupWizard: React.FC<PersonalizationSetupWizardProps> = ({
  isOpen,
  onClose,
  onPlanGenerated,
}) => {
  const {
    profile,
    currentUser,
    updateProfile,
    timetable,
    setTimetable,
    setSubjects,
    setAttendance,
    setActiveView,
  } = useApp();

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);

  // All 8 Semesters in strictly ascending order (1 to 8) - Clean, no subjects
  const ALL_8_SEMESTERS = [
    { sem: 1, name: 'Semester 1', year: '1st Year', badge: 'Sem 1' },
    { sem: 2, name: 'Semester 2', year: '1st Year', badge: 'Sem 2' },
    { sem: 3, name: 'Semester 3', year: '2nd Year', badge: 'Sem 3' },
    { sem: 4, name: 'Semester 4', year: '2nd Year', badge: 'Sem 4' },
    { sem: 5, name: 'Semester 5', year: '3rd Year', badge: 'Sem 5' },
    { sem: 6, name: 'Semester 6', year: '3rd Year', badge: 'Sem 6' },
    { sem: 7, name: 'Semester 7', year: 'Final Year', badge: 'Sem 7' },
    { sem: 8, name: 'Semester 8', year: 'Final Year', badge: 'Sem 8' },
  ];

  const ENGINEERING_BRANCH_OPTIONS = [
    'Computer Science & Engineering (CSE)',
    'Information Technology (IT)',
    'Artificial Intelligence & Machine Learning (AIML)',
    'Artificial Intelligence & Data Science (AI & DS)',
    'Internet of Things (IoT)',
    'Cyber Security',
    'Block Chain / Blockchain Technology',
    'Electronics & Communication Engineering (ECE)',
    'Electrical Engineering (EE)',
    'Mechanical Engineering (ME)',
    'Civil Engineering (CE)',
    'Electronics & Instrumentation Engineering (EI)',
    'Robotics & Automation',
    'Chemical Engineering',
    'Biotechnology Engineering',
    'Other Engineering Branch (Custom)',
  ];

  // Step 1: Academic Identity
  const [name, setName] = useState(currentUser?.name || profile.name || '');
  const [college, setCollege] = useState(profile.customCollege || profile.college || 'Samrat Ashok Technological Institute (SATI), Vidisha M.P.');
  const [customCollege, setCustomCollege] = useState(profile.customCollege || '');
  const [branch, setBranch] = useState(profile.branch || 'Computer Science & Engineering (CSE)');
  const [customBranch, setCustomBranch] = useState(
    ENGINEERING_BRANCH_OPTIONS.includes(profile.branch || '') ? '' : (profile.branch || '')
  );
  const [semester, setSemester] = useState<number>(profile.semester || 1);
  const [rollNo, setRollNo] = useState(profile.rollNo || '0108CS211045');

  // Branch resolution & curriculum determination
  const resolvedBranch = (branch === 'Other Engineering Branch (Custom)' || branch === 'OTHERS')
    ? (customBranch.trim() || 'Engineering')
    : (customBranch.trim() || branch || 'Computer Science & Engineering (CSE)');

  // 1st or 2nd semester: Foundation engineering subjects
  // 3rd or 4th semester (or higher): Branch-specific official subjects
  const isFoundationYear = semester === 1 || semester === 2;

  const currentAvailableSubjects = isFoundationYear
    ? FOUNDATION_ENGINEERING_SUBJECTS
    : getBranchSemesterSubjects(resolvedBranch, semester);

  // Step 2: Subject Options Selection
  const [selectedSubjectIds, setSelectedSubjectIds] = useState<string[]>(() => {
    const isFound = (profile.semester || 1) <= 2;
    if (isFound) {
      return [
        'sub-applied-chem',
        'sub-applied-phys',
        'sub-maths',
        'sub-eng-comm',
        'sub-basic-cs',
      ];
    }
    const branchSubs = getBranchSemesterSubjects(
      profile.branch || 'Computer Science & Engineering (CSE)',
      profile.semester || 3
    );
    return branchSubs.map((s) => s.id);
  });

  const [customSubjects, setCustomSubjects] = useState<SubjectCourse[]>([]);
  const [newSubjectTitle, setNewSubjectTitle] = useState('');
  const [newSubjectCode, setNewSubjectCode] = useState('');
  const [subjectSelectionError, setSubjectSelectionError] = useState<string | null>(null);
  const [mostImportantTask, setMostImportantTask] = useState<string>(() => {
    const isFound = (profile.semester || 1) <= 2;
    if (isFound) {
      return profile.mostImportantTask || 'Basic Computer Science & C Programming';
    }
    const branchSubs = getBranchSemesterSubjects(
      profile.branch || 'Computer Science & Engineering (CSE)',
      profile.semester || 3
    );
    return profile.mostImportantTask || branchSubs[0]?.name || 'Discrete Mathematics';
  });

  const toggleSubject = (subId: string) => {
    setSubjectSelectionError(null);
    setSelectedSubjectIds((prev) =>
      prev.includes(subId) ? prev.filter((id) => id !== subId) : [...prev, subId]
    );
  };

  const handleSelectAllSubjects = () => {
    setSubjectSelectionError(null);
    const allIds = [
      ...currentAvailableSubjects.map((s) => s.id),
      ...customSubjects.map((s) => s.id),
    ];
    setSelectedSubjectIds(allIds);
  };

  const handleDeselectAllSubjects = () => {
    setSelectedSubjectIds([]);
  };

  const handleSelectStandardGroupA = () => {
    setSubjectSelectionError(null);
    setSelectedSubjectIds([
      'sub-applied-phys',
      'sub-maths',
      'sub-basic-elec',
      'sub-basic-cs',
      'sub-eng-comm',
    ]);
  };

  const handleSelectStandardGroupB = () => {
    setSubjectSelectionError(null);
    setSelectedSubjectIds([
      'sub-applied-chem',
      'sub-maths',
      'sub-basic-electr',
      'sub-eng-graphics',
      'sub-fund-mech',
      'sub-fund-civil',
    ]);
  };

  const handleAddCustomSubject = () => {
    if (!newSubjectTitle.trim()) return;
    const cleanTitle = newSubjectTitle.trim();
    const cleanCode = newSubjectCode.trim() || `ENG-${100 + customSubjects.length + 1}`;
    const newId = `custom-sub-${Date.now()}`;
    const newCourse: SubjectCourse = {
      id: newId,
      code: cleanCode.toUpperCase(),
      name: cleanTitle,
      credits: 3,
      color: 'teal',
      standardTextbook: 'Institute Prescribed Textbook & Lecture Notes',
      pyqPaperAvailable: true,
      modules: [
        {
          id: `${newId}-u1`,
          title: 'Unit-I: Foundational Principles & Theory',
          weightagePercentage: 20,
          topics: [
            { id: `${newId}-t1`, name: 'Core principles, definitions & foundational models', completed: false },
            { id: `${newId}-t2`, name: 'Theoretical concepts & analytical frameworks', completed: false },
          ],
        },
        {
          id: `${newId}-u2`,
          title: 'Unit-II: Advanced Engineering Applications',
          weightagePercentage: 20,
          topics: [
            { id: `${newId}-t3`, name: 'Methodologies, tools & problem solving', completed: false },
            { id: `${newId}-t4`, name: 'Practical implementation & engineering case studies', completed: false },
          ],
        },
      ],
    };

    setCustomSubjects((prev) => [...prev, newCourse]);
    setSelectedSubjectIds((prev) => [...prev, newId]);
    setNewSubjectTitle('');
    setNewSubjectCode('');
    setSubjectSelectionError(null);
  };

  const removeCustomSubject = (id: string) => {
    setCustomSubjects((prev) => prev.filter((s) => s.id !== id));
    setSelectedSubjectIds((prev) => prev.filter((i) => i !== id));
  };

  const handleSemesterChange = (newSem: number) => {
    setSemester(newSem);
    setSubjectSelectionError(null);
    if (newSem === 1 || newSem === 2) {
      setSelectedSubjectIds([
        'sub-applied-chem',
        'sub-applied-phys',
        'sub-maths',
        'sub-eng-comm',
        'sub-basic-cs',
      ]);
      setMostImportantTask('Basic Computer Science & C Programming');
    } else {
      const branchSubs = getBranchSemesterSubjects(resolvedBranch, newSem);
      setSelectedSubjectIds(branchSubs.map((s) => s.id));
      if (branchSubs.length > 0) {
        setMostImportantTask(branchSubs[0].name);
      }
    }
  };

  const handleBranchChange = (newBranch: string) => {
    setBranch(newBranch);
    setSubjectSelectionError(null);
    if (semester !== 1 && semester !== 2) {
      const effBranch = (newBranch === 'Other Engineering Branch (Custom)' || newBranch === 'OTHERS')
        ? (customBranch.trim() || 'Engineering')
        : (customBranch.trim() || newBranch || 'Computer Science & Engineering (CSE)');
      const branchSubs = getBranchSemesterSubjects(effBranch, semester);
      setSelectedSubjectIds(branchSubs.map((s) => s.id));
      if (branchSubs.length > 0) {
        setMostImportantTask(branchSubs[0].name);
      }
    }
  };

  // Step 3: Timing & Goals (User configurable college timing, wake/sleep & primary focus)
  const [collegeStartTime, setCollegeStartTime] = useState(profile.collegeStart || '10:00');
  const [collegeEndTime, setCollegeEndTime] = useState(profile.collegeEnd || '17:00');
  const [wakeTime, setWakeTime] = useState(profile.wakeTime || '07:00');
  const [sleepTime, setSleepTime] = useState(profile.sleepTime || '23:30');
  const [primaryGoal, setPrimaryGoal] = useState<'skills' | 'other_studies' | 'cgpa' | 'bunk' | 'gate'>(
    ((profile as any).primaryGoal === 'placement' ? 'skills' : (profile as any).primaryGoal) || 'skills'
  );

  // Step 4: 10 Habits Commonly Pursued by Students
  const [selectedHabits, setSelectedHabits] = useState<string[]>(
    profile.selectedHabits && profile.selectedHabits.length > 0
      ? profile.selectedHabits
      : [
          'Daily Coding / DSA Practice',
          'Gym / Workout / Physical Fitness',
          'Daily Hydration (3L+ Water)',
          'Deep Work: No-Phone Study Block (45m)',
          'Formula & Concept Sheet Revision',
        ]
  );

  // Step 4: Attendance Input (Starts at 0 attended, 0 conducted for clean start)
  const [attendanceValues, setAttendanceValues] = useState<Record<string, { attended: number; total: number }>>({});

  // Step 5: Generating state
  const [isGenerating, setIsGenerating] = useState(false);

  // Compute final subject list from user selections
  const getCompiledSubjects = (): SubjectCourse[] => {
    const allAvailable = [...currentAvailableSubjects, ...customSubjects];
    const selected = allAvailable.filter((sub) => selectedSubjectIds.includes(sub.id));
    if (selected.length > 0) return selected;
    if (currentAvailableSubjects.length > 0) return [currentAvailableSubjects[0]];
    return [FOUNDATION_ENGINEERING_SUBJECTS[0]];
  };

  // Step 6: Prepared Daily Tasks & Customization State
  const [preparedTasks, setPreparedTasks] = useState<TimetableItem[]>([]);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editCategory, setEditCategory] = useState<ItemCategory>('study');
  const [editStartTime, setEditStartTime] = useState('10:00');
  const [editEndTime, setEditEndTime] = useState('17:00');

  const [isAddingNewTask, setIsAddingNewTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState<ItemCategory>('study');
  const [newTaskStartTime, setNewTaskStartTime] = useState('18:00');
  const [newTaskEndTime, setNewTaskEndTime] = useState('19:00');

  // Helper: Parse HH:MM to total minutes from 00:00
  const parseTimeToMinutes = (t: string): number => {
    if (!t) return 0;
    const parts = t.split(':').map(Number);
    return (parts[0] || 0) * 60 + (parts[1] || 0);
  };

  // Helper: Format total minutes to HH:MM (00:00 to 23:59)
  const formatMinutesToTime = (mins: number): string => {
    const bounded = Math.max(0, Math.min(1439, Math.round(mins)));
    const h = Math.floor(bounded / 60);
    const m = bounded % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  };

  // Validation & Conflict-Resolution Engine:
  // Strictly enforces:
  // 1. No two tasks overlap in time.
  // 2. Exactly one active task per time period.
  // 3. College is strictly one unified block with user's exact collegeStartTime & collegeEndTime.
  // 4. All tasks sequentially ordered from wake-up to bedtime.
  const validateAndResolveSchedule = (
    tasks: TimetableItem[],
    cStart: string,
    cEnd: string
  ): TimetableItem[] => {
    if (!tasks || tasks.length === 0) return [];

    // Ensure college block matches exact user inputs
    const updated = tasks.map((t) => {
      if (t.id.includes('college') || t.category === 'lecture' || t.title.toLowerCase().includes('college')) {
        return {
          ...t,
          category: 'lecture' as ItemCategory,
          startTime: cStart,
          endTime: cEnd,
        };
      }
      return t;
    });

    // Sort strictly by startTime
    const sorted = [...updated].sort(
      (a, b) => parseTimeToMinutes(a.startTime) - parseTimeToMinutes(b.startTime)
    );

    const resolved: TimetableItem[] = [];
    for (let i = 0; i < sorted.length; i++) {
      const cur = { ...sorted[i] };
      const curStartM = parseTimeToMinutes(cur.startTime);
      let curEndM = parseTimeToMinutes(cur.endTime);

      if (curEndM <= curStartM) {
        curEndM = curStartM + 45;
      }

      if (resolved.length > 0) {
        const prev = resolved[resolved.length - 1];
        const prevEndM = parseTimeToMinutes(prev.endTime);

        if (curStartM < prevEndM) {
          // CONFLICT DETECTED: Automatically push cur.startTime to prevEndM
          const duration = Math.max(25, curEndM - curStartM);
          const newStartM = prevEndM;
          const newEndM = Math.min(1439, newStartM + duration);
          cur.startTime = formatMinutesToTime(newStartM);
          cur.endTime = formatMinutesToTime(newEndM);
        }
      }

      resolved.push(cur);
    }

    return resolved;
  };

  // Habit Analysis Engine:
  // Categorizes user selected habits to optimize timing:
  // 1. Physical Fitness / Workout / Gym / Yoga -> Adjusted in Subah (Morning)
  // 2. Outdoor Activities / Walk / Sports / Fresh Air -> Adjusted in Sham (Evening)
  // 3. Night Review / Journaling / Book Reading -> Adjusted in Raat (Night)
  const analyzeHabits = (habits: string[]) => {
    let morningFitness: string | null = null;
    let eveningOutdoor: string | null = null;
    let nightReflection: string | null = null;

    for (const h of habits) {
      const lower = h.toLowerCase();
      if (
        !morningFitness &&
        (lower.includes('gym') ||
          lower.includes('workout') ||
          lower.includes('fitness') ||
          lower.includes('yoga') ||
          lower.includes('exercise') ||
          lower.includes('pushup') ||
          lower.includes('calisthenic'))
      ) {
        morningFitness = h;
        continue;
      }
      if (
        !eveningOutdoor &&
        (lower.includes('outdoor') ||
          lower.includes('walk') ||
          lower.includes('sports') ||
          lower.includes('running') ||
          lower.includes('cycling') ||
          lower.includes('badminton') ||
          lower.includes('jogging') ||
          lower.includes('fresh air'))
      ) {
        eveningOutdoor = h;
        continue;
      }
      if (
        !nightReflection &&
        (lower.includes('night') ||
          lower.includes('journal') ||
          lower.includes('tomorrow') ||
          lower.includes('review') ||
          lower.includes('reading') ||
          lower.includes('sleep') ||
          lower.includes('wrap-up'))
      ) {
        nightReflection = h;
        continue;
      }
    }

    return {
      morningFitness,
      eveningOutdoor,
      nightReflection: nightReflection || 'Night Reflection & Day Wrap-Up',
    };
  };

  // Generator: Creates conflict-free daily tasks adhering to student scheduling rules:
  // 1. Built directly on user inputs: college hours, wake/sleep, subjects & MIT.
  // 2. Habit Analysis: Physical fitness adjusted in morning, outdoor in evening, reflection at night.
  // 3. Study Distribution: High-focus study sessions placed mainly in Subah (Morning) and Raat (Night), with primary focus in evening.
  // 4. College is strictly ONE single task matching user's exact collegeStartTime & collegeEndTime.
  // 5. Zero overlapping: strictly conflict-free sequential timeslots.
  const generatePreparedTasks = (): TimetableItem[] => {
    const resolvedCollege = college === 'OTHERS'
      ? (customCollege.trim() || 'College')
      : (customCollege.trim() || college || 'College');

    const compiled = getCompiledSubjects();
    const chosenMit = mostImportantTask.trim() || compiled[0]?.name || 'C Programming';

    const wakeM = parseTimeToMinutes(wakeTime || '07:00');
    const cStartM = parseTimeToMinutes(collegeStartTime || '10:00');
    const cEndM = parseTimeToMinutes(collegeEndTime || '17:00');
    const sleepM = parseTimeToMinutes(sleepTime || '23:30');

    // Analyze habits into Morning Fitness, Evening Outdoor, Night Reflection
    const { morningFitness, eveningOutdoor, nightReflection } = analyzeHabits(selectedHabits);

    const draftTasks: TimetableItem[] = [];

    // =========================================================================
    // 1. SUBAH (MORNING) ROUTINE & STUDY:
    // - Physical Fitness / Workout (Adjusted in Morning as per user rule)
    // - ⭐ Subah Study: Most Important Task (Morning Priority Session 1 - ~1 Hour)
    // - Breakfast, Campus Commute & Buffer before college
    // =========================================================================
    const availMorning = Math.max(90, cStartM - wakeM);
    let morningCursor = wakeM;

    // A. Physical Fitness in Morning
    if (morningFitness) {
      const fitnessDur = availMorning >= 150 ? 40 : 30;
      draftTasks.push({
        id: 'prep-routine-fitness-morning',
        title: `🏃‍♂️ Subah Fitness: ${morningFitness}`,
        category: 'habit',
        startTime: formatMinutesToTime(morningCursor),
        endTime: formatMinutesToTime(morningCursor + fitnessDur),
        completed: false,
        cognitiveWeight: 2,
        notes: 'Morning physical workout to activate energy and build peak mental stamina.',
      });
      morningCursor += fitnessDur;
    } else {
      const prepDur = 20;
      draftTasks.push({
        id: 'prep-routine-kickoff',
        title: 'Morning Wakeup, Hydration & Focus Priming',
        category: 'habit',
        startTime: formatMinutesToTime(morningCursor),
        endTime: formatMinutesToTime(morningCursor + prepDur),
        completed: false,
        cognitiveWeight: 1,
        notes: 'Morning hydration and mental priming.',
      });
      morningCursor += prepDur;
    }

    // B. ⭐ Subah Study Session: Most Important Task (~1 hour / 50-60m)
    // "study ko bhi alg alg time pe rakho mainly subhe or raat me"
    const remainingBeforeCollege = cStartM - morningCursor;
    const mitMorningDur = remainingBeforeCollege >= 95 ? 60 : Math.max(45, remainingBeforeCollege - 35);
    draftTasks.push({
      id: 'prep-routine-mit-morning',
      title: `⭐ Subah Deep Study: ${chosenMit} (Morning Priority Session 1)`,
      category: 'study',
      startTime: formatMinutesToTime(morningCursor),
      endTime: formatMinutesToTime(morningCursor + mitMorningDur),
      completed: false,
      cognitiveWeight: 4,
      notes: `Dedicated morning 1-hour priority deep work on your Most Important Task (${chosenMit}).`,
    });
    morningCursor += mitMorningDur;

    // C. Breakfast, Commute & Settle in Class
    draftTasks.push({
      id: 'prep-routine-commute',
      title: 'Breakfast & Commute to Campus',
      category: 'chill',
      startTime: formatMinutesToTime(morningCursor),
      endTime: formatMinutesToTime(cStartM),
      completed: false,
      cognitiveWeight: 1,
      notes: 'Nutritious breakfast, campus travel, and settling into lectures.',
    });

    // =========================================================================
    // 2. COLLEGE BLOCK: Exactly ONE single task
    // =========================================================================
    draftTasks.push({
      id: 'prep-routine-college',
      title: `${resolvedCollege} — Full College Schedule (Lectures & Labs)`,
      category: 'lecture',
      startTime: collegeStartTime || '10:00',
      endTime: collegeEndTime || '17:00',
      completed: false,
      cognitiveWeight: 4,
      notes: `Unified college session covering all lectures, labs & practicals (${collegeStartTime} – ${collegeEndTime}). Mark once for the whole day.`,
    });

    // =========================================================================
    // 3. SHAM (EVENING) ROUTINE:
    // - Campus Departure & Evening Chai / Refreshment (30m)
    // - Outdoor Habit (Placed in Evening as per user rule)
    // - 🎯 Primary Semester Focus: Dedicated 1h 30m Priority Study Block
    // - Dinner & Evening Decompression
    // =========================================================================
    let eveningCursor = cEndM;

    // A. Campus Departure & Chai Break (30m)
    const teaEnd = eveningCursor + 30;
    draftTasks.push({
      id: 'prep-routine-tea',
      title: 'Campus Departure & Evening Chai / Refreshment',
      category: 'chill',
      startTime: formatMinutesToTime(eveningCursor),
      endTime: formatMinutesToTime(teaEnd),
      completed: false,
      cognitiveWeight: 1,
      notes: 'Evening tea and transition back from campus.',
    });
    eveningCursor = teaEnd;

    // B. Outdoor Habit in Evening
    // "habit jo outdoor ho unko sham me rakho"
    const outdoorTitle = eveningOutdoor || 'Outdoor Walk & Campus Fresh Air';
    const outdoorDur = 35;
    draftTasks.push({
      id: 'prep-routine-outdoor-evening',
      title: `🌳 Sham Outdoor Habit: ${outdoorTitle}`,
      category: 'habit',
      startTime: formatMinutesToTime(eveningCursor),
      endTime: formatMinutesToTime(eveningCursor + outdoorDur),
      completed: false,
      cognitiveWeight: 1,
      notes: 'Evening outdoor activity, fresh air walk or sports to decompress after lectures.',
    });
    eveningCursor += outdoorDur;

    // C. 🎯 Primary Semester Focus: Dedicated 1 Hour 30 Minutes Study Block (90m)
    const secondarySub = compiled.find((s) => s.name.toLowerCase() !== chosenMit.toLowerCase()) || compiled[0];
    let focusTitle = `🎯 Primary Semester Focus: Skills & Practical Coding Sprint (${chosenMit})`;
    if (primaryGoal === 'cgpa') {
      focusTitle = `🎯 Primary Focus: ${secondarySub?.name || compiled[0]?.name || 'Core Syllabus'} Theory & PYQs`;
    } else if (primaryGoal === 'other_studies') {
      focusTitle = '🎯 Primary Focus: GATE & Competitive Exam Foundation Sprint';
    } else if (primaryGoal === 'gate') {
      focusTitle = `🎯 Primary Focus: Core Engineering Revision & Numericals (${chosenMit})`;
    } else if (primaryGoal === 'bunk') {
      focusTitle = '🎯 Primary Focus: High-Yield Academic Coverage & Assignment Sprint';
    }

    const primaryFocusDur = 90; // Exactly 1 hour 30 minutes
    draftTasks.push({
      id: 'prep-routine-primary-focus',
      title: focusTitle,
      category: 'study',
      startTime: formatMinutesToTime(eveningCursor),
      endTime: formatMinutesToTime(eveningCursor + primaryFocusDur),
      completed: false,
      cognitiveWeight: 4,
      notes: 'Dedicated 1 hour 30 minutes priority study block aligned with your primary semester focus.',
    });
    eveningCursor += primaryFocusDur;

    // D. Dinner & Relaxation (45m break)
    const dinnerDur = 45;
    draftTasks.push({
      id: 'prep-routine-dinner',
      title: 'Dinner & Mindful Decompression',
      category: 'chill',
      startTime: formatMinutesToTime(eveningCursor),
      endTime: formatMinutesToTime(eveningCursor + dinnerDur),
      completed: false,
      cognitiveWeight: 1,
      notes: 'Dinner with friends or family, and evening wind-down.',
    });
    eveningCursor += dinnerDur;

    // =========================================================================
    // 4. RAAT (NIGHT) STUDY & WIND-DOWN:
    // - "study ko bhi alg alg time pe rakho mainly subhe or raat me"
    // - ⭐ Raat Deep Study: Most Important Task (Session 2 - ~1 Hour)
    // - Secondary Subject Study (~50 min) if time permits
    // - Night Reflection & Tomorrow Planning Habit
    // =========================================================================
    const remainingNightM = sleepM - eveningCursor;

    // A. ⭐ Raat Deep Study: Most Important Task Session 2 (~1 Hour / 60m)
    const mitNightDur = remainingNightM >= 100 ? 60 : Math.max(45, Math.min(60, remainingNightM - 30));
    draftTasks.push({
      id: 'prep-routine-mit-night',
      title: `⭐ Raat Deep Study: ${chosenMit} (Night Priority Session 2)`,
      category: 'study',
      startTime: formatMinutesToTime(eveningCursor),
      endTime: formatMinutesToTime(eveningCursor + mitNightDur),
      completed: false,
      cognitiveWeight: 4,
      notes: `Second dedicated 1-hour session for your Most Important Task (${chosenMit}) at night.`,
    });
    eveningCursor += mitNightDur;

    // B. Additional Subject Study (50m) if extra night time remains before sleep
    const remainingBeforeSleep = sleepM - eveningCursor;
    if (remainingBeforeSleep >= 75 && compiled.length > 1) {
      const thirdSub = compiled.find(
        (s) => s.name.toLowerCase() !== chosenMit.toLowerCase() && s.name !== secondarySub?.name
      ) || secondarySub;

      if (thirdSub) {
        const extraStudyDur = 50; // Exactly 50 minutes (~50 min, >= 45 min)
        draftTasks.push({
          id: 'prep-routine-additional-study',
          title: `Academic Revision: ${thirdSub.name} (50m Focus)`,
          category: 'study',
          startTime: formatMinutesToTime(eveningCursor),
          endTime: formatMinutesToTime(eveningCursor + extraStudyDur),
          completed: false,
          cognitiveWeight: 3,
          notes: `50-minute focused revision session on ${thirdSub.name} from your chosen subjects.`,
        });
        eveningCursor += extraStudyDur;
      }
    }

    // C. Night Habit & Rest (Adjusted at Night)
    draftTasks.push({
      id: 'prep-routine-night',
      title: `🌙 Night Wind-down: ${nightReflection} & Rest`,
      category: 'habit',
      startTime: formatMinutesToTime(eveningCursor),
      endTime: sleepTime || '23:30',
      completed: false,
      cognitiveWeight: 1,
      notes: 'Reflection, gratitude, preparing for tomorrow and restorative sleep.',
    });

    // Run conflict resolution & final validation
    return validateAndResolveSchedule(draftTasks, collegeStartTime || '10:00', collegeEndTime || '17:00');
  };

  const handleNextStep = () => {
    if (step === 2 && selectedSubjectIds.length === 0) {
      setSubjectSelectionError('Please select at least 1 subject from the options to proceed.');
      return;
    }
    setSubjectSelectionError(null);

    // When advancing to Step 6 (Review & Customize Your Plan), always generate from latest inputs
    if (step === 5) {
      const generated = generatePreparedTasks();
      setPreparedTasks(generated);
    }

    setStep((prev) => (prev + 1) as any);
  };

  // Toggle mark complete on prepared tasks (including single college task!)
  const handleTogglePreparedTask = (taskId: string) => {
    setPreparedTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  // Start inline editing a task
  const handleStartEdit = (task: TimetableItem) => {
    setEditingTaskId(task.id);
    setEditTitle(task.title);
    setEditCategory(task.category);
    setEditStartTime(task.startTime);
    setEditEndTime(task.endTime);
  };

  // Save inline edit with conflict validation
  const handleSaveEdit = (taskId: string) => {
    if (!editTitle.trim()) return;
    const updated = preparedTasks.map((t) =>
      t.id === taskId
        ? {
            ...t,
            title: editTitle.trim(),
            category: editCategory,
            startTime: editStartTime,
            endTime: editEndTime,
          }
        : t
    );
    const resolved = validateAndResolveSchedule(
      updated,
      collegeStartTime || '10:00',
      collegeEndTime || '17:00'
    );
    setPreparedTasks(resolved);
    setEditingTaskId(null);
  };

  // Delete a task from prepared schedule
  const handleDeletePreparedTask = (taskId: string) => {
    setPreparedTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  // Add custom task to prepared schedule with conflict resolution
  const handleAddNewTaskToSchedule = () => {
    if (!newTaskTitle.trim()) return;
    const newTask: TimetableItem = {
      id: `prep-custom-${Date.now()}`,
      title: newTaskTitle.trim(),
      category: newTaskCategory,
      startTime: newTaskStartTime,
      endTime: newTaskEndTime,
      completed: false,
      cognitiveWeight: newTaskCategory === 'study' || newTaskCategory === 'lecture' || newTaskCategory === 'lab' ? 3 : 1,
      notes: 'Custom task added by student.',
    };
    const combined = [...preparedTasks, newTask];
    const resolved = validateAndResolveSchedule(
      combined,
      collegeStartTime || '10:00',
      collegeEndTime || '17:00'
    );
    setPreparedTasks(resolved);
    setNewTaskTitle('');
    setIsAddingNewTask(false);
  };

  // Reset to default tasks generated from user inputs
  const handleResetToDefaultTasks = () => {
    setPreparedTasks(generatePreparedTasks());
    setEditingTaskId(null);
    setIsAddingNewTask(false);
  };

  const handleHabitToggle = (habitTitle: string) => {
    if (selectedHabits.includes(habitTitle)) {
      setSelectedHabits(selectedHabits.filter((h) => h !== habitTitle));
    } else {
      setSelectedHabits([...selectedHabits, habitTitle]);
    }
  };

  const handleSelectAllHabits = () => {
    setSelectedHabits(STUDENT_TEN_HABITS.map((h) => h.title));
  };

  const handleSelectPopularHabits = () => {
    setSelectedHabits([
      'Daily Coding / DSA Practice',
      'Gym / Workout / Physical Fitness',
      'Daily Hydration (3L+ Water)',
      'Deep Work: No-Phone Study Block (45m)',
      'Formula & Concept Sheet Revision',
    ]);
  };

  const handleClearHabits = () => {
    setSelectedHabits([]);
  };

  // Finalize plan, save tasks, and NAVIGATE TO HOME PAGE
  const handleFinalizePlan = () => {
    setIsGenerating(true);

    const compiledSubjects = getCompiledSubjects();
    const finalSchedule = preparedTasks.length > 0 ? preparedTasks : generatePreparedTasks();

    // Build Attendance Array (Starts at 0/0 unless user explicitly entered)
    const newAttendanceList: SubjectAttendance[] = compiledSubjects.map((sub) => {
      const recorded = attendanceValues[sub.id] || { attended: 0, total: 0 };
      return {
        subjectId: sub.id,
        subjectCode: sub.code,
        subjectName: sub.name,
        attendedClasses: recorded.attended,
        totalClasses: recorded.total,
        isLab: sub.name.toLowerCase().includes('lab'),
        professorName: 'Faculty',
      };
    });

    // Save to localStorage & update profile
    localStorage.setItem('planzo_subjects_v1', JSON.stringify(compiledSubjects));
    localStorage.setItem('planzo_timetable_v1', JSON.stringify(finalSchedule));
    localStorage.setItem('planzo_attendance_v1', JSON.stringify(newAttendanceList));
    localStorage.setItem('planzo_folders_v1', JSON.stringify(SATI_SUBJECT_FOLDERS_DATA));

    // Reset starting state for newly created account: 0 XP, 0 Streak, clean calendar!
    localStorage.setItem('planzo_user_xp_v5', '0');
    localStorage.setItem('planzo_user_streak_v5', '0');
    const todayStr = new Date().toISOString().split('T')[0];
    const initialTasks = {};
    localStorage.setItem('planzo_scheduled_tasks_v5', JSON.stringify(initialTasks));
    localStorage.setItem('planzo_tasks_v3', JSON.stringify(initialTasks));

    const resolvedCollege = college === 'OTHERS' ? (customCollege.trim() || 'Engineering Institute') : college;
    const resolvedBranch = (branch === 'Other Engineering Branch (Custom)' || branch === 'OTHERS')
      ? (customBranch.trim() || 'Engineering')
      : (customBranch.trim() || branch || 'Computer Science & Engineering (CSE)');

    updateProfile({
      name: name.trim() || currentUser?.name || profile.name || 'Student',
      college: resolvedCollege,
      customCollege: resolvedCollege,
      branch: resolvedBranch,
      semester: semester,
      rollNo: rollNo.trim(),
      collegeStart: collegeStartTime,
      collegeEnd: collegeEndTime,
      wakeTime: wakeTime,
      sleepTime: sleepTime,
      selectedHabits: selectedHabits,
      mostImportantTask: mostImportantTask,
      primaryGoal: primaryGoal,
      onboarded: true,
      accountCreatedAt: todayStr,
    });

    // Directly update timetable state in AppContext
    setTimetable(finalSchedule);

    // CRITICAL: Come to Home page after this all!
    setActiveView('home');

    playTaskCompleteSound();
    fireConfetti(80);
    setIsGenerating(false);

    if (onPlanGenerated) {
      onPlanGenerated();
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-stone-950/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white dark:bg-[#0c1017] border border-stone-200 dark:border-stone-800 rounded-2xl p-5 sm:p-6 w-full max-w-2xl shadow-xl space-y-5 max-h-[92vh] overflow-y-auto">
        
        {/* Wizard Top Step Indicator */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-700 text-white flex items-center justify-center font-bold text-xs">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <span>
                  {step === 1 && '01 Profile & Identity'}
                  {step === 2 && '02 Subject Options'}
                  {step === 3 && '03 College Routine & Focus'}
                  {step === 4 && '04 Daily Discipline Habits'}
                  {step === 5 && '05 Current Attendance'}
                  {step === 6 && '06 Review & Customize Your Plan'}
                </span>
                <span className="text-[11px] font-mono text-stone-400">
                  Step {step} of 6
                </span>
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                B.Tech Student Operating System Setup
              </p>
            </div>
          </div>

          <div className="text-xs font-mono font-bold text-teal-700 dark:text-teal-400">
            {Math.round((step / 6) * 100)}%
          </div>
        </div>

        {/* Step Progress Line */}
        <div className="w-full h-1 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
          <div
            className="h-full bg-teal-600 transition-all duration-300"
            style={{ width: `${(step / 6) * 100}%` }}
          />
        </div>

        {/* ---------------------------------------------------- */}
        {/* STEP 1: Academic Identity (SATI Vidisha Verified)   */}
        {/* ---------------------------------------------------- */}
        {step === 1 && (
          <div className="space-y-4 animate-fadeIn text-xs">
            <div className="p-3 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-900/40 text-stone-600 dark:text-stone-400">
              <span className="font-semibold text-stone-900 dark:text-stone-100">
                Autonomous Syllabus Engine Loaded:
              </span>{' '}
              Official courses, 5 syllabus units, and marking schemes for all 8 semesters are mapped for your B.Tech engineering curriculum.
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-stone-700 dark:text-stone-300">
                Student Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50/70 dark:bg-stone-900/60 text-stone-900 dark:text-stone-100 font-medium focus:outline-hidden focus:ring-2 focus:ring-emerald-500/50"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-stone-700 dark:text-stone-300 flex items-center justify-between">
                <span>Engineering Institute / College</span>
                <span className="text-[10px] font-mono text-stone-400">Updates Everywhere</span>
              </label>
              <select
                value={college}
                onChange={(e) => {
                  setCollege(e.target.value);
                  if (e.target.value !== 'OTHERS') {
                    setCustomCollege(e.target.value);
                  }
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50/70 dark:bg-stone-900/60 text-stone-900 dark:text-stone-100 font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-500/50 cursor-pointer"
              >
                <option value="Samrat Ashok Technological Institute (SATI), Vidisha M.P.">
                  ⭐ Samrat Ashok Technological Institute (SATI), Vidisha M.P. (Autonomous)
                </option>
                <option value="University Institute of Technology, RGPV Bhopal">
                  University Institute of Technology, RGPV Bhopal
                </option>
                <option value="Shri Govindram Seksaria Institute of Technology and Science (SGSITS), Indore">
                  Shri Govindram Seksaria Institute of Technology and Science (SGSITS), Indore
                </option>
                <option value="Institute of Engineering & Technology (IET DAVV), Indore">
                  Institute of Engineering & Technology (IET DAVV), Indore
                </option>
                <option value="Madhav Institute of Technology & Science (MITS), Gwalior">
                  Madhav Institute of Technology & Science (MITS), Gwalior
                </option>
                <option value="Jabalpur Engineering College (JEC), Jabalpur">
                  Jabalpur Engineering College (JEC), Jabalpur
                </option>
                <option value="Medi-Caps University, Indore">
                  Medi-Caps University, Indore
                </option>
                <option value="OTHERS">
                  Other Engineering College / University (Custom)
                </option>
              </select>

              {(college === 'OTHERS' || !['Samrat Ashok Technological Institute (SATI), Vidisha M.P.', 'University Institute of Technology, RGPV Bhopal', 'Shri Govindram Seksaria Institute of Technology and Science (SGSITS), Indore', 'Institute of Engineering & Technology (IET DAVV), Indore', 'Madhav Institute of Technology & Science (MITS), Gwalior', 'Jabalpur Engineering College (JEC), Jabalpur', 'Medi-Caps University, Indore'].includes(college)) && (
                <input
                  type="text"
                  value={customCollege}
                  onChange={(e) => setCustomCollege(e.target.value)}
                  placeholder="Enter your college or university name..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50/70 dark:bg-stone-900/60 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/50 mt-1 font-medium"
                />
              )}
            </div>

            {/* Semester Selection: Clean Dropdown Menu */}
            <div className="space-y-1.5">
              <label className="font-semibold text-stone-700 dark:text-stone-300 flex items-center justify-between">
                <span>Select Semester</span>
                <span className="text-[10px] font-mono text-teal-700 dark:text-teal-400 font-semibold">Semesters 1 to 8 Available</span>
              </label>
              <select
                value={semester}
                onChange={(e) => handleSemesterChange(parseInt(e.target.value) || 1)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50/70 dark:bg-stone-900/60 text-stone-900 dark:text-stone-100 font-semibold focus:outline-hidden focus:ring-2 focus:ring-teal-500/50 cursor-pointer"
              >
                {ALL_8_SEMESTERS.map((s) => (
                  <option key={s.sem} value={s.sem}>
                    {s.name} ({s.year} · {s.badge})
                  </option>
                ))}
              </select>
            </div>

            {/* Engineering Branch Selection with Options */}
            <div className="space-y-1.5">
              <label className="font-semibold text-stone-700 dark:text-stone-300 flex items-center justify-between">
                <span>Engineering Branch</span>
                <span className="text-[10px] font-mono text-stone-400">Select Specialization</span>
              </label>
              <select
                value={ENGINEERING_BRANCH_OPTIONS.includes(branch) ? branch : 'Other Engineering Branch (Custom)'}
                onChange={(e) => {
                  const val = e.target.value;
                  setBranch(val);
                  if (val !== 'Other Engineering Branch (Custom)') {
                    setCustomBranch('');
                  }
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50/70 dark:bg-stone-900/60 text-stone-900 dark:text-stone-100 font-semibold focus:outline-hidden focus:ring-2 focus:ring-teal-500/50 cursor-pointer"
              >
                {ENGINEERING_BRANCH_OPTIONS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>

              {(branch === 'Other Engineering Branch (Custom)' || (!ENGINEERING_BRANCH_OPTIONS.slice(0, -1).includes(branch) && branch)) && (
                <input
                  type="text"
                  value={customBranch}
                  onChange={(e) => {
                    setCustomBranch(e.target.value);
                  }}
                  placeholder="Enter your Engineering Branch (e.g. Aeronautical Engineering)..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50/70 dark:bg-stone-900/60 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-hidden focus:ring-2 focus:ring-teal-500/50 mt-1 font-medium"
                />
              )}
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* STEP 2: Subject Options Selection for Current Semester */}
        {/* ---------------------------------------------------- */}
        {step === 2 && (
          <div className="space-y-4 animate-fadeIn text-xs">
            {/* Header & Description */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-stone-100 dark:border-stone-800">
              <div>
                <h3 className="font-bold text-sm sm:text-base text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <span>Semester {semester} Subject Selection</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-700 dark:text-teal-300 font-bold border border-teal-500/20">
                    {selectedSubjectIds.length} Selected
                  </span>
                </h3>
                <p className="text-stone-500 dark:text-stone-400 text-xs mt-0.5">
                  Choose the subjects you are studying this semester from the options below. Tap any subject to select or deselect.
                </p>
              </div>

              {/* Quick Select Preset Buttons */}
              <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={handleSelectAllSubjects}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-stone-100 dark:bg-stone-800 hover:bg-teal-50 dark:hover:bg-teal-950/60 hover:text-teal-700 dark:hover:text-teal-300 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 transition-colors cursor-pointer"
                >
                  Select All (10)
                </button>
                <button
                  type="button"
                  onClick={handleSelectStandardGroupA}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-stone-100 dark:bg-stone-800 hover:bg-teal-50 dark:hover:bg-teal-950/60 hover:text-teal-700 dark:hover:text-teal-300 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 transition-colors cursor-pointer"
                  title="Physics, Maths, Electrical, CS, English"
                >
                  Group A (5)
                </button>
                <button
                  type="button"
                  onClick={handleSelectStandardGroupB}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-stone-100 dark:bg-stone-800 hover:bg-teal-50 dark:hover:bg-teal-950/60 hover:text-teal-700 dark:hover:text-teal-300 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 transition-colors cursor-pointer"
                  title="Chemistry, Maths, Electronics, Drawing, Mech, Civil"
                >
                  Group B (6)
                </button>
                <button
                  type="button"
                  onClick={handleDeselectAllSubjects}
                  className="px-2 py-1 rounded-lg text-[11px] font-semibold text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Error Message if None Selected */}
            {subjectSelectionError && (
              <div className="p-3 rounded-xl border border-rose-300 dark:border-rose-800/80 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 font-medium text-xs flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                <span>{subjectSelectionError}</span>
              </div>
            )}

            {/* 10 Engineering Subject Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[340px] overflow-y-auto pr-1">
              {FOUNDATION_ENGINEERING_SUBJECTS.map((sub) => {
                const isSelected = selectedSubjectIds.includes(sub.id);
                return (
                  <div
                    key={sub.id}
                    onClick={() => toggleSubject(sub.id)}
                    className={`group relative p-3 rounded-xl border transition-all cursor-pointer select-none flex items-start gap-3 ${
                      isSelected
                        ? 'border-teal-500 bg-teal-50/70 dark:bg-teal-950/40 text-stone-900 dark:text-stone-100 ring-2 ring-teal-500/20 shadow-xs'
                        : 'border-stone-200/90 dark:border-stone-800 bg-white dark:bg-stone-900/40 text-stone-600 dark:text-stone-400 hover:border-teal-400/60 hover:bg-stone-50/80 dark:hover:bg-stone-850/60'
                    }`}
                  >
                    {/* Custom Checkbox Indicator */}
                    <div
                      className={`mt-0.5 w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                        isSelected
                          ? 'border-teal-600 bg-teal-600 text-white shadow-xs'
                          : 'border-stone-300 dark:border-stone-600 group-hover:border-teal-400'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
                          isSelected
                            ? 'bg-teal-100 dark:bg-teal-900/80 text-teal-800 dark:text-teal-200'
                            : 'bg-stone-100 dark:bg-stone-800 text-stone-500'
                        }`}>
                          {sub.code}
                        </span>
                        <span className="text-[10px] font-mono text-stone-400 font-medium">
                          {sub.credits} Credits
                        </span>
                      </div>

                      <div className={`font-bold text-xs mt-1 truncate ${
                        isSelected ? 'text-teal-950 dark:text-teal-100' : 'text-stone-800 dark:text-stone-200'
                      }`}>
                        {sub.name}
                      </div>

                      <div className="text-[10px] text-stone-500 dark:text-stone-400 mt-0.5 truncate">
                        5 Units · Theory & Practice
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Any Custom Subjects Added by User */}
              {customSubjects.map((sub) => {
                const isSelected = selectedSubjectIds.includes(sub.id);
                return (
                  <div
                    key={sub.id}
                    onClick={() => toggleSubject(sub.id)}
                    className={`group relative p-3 rounded-xl border transition-all cursor-pointer select-none flex items-start gap-3 ${
                      isSelected
                        ? 'border-teal-500 bg-teal-50/70 dark:bg-teal-950/40 text-stone-900 dark:text-stone-100 ring-2 ring-teal-500/20'
                        : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/40 text-stone-600 dark:text-stone-400'
                    }`}
                  >
                    <div
                      className={`mt-0.5 w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                        isSelected
                          ? 'border-teal-600 bg-teal-600 text-white'
                          : 'border-stone-300 dark:border-stone-600'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded font-bold bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200">
                          {sub.code} · Custom
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeCustomSubject(sub.id);
                          }}
                          className="text-[10px] text-rose-500 hover:underline cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="font-bold text-xs mt-1 truncate">
                        {sub.name}
                      </div>

                      <div className="text-[10px] text-stone-500 dark:text-stone-400 mt-0.5 truncate">
                        Custom Course · {sub.credits} Credits
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Custom Subject Addition Expandable Box */}
            <div className="p-3 rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-stone-50/60 dark:bg-stone-900/30 space-y-2">
              <div className="font-semibold text-stone-700 dark:text-stone-300 text-[11px] flex items-center justify-between">
                <span>Have another specific course or lab?</span>
                <span className="text-[10px] text-stone-400">Optional</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newSubjectCode}
                  onChange={(e) => setNewSubjectCode(e.target.value)}
                  placeholder="Code (e.g. IT-101)"
                  className="w-24 px-2.5 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 font-mono text-xs text-stone-800 dark:text-stone-200 placeholder-stone-400 focus:outline-hidden focus:ring-1 focus:ring-teal-500"
                />
                <input
                  type="text"
                  value={newSubjectTitle}
                  onChange={(e) => setNewSubjectTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddCustomSubject();
                    }
                  }}
                  placeholder="Subject name (e.g. Environmental Science, Python Lab)..."
                  className="flex-1 px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs text-stone-800 dark:text-stone-200 placeholder-stone-400 focus:outline-hidden focus:ring-1 focus:ring-teal-500"
                />
                <button
                  type="button"
                  onClick={handleAddCustomSubject}
                  disabled={!newSubjectTitle.trim()}
                  className="px-3 py-1.5 rounded-lg bg-teal-700 hover:bg-teal-800 disabled:opacity-40 text-white font-bold text-xs transition-colors cursor-pointer shrink-0"
                >
                  + Add
                </button>
              </div>
            </div>

            {/* Total Credits & Selection Status Summary */}
            <div className="px-3 py-2 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-between text-xs">
              <span className="text-teal-800 dark:text-teal-200 font-medium">
                {selectedSubjectIds.length === 0 ? (
                  <span className="text-rose-600 dark:text-rose-400">No subjects selected yet</span>
                ) : (
                  <span>
                    <strong>{selectedSubjectIds.length}</strong> subjects selected for Semester {semester}
                  </span>
                )}
              </span>
              <span className="font-mono text-[11px] text-teal-700 dark:text-teal-300 font-bold">
                {getCompiledSubjects().reduce((acc, curr) => acc + curr.credits, 0)} Total Credits
              </span>
            </div>

            {/* Most Important Task / Subject Selection Widget */}
            <div className="p-3.5 rounded-2xl border border-amber-500/40 bg-amber-50/50 dark:bg-amber-950/20 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="font-bold text-xs text-stone-900 dark:text-stone-100">
                    ⭐ Most Important Task / Core Subject
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-800 dark:text-amber-200 font-bold border border-amber-500/30">
                  Morning + Evening Priority
                </span>
              </div>
              <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                Select one primary task or subject to receive special priority in your daily plan: <strong>1 dedicated session in the morning (~1h)</strong> and <strong>1 dedicated session in the evening (~1h)</strong>.
              </p>
              
              <div className="flex flex-wrap gap-1.5 pt-1">
                {getCompiledSubjects().map((sub) => {
                  const isSelected = mostImportantTask === sub.name;
                  return (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => setMostImportantTask(sub.name)}
                      className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                        isSelected
                          ? 'bg-amber-500 text-white border-amber-600 shadow-xs font-bold'
                          : 'bg-white dark:bg-stone-850 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:border-amber-400'
                      }`}
                    >
                      <span>{isSelected ? '⭐ ' : ''}{sub.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* ---------------------------------------------------- */}
        {/* STEP 3: Daily Timing & Personal Focus Goals         */}
        {/* ---------------------------------------------------- */}
        {step === 3 && (
          <div className="space-y-4 animate-fadeIn text-xs">
            <div>
              <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100">
                Your Daily Rhythm & Routine Hours
              </h3>
              <p className="text-stone-500 dark:text-stone-400 text-xs">
                PlanZo schedules your study sprints, breaks, and habit triggers around your actual college hours.
              </p>
            </div>

            {/* College Timing (User Input - Not Predefined) */}
            <div className="p-3.5 sm:p-4 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/40 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-stone-900 dark:text-stone-100">
                      College Routine Schedule (Start & End Time)
                    </div>
                    <div className="text-[11px] text-stone-500 dark:text-stone-400">
                      Set your institute's class timings. Timetable lectures & commute adapt to these hours.
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/20 text-teal-700 dark:text-teal-300 font-bold border border-teal-500/30">
                  Custom Input
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-stone-700 dark:text-stone-300 flex items-center justify-between">
                    <span>College Starts At</span>
                    <span className="text-[10px] font-mono text-stone-400">Morning</span>
                  </label>
                  <input
                    type="time"
                    value={collegeStartTime}
                    onChange={(e) => setCollegeStartTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-850 font-mono text-xs font-semibold text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-teal-500/50 shadow-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-stone-700 dark:text-stone-300 flex items-center justify-between">
                    <span>College Ends At</span>
                    <span className="text-[10px] font-mono text-stone-400">Evening</span>
                  </label>
                  <input
                    type="time"
                    value={collegeEndTime}
                    onChange={(e) => setCollegeEndTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-850 font-mono text-xs font-semibold text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-teal-500/50 shadow-xs"
                  />
                </div>
              </div>

              {/* Quick Timing Presets */}
              <div className="flex items-center gap-1.5 flex-wrap pt-0.5 text-[11px]">
                <span className="text-stone-400 text-[10px] font-mono">Suggested Presets:</span>
                {[
                  { label: '09:00 AM – 04:00 PM', start: '09:00', end: '16:00' },
                  { label: '10:00 AM – 05:00 PM', start: '10:00', end: '17:00' },
                  { label: '10:30 AM – 05:30 PM', start: '10:30', end: '17:30' },
                  { label: '08:30 AM – 03:30 PM', start: '08:30', end: '15:30' },
                ].map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => {
                      setCollegeStartTime(preset.start);
                      setCollegeEndTime(preset.end);
                    }}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-mono transition-colors cursor-pointer border ${
                      collegeStartTime === preset.start && collegeEndTime === preset.end
                        ? 'bg-teal-600 text-white border-teal-600 font-bold'
                        : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-750'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sleep & Wake Times */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="font-semibold text-stone-700 dark:text-stone-300">
                  Wake-Up Time
                </label>
                <input
                  type="time"
                  value={wakeTime}
                  onChange={(e) => setWakeTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50/70 dark:bg-stone-900/60 font-mono text-xs focus:ring-2 focus:ring-emerald-500/50"
                />
              </div>
              <div className="space-y-1.5">
                <label className="font-semibold text-stone-700 dark:text-stone-300">
                  Target Bedtime
                </label>
                <input
                  type="time"
                  value={sleepTime}
                  onChange={(e) => setSleepTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50/70 dark:bg-stone-900/60 font-mono text-xs focus:ring-2 focus:ring-emerald-500/50"
                />
              </div>
            </div>

            {/* Primary Goal Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-stone-700 dark:text-stone-300">
                  What is your primary semester focus?
                </label>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/15 text-teal-800 dark:text-teal-200 font-bold border border-teal-500/30">
                  1h 30m Dedicated Study Block
                </span>
              </div>
              <p className="text-[11px] text-stone-500 dark:text-stone-400">
                Your selected academic focus receives a dedicated <strong>1 hour 30 minutes</strong> priority study session in your evening routine.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  {
                    id: 'skills',
                    label: 'Skills Development',
                    desc: 'Focus on Coding, AI tools, Projects & Practical Skills',
                    icon: '🚀',
                  },
                  {
                    id: 'other_studies',
                    label: 'Other Studies with College',
                    desc: 'GATE, CAT, UPSC, Govt Exams & Higher Studies Prep',
                    icon: '📚',
                  },
                  {
                    id: 'cgpa',
                    label: '9+ CGPA Semester Topper',
                    desc: 'Prioritize Units I-V, Syllabus & University Theory',
                    icon: '🏆',
                  },
                  {
                    id: 'bunk',
                    label: '75% Bunk Safe & Balanced',
                    desc: 'Canteen freedom + minimum attendance barrier',
                    icon: '🛡️',
                  },
                  {
                    id: 'gate',
                    label: 'Research & Core Engineering',
                    desc: 'Algorithms, Core Labs & Research Papers',
                    icon: '🧠',
                  },
                ].map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setPrimaryGoal(g.id as any)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      primaryGoal === g.id
                        ? 'border-teal-500 bg-teal-500/10 ring-2 ring-teal-500/40 text-stone-900 dark:text-stone-100'
                        : 'border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/30 text-stone-600 dark:text-stone-400 hover:border-stone-300 dark:hover:border-stone-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-base">{g.icon}</span>
                      {primaryGoal === g.id && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-teal-600 text-white font-bold">Active</span>
                      )}
                    </div>
                    <div className="font-bold text-xs mt-1.5">{g.label}</div>
                    <div className="text-[10px] text-stone-500 dark:text-stone-400 mt-0.5">{g.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* STEP 4: KEY HABITS TO ANCHOR YOUR DAY (10 Habits)   */}
        {/* ---------------------------------------------------- */}
        {step === 4 && (
          <div className="space-y-4 animate-fadeIn text-xs">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-black text-sm sm:text-base tracking-wider uppercase text-stone-900 dark:text-stone-100">
                  KEY HABITS TO ANCHOR YOUR DAY
                </h3>
                <p className="text-stone-500 dark:text-stone-400 text-xs mt-0.5">
                  Select the core habits you want PlanZo to build into your daily timetable & habit tracker.
                </p>
              </div>

              <span className="font-mono text-[11px] px-2.5 py-1 rounded-xl bg-teal-500/15 text-teal-700 dark:text-teal-300 font-bold border border-teal-500/30 shrink-0">
                {selectedHabits.length} / {STUDENT_TEN_HABITS.length} Selected
              </span>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center justify-between gap-2 pt-1 border-b border-stone-100 dark:border-stone-800 pb-2.5">
              <span className="text-[11px] text-stone-500 font-medium">Quick Habit Presets:</span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleSelectAllHabits}
                  className="px-2.5 py-1 rounded-lg bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 text-[10px] font-bold hover:bg-teal-100 dark:hover:bg-teal-900 cursor-pointer"
                >
                  Select All (10)
                </button>
                <button
                  type="button"
                  onClick={handleSelectPopularHabits}
                  className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 text-[10px] font-semibold hover:bg-stone-200 dark:hover:bg-stone-700 cursor-pointer"
                >
                  Top 5 Presets
                </button>
                <button
                  type="button"
                  onClick={handleClearHabits}
                  className="px-2 py-1 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 text-[10px] font-mono cursor-pointer"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* 10 Habits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[380px] overflow-y-auto pr-1">
              {STUDENT_TEN_HABITS.map((habit) => {
                const isSelected = selectedHabits.includes(habit.title);
                return (
                  <button
                    key={habit.id}
                    type="button"
                    onClick={() => handleHabitToggle(habit.title)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                      isSelected
                        ? 'border-teal-500 bg-teal-500/10 ring-1 ring-teal-500/40 text-stone-900 dark:text-stone-100 shadow-xs'
                        : 'border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/30 text-stone-600 dark:text-stone-400 hover:border-stone-300 dark:hover:border-stone-700'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 flex items-center justify-center text-base shrink-0 shadow-2xs">
                      {habit.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1.5">
                        <span className="font-bold text-xs truncate text-stone-900 dark:text-stone-100">
                          {habit.title}
                        </span>
                        <div
                          className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 border transition-colors ${
                            isSelected
                              ? 'bg-teal-600 border-teal-600 text-white'
                              : 'border-stone-300 dark:border-stone-700'
                          }`}
                        >
                          {isSelected && <Check className="w-2.5 h-2.5" />}
                        </div>
                      </div>
                      <p className="text-[10px] text-stone-500 dark:text-stone-400 line-clamp-2 mt-0.5">
                        {habit.desc}
                      </p>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 border border-stone-200/60 dark:border-stone-700/60">
                          {habit.category}
                        </span>
                        <span className="text-[9px] font-mono text-teal-600 dark:text-teal-400 font-semibold">
                          {habit.badge}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* STEP 5: Real Attendance Input (Starts at 0/0 Clean) */}
        {/* ---------------------------------------------------- */}
        {step === 5 && (
          <div className="space-y-4 animate-fadeIn text-xs">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100">
                  Current Attendance Reality Check
                </h3>
                <p className="text-stone-500 dark:text-stone-400 text-xs">
                  New accounts start clean at 0/0. You can enter existing attendance if your semester has already begun.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  const resetObj: Record<string, { attended: number; total: number }> = {};
                  getCompiledSubjects().forEach((s) => {
                    resetObj[s.id] = { attended: 0, total: 0 };
                  });
                  setAttendanceValues(resetObj);
                }}
                className="px-2.5 py-1 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 font-medium text-[11px] transition-colors cursor-pointer shrink-0"
              >
                Reset to 0/0 Clean
              </button>
            </div>

            <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
              {getCompiledSubjects().map((sub) => {
                const current = attendanceValues[sub.id] || { attended: 0, total: 0 };
                const hasClasses = current.total > 0;
                const pct = hasClasses ? Math.round((current.attended / current.total) * 100) : 100;
                const isSafe = pct >= 75;

                return (
                  <div
                    key={sub.id}
                    className="p-3 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-900/40 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-stone-900 dark:text-stone-100 truncate">
                        {sub.code}: {sub.name}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-mono mt-0.5">
                        {hasClasses ? (
                          <>
                            <span className={`font-bold ${isSafe ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                              {pct}% Attendance
                            </span>
                            <span className="text-stone-400">·</span>
                            <span className="text-stone-500">
                              {isSafe ? 'Safe to bunk' : 'Debar risk! Attend now'}
                            </span>
                          </>
                        ) : (
                          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                            0/0 Classes Conducted (Clean Start · No Debar Risk)
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 font-mono">
                      <div className="space-y-0.5 text-center">
                        <span className="text-[9px] text-stone-400">Attended</span>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={current.attended}
                          onChange={(e) => {
                            const val = parseInt(e.target.value) || 0;
                            setAttendanceValues((prev) => ({
                              ...prev,
                              [sub.id]: { attended: val, total: Math.max(val, current.total) },
                            }));
                          }}
                          className="w-12 px-1.5 py-1 text-center rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 font-bold"
                        />
                      </div>
                      <span className="text-stone-400 pt-3">/</span>
                      <div className="space-y-0.5 text-center">
                        <span className="text-[9px] text-stone-400">Total</span>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={current.total}
                          onChange={(e) => {
                            const val = parseInt(e.target.value) || 0;
                            setAttendanceValues((prev) => ({
                              ...prev,
                              [sub.id]: { attended: current.attended, total: val },
                            }));
                          }}
                          className="w-12 px-1.5 py-1 text-center rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 font-bold"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* STEP 6: Slide of All Tasks Prepared by the App      */}
        {/* ---------------------------------------------------- */}
        {step === 6 && (
          <div className="space-y-4 animate-fadeIn text-xs">
            {/* Header & Context */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-stone-100 dark:border-stone-800">
              <div>
                <h3 className="font-bold text-sm sm:text-base text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <span>Review & Customize Your Plan</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-teal-500/15 text-teal-700 dark:text-teal-300 font-bold border border-teal-500/30">
                    {preparedTasks.length} Conflict-Free Tasks
                  </span>
                </h3>
                <p className="text-stone-500 dark:text-stone-400 text-xs mt-0.5">
                  Review your conflict-free daily routine. You can edit any task name or time, delete tasks, or add an extra task. Click 'Confirm Plan' when ready.
                </p>
              </div>

              {/* Action Buttons for Tasks */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsAddingNewTask((prev) => !prev)}
                  className="px-2.5 py-1.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-[11px] transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Add Task</span>
                </button>
                <button
                  type="button"
                  onClick={handleResetToDefaultTasks}
                  className="px-2.5 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 font-semibold text-[11px] transition-colors flex items-center gap-1 cursor-pointer"
                  title="Reset to recommended tasks based on your inputs"
                >
                  <RotateCcw className="w-3 h-3 text-stone-500" />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            {/* Validation & Highlights Banner */}
            <div className="p-3 rounded-2xl border border-teal-500/30 bg-teal-50/60 dark:bg-teal-950/30 text-teal-950 dark:text-teal-200 text-xs space-y-2">
              <div className="flex items-center justify-between flex-wrap gap-1">
                <div className="font-bold flex items-center gap-1.5 text-teal-900 dark:text-teal-100">
                  <CheckCircle2 className="w-4 h-4 text-teal-700 dark:text-teal-400 shrink-0" />
                  <span>Automated Schedule Validation Complete</span>
                </div>
                <span className="text-[10px] font-mono text-teal-800 dark:text-teal-300 bg-teal-200/50 dark:bg-teal-900/60 px-2 py-0.5 rounded-full font-semibold">
                  Zero Time Overlaps · Sequential
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 text-[10px]">
                <span className="px-2 py-0.5 rounded-md bg-white dark:bg-stone-900 border border-teal-200 dark:border-teal-800/80 font-medium">
                  🏃‍♂️ Subah Fitness: <strong>Adjusted in Morning</strong>
                </span>
                <span className="px-2 py-0.5 rounded-md bg-white dark:bg-stone-900 border border-teal-200 dark:border-teal-800/80 font-medium">
                  🌳 Shaam Outdoor: <strong>Adjusted in Evening</strong>
                </span>
                <span className="px-2 py-0.5 rounded-md bg-white dark:bg-stone-900 border border-teal-200 dark:border-teal-800/80 font-medium">
                  ⭐ Study Timing: <strong>Subah (~1h) & Raat (~1h)</strong>
                </span>
                <span className="px-2 py-0.5 rounded-md bg-white dark:bg-stone-900 border border-teal-200 dark:border-teal-800/80 font-medium">
                  🎯 Primary Focus: <strong>1h 30m Dedicated Block</strong>
                </span>
                <span className="px-2 py-0.5 rounded-md bg-white dark:bg-stone-900 border border-teal-200 dark:border-teal-800/80 font-medium">
                  🏫 Unified College Block: <strong>{collegeStartTime} – {collegeEndTime}</strong>
                </span>
              </div>
            </div>

            {/* Add Custom Task Form (When toggled) */}
            {isAddingNewTask && (
              <div className="p-3 rounded-xl border border-teal-500/40 bg-teal-50/40 dark:bg-teal-950/20 space-y-2.5 animate-fadeIn">
                <div className="font-bold text-xs text-stone-900 dark:text-stone-100 flex items-center justify-between">
                  <span>Add Custom Task to Daily Schedule</span>
                  <button
                    type="button"
                    onClick={() => setIsAddingNewTask(false)}
                    className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 text-[10px]"
                  >
                    Cancel
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="sm:col-span-2">
                    <input
                      type="text"
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                      placeholder="Task Title (e.g. Lab Manual Record, Gym Workout)..."
                      className="w-full px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-850 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-hidden focus:ring-1 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <select
                      value={newTaskCategory}
                      onChange={(e) => setNewTaskCategory(e.target.value as ItemCategory)}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-850 text-xs text-stone-900 dark:text-stone-100 font-medium cursor-pointer"
                    >
                      <option value="study">Deep Study</option>
                      <option value="habit">Daily Habit</option>
                      <option value="lecture">Lecture / College</option>
                      <option value="lab">Practical / Lab</option>
                      <option value="chill">Buffer / Chill</option>
                      <option value="assignment">Assignment</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-[11px] font-mono text-stone-500">
                      <span>From:</span>
                      <input
                        type="time"
                        value={newTaskStartTime}
                        onChange={(e) => setNewTaskStartTime(e.target.value)}
                        className="px-2 py-1 rounded border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-850 text-xs font-semibold text-stone-900 dark:text-stone-100"
                      />
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-mono text-stone-500">
                      <span>To:</span>
                      <input
                        type="time"
                        value={newTaskEndTime}
                        onChange={(e) => setNewTaskEndTime(e.target.value)}
                        className="px-2 py-1 rounded border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-850 text-xs font-semibold text-stone-900 dark:text-stone-100"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddNewTaskToSchedule}
                    disabled={!newTaskTitle.trim()}
                    className="px-3 py-1.5 rounded-lg bg-teal-700 hover:bg-teal-800 disabled:opacity-40 text-white font-bold text-xs transition-colors cursor-pointer"
                  >
                    Add to Schedule
                  </button>
                </div>
              </div>
            )}

            {/* List of Prepared Tasks */}
            <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
              {preparedTasks.map((task) => {
                const isCollegeTask = task.id.includes('college') || task.title.toLowerCase().includes('college');
                const isEditing = editingTaskId === task.id;

                if (isEditing) {
                  return (
                    <div
                      key={task.id}
                      className="p-3 rounded-xl border border-teal-500 bg-teal-50/50 dark:bg-teal-950/40 space-y-2.5 ring-2 ring-teal-500/20"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-teal-800 dark:text-teal-200">
                          Editing Task
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleSaveEdit(task.id)}
                            className="px-2 py-1 rounded bg-teal-700 hover:bg-teal-800 text-white font-bold text-[10px] cursor-pointer"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingTaskId(null)}
                            className="px-2 py-1 rounded bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300 text-[10px] cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>

                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs font-semibold text-stone-900 dark:text-stone-100"
                      />

                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 text-[11px] font-mono text-stone-500">
                            <span>Start:</span>
                            <input
                              type="time"
                              value={editStartTime}
                              onChange={(e) => setEditStartTime(e.target.value)}
                              className="px-2 py-1 rounded border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs font-semibold"
                            />
                          </div>
                          <div className="flex items-center gap-1 text-[11px] font-mono text-stone-500">
                            <span>End:</span>
                            <input
                              type="time"
                              value={editEndTime}
                              onChange={(e) => setEditEndTime(e.target.value)}
                              className="px-2 py-1 rounded border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs font-semibold"
                            />
                          </div>
                        </div>

                        <select
                          value={editCategory}
                          onChange={(e) => setEditCategory(e.target.value as ItemCategory)}
                          className="px-2 py-1 rounded border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs font-medium"
                        >
                          <option value="lecture">Lecture / College</option>
                          <option value="study">Deep Study</option>
                          <option value="habit">Daily Habit</option>
                          <option value="lab">Practical / Lab</option>
                          <option value="chill">Buffer / Chill</option>
                          <option value="assignment">Assignment</option>
                        </select>
                      </div>
                    </div>
                  );
                }

                // If this is the COLLEGE TASK:
                if (isCollegeTask) {
                  return (
                    <div
                      key={task.id}
                      className={`p-3.5 rounded-2xl border transition-all flex flex-col gap-2.5 ${
                        task.completed
                          ? 'border-emerald-500/80 bg-emerald-50/70 dark:bg-emerald-950/40 shadow-xs'
                          : 'border-teal-500/80 bg-teal-50/50 dark:border-teal-800/80 dark:bg-teal-950/30'
                      }`}
                    >
                      {/* Top Header of College Block */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal-700 text-white flex items-center gap-1">
                            <span>🏫 Whole College Block</span>
                          </span>
                          <span className="text-xs font-mono font-bold text-teal-800 dark:text-teal-200">
                            {task.startTime} – {task.endTime}
                          </span>
                        </div>

                        {/* Edit & Delete Controls */}
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleStartEdit(task)}
                            className="p-1 rounded-md text-stone-500 hover:text-teal-700 dark:hover:text-teal-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                            title="Edit College Timings or Title"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeletePreparedTask(task.id)}
                            className="p-1 rounded-md text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                            title="Remove Task"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Title & Unified explanation */}
                      <div>
                        <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">
                          {task.title}
                        </h4>
                        <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                          Single unified task for your full college schedule. Mark once here or on your dashboard to cover all lectures and practicals.
                        </p>
                      </div>

                      {/* THE SINGLE OPTION TO MARK WHOLE COLLEGE */}
                      <div className="pt-1">
                        <button
                          type="button"
                          onClick={() => handleTogglePreparedTask(task.id)}
                          className={`w-full py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                            task.completed
                              ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                              : 'bg-white dark:bg-stone-850 hover:bg-stone-100 dark:hover:bg-stone-800 text-teal-800 dark:text-teal-200 border border-teal-500/40 hover:border-teal-600 shadow-2xs'
                          }`}
                        >
                          {task.completed ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 fill-emerald-100 text-emerald-800 dark:fill-emerald-950 dark:text-emerald-300" />
                              <span>✓ College Marked Present / Completed ({task.startTime} – {task.endTime})</span>
                            </>
                          ) : (
                            <>
                              <Square className="w-4 h-4 text-teal-700 dark:text-teal-400" />
                              <span>Mark Whole College Attended ({task.startTime} – {task.endTime})</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                }

                // NON-COLLEGE TASKS:
                return (
                  <div
                    key={task.id}
                    className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                      task.completed
                        ? 'border-stone-200 dark:border-stone-800 bg-stone-100/60 dark:bg-stone-900/30 opacity-75'
                        : 'border-stone-200/90 dark:border-stone-800 bg-white dark:bg-stone-900/50 hover:border-teal-500/50'
                    }`}
                  >
                    {/* Mark Checkbox */}
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <button
                        type="button"
                        onClick={() => handleTogglePreparedTask(task.id)}
                        className="text-stone-400 hover:text-teal-600 transition-colors shrink-0 cursor-pointer"
                        title={task.completed ? 'Mark pending' : 'Mark completed'}
                      >
                        {task.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Square className="w-4 h-4" />
                        )}
                      </button>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${
                            task.category === 'study'
                              ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-200'
                              : task.category === 'habit'
                              ? 'bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-200'
                              : task.category === 'lab'
                              ? 'bg-indigo-100 dark:bg-indigo-950/70 text-indigo-800 dark:text-indigo-200'
                              : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                          }`}>
                            {task.category}
                          </span>
                          <span className="text-[11px] font-mono font-bold text-stone-500 dark:text-stone-400">
                            {task.startTime} – {task.endTime}
                          </span>
                        </div>

                        <div className={`font-semibold text-xs mt-1 truncate ${
                          task.completed ? 'line-through text-stone-400' : 'text-stone-900 dark:text-stone-100'
                        }`}>
                          {task.title}
                        </div>
                      </div>
                    </div>

                    {/* Edit & Delete Controls */}
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleStartEdit(task)}
                        className="p-1 rounded-md text-stone-400 hover:text-teal-600 dark:hover:text-teal-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                        title="Edit Task"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeletePreparedTask(task.id)}
                        className="p-1 rounded-md text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                        title="Delete Task"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* WIZARD ACTION FOOTER                                */}
        {/* ---------------------------------------------------- */}
        <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((prev) => (prev - 1) as any)}
              className="px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 text-xs font-semibold cursor-pointer"
            >
              Skip
            </button>
          )}

          {step < 6 ? (
            <button
              type="button"
              onClick={handleNextStep}
              className="px-6 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all active:scale-95 shadow-xs"
            >
              <span>Next Step</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinalizePlan}
              disabled={isGenerating}
              className="px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-2 cursor-pointer transition-all shadow-md shadow-teal-700/20 active:scale-95"
            >
              {isGenerating ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Activating Workspace...</span>
                </>
              ) : (
                <>
                  <span>Confirm Plan & Go to Home</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
