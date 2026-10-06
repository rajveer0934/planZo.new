import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  StudentProfile,
  TimetableItem,
  SubjectCourse,
  MentalBandwidthState,
  ReflectionEntry,
  SubjectAttendance,
  SubjectFolderData,
  FolderItem,
  DailyScheduledTask,
  ItemCategory,
  AuthUser,
} from '../types';
import {
  CURRICULUM_DATA,
  INITIAL_TIMETABLE,
  COLLEGES_LIST,
  BRANCHES_LIST,
  DEFAULT_HABITS,
  INITIAL_ATTENDANCE_DATA,
  SUBJECT_FOLDERS_DATA,
} from '../data/btechData';
import {
  SATI_SUBJECT_FOLDERS_DATA,
  getCurriculumForSatiSemester,
} from '../data/satiVidishaData';
import { getBranchSemesterSubjects } from '../data/branchCurriculumData';
import {
  FOUNDATION_ENGINEERING_SUBJECTS,
  getFoundationSemesterSubjects,
} from '../data/foundationSubjects';
import {
  FIRST_YEAR_SUBJECT_NOTES_CATALOG,
  generateSubjectFolderDataFromCatalog,
} from '../data/firstYearDetailedNotes';

export interface BunkCalculation {
  percentage: number;
  safeToBunk: number;
  needToAttend: number;
  isSafe: boolean;
  statusLabel: string;
}

interface AppContextType {
  profile: StudentProfile;
  updateProfile: (updates: Partial<StudentProfile>) => void;
  timetable: TimetableItem[];
  setTimetable: React.Dispatch<React.SetStateAction<TimetableItem[]>>;
  toggleItemComplete: (id: string) => void;
  snoozeItem: (id: string, minutes?: number) => void;
  shiftItemToEvening: (id: string) => void;
  injectBufferZone: (afterItemId?: string, durationMinutes?: number) => void;
  recalibrateSchedule: (missedItemTitle?: string) => Promise<void>;
  isRecalibrating: boolean;
  recalibrateNotice: string | null;
  clearRecalibrateNotice: () => void;
  subjects: SubjectCourse[];
  setSubjects: React.Dispatch<React.SetStateAction<SubjectCourse[]>>;
  toggleTopicComplete: (subjectId: string, moduleId: string, topicId: string) => void;
  bandwidth: MentalBandwidthState;
  reflections: ReflectionEntry[];
  addReflection: (energy: number, focus: number, stress: number, note?: string) => void;
  todayReflection: ReflectionEntry | undefined;
  zenModeOpen: boolean;
  setZenModeOpen: (open: boolean) => void;
  activeZenTask: TimetableItem | null;
  startZenMode: (item?: TimetableItem) => void;
  activeView: 'home' | 'timeline' | 'tasks' | 'schedule' | 'attendance' | 'academic' | 'analytics' | 'ai' | 'settings';
  setActiveView: (view: 'home' | 'timeline' | 'tasks' | 'schedule' | 'attendance' | 'academic' | 'analytics' | 'ai' | 'settings') => void;
  isAiDrawerOpen: boolean;
  setIsAiDrawerOpen: (open: boolean) => void;
  isAttendanceModalOpen: boolean;
  setIsAttendanceModalOpen: (open: boolean) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  selectedResourceForModal: any | null;
  setSelectedResourceForModal: (resource: any | null) => void;
  isPersonalizationWizardOpen: boolean;
  setIsPersonalizationWizardOpen: (open: boolean) => void;
  // 75% Attendance Feature
  attendance: SubjectAttendance[];
  setAttendance: React.Dispatch<React.SetStateAction<SubjectAttendance[]>>;
  markAttendance: (subjectId: string, status: 'present' | 'absent') => void;
  adjustAttendanceCount: (subjectId: string, attended: number, total: number) => void;
  calculateBunkStatus: (attended: number, total: number, target?: number) => BunkCalculation;
  overallAttendancePercentage: number;
  // Subject Folders Feature
  subjectFolders: Record<string, SubjectFolderData>;
  toggleAssignmentStatus: (subjectId: string, assignmentId: string) => void;
  addCustomNoteToFolder: (subjectId: string, note: FolderItem) => void;
  // Monthly Calendar & Task Scheduling Feature
  scheduledTasks: Record<string, DailyScheduledTask[]>;
  addTaskForDate: (task: Omit<DailyScheduledTask, 'id'>) => void;
  toggleTaskForDate: (date: string, taskId: string) => void;
  deleteTaskForDate: (date: string, taskId: string) => void;
  getDateTaskStats: (dateStr: string) => { total: number; completed: number; percentage: number };
  // XP & Day Streak Feature
  userXp: number;
  userStreak: number;
  awardXp: (amount: number, reason: string) => void;
  // Auth & Student Account
  currentUser: AuthUser | null;
  signUp: (userData: {
    name: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    password?: string;
    isVerified?: boolean;
    college?: string;
    branch?: string;
    semester?: number;
    rollNo?: string;
    avatarUrl?: string;
  }) => void;
  signIn: (identifier: string, password?: string) => boolean;
  signOut: () => void;
  // Study Block Scheduling
  scheduleStudyBlock: (block: {
    title: string;
    category: ItemCategory;
    startTime: string;
    endTime: string;
    date: string;
    subjectId?: string;
    cognitiveWeight?: number;
    notes?: string;
  }) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PROFILE: 'planzo_profile_v1',
  TIMETABLE: 'planzo_timetable_v1',
  SUBJECTS: 'planzo_subjects_v1',
  REFLECTIONS: 'planzo_reflections_v1',
  ATTENDANCE: 'planzo_attendance_v1',
  FOLDERS: 'planzo_folders_v1',
  SCHEDULED_TASKS: 'planzo_scheduled_tasks_v5',
};

