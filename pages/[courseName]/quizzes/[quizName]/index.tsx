"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { EditQuizDialog } from "@/components/EditQuizDialog";
import { QuizQuestion } from "@/lib/types";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();
  let { courseName, quizName } = router.query;
  courseName = courseName as string;
  quizName = quizName as string;
  const pathName = router.asPath;

  const { data: session } = useSession();
  const isTA = session?.user.isAdminFor.includes(courseName); // TA check is disabled while developing

  const handleButtonClick = () => {
    router.push(`${pathName}/take`);
  };

  const [questions, setQuestions] = useState<QuizQuestion[]>([
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
      answer: "this is the answer!",
      points: 80,
    },
    {
      questionNum: 5,
      questionType: "FRQ",
      question: "string",
      options: [],
      answer: "answer!",
      points: 80,
    },
  ]);

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{quizName}</h2>
          <h2 className="text-xl font-bold tracking-tight">Instruction</h2>
        </div>
      </div>
      <div>
        {/* {isTA ? ( */}
        <Dialog>
          <DialogTrigger>
            <Button>
              <span>Edit</span>
            </Button>
          </DialogTrigger>
          <EditQuizDialog propQuestions={questions} propQuizName={quizName} />
        </Dialog>
        {/* ) : ( */}
        <Button onClick={handleButtonClick}>
          <span>Take</span>
        </Button>
        {/* )} */}
      </div>
    </div>
  );
}
