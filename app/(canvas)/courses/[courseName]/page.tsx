"use client";
import { useState } from "react";

export default function Course({ params }: { params: { courseName: string } }) {
  console.log(params);
  return <div className="flex">course {params.courseName}</div>;
}