function generateDefaultScheduledTasks(): Record<string, DailyScheduledTask[]> {
  // A fresh account starts with a clean calendar (0 tasks) from the day of account creation!
  // XP points, streak, and completed tasks all start at zero.
  return {};
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Profile State
  const [profile, setProfile] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROFILE) || localStorage.getItem('planzo_profile_v3');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const savedName = parsed.name || '';
        const savedFirst = parsed.firstName || (savedName ? savedName.split(' ')[0] : '');
        const savedLast = parsed.lastName || (savedName && savedName.split(' ').length > 1 ? savedName.split(' ').slice(1).join(' ') : '');
        return {
          name: savedName,
          firstName: savedFirst,
          lastName: savedLast,
          phone: parsed.phone || '',
          isVerified: parsed.isVerified || false,
          avatarUrl: parsed.avatarUrl || 'https://api.dicebear.com/7.x/bottts/svg?seed=PlanZoStudent&colors=emerald,cyan,teal',
          college: parsed.college || COLLEGES_LIST[0],
          customCollege: parsed.customCollege || parsed.college || COLLEGES_LIST[0],
          branch: parsed.branch && BRANCHES_LIST.includes(parsed.branch) ? parsed.branch : BRANCHES_LIST[0],
          semester: parsed.semester || 1,
          wakeTime: parsed.wakeTime || '07:00',
          sleepTime: parsed.sleepTime || '23:30',
          collegeStart: parsed.collegeStart || '10:00',
          collegeEnd: parsed.collegeEnd || '17:00',
          selectedHabits: parsed.selectedHabits || [DEFAULT_HABITS[0], DEFAULT_HABITS[1], DEFAULT_HABITS[2]],
          onboarded: parsed.onboarded !== undefined ? parsed.onboarded : true,
          accountCreatedAt: parsed.accountCreatedAt || new Date().toISOString().split('T')[0],
        };
      } catch (e) {}
    }
    return {
      name: '',
      firstName: '',
      lastName: '',
      phone: '',
      isVerified: false,
      avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=PlanZoStudent&colors=emerald,cyan,teal',
      college: COLLEGES_LIST[0],
      customCollege: 'Samrat Ashok Technological Institute (SATI), Vidisha M.P.',
      branch: 'B.Tech. Computer Science & Engineering',
      semester: 1,
      wakeTime: '07:00',
      sleepTime: '23:30',
      collegeStart: '10:00',
      collegeEnd: '17:00',
      selectedHabits: [DEFAULT_HABITS[0], DEFAULT_HABITS[1], DEFAULT_HABITS[2]],
      onboarded: true,
      accountCreatedAt: new Date().toISOString().split('T')[0],
    };
  });

  // 2. Timetable State
  const [timetable, setTimetable] = useState<TimetableItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TIMETABLE) || localStorage.getItem('planzo_timetable_v3');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      {
        id: 'routine-1',
        title: '🏃‍♂️ Morning Fitness: Gym / Workout / Physical Fitness',
        category: 'habit',
        startTime: '07:00',
        endTime: '07:40',
        completed: false,
        cognitiveWeight: 2,
        notes: 'Morning physical workout to activate energy and build peak mental stamina.',
      },
      {
        id: 'routine-mit-morning',
        title: '⭐ Morning Deep Study: C Programming & DSA (Morning Priority Session 1)',
        category: 'study',
        startTime: '07:40',
        endTime: '08:40',
        completed: false,
        cognitiveWeight: 4,
        notes: 'Dedicated 1-hour priority morning deep work on Most Important Task.',
      },
      {
        id: 'routine-2',
        title: 'Breakfast & Commute to Campus',
        category: 'chill',
        startTime: '08:40',
        endTime: '10:30',
        completed: false,
        cognitiveWeight: 1,
        notes: 'Nutritious breakfast, campus travel, and settling into lectures.',
      },
      {
        id: 'routine-college',
        title: 'Institute — Full College Schedule (Lectures & Labs)',
        category: 'lecture',
        startTime: '10:30',
        endTime: '17:30',
        completed: false,
        cognitiveWeight: 4,
        notes: 'One unified college schedule for all lectures & labs (10:30 – 17:30). Mark once for the entire day.',
      },
      {
        id: 'routine-3',
        title: 'Campus Departure & Evening Chai / Refreshment',
        category: 'chill',
        startTime: '17:30',
        endTime: '18:00',
        completed: false,
        cognitiveWeight: 1,
        notes: 'Evening tea, decompression and transition back from campus.',
      },
      {
        id: 'routine-outdoor-evening',
        title: '🌳 Shaam Outdoor Habit: Outdoor Walk & Campus Fresh Air',
        category: 'habit',
        startTime: '18:00',
        endTime: '18:35',
        completed: false,
        cognitiveWeight: 1,
        notes: 'Evening outdoor activity, fresh air walk or sports to decompress after lectures.',
      },
      {
        id: 'routine-primary-focus',
        title: '🎯 Primary Semester Focus: Skills & Practical Coding Sprint',
        category: 'study',
        startTime: '18:35',
        endTime: '20:05',
        completed: false,
        cognitiveWeight: 4,
        notes: 'Dedicated 1 hour 30 minutes priority study block aligned with your semester focus.',
      },
      {
        id: 'routine-dinner',
        title: 'Dinner & Mindful Decompression',
        category: 'chill',
        startTime: '20:05',
        endTime: '21:00',
        completed: false,
        cognitiveWeight: 1,
        notes: 'Dinner with friends or family, and evening wind-down.',
      },
      {
        id: 'routine-mit-night',
        title: '⭐ Raat Deep Study: C Programming & Core Concepts (Night Priority Session 2)',
        category: 'study',
        startTime: '21:00',
        endTime: '22:00',
        completed: false,
        cognitiveWeight: 4,
        notes: 'Second dedicated 1-hour session for your Most Important Task at night.',
      },
      {
        id: 'routine-additional-study',
        title: 'Academic Study: Engineering Mathematics - I (Core Review)',
        category: 'study',
        startTime: '22:00',
        endTime: '22:50',
        completed: false,
        cognitiveWeight: 3,
        notes: '50-minute focused revision session on core semester syllabus.',
      },
      {
        id: 'routine-night',
        title: '🌙 Night Wind-down: Tomorrow Timetable Sync & Rest',
        category: 'habit',
        startTime: '22:50',
        endTime: '23:30',
        completed: false,
        cognitiveWeight: 1,
        notes: 'Reflection, habit review, and restorative rest.',
      },
    ];
  });

  // 3. Subjects & Curriculum State (SATI Vidisha B.Tech CSE Official Syllabus)
  const [subjects, setSubjects] = useState<SubjectCourse[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SUBJECTS) || localStorage.getItem('planzo_subjects_v3');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return getFoundationSemesterSubjects(1);
  });

  // 4. Daily Reflections State (Starts clean for new user)
  const [reflections, setReflections] = useState<ReflectionEntry[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.REFLECTIONS) || localStorage.getItem('planzo_reflections_v3');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [];
  });

  // 5. 75% Attendance State (Starts at 0 attended, 0 conducted for fresh tracking)
  const [attendance, setAttendance] = useState<SubjectAttendance[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ATTENDANCE) || localStorage.getItem('planzo_attendance_v3');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    const defaultSubs = getCurriculumForSatiSemester(1);
    return defaultSubs.map((sub) => ({
      subjectId: sub.id,
      subjectCode: sub.code,
      subjectName: sub.name,
      attendedClasses: 0,
      totalClasses: 0,
      isLab: sub.name.toLowerCase().includes('lab'),
      professorName: 'SATI Vidisha Faculty',
    }));
  });

  // 6. Subject-Wise Folders State (Official 1st Year Notes & Curricula, PYQs, Lab Viva, Assignments)
  const [subjectFolders, setSubjectFolders] = useState<Record<string, SubjectFolderData>>(() => {
    const initialFirstYearFolders: Record<string, SubjectFolderData> = {};
    Object.values(FIRST_YEAR_SUBJECT_NOTES_CATALOG).forEach((detail) => {
      const folder = generateSubjectFolderDataFromCatalog(detail);
      initialFirstYearFolders[detail.subjectId] = folder;
      initialFirstYearFolders[detail.subjectCode.toLowerCase()] = folder;
      initialFirstYearFolders[detail.subjectCode] = folder;
    });

    const saved = localStorage.getItem(STORAGE_KEYS.FOLDERS) || localStorage.getItem('planzo_folders_v3');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Merge so that all 1st year foundation subject notes are guaranteed to exist, while keeping user changes
        return { ...initialFirstYearFolders, ...SATI_SUBJECT_FOLDERS_DATA, ...parsed };
      } catch (e) {}
    }
    return { ...SATI_SUBJECT_FOLDERS_DATA, ...initialFirstYearFolders };
  });

  // 7. Monthly Calendar Scheduled Tasks State
  const [scheduledTasks, setScheduledTasks] = useState<Record<string, DailyScheduledTask[]>>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SCHEDULED_TASKS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return generateDefaultScheduledTasks();
  });

  // UI States
  const [activeView, setActiveView] = useState<
    'home' | 'timeline' | 'tasks' | 'schedule' | 'attendance' | 'academic' | 'analytics' | 'ai' | 'settings'
  >('home');
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false);
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [zenModeOpen, setZenModeOpen] = useState(false);
  const [activeZenTask, setActiveZenTask] = useState<TimetableItem | null>(null);
  const [selectedResourceForModal, setSelectedResourceForModal] = useState<any | null>(null);
  const [isPersonalizationWizardOpen, setIsPersonalizationWizardOpen] = useState(false);
  const [isRecalibrating, setIsRecalibrating] = useState(false);
  const [recalibrateNotice, setRecalibrateNotice] = useState<string | null>(null);

  // User XP and Streak State - START AT ZERO for fresh account!
  const [userXp, setUserXp] = useState<number>(() => {
    const saved = localStorage.getItem('planzo_user_xp_v5');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [userStreak, setUserStreak] = useState<number>(() => {
    const saved = localStorage.getItem('planzo_user_streak_v5');
    return saved ? parseInt(saved, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem('planzo_user_xp_v5', userXp.toString());
  }, [userXp]);

  useEffect(() => {
    localStorage.setItem('planzo_user_streak_v5', userStreak.toString());
  }, [userStreak]);

  const awardXp = (amount: number, reason: string) => {
    setUserXp((prev) => prev + amount);
    setRecalibrateNotice(`+${amount} XP Earned! ${reason}`);
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TIMETABLE, JSON.stringify(timetable));
  }, [timetable]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SUBJECTS, JSON.stringify(subjects));
  }, [subjects]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REFLECTIONS, JSON.stringify(reflections));
  }, [reflections]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(attendance));
  }, [attendance]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FOLDERS, JSON.stringify(subjectFolders));
  }, [subjectFolders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SCHEDULED_TASKS, JSON.stringify(scheduledTasks));
  }, [scheduledTasks]);

  const updateProfile = (updates: Partial<StudentProfile>) => {
    setProfile((prev) => {
      const nextCollege = updates.college !== undefined ? updates.college : prev.college;
      const nextCustomCollege = updates.customCollege !== undefined 
        ? updates.customCollege 
        : updates.college !== undefined 
          ? updates.college 
          : prev.customCollege;
      return {
        ...prev,
        ...updates,
        college: nextCollege,
        customCollege: nextCustomCollege,
      };
    });

    // Keep currentUser in sync with profile changes if logged in
    setCurrentUser((prev) => {
      if (!prev) return null;
      const updatedUser: AuthUser = {
        ...prev,
        name: updates.name !== undefined ? updates.name : prev.name,
        college: updates.customCollege || updates.college || prev.college,
        branch: updates.branch !== undefined ? updates.branch : prev.branch,
        semester: updates.semester !== undefined ? updates.semester : prev.semester,
        rollNo: updates.rollNo !== undefined ? updates.rollNo : prev.rollNo,
        avatarUrl: updates.avatarUrl !== undefined ? updates.avatarUrl : prev.avatarUrl,
      };
      localStorage.setItem('planzo_auth_user_v1', JSON.stringify(updatedUser));
      return updatedUser;
    });

    if (updates.branch || updates.semester !== undefined) {
      const targetSem = updates.semester !== undefined ? updates.semester : (profile.semester || 1);
      const targetBranch = updates.branch || profile.branch || 'Computer Science & Engineering (CSE)';
      if (targetSem === 1 || targetSem === 2) {
        setSubjects(FOUNDATION_ENGINEERING_SUBJECTS.slice(0, 5));
      } else {
        const branchSubs = getBranchSemesterSubjects(targetBranch, targetSem);
        if (branchSubs && branchSubs.length > 0) {
          setSubjects(branchSubs);
        }
      }
    }
  };

  // Helper: Compute current consecutive streak of days with >= 7 completed tasks
  const computeSevenTaskStreak = (
    tasksByDate: Record<string, DailyScheduledTask[]>,
    todayTimetable: TimetableItem[]
  ): number => {
    const today = new Date();
    const todayKey = today.toISOString().split('T')[0];

    const getCountForDate = (dateKey: string): number => {
      if (dateKey === todayKey) {
        const fromTimetable = todayTimetable.filter((t) => t.completed).length;
        const fromScheduled = (tasksByDate[dateKey] || []).filter((t) => t.completed).length;
        return Math.max(fromTimetable, fromScheduled);
      }
      return (tasksByDate[dateKey] || []).filter((t) => t.completed).length;
    };

    // Check past consecutive days ending yesterday
    let pastStreak = 0;
    for (let offset = 1; offset <= 365; offset++) {
      const d = new Date(today);
      d.setDate(today.getDate() - offset);
      const key = d.toISOString().split('T')[0];
      if (getCountForDate(key) >= 7) {
        pastStreak += 1;
      } else {
        break;
      }
    }

    const todayCompleted = getCountForDate(todayKey);
    if (todayCompleted >= 7) {
      return pastStreak + 1;
    }
    return pastStreak;
  };

  // Keep userStreak synced with the 7-task completion rule
  useEffect(() => {
    const calculatedStreak = computeSevenTaskStreak(scheduledTasks, timetable);
    setUserStreak(calculatedStreak);
  }, [timetable, scheduledTasks]);

  const toggleItemComplete = (id: string) => {
    const todayStr = new Date().toISOString().split('T')[0];
    setTimetable((prev) => {
      const updated = prev.map((item) => {
        if (item.id === id) {
          const next = !item.completed;
          if (next) {
            awardXp(25, `Completed: ${item.title}`);
          }
          return { ...item, completed: next };
        }
        return item;
      });
      const nextScheduledForToday = updated.map((item) => ({
        id: item.id,
        title: item.title,
        category: item.category,
        startTime: item.startTime,
        endTime: item.endTime,
        date: todayStr,
        completed: item.completed,
        cognitiveWeight: item.cognitiveWeight || 3,
        subjectId: item.subjectId,
      }));
      setScheduledTasks((prevScheduled) => {
        const nextScheduled = {
          ...prevScheduled,
          [todayStr]: nextScheduledForToday,
        };
        setUserStreak(computeSevenTaskStreak(nextScheduled, updated));
        return nextScheduled;
      });
      return updated;
    });
  };

  const parseTimeMins = (t: string): number => {
    if (!t) return 0;
    const parts = t.split(':').map(Number);
    return (parts[0] || 0) * 60 + (parts[1] || 0);
  };

  const formatMinsToTime = (mins: number): string => {
    const bounded = Math.max(0, Math.min(1439, Math.round(mins)));
    const h = Math.floor(bounded / 60);
    const m = bounded % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  };

  // Enforces strict wakeTime -> sleepTime boundaries and zero overlaps across any timetable list
  const enforceStrictNonOverlappingTimetable = (
    items: TimetableItem[],
    wTime: string = profile.wakeTime || '07:00',
    sTime: string = profile.sleepTime || '23:30'
  ): TimetableItem[] => {
    if (!items || items.length === 0) return [];
    const wakeM = parseTimeMins(wTime);
    let sleepM = parseTimeMins(sTime);
    if (sleepM <= wakeM) sleepM = 1439;

    const sorted = [...items].sort(
      (a, b) => parseTimeMins(a.startTime) - parseTimeMins(b.startTime)
    );

    const resolved: TimetableItem[] = [];
    let cursor = wakeM;

    for (let i = 0; i < sorted.length; i++) {
      const cur = { ...sorted[i] };
      const rawS = parseTimeMins(cur.startTime);
      const rawE = parseTimeMins(cur.endTime);
      const desiredDur = Math.max(15, rawE > rawS ? rawE - rawS : 30);

      const startM = Math.max(cursor, Math.min(sleepM - 10, rawS));
      if (startM >= sleepM) break;

      const endM = Math.min(sleepM, startM + desiredDur);
      cur.startTime = formatMinsToTime(startM);
      cur.endTime = formatMinsToTime(Math.max(startM + 10, endM));
      resolved.push(cur);
      cursor = parseTimeMins(cur.endTime);
    }

    return resolved;
  };

  const snoozeItem = (id: string, minutes: number = 30) => {
    setTimetable((prev) => {
      const target = prev.find((t) => t.id === id);
      if (!target) return prev;

      const startM = parseTimeMins(target.startTime);
      const endM = parseTimeMins(target.endTime);
      const dur = Math.max(20, endM - startM);
      const newStartM = Math.min(1420, startM + minutes);
      const newEndM = Math.min(1439, newStartM + dur);

      const updated = prev.map((item) =>
        item.id === id
          ? {
              ...item,
              startTime: formatMinsToTime(newStartM),
              endTime: formatMinsToTime(newEndM),
              snoozed: true,
            }
          : item
      );
      return enforceStrictNonOverlappingTimetable(updated);
    });
  };

  const shiftItemToEvening = (id: string) => {
    setTimetable((prev) => {
      const sleepM = parseTimeMins(profile.sleepTime || '23:30');
      const targetStart = Math.max(parseTimeMins(profile.collegeEnd || '17:00'), sleepM - 150);
      const updated = prev.map((item) =>
        item.id === id
          ? {
              ...item,
              startTime: formatMinsToTime(targetStart),
              endTime: formatMinsToTime(Math.min(sleepM, targetStart + 45)),
              snoozed: true,
              notes: (item.notes ? item.notes + ' · ' : '') + 'Moved to evening study slot.',
            }
          : item
      );
      return enforceStrictNonOverlappingTimetable(updated);
    });
  };

  const injectBufferZone = (afterItemId?: string, durationMinutes: number = 25) => {
    setTimetable((prev) => {
      const cEnd = profile.collegeEnd || '17:00';
      const newBuffer: TimetableItem = {
        id: `buffer-${Date.now()}`,
        title: 'Canteen Chai & Buffer Break',
        category: 'chill',
        startTime: cEnd,
        endTime: formatMinsToTime(parseTimeMins(cEnd) + durationMinutes),
        completed: false,
        cognitiveWeight: 1,
        notes: 'Unplug from monitors, grab cutting chai/samosa, and refresh your mind.',
      };

      if (!afterItemId) {
        return enforceStrictNonOverlappingTimetable([...prev, newBuffer]);
      }
      const index = prev.findIndex((item) => item.id === afterItemId);
      if (index === -1) {
        return enforceStrictNonOverlappingTimetable([...prev, newBuffer]);
      }
      const anchorEnd = prev[index].endTime;
      newBuffer.startTime = anchorEnd;
      newBuffer.endTime = formatMinsToTime(parseTimeMins(anchorEnd) + durationMinutes);
      const clone = [...prev];
      clone.splice(index + 1, 0, newBuffer);
      return enforceStrictNonOverlappingTimetable(clone);
    });

    setRecalibrateNotice(`Chai & Buffer Zone added. No engineering burnout today!`);
  };

  const recalibrateSchedule = async (missedItemTitle?: string) => {
    setIsRecalibrating(true);
    try {
      const envBase = (import.meta as any).env?.VITE_API_BASE_URL;
      const base = envBase && typeof envBase === 'string' && envBase.trim() ? envBase.trim().replace(/\/+$/, '') : '';
      const response = await fetch(`${base}/api/recalibrate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: timetable.filter((t) => !t.completed),
          missedItemTitle: missedItemTitle || 'Missed Study Slot',
          reason: 'Auto-adjustment triggered to balance student cognitive load',
        }),
      });
      const data = await response.json();

      setTimetable((prev) => {
        let hasBuffer = prev.some((i) => i.category === 'chill' && i.title.includes('Chai'));
        const updated = prev.map((item) => {
          if (!item.completed && item.category === 'study' && item.cognitiveWeight > 3) {
            return {
              ...item,
              cognitiveWeight: 3,
              notes: (item.notes ? item.notes + ' · ' : '') + 'Paced into 45-min sprint',
            };
          }
          return item;
        });

        if (!hasBuffer) {
          updated.push({
            id: `chill-recal-${Date.now()}`,
            title: 'Decompression & Chai Break',
            category: 'chill',
            startTime: profile.collegeEnd || '17:00',
            endTime: formatMinsToTime(parseTimeMins(profile.collegeEnd || '17:00') + 30),
            completed: false,
            cognitiveWeight: 1,
            notes: 'Restorative buffer added to prevent burnout.',
          });
        }
        return enforceStrictNonOverlappingTimetable(updated);
      });

      setRecalibrateNotice(
        data.summary || 'Schedule quietly balanced. Unfinished topics shifted into manageable sprints.'
      );
    } catch (err) {
      console.error(err);
      setRecalibrateNotice('Schedule quietly adjusted. Added a calm buffer block.');
    } finally {
      setIsRecalibrating(false);
    }
  };

  const clearRecalibrateNotice = () => setRecalibrateNotice(null);

  const toggleTopicComplete = (subjectId: string, moduleId: string, topicId: string) => {
    setSubjects((prev) =>
      prev.map((sub) => {
        if (sub.id !== subjectId) return sub;
        return {
          ...sub,
          modules: sub.modules.map((mod) => {
            if (mod.id !== moduleId) return mod;
            return {
              ...mod,
              topics: mod.topics.map((top) =>
                top.id === topicId ? { ...top, completed: !top.completed } : top
              ),
            };
          }),
        };
      })
    );
  };

  // 75% Attendance Functions
  const markAttendance = (subjectId: string, status: 'present' | 'absent') => {
    setAttendance((prev) =>
      prev.map((sub) => {
        if (sub.subjectId !== subjectId) return sub;
        const newAttended = status === 'present' ? sub.attendedClasses + 1 : sub.attendedClasses;
        const newTotal = sub.totalClasses + 1;
        return {
          ...sub,
          attendedClasses: newAttended,
          totalClasses: newTotal,
        };
      })
    );

    const targetSub = attendance.find((s) => s.subjectId === subjectId);
    if (status === 'present') {
      awardXp(15, `Attendance Marked: ${targetSub?.subjectCode || 'lecture'}`);
      setRecalibrateNotice(`Marked Present in ${targetSub?.subjectCode || 'lecture'}! 75% attendance boosted.`);
    } else {
      setRecalibrateNotice(`Marked Bunk / Absent in ${targetSub?.subjectCode || 'lecture'}. Attendance formula recalculated.`);
    }
  };

  const adjustAttendanceCount = (subjectId: string, attended: number, total: number) => {
    setAttendance((prev) =>
      prev.map((sub) =>
        sub.subjectId === subjectId
          ? { ...sub, attendedClasses: Math.max(0, attended), totalClasses: Math.max(1, total) }
          : sub
      )
    );
  };

  // Formula for B.Tech 75% Attendance & Bunk Calculator
  const calculateBunkStatus = (attended: number, total: number, target: number = 75): BunkCalculation => {
    if (total === 0) {
      return { percentage: 100, safeToBunk: 0, needToAttend: 0, isSafe: true, statusLabel: 'No classes yet' };
    }
    const targetFraction = target / 100;
    const currentFraction = attended / total;
    const percentage = Math.round(currentFraction * 1000) / 10;

    if (currentFraction >= targetFraction) {
      // Safe to bunk: how many more classes can we miss without dropping below target?
      // (attended) / (total + x) >= targetFraction  =>  total + x <= attended / targetFraction => x = floor(attended / targetFraction - total)
      const safeToBunk = Math.max(0, Math.floor(attended / targetFraction - total));
      return {
        percentage,
        safeToBunk,
        needToAttend: 0,
        isSafe: true,
        statusLabel: safeToBunk > 0 ? `Can safely bunk ${safeToBunk} more classes` : 'On the 75% edge (Do not bunk!)',
      };
    } else {
      // Below target: how many consecutive classes must we attend to reach target?
      // (attended + y) / (total + y) >= targetFraction => attended + y >= targetFraction * total + targetFraction * y
      // y * (1 - targetFraction) >= targetFraction * total - attended => y = ceil((targetFraction * total - attended) / (1 - targetFraction))
      const needToAttend = Math.max(1, Math.ceil((targetFraction * total - attended) / (1 - targetFraction)));
      return {
        percentage,
        safeToBunk: 0,
        needToAttend,
        isSafe: false,
        statusLabel: `Need to attend next ${needToAttend} classes to escape debar risk!`,
      };
    }
  };

  // Overall aggregate attendance
  const totalAttended = attendance.reduce((sum, s) => sum + s.attendedClasses, 0);
  const totalConducted = attendance.reduce((sum, s) => sum + s.totalClasses, 0);
  const overallAttendancePercentage = totalConducted > 0 ? Math.round((totalAttended / totalConducted) * 1000) / 10 : 100;

  // Subject Folders Functions
  const toggleAssignmentStatus = (subjectId: string, assignmentId: string) => {
    setSubjectFolders((prev) => {
      const folder = prev[subjectId];
      if (!folder) return prev;
      return {
        ...prev,
        [subjectId]: {
          ...folder,
          assignments: folder.assignments.map((asg) =>
            asg.id === assignmentId ? { ...asg, completed: !asg.completed } : asg
          ),
        },
      };
    });
  };

  const addCustomNoteToFolder = (subjectId: string, note: FolderItem) => {
    setSubjectFolders((prev) => {
      const folder = prev[subjectId] || {
        subjectId,
        topperNotes: [],
        previousYearQuestions: [],
        labVivaQuestions: [],
        assignments: [],
      };
      return {
        ...prev,
        [subjectId]: {
          ...folder,
          topperNotes: [note, ...folder.topperNotes],
        },
      };
    });
    setRecalibrateNotice(`Added "${note.title}" to ${subjectId.toUpperCase()} folder.`);
  };

  // Monthly Calendar & Task Scheduling Methods
  const addTaskForDate = (task: Omit<DailyScheduledTask, 'id'>) => {
    const id = `task-${task.date}-${Date.now()}`;
    const newTask: DailyScheduledTask = { ...task, id };

    setScheduledTasks((prev) => {
      const existing = prev[task.date] || [];
      return { ...prev, [task.date]: [...existing, newTask] };
    });

    const todayStr = new Date().toISOString().split('T')[0];
    if (task.date === todayStr) {
      const newTimetableItem: TimetableItem = {
        id,
        title: task.title,
        category: task.category,
        startTime: task.startTime,
        endTime: task.endTime,
        completed: task.completed,
        cognitiveWeight: task.cognitiveWeight || 3,
        date: task.date,
      };
      setTimetable((prev) => [...prev, newTimetableItem]);
    }

    setRecalibrateNotice(`Scheduled "${task.title}" for ${task.date}.`);
  };

  const toggleTaskForDate = (date: string, taskId: string) => {
    setScheduledTasks((prev) => {
      const existing = prev[date] || [];
      const updated = existing.map((t) => {
        if (t.id === taskId) {
          const next = !t.completed;
          if (next) {
            awardXp(20, `Task Completed: ${t.title}`);
          }
          return { ...t, completed: next };
        }
        return t;
      });
      return { ...prev, [date]: updated };
    });

    const todayStr = new Date().toISOString().split('T')[0];
    if (date === todayStr) {
      setTimetable((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
      );
    }
  };

  const deleteTaskForDate = (date: string, taskId: string) => {
    setScheduledTasks((prev) => {
      const existing = prev[date] || [];
      return { ...prev, [date]: existing.filter((t) => t.id !== taskId) };
    });

    const todayStr = new Date().toISOString().split('T')[0];
    if (date === todayStr) {
      setTimetable((prev) => prev.filter((t) => t.id !== taskId));
    }
  };

  const getDateTaskStats = (dateStr: string) => {
    const todayStr = new Date().toISOString().split('T')[0];
    const tasks = scheduledTasks[dateStr];

    if (dateStr === todayStr && timetable.length > 0) {
      const total = timetable.length;
      const completed = timetable.filter((t) => t.completed).length;
      const percentage = total === 0 ? 100 : Math.round((completed / total) * 100);
      return { total, completed, percentage };
    }

    if (!tasks || tasks.length === 0) {
      return { total: 0, completed: 0, percentage: 0 };
    }

    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const percentage = Math.round((completed / total) * 100);
    return { total, completed, percentage };
  };

  // Mental Bandwidth Computation
  const todayReflections = reflections.filter(
    (r) => r.date === new Date().toISOString().split('T')[0]
  );
  const todayReflection = todayReflections[0];

  const totalLoad = timetable.reduce((acc, item) => acc + (item.completed ? item.cognitiveWeight * 0.5 : item.cognitiveWeight), 0);
  const bufferCount = timetable.filter((i) => i.category === 'chill').length;
  const labMinutes = timetable.filter((i) => i.category === 'lab').length * 150;
  const studyMinutes = timetable.filter((i) => i.category === 'study').length * 60;
  const bufferMinutes = bufferCount * 30;

  let densityScore = Math.min(100, Math.round((totalLoad / 32) * 100));
  if (bufferCount >= 2) densityScore = Math.max(20, densityScore - 15);
  if (todayReflection && todayReflection.stressLevel >= 4) densityScore = Math.min(95, densityScore + 10);

  let status: MentalBandwidthState['status'] = 'balanced';
  let recommendation = 'Schedule has healthy focus intervals and breathing room.';

  if (densityScore < 40) {
    status = 'calm';
    recommendation = 'Light day. Perfect for DSA consistency or canteen chill.';
  } else if (densityScore > 75) {
    status = 'overload';
    recommendation = 'Heavy load (lab + theory). Take a chai break to protect your sanity.';
  } else if (densityScore > 60) {
    status = 'dense';
    recommendation = 'Moderate load. Take a brief screen detox after afternoon lab.';
  }

  const bandwidth: MentalBandwidthState = {
    densityScore,
    status,
    totalStudyMinutes: studyMinutes,
    totalLabMinutes: labMinutes,
    bufferMinutes,
    recommendation,
  };

  const addReflection = (energyLevel: number, focusLevel: number, stressLevel: number, note?: string) => {
    const today = new Date().toISOString().split('T')[0];
    const newEntry: ReflectionEntry = {
      id: `ref-${Date.now()}`,
      date: today,
      energyLevel,
      focusLevel,
      stressLevel,
      note,
      timestamp: new Date().toISOString(),
    };
    setReflections((prev) => [newEntry, ...prev.filter((r) => r.date !== today)]);
    setRecalibrateNotice('Daily reflection logged. Tomorrow\'s schedule calibrated.');
  };

  const startZenMode = (item?: TimetableItem) => {
    const target = item || timetable.find((t) => !t.completed && (t.category === 'study' || t.category === 'habit')) || timetable[0];
    setActiveZenTask(target || null);
    setZenModeOpen(true);
  };

  // Student Authentication State & Methods
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem('planzo_auth_user_v1');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.isAuthenticated) {
          return parsed;
        }
      } catch (e) {}
    }
    // By default for a new user, start unauthenticated (null) so they see Login / Sign Up!
    return null;
  });

  const signUp = (userData: {
    name: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    password?: string;
    isVerified?: boolean;
    college?: string;
    branch?: string;
    semester?: number;
    rollNo?: string;
    avatarUrl?: string;
  }) => {
    const todayStr = new Date().toISOString().split('T')[0];
    const derivedFirstName = userData.firstName || (userData.name ? userData.name.trim().split(' ')[0] : 'Student');
    const derivedLastName = userData.lastName || (userData.name && userData.name.trim().split(' ').length > 1 ? userData.name.trim().split(' ').slice(1).join(' ') : '');
    const fullName = `${derivedFirstName} ${derivedLastName}`.trim();
    const cleanEmail = userData.email?.toLowerCase().trim() || `${derivedFirstName.toLowerCase().replace(/[^a-z0-9]/g, '')}@student.planzo`;

    const newUser: AuthUser = {
      id: `usr-${Date.now()}`,
      name: fullName,
      firstName: derivedFirstName,
      lastName: derivedLastName,
      email: cleanEmail,
      phone: userData.phone || '',
      password: userData.password || '',
      isVerified: userData.isVerified !== undefined ? userData.isVerified : true,
      rollNo: userData.rollNo || '',
      college: userData.college || 'Samrat Ashok Technological Institute (SATI), Vidisha M.P.',
      branch: userData.branch || 'B.Tech. Computer Science & Engineering',
      semester: userData.semester || 1,
      avatarUrl: userData.avatarUrl || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(derivedFirstName)}&colors=emerald,cyan,teal`,
      isAuthenticated: true,
      joinedAt: 'Just now',
      accountCreatedAt: todayStr,
    };

    // Save in registered users list in localStorage
    try {
      const savedUsersRaw = localStorage.getItem('planzo_registered_users_v1');
      const registeredUsers: AuthUser[] = savedUsersRaw ? JSON.parse(savedUsersRaw) : [];
      const filtered = registeredUsers.filter((u) => u.name.toLowerCase() !== newUser.name.toLowerCase() && (!newUser.email || u.email?.toLowerCase() !== newUser.email));
      filtered.push(newUser);
      localStorage.setItem('planzo_registered_users_v1', JSON.stringify(filtered));
    } catch (e) {
      console.error('Error saving registered user', e);
    }

    setCurrentUser(newUser);
    localStorage.setItem('planzo_auth_user_v1', JSON.stringify(newUser));

    // Reset starting state for newly created account: 0 XP, 0 Streak, clean calendar!
    setUserXp(0);
    setUserStreak(0);
    localStorage.setItem('planzo_user_xp_v5', '0');
    localStorage.setItem('planzo_user_streak_v5', '0');

    // Clean scheduled tasks (0 tasks to begin with)
    const freshTasks: Record<string, DailyScheduledTask[]> = {};
    setScheduledTasks(freshTasks);
    localStorage.setItem(STORAGE_KEYS.SCHEDULED_TASKS, JSON.stringify(freshTasks));

    // Clean initial subjects and 0/0 attendance for selected semester
    const targetSem = userData.semester || 1;
    const semSubjects = (targetSem === 1 || targetSem === 2)
      ? FOUNDATION_ENGINEERING_SUBJECTS.slice(0, 5)
      : getBranchSemesterSubjects(newUser.branch, targetSem);
    setSubjects(semSubjects);
    localStorage.setItem(STORAGE_KEYS.SUBJECTS, JSON.stringify(semSubjects));

    const cleanAttendance: SubjectAttendance[] = semSubjects.map((sub) => ({
      subjectId: sub.id,
      subjectCode: sub.code,
      subjectName: sub.name,
      attendedClasses: 0,
      totalClasses: 0,
      isLab: sub.name.toLowerCase().includes('lab'),
      professorName: 'SATI Vidisha Faculty',
    }));
    setAttendance(cleanAttendance);
    localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(cleanAttendance));

    setReflections([]);
    localStorage.setItem(STORAGE_KEYS.REFLECTIONS, JSON.stringify([]));

    const newProfile: StudentProfile = {
      name: fullName,
      firstName: derivedFirstName,
      lastName: derivedLastName,
      phone: userData.phone || '',
      isVerified: true,
      college: newUser.college,
      customCollege: newUser.college,
      branch: newUser.branch,
      semester: targetSem,
      rollNo: userData.rollNo || '',
      wakeTime: '07:00',
      sleepTime: '23:30',
      collegeStart: '10:30',
      collegeEnd: '17:30',
      selectedHabits: [DEFAULT_HABITS[0], DEFAULT_HABITS[1], DEFAULT_HABITS[2]],
      onboarded: true,
      accountCreatedAt: todayStr,
      avatarUrl: newUser.avatarUrl,
    };

    setProfile(newProfile);
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(newProfile));
    localStorage.setItem('planzo_profile_v3', JSON.stringify(newProfile));

    setRecalibrateNotice(`Welcome to PlanZo, ${derivedFirstName}! Student workspace unlocked.`);
  };

  const signIn = (identifier: string, password?: string): boolean => {
    const cleanId = identifier.trim();
    const cleanLower = cleanId.toLowerCase();
    const todayStr = new Date().toISOString().split('T')[0];

    // Check if user is in planzo_registered_users_v1 by name, firstName, email, or rollNo
    let matchedUser: AuthUser | null = null;
    try {
      const savedUsersRaw = localStorage.getItem('planzo_registered_users_v1');
      if (savedUsersRaw) {
        const users: AuthUser[] = JSON.parse(savedUsersRaw);
        matchedUser = users.find(
          (u) =>
            u.name.toLowerCase() === cleanLower ||
            (u.email && u.email.toLowerCase() === cleanLower) ||
            (u.firstName && u.firstName.toLowerCase() === cleanLower) ||
            (u.rollNo && u.rollNo.toLowerCase() === cleanLower)
        ) || null;
      }
    } catch (e) {}

    let userToLogin: AuthUser;

    if (matchedUser) {
      userToLogin = {
        ...matchedUser,
        isAuthenticated: true,
      };
    } else {
      // If user logs in with a name that was not previously registered, use clean name
      const formatted = cleanId.includes('@')
        ? cleanId.split('@')[0]
        : cleanId;
      const fName = formatted.split(' ')[0] || 'Student';
      const lName = formatted.split(' ').slice(1).join(' ');

      userToLogin = {
        id: `usr-${Date.now()}`,
        name: cleanId || 'Student',
        firstName: fName,
        lastName: lName,
        email: cleanId.includes('@') ? cleanLower : `${fName.toLowerCase()}@student.planzo`,
        phone: '',
        isVerified: true,
        rollNo: '',
        college: profile.customCollege || profile.college || 'Samrat Ashok Technological Institute (SATI), Vidisha M.P.',
        branch: profile.branch || 'B.Tech. Computer Science & Engineering',
        semester: profile.semester || 1,
        avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(fName)}&colors=emerald,cyan,teal`,
        isAuthenticated: true,
        joinedAt: 'Active Member',
        accountCreatedAt: todayStr,
      };

      try {
        const savedUsersRaw = localStorage.getItem('planzo_registered_users_v1');
        const registeredUsers: AuthUser[] = savedUsersRaw ? JSON.parse(savedUsersRaw) : [];
        registeredUsers.push(userToLogin);
        localStorage.setItem('planzo_registered_users_v1', JSON.stringify(registeredUsers));
      } catch (e) {}
    }

    setCurrentUser(userToLogin);
    localStorage.setItem('planzo_auth_user_v1', JSON.stringify(userToLogin));

    const updatedProfile: StudentProfile = {
      ...profile,
      name: userToLogin.name,
      firstName: userToLogin.firstName || userToLogin.name.split(' ')[0],
      lastName: userToLogin.lastName || '',
      phone: userToLogin.phone || profile.phone || '',
      isVerified: userToLogin.isVerified || false,
      college: userToLogin.college,
      customCollege: userToLogin.college,
      branch: userToLogin.branch,
      semester: userToLogin.semester,
      rollNo: userToLogin.rollNo,
    };
    setProfile(updatedProfile);
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(updatedProfile));
    localStorage.setItem('planzo_profile_v3', JSON.stringify(updatedProfile));

    setRecalibrateNotice(`Welcome back, ${userToLogin.firstName || userToLogin.name}!`);
    return true;
  };

  const signOut = () => {
    setCurrentUser(null);
    localStorage.removeItem('planzo_auth_user_v1');
    setRecalibrateNotice('You are now browsing as guest.');
  };

  const scheduleStudyBlock = (block: {
    title: string;
    category: ItemCategory;
    startTime: string;
    endTime: string;
    date: string;
    subjectId?: string;
    cognitiveWeight?: number;
    notes?: string;
  }) => {
    const taskId = `block-${Date.now()}`;
    const newTask: DailyScheduledTask = {
      id: taskId,
      title: block.title,
      category: block.category,
      startTime: block.startTime,
      endTime: block.endTime,
      completed: false,
      date: block.date,
      cognitiveWeight: block.cognitiveWeight || 3,
    };

    // 1. Add to scheduledTasks
    addTaskForDate(newTask);

    // 2. If for today, also add to active timetable
    const todayStr = new Date().toISOString().split('T')[0];
    if (block.date === todayStr) {
      const timetableItem: TimetableItem = {
        id: taskId,
        title: block.title,
        category: block.category,
        startTime: block.startTime,
        endTime: block.endTime,
        completed: false,
        cognitiveWeight: block.cognitiveWeight || 3,
        notes: block.notes,
        date: block.date,
        subjectId: block.subjectId,
      };
      setTimetable((prev) => [...prev, timetableItem].sort((a, b) => a.startTime.localeCompare(b.startTime)));
    }

    setRecalibrateNotice(`Study block "${block.title}" scheduled for ${block.date} at ${block.startTime}!`);
  };

  return (
    <AppContext.Provider
      value={{
        profile,
        updateProfile,
        timetable,
        setTimetable,
        toggleItemComplete,
        snoozeItem,
        shiftItemToEvening,
        injectBufferZone,
        recalibrateSchedule,
        isRecalibrating,
        recalibrateNotice,
        clearRecalibrateNotice,
        subjects,
        setSubjects,
        toggleTopicComplete,
        bandwidth,
        reflections,
        addReflection,
        todayReflection,
        zenModeOpen,
        setZenModeOpen,
        activeZenTask,
        startZenMode,
        activeView,
        setActiveView,
        isAiDrawerOpen,
        setIsAiDrawerOpen,
        isAttendanceModalOpen,
        setIsAttendanceModalOpen,
        isSidebarOpen,
        setIsSidebarOpen,
        selectedResourceForModal,
        setSelectedResourceForModal,
        isPersonalizationWizardOpen,
        setIsPersonalizationWizardOpen,
        // Attendance
        attendance,
        setAttendance,
        markAttendance,
        adjustAttendanceCount,
        calculateBunkStatus,
        overallAttendancePercentage,
        // Subject Folders
        subjectFolders,
        toggleAssignmentStatus,
        addCustomNoteToFolder,
        // Monthly Calendar & Scheduling
        scheduledTasks,
        addTaskForDate,
        toggleTaskForDate,
        deleteTaskForDate,
        getDateTaskStats,
        // XP & Day Streak Feature
        userXp,
        userStreak,
        awardXp,
        // Auth
        currentUser,
        signUp,
        signIn,
        signOut,
        // Study Block Scheduling
        scheduleStudyBlock,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
