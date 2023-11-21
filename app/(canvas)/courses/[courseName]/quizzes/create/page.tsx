"use client";
import { useState } from "react";

export default function Create({ params }: { params: { courseName: string } }) {
  return <div className="flex">course {params.courseName} Quizzes </div>;
}
