"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface userData {
  userId: string;
  setUserId: Dispatch<SetStateAction<string>>;
  courseList: string[];
  setCourseList: Dispatch<SetStateAction<string[]>>;
}

const UserContext = createContext<userData>({
  userId: "",
  setUserId: (): string => "",
  courseList: [],
  setCourseList: (): string[] => [],
});

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userId, setUserId] = useState("");
  const [courseList, setCourseList] = useState<string[]>([]);

  // useEffect(() => {
  //   try {
  //     const savedCourseList = localStorage.getItem("taking_courses");
  //     if (savedCourseList) {
  //       setCourseList(JSON.parse(savedCourseList));
  //     }
  //   } catch (error) {
  //     console.error("Failed to parse courses from localStorage:", error);
  //   }
  // }, []);

  // useEffect(() => {
  //   try {
  //     localStorage.setItem("taking_courses", JSON.stringify(courseList));
  //   } catch (error) {
  //     console.error("Failed to save courses to localStorage:", error);
  //   }
  // }, [courseList]);
  return (
    <UserContext.Provider
      value={{ userId, setUserId, courseList, setCourseList }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
