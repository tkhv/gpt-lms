export type Course = {
  id: number;
  name: string;
};

export type File = {
  type: "quiz" | "assignment" | "lesson";
  name: string;
  url: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  image: string;
  isAdminFor: string[];
  courseList: string[];
};

export type Quiz = {
  name: string;
  questions: QuizQuestion[];
  totalPoints: number;
  submissions: Record<string, QuizSubmission>;
};

export type QuizSubmission = {
  answers: string[];
  score: number | undefined;
};

export type QuizQuestion = {
  questionNum: number;
  questionType: "MCQ" | "FRQ";
  question: string;
  options: string[];
  answer: number | string;
  points: number;
};
