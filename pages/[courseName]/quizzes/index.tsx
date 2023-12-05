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
import { File } from "@/lib/types";

async function getQuizzes(courseName: string): Promise<File[]> {
  let res = await fetch("/api/" + courseName + "/listFiles", {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch lessons");
  }

  let filesList = await res.json();
  console.log(filesList);
  let quizzesList: File[] = filesList.filter(
    (file: File) => file.type === "quiz"
  );
  // generate a SAS URL for each file and replace the url with the SAS URL
  for (let i = 0; i < quizzesList.length; i++) {
    const fileName = quizzesList[i].name;
    const sasURL = await getSAS(courseName, fileName);
    quizzesList[i].url = sasURL;
  }
  console.log(await quizzesList);
  return await quizzesList;
}

async function getSAS(courseName: string, fileName: string): Promise<string> {
  const response = await fetch(
    `/api/${courseName}/getSAS?filename=quizzes/${fileName}`
  );

  if (!response.ok) {
    throw new Error("File upload failed");
  }

  return (await response.json()).sasURL;
}

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

  const [quizList, setQuizList] = useState<File[]>([]);

  useEffect(() => {
    if (typeof courseName === "string") {
      getQuizzes(courseName)
        .then((quizList) => {
          // convert the list of files to a list of myFile[] with name and url
          setQuizList(quizList);
        })
        .catch((err) => console.error(err));
    }
  }, [courseName]);

  const currentPath = router.asPath;

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
            ? quizList.map((quiz: File, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    <Link
                      href={`${currentPath}/${quiz.name}`}
                      className="flex  "
                    >
                      <span>{quiz.name}</span>
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
