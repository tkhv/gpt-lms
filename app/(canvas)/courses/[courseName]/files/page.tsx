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

import { listBlobs, initCourseContainer } from "@/lib/BlobServiceCalls";

export default async function Files({
  params,
}: {
  params: { courseName: string };
}) {
  // Fetches all files in the current course's container.
  const filesList: FilesList = await listBlobs("practice");

  // initCourseContainer("cs1100"); This one creates a container for a new course.
  // We dont call it here but I was just testing it here.

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
                  <TableCell>delete btn</TableCell>
                </TableRow>
              ))
            : "No files found"}
        </TableBody>
      </Table>
    </div>
  );
}
