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
};
