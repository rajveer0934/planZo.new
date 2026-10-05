export type ItemCategory = 'lecture' | 'lab' | 'study' | 'habit' | 'chill' | 'assignment';

export interface ResourceLink {
  title: string;
  creatorOrAuthor: string;
  url: string;
  type: 'youtube' | 'textbook' | 'notes';
  durationOrPages?: string;
  description?: string;
}

export interface SyllabusModule {
  id: string;
  title: string;
  topics: { id: string; name: string; completed: boolean }[];
  recommendedResource?: ResourceLink;
  weightagePercentage: number;
}

export interface SubjectCourse {
  id: string;
  name: string;
  code: string;
  credits: number;
  examDate?: string;
  color: string; // Tailwind color token or hex
  modules: SyllabusModule[];
  standardTextbook: string;
  pyqPaperAvailable: boolean;
}

export interface TimetableItem {
  id: string;
  title: string;
  category: ItemCategory;
  startTime: string; // HH:MM
  endTime: string;   // HH:MM
  completed: boolean;
  snoozed?: boolean;
  subjectId?: string;
  topic?: string;
  resource?: ResourceLink;
  cognitiveWeight: number; // 1 (light) to 5 (intensive)
  notes?: string;
  date?: string; // YYYY-MM-DD
}

export interface DailyScheduledTask {
  id: string;
  title: string;
  category: ItemCategory;
  startTime: string;
  endTime: string;
  completed: boolean;
  date: string; // YYYY-MM-DD
  cognitiveWeight?: number;
}

export interface StudentProfile {
  name: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  isVerified?: boolean;
  avatarUrl?: string;
  college: string;
  customCollege?: string;
  branch: string;
  semester: number;
  wakeTime: string;
  sleepTime: string;
  collegeStart: string;
  collegeEnd: string;
  selectedHabits: string[];
  onboarded: boolean;
  rollNo?: string;
  accountCreatedAt?: string; // YYYY-MM-DD
}

export interface AuthUser {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  isVerified?: boolean;
  password?: string;
  rollNo?: string;
  college: string;
  branch: string;
  semester: number;
  avatarUrl?: string;
  isAuthenticated: boolean;
  joinedAt: string;
  accountCreatedAt?: string; // YYYY-MM-DD
}

export interface MentalBandwidthState {
  densityScore: number; // 0 to 100
  status: 'calm' | 'balanced' | 'dense' | 'overload';
  totalStudyMinutes: number;
  totalLabMinutes: number;
  bufferMinutes: number;
  recommendation: string;
}

export interface ReflectionEntry {
  id: string;
  date: string;
  energyLevel: number; // 1-5
  focusLevel: number;  // 1-5
  stressLevel: number; // 1-5
  note?: string;
  timestamp: string;
}

export interface ChatAttachment {
  name: string;
  mimeType: string;
  data: string; // base64
  size?: number;
  previewUrl?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  attachment?: ChatAttachment;
  actionablePlan?: {
    type: 'recalibrate' | 'add_buffer' | 'study_plan';
    payload: any;
  };
}

export interface SubjectAttendance {
  subjectId: string;
  subjectName: string;
  subjectCode: string;
  attendedClasses: number;
  totalClasses: number;
  professorName?: string;
  isLab?: boolean;
}

export interface FolderItem {
  id: string;
  title: string;
  type: 'notes' | 'pyq' | 'viva' | 'assignment';
  dateAdded: string;
  fileSizeOrPages?: string;
  summary?: string;
  tags?: string[];
  solved?: boolean;
}

export interface SubjectFolderData {
  subjectId: string;
  topperNotes: FolderItem[];
  previousYearQuestions: FolderItem[];
  labVivaQuestions: {
    id: string;
    question: string;
    answer: string;
    importance: 'Frequent' | 'Guaranteed Viva Question';
  }[];
  assignments: {
    id: string;
    title: string;
    dueDate: string;
    completed: boolean;
    maxMarks: number;
  }[];
}

