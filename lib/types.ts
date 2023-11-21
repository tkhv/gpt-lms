import { string } from "zod";

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

export type Quiz = {
  questionNum: number;
  questionType: "MCQ" | "FRQ";
  question: string;
  options: string[];
  answer: number;
  points: number;
};
