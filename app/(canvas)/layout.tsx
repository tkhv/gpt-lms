"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/app/components/Navbar";
import { useState, createContext, use, SetStateAction, Dispatch } from "react";
import { useUserContext } from "../context/userContext";
import { CourseContextProvider } from "../context/courseContext";
import { CourseList } from "@/lib/types";
import { UserTypeContextProvider } from "../context/userTypeContext";

export default function CanvasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  /* courseList using useContext is reset when refreshing, so I commented it out for now.
  maybe extract the courseList by using api call here would be better
  */
  // const { userId, setUserId, courseList, setCourseList } = useUserContext();

  const courseList: CourseList = [
    { id: 1, name: "cs3312" },
    { id: 2, name: "cs2200" },
    { id: 3, name: "cs4400" },
  ];

  return (
    <div className="flex">
      <UserTypeContextProvider>
        <CourseContextProvider>
          <Navbar courseList={courseList} />
          {children}
        </CourseContextProvider>
      </UserTypeContextProvider>
    </div>
  );
}
