"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { EditQuizDialog } from "@/components/EditQuizDialog";
import { Quiz, QuizQuestion, QuizSubmission } from "@/lib/types";
import { useRouter } from "next/router";
import Link from "next/link";
import { GradingDialog } from "@/components/GradingDialog";

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

export default function Quiz() {
  const router = useRouter();
  const courseName = Array.isArray(router.query.courseName)
    ? router.query.courseName[0]
    : router.query.courseName || "";
  const quizName = Array.isArray(router.query.quizName)
    ? router.query.quizName[0]
    : router.query.quizName || "";
  const currentPath = router.asPath;

  const { data: session } = useSession();
  const isTA = session?.user.isAdminFor.includes(courseName); // TA check is disabled while developing
  const [currentQuiz, setCurrentQuiz] = useState<Quiz>({
    name: "",
    questions: [],
    totalPoints: 0,
    submissions: {},
  });

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);

  const [studentList, setStudentList] = useState([
    "ddd@ffse.com",
    "aaa@ffse.com",
    "bbb@ffse.com",
  ]);

  const handleButtonClick = () => {
    router.push(`${currentPath}/take`);
  };

  useEffect(() => {
    if (typeof courseName === "string" && typeof quizName === "string") {
      getQuiz(courseName, quizName)
        .then((quiz) => {
          // convert the list of files to a list of myFile[] with name and url
          setCurrentQuiz(quiz);
          setQuestions(quiz.questions);
        })
        .catch((err) => console.error(err));
    }
  }, [courseName]);

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{quizName}</h2>
          <h2 className="text-xl font-bold tracking-tight">Instruction</h2>
        </div>
      </div>
      <div>
        {isTA ? (
          <div className="">
            <Dialog>
              <DialogTrigger>
                <Button>
                  <span>Edit</span>
                </Button>
              </DialogTrigger>
              <EditQuizDialog
                propQuestions={questions}
                propQuizName={quizName}
              />
            </Dialog>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Submissions</TableHead>
                  <TableHead className="text-left"> Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {studentList
                  ? studentList.map((student: string, idx) => (
                      <TableRow key={idx}>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger>
                              <span>{student}</span>
                            </DialogTrigger>
                            <GradingDialog
                              propQuestions={questions}
                              studentEmail={student}
                            />
                          </Dialog>
                        </TableCell>
                        <TableCell>
                          <span>
                            {currentQuiz.submissions[student]?.score
                              ? `${currentQuiz.submissions[student]?.score}/${currentQuiz.totalPoints}`
                              : "Not Graded"}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))
                  : "No files found"}
              </TableBody>
            </Table>
          </div>
        ) : (
          <Button onClick={handleButtonClick}>
            <span>Take</span>
          </Button>
        )}
      </div>
    </div>
  );
}
