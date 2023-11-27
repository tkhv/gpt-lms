"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { ScrollArea } from "@/components/ui/scroll-area";

import { useState } from "react";
import { QuizQuestion } from "@/lib/types";
import { useRouter } from "next/router";

export default function QuizTake() {
  const router = useRouter();
  const { courseName, quizName } = router.query;
  const [questions, setQustions] = useState<QuizQuestion[]>([
    {
      questionNum: 1,
      questionType: "MCQ",
      question: "which one is the best cloud service provider",
      options: ["AWS", "Azure", "GCP", "Oracle Cloud"],
      answer: 2,
      points: 10,
    },
    {
      questionNum: 2,
      questionType: "MCQ",
      question: "string",
      options: ["string1", "string2", "string3", "string4"],
      answer: 3,
      points: 10,
    },
    {
      questionNum: 3,
      questionType: "MCQ",
      question: "string",
      options: ["string1", "string2", "string3", "string4"],
      answer: 1,
      points: 10,
    },
    {
      questionNum: 4,
      questionType: "FRQ",
      question: "string",
      options: [],
      answer: 0,
      points: 80,
    },
    {
      questionNum: 5,
      questionType: "FRQ",
      question: "string",
      options: [],
      answer: 0,
      points: 80,
    },
  ]);

  const handleSubmit = () => {
    /*
    1. Need a popup to make sure student finished.
    2. Calulate the score and update the takenUserList using the api
    3. back to the previous page
    */
  };

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {courseName} {quizName}
          </h2>
        </div>
      </div>
      <ScrollArea className="h-[600px] w-[800px] rounded-md border p-4">
        <div>
          {questions.map((q) => (
            <div
              className="flex flex-col rounded-md border m-5 p-4 "
              key={q.questionNum}
            >
              <div className="text-l pb-4">
                {q.questionNum}.{q.question}
              </div>
              <RadioGroup defaultValue={q.question}>
                {q.questionType == "MCQ" && q.options ? (
                  q.options.map((option) => (
                    <div className="flex items-center space-x-2" key={option}>
                      <RadioGroupItem value={option} />
                      <Label htmlFor="option">{option}</Label>
                    </div>
                  ))
                ) : (
                  <div>
                    <Textarea placeholder="Type your answer here." />
                  </div>
                )}
              </RadioGroup>
            </div>
          ))}
        </div>
      </ScrollArea>
      <Button onClick={handleSubmit}>submit</Button>
    </div>
  );
}
