import { File, FilesList } from "@/lib/types";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

export default async function Files({
  params,
}: {
  params: { courseName: string };
}) {
  const courseName = params.courseName;
  const filesList: FilesList = await getFilesList(courseName);
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {params.courseName} Files
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
