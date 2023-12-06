"use client";
import { QuizQuestion, Quiz, QuizSubmission } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

export function GradingDialog({
  propQuestions,
  studentEmail,
}: {
  propQuestions: QuizQuestion[];
  studentEmail: string;
}) {
  //   const [quizName, setQuizName] = useState(propQuizName);
  //   const [quizSubmission, setQuizSubmission] = useState(propQuiz.submissions);

  //each question's score that student's got
  const [scores, setScores] = useState<number[]>(
    new Array(propQuestions.length).fill(0)
  );

  const [quizSubmission, setQuizSubmission] = useState<
    Record<string, QuizSubmission>
  >({
    "ddd@ffse.com": { answers: ["1", "3", "I have no idea"], score: undefined },
  });

  const router = useRouter();
  const courseName = Array.isArray(router.query.courseName)
    ? router.query.courseName[0]
    : router.query.courseName || "";
  const quizName = Array.isArray(router.query.quizName)
    ? router.query.quizName[0]
    : router.query.quizName || "";

  const handleSubmit = async () => {
    const totalScore = scores.reduce((acc, score) => acc + score, 0);

    // Update the student's submission with the total score
    setQuizSubmission((current) => ({
      ...current,
      [studentEmail]: {
        ...current[studentEmail],
        score: totalScore,
      },
    }));

    const quiz: Quiz = {
      name: quizName,
      questions: propQuestions,
      totalPoints: propQuestions.reduce((acc, q) => acc + q.points, 0),
      submissions: {
        ...quizSubmission,
        [studentEmail]: {
          ...quizSubmission[studentEmail],
          score: totalScore,
        },
      },
    };
    try {
      const res = fetch(`/api/${courseName}/saveQuiz`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quiz),
      });
      console.log(await res);
    } catch (err) {
      console.error(err);
    }
    if (quizName.length == 0) {
      // If creating a new quiz, reset the questions and
      // name fields whenever the dialog is closed.
    }
  };

  const handleScoreChange = (index: number, newScore: number) => {
    setScores((currentScores) => {
      const updatedScores = [...currentScores];
      updatedScores[index] = newScore;
      return updatedScores;
    });
  };

  return (
    <DialogContent className="sm:max-w-[60%]">
      <DialogHeader>
        <DialogTitle>Grading Quiz</DialogTitle>
        <DialogDescription>
          Add details and create when your&apos;e done.
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-row p-2 items-center gap-2">{quizName}</div>
      <ScrollArea className="h-[600px] w-[800px] rounded-md border p-4">
        <div>
          {propQuestions.map((q, qIndex) => (
            <div
              className="flex flex-col rounded-md border m-5 p-4"
              key={q.questionNum}
            >
              <div className="flex flex-row p-2 items-center gap-2">
                {q.questionNum}. {q.question}
              </div>
              <div className="flex flex-row p-2 items-center gap-2">
                points: {q.points}
              </div>

              {q.questionType === "MCQ" ? (
                <div className="flex flex-col p-2">
                  {/* Display the options and indicate which one was selected by the student */}
                  {q.options.map((option, oIndex) => (
                    <div
                      className="flex items-center space-x-2 p-2"
                      key={`option-${q.questionNum}-${oIndex}`}
                    >
                      {/* Check if the student's answer matches the option index */}
                      {q.answer === oIndex ? (
                        <div className="bg-yellow-200 rounded-md">
                          {oIndex + 1} . {option}
                        </div> // This is a checkmark symbol to indicate the selected answer
                      ) : (
                        <div>
                          {oIndex + 1} . {option}
                        </div>
                      )}
                    </div>
                  ))}
                  <div>
                    student&apos;s answer :
                    {quizSubmission[studentEmail]?.answers[qIndex] ?? ""}
                  </div>
                  <Input
                    type="number"
                    value={scores[qIndex]}
                    onChange={(e) =>
                      handleScoreChange(qIndex, Number(e.target.value))
                    }
                    placeholder="Enter score"
                  />
                </div>
              ) : (
                // For FRQ, display the student's answer directly
                <div className="p-2">
                  <div className="bg-yellow-200 rounded-md">
                    answer :{q.answer}
                  </div>
                  <div>
                    student&apos;s answer :{" "}
                    {quizSubmission[studentEmail]?.answers[qIndex] ?? ""}
                  </div>
                  <Input
                    type="number"
                    value={scores[qIndex]}
                    onChange={(e) =>
                      handleScoreChange(qIndex, Number(e.target.value))
                    }
                    placeholder="Enter score"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
      <DialogClose asChild>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Finish Grading
          </Button>
        </DialogFooter>
      </DialogClose>
    </DialogContent>
  );
}
