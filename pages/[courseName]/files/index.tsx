import { File, FilesList } from "@/lib/types";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

async function getFilesList(courseName: string) {
  let res = await fetch(
    "http://localhost:3000/api/" + courseName + "/listFiles",
    {
      method: "GET",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return await res.json();
}

export default async function Files() {
  const [filesList, setFilesList] = useState<FilesList | null>(null);
  const router = useRouter();
  const { courseName } = router.query;

  useEffect(() => {
    if (typeof courseName === "string") {
      getFilesList(courseName)
        .then(setFilesList)
        .catch((error) => console.error(error));
    }
  }, [courseName]);
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
          {filesList
            ? filesList.map((file: File) => (
                <TableRow key={file.name}>
                  <TableCell>{file.name}</TableCell>
                  <TableCell>delete btn here</TableCell>
                </TableRow>
              ))
            : "No files found"}
        </TableBody>
      </Table>
    </div>
  );
}
// export default function Files() {
//   return <div>files</div>;
// }
