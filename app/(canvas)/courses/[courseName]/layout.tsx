"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  UserTypeContextProvider,
  useUserTypeContext,
} from "@/app/context/userTypeContext";
import { createContext } from "vm";

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isTA, setIsTA } = useUserTypeContext();

  return (
    <div className="flex">
      {children}
      <Button className="flex justify-items-end" onClick={() => setIsTA(!isTA)}>
        {isTA ? "TA" : "Student"}
      </Button>
    </div>
  );
}
