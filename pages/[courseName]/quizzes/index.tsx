"use client";
import { File, FilesList } from "@/lib/types";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import Link from "next/link";
import { useUserTypeContext } from "@/context/userTypeContext";
import { useRouter } from "next/router";

export default function Quizzes() {
  const router = useRouter();
  const { courseName } = router.query;
  console.log("courseName" + courseName);
  const currentPath = router.pathname;
  // List of the quizzes' file names.
  const [quizList, setQuizList] = useState([
    "Quiz_0",
    "Quiz_1",
    "Quiz_2",
    "Quiz_3",
    "Quiz_4",
  ]);

  const { isTA, setIsTA } = useUserTypeContext();

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
              {isTA && (
                <Button>
                  <Link href={`${currentPath}/create`} className="flex  ">
                    <span>create</span>
                  </Link>
                </Button>
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Button
        className="flex justify-items-end w-20"
        onClick={() => setIsTA(!isTA)}
      >
        {isTA ? "TA" : "Student"}
      </Button>
    </div>
  );
}
