"use client";
import { useState } from "react";

export default function Modules({
  params,
}: {
  params: { courseName: string };
}) {
  return <div className="flex">course {params.courseName} Modules </div>;
}
