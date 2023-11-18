"use client";
import { useState } from "react";

export default function Course({ params }: { params: { courseName: string } }) {
  return <div className="flex">course {params.courseName} Home </div>;
}
