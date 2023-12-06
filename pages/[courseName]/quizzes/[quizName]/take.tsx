"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { ScrollArea } from "@/components/ui/scroll-area";

import { useEffect, useState } from "react";
import { Quiz, QuizQuestion } from "@/lib/types";
import { useRouter } from "next/router";
import { string } from "zod";

async function getQuiz(courseName: string, quizName: string): Promise<Quiz> {
  const response = await fetch(
    `/api/${courseName}/getSAS?filename=quiz/${quizName}`
  );

  if (!response.ok) {
    throw new Error("File upload failed");
  }

  const sasURL = (await response.json()).sasURL;
  const quiz = await fetch(sasURL);
  if (!quiz.ok) {
    throw new Error("Failed to fetch quiz");
  }

  return await quiz.json();
}

export default function QuizTake() {
  const router = useRouter();
  const { courseName, quizName } = router.query;
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);

  const [studentAnswers, setStudentAnswers] = useState(() => {
    return questions.map((question) => ({
      questionNum: question.questionNum,
      answer: question.questionType === "MCQ" ? "" : 0, // Initialize MCQs with a string, FRQs with an array
    }));
  });

  const handleAnswerChange = (questionNum: number, newAnswer: any) => {
    const currentQ = questions[questionNum - 1];
    if (currentQ.questionType === "MCQ") {
      setStudentAnswers((prevAnswers) =>
        prevAnswers.map((ans) =>
          ans.questionNum === questionNum
            ? { ...ans, answer: currentQ.options.indexOf(newAnswer) + 1 }
            : ans
        )
      );
    } else {
      setStudentAnswers((prevAnswers) =>
        prevAnswers.map((ans) =>
          ans.questionNum === questionNum ? { ...ans, answer: newAnswer } : ans
        )
      );
    }
  };

  const handleSubmit = () => {
    /*
    1. Need a popup to make sure student finished.
    2. Calulate the score and update the takenUserList using the api
    3. back to the previous page
    */
    console.log(studentAnswers);
  };

  useEffect(() => {
    if (typeof courseName === "string" && typeof quizName === "string") {
      getQuiz(courseName, quizName)
        .then((quiz) => {
          // convert the list of files to a list of myFile[] with name and url
          setQuestions(quiz.questions);
        })
        .catch((err) => console.error(err));
    }
  }, [courseName]);

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
              <RadioGroup
                defaultValue={q.question}
                onValueChange={(e) => handleAnswerChange(q.questionNum, e)}
              >
                {q.questionType == "MCQ" && q.options ? (
                  q.options.map((option) => (
                    <div className="flex items-center space-x-2" key={option}>
                      <RadioGroupItem value={option} />
                      <Label htmlFor="option">{option}</Label>
                    </div>
                  ))
                ) : (
                  <div>
                    <Textarea
                      placeholder="Type your answer here."
                      onChange={(e) =>
                        handleAnswerChange(q.questionNum, e.target.value)
                      }
                    />
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
