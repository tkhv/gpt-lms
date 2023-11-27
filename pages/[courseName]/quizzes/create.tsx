"use client";
import QuizEditor from "@/components/QuizEditor";
import { QuizQuestion } from "@/lib/types";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Create() {
  const router = useRouter();
  const { courseName } = router.query;
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);

  return (
    <div className="flex">
      course {courseName} Quizzes
      <QuizEditor questions={questions} setQuestions={setQuestions} />
    </div>
  );
}
