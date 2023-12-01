export type Course = {
  id: number;
  name: string;
};

export type CourseList = Course[];

export type File = {
  type: "quiz" | "assignment" | "lesson";
  name: string;
  url: string;
};

export type FilesList = File[];

export type User = {
  id: number;
  name: string;
  email: string;
  image: string;
  isAdminFor: string[];
  courseList: string[];
};

export type QuizQuestion = {
  questionNum: number;
  questionType: "MCQ" | "FRQ";
  question: string;
  options: string[];
  answer: number | string;
  points: number;
};

export type Quiz = {
  name: string;
  questions: QuizQuestion[];
  totalPoints: number;
  submissions: Record<string, number>; // key: username, value: score
};
