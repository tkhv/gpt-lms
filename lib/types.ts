export type File = {
  type: "quiz" | "assignment" | "lesson";
  name: string;
  url: string;
};
export type FilesList = File[];
