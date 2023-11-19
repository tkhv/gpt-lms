"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface CourseData {
  currentCourse: string;
  setCurrentCourse: Dispatch<SetStateAction<string>>;
}

const CourseContext = createContext<CourseData>({
  currentCourse: "",
  setCurrentCourse: (): string => "",
});

export const CourseContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentCourse, setCurrentCourse] = useState("");

  return (
    <CourseContext.Provider value={{ currentCourse, setCurrentCourse }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourseContext = () => useContext(CourseContext);
