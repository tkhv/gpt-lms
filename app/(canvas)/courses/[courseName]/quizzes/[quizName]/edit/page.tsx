"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { ScrollArea } from "@/components/ui/scroll-area";

import { useState } from "react";
import { Quiz } from "@/lib/types";

export default function QuizEdit({
  params,
}: {
  params: { courseName: string; quizName: string };
}) {
  const [questions, setQuestions] = useState<Quiz[]>([
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

  const handleQuestionChange = (index: number, newText: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = newText;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (
    questionIndex: number,
    optionIndex: number,
    newOptionText: string
  ) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = newOptionText;
    setQuestions(updatedQuestions);
  };

  const addOption = (questionIndex: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.push("");
    setQuestions(updatedQuestions);
  };

  const deleteOption = (questionIndex: number, optionIndex: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.splice(optionIndex, 1);
    setQuestions(updatedQuestions);
  };

  const handleSubmit = () => {
    /*
    1. Need a popup to make sure the Ta finished editing.
    2. update the quesitons
    3. back to the previous page
    */
  };

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {params.courseName} {params.quizName}
          </h2>
        </div>
      </div>
      {/*need to be able to edit Instuction here */}
      <ScrollArea className="h-[600px] w-[800px] rounded-md border p-4">
        <div>
          {questions.map((q, qIndex) => (
            <div className="flex flex-col rounded-md border m-5 p-4 ">
              {q.questionNum}.
              <Input
                value={q.question}
                onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                placeholder="Type your question here."
              />
              {q.questionType == "MCQ" && (
                <>
                  {q.options.map((option, oIndex) => (
                    <div className="flex items-center space-x-2 p-2">
                      <Input
                        value={option}
                        onChange={(e) =>
                          handleOptionChange(qIndex, oIndex, e.target.value)
                        }
                      />
                      <Button
                        className="w-8 h-8 p-2"
                        onClick={() => deleteOption(qIndex, oIndex)}
                      >
                        -
                      </Button>
                    </div>
                  ))}
                  <div className="flex justify-center">
                    <Button
                      className="w-8 h-8"
                      onClick={() => addOption(qIndex)}
                    >
                      +
                    </Button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
      <Button onClick={handleSubmit}>submit</Button>
    </div>
  );
}
