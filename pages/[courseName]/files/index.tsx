import type { GetStaticProps, GetStaticPaths } from "next";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { FilesList } from "../../../lib/types";

type CourseProps = {
  courseName: string;
};

async function getFilesList(courseName: string) {
  const baseUrl = window.location.protocol + "//" + window.location.host;
  let res = await fetch(baseUrl + "/api/" + courseName + "/listFiles", {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return await res.json();
}
// export default function Files({ courseName }: CourseProps) {
//   return <div></div>
// }
export default function Files({ courseName }: CourseProps) {
  const [filesList, setFilesList] = useState<FilesList>([]);

  useEffect(() => {
    getFilesList(courseName)
      .then((files) => {
        console.log(files);
        setFilesList(files);
      })
      .catch((err) => console.error(err));
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

/* This function gets called at build time to define
the possible options for the dynamic route. We fetch
the courseList for the logged in user and pre-render
those. */
// export const getStaticPaths: GetStaticPaths = (async () => {
//   // Call our API to get courseList for this user.
//   // This is dummy data
//   const courseList = [
//     { name: "cs2200" },
//     { name: "cs3312" },
//     { name: "cs4400" },
//   ];

//   const paths = courseList.map((course) => ({
//     params: { courseName: course.name },
//   }));

//   // { fallback: false } means other routes should 404.
//   return {
//     paths: paths,
//     fallback: false,
//   };
// }) satisfies GetStaticPaths;

// // pre-render this page at build time
// export const getStaticProps: GetStaticProps<CourseProps> = async ({
//   params,
// }) => {
//   if (!params || typeof params.courseName !== "string") {
//     return {
//       notFound: true,
//     };
//   }

//   const courseName = params.courseName;
//   return { props: { courseName } };
// };
