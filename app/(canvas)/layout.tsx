"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/app/components/Navbar";
import { useState } from "react";

export default function CanvasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //it will be useContext from main app
  const [classList, setClassList] = useState<string[]>([
    "cs3312",
    "cs2200",
    "cs4400",
  ]);
  return (
    <div className="flex">
      <Navbar classList={classList} />
      {children}
    </div>
  );
}
