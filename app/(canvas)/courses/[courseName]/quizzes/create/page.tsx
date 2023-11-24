"use client";
import QuizEditor from "@/app/components/QuizEditor";
import { QuizQuestion } from "@/lib/types";
import { useState } from "react";

export default function Create({ params }: { params: { courseName: string } }) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);

  return (
    <div className="flex">
      course {params.courseName} Quizzes
      <QuizEditor questions={questions} setQuestions={setQuestions} />
    </div>
  );
}
