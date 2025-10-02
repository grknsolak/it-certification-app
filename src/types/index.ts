// Soru tipi
export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number | number[]; // Tek cevap veya çoklu cevap için
  explanation?: string;
  category?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

// Sınav tipi
export interface Exam {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  timeLimit: number; // dakika cinsinden
  passingScore: number; // yüzde olarak
  category: string;
  subCategory?: string; // Alt kategori (örn: AWS, Azure, Cisco)
  icon?: string;
  createdAt: Date;
}

// Sınav sonucu
export interface ExamResult {
  examId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  timeSpent: number; // saniye cinsinden
  completedAt: Date;
  answers: Answer[];
}

// Verilen cevap
export interface Answer {
  questionId: string;
  selectedOption: number | number[];
  isCorrect: boolean;
  timeSpent: number; // saniye
}

// Kullanıcı
export interface User {
  id: string;
  name: string;
  email: string;
  examHistory: ExamResult[];
  preferences: UserPreferences;
}

// Kullanıcı tercihleri
export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: 'en' | 'tr';
  notifications: boolean;
  soundEnabled: boolean;
}

// Navigation types
export type RootStackParamList = {
  Login: undefined;
  CategorySelection: undefined;
  SubCategory: { 
    categoryId: string;
    categoryName: string;
    categoryIcon: string;
  };
  Home: undefined;
  ExamList: { category?: string; subCategory?: string };
  Exam: { examId: string };
  Results: { result: ExamResult };
  Settings: undefined;
  QuestionReview: { examId: string };
};

