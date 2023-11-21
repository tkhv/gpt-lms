"use client";
import { useState } from "react";

export default function Course({ params }: { params: { courseName: string } }) {
  //isTA will be in useContext and shared in this level layout.
  /* onec get this isTA need to be updated*/
  return <div className="flex">course {params.courseName} Home </div>;
}
