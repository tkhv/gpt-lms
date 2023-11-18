"use client";
import { useState } from "react";

export default function Files({ params }: { params: { courseName: string } }) {
  return <div className="flex">course {params.courseName} Files </div>;
}
