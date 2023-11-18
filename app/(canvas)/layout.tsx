"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/app/components/Navbar";
import { useState, createContext, use, SetStateAction, Dispatch } from "react";
import { useUserContext } from "../context/userContext";
import { CourseContextProvider } from "../context/coureContext";

export default function CanvasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  /* courseList using useContext is reset when refreshing, so I commented it out for now.
  maybe extract the courseList by using api call here would be better
  */
  // const { userId, setUserId, courseList, setCourseList } = useUserContext();
  const courseList = ["cs3312", "cs2200", "cs4400"];

  return (
    <div className="flex">
      <CourseContextProvider>
        <Navbar courseList={courseList} />
        {children}
      </CourseContextProvider>
    </div>
  );
}
