"use client";
import { useState } from "react";

export default function Quizzes({
  params,
}: {
  params: { courseName: string };
}) {
  return <div className="flex">course {params.courseName} Quizzes </div>;
}
