export interface Course {
  id: string;
  title: string;
  instructor: string;
  description: string;
  category: string;
  image: string;
  gallery?: string[];
  rating: number;
  students: number;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  modules?: Module[];
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'quiz' | 'reading';
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  enrolledCourseIds: string[];
}

export interface Feedback {
  courseId: string;
  rating: number;
  comment: string;
}

export type ViewState = 'CATALOG' | 'DASHBOARD' | 'LOGIN' | 'REGISTER' | 'COURSE_CONTENT';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}