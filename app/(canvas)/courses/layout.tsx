"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Sidebar from "@/app/components/Sidebar";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />
      {children}
    </div>
  );
}
