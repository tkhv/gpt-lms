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
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { EditQuizDialog } from "@/components/EditQuizDialog";

export default function Quizzes() {
  const [isTA, setIsTA] = useState(false); // TA check is disabled while developing
  const router = useRouter();
  let { courseName } = router.query;
  const { data: session } = useSession();

  useEffect(() => {
    courseName = courseName as string;
    if (session?.user.isAdminFor.includes(courseName)) {
      setIsTA(true);
    }
  });

  const currentPath = router.asPath;
  // List of the quizzes' file names.
  const [quizList, setQuizList] = useState([
    "Quiz_0",
    "Quiz_1",
    "Quiz_2",
    "Quiz_3",
    "Quiz_4",
  ]);

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {courseName} Quizzes
          </h2>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Quizzes</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {quizList
            ? quizList.map((quizName: string) => (
                <TableRow key={quizName}>
                  <TableCell>
                    <Link
                      href={`${currentPath}/${quizName}`}
                      className="flex  "
                    >
                      <span>{quizName}</span>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            : "No files found"}
          <TableRow key={"create"}>
            <TableCell>
              {/* {isTA && ( */}
              <Dialog>
                <DialogTrigger>
                  <Button>
                    <span>Create</span>
                  </Button>
                </DialogTrigger>
                <EditQuizDialog propQuestions={[]} propQuizName="" />
              </Dialog>
              {/* )} */}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
