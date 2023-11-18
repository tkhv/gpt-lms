"use client";
import { useState } from "react";

export default function Assignments({
  params,
}: {
  params: { courseName: string };
}) {
  return <div className="flex">course {params.courseName} Assignments </div>;
}
