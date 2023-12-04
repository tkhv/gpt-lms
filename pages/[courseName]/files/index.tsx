import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { File } from "../../../lib/types";
import { useRouter } from "next/router";

async function getFilesList(courseName: string) {
  let res = await fetch("/api/" + courseName + "/listFiles", {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return await res.json();
}

export default function Files() {
  const [filesList, setFilesList] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const router = useRouter();
  const { courseName } = router.query;

  useEffect(() => {
    if (typeof courseName === "string") {
      getFilesList(courseName)
        .then((files) => {
          console.log(files);
          setFilesList(files);
          setIsLoading(false);
        })
        .catch((err) => console.error(err));
    }
  }, [courseName]);

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {courseName} Files
          </h2>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">File Name</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filesList.length ? (
            filesList.map((file, index) => (
              <TableRow key={index}>
                <TableCell>{file.name}</TableCell>
                <TableCell>delete btn here</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell>No files found</TableCell>
            </TableRow>
            // Note: Hydration errors will occur at runtime if
            // we return something other than a TableRow here.
          )}
        </TableBody>
      </Table>
    </div>
  );
}
