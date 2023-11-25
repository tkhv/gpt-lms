"use client";

import { useRouter } from "next/router";
import React from "react";
// const { BlockBlobClient } = require("@azure/storage-blob");
// // import ReactMarkdown from "react-markdown";

// async function getSASurl(courseName: string) {
//   let res = await fetch(
//     "http://localhost:3000/api/" +
//       courseName +
//       "/getSAS?filename=readme/syllabus.md",
//     {
//       method: "GET",
//     }
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }
//   let sasURL = await res.json();
//   return sasURL.sasURL;
// }

// // Convert stream to text
// async function streamToText(readable: any) {
//   readable.setEncoding("utf8");
//   let data = "";
//   for await (const chunk of readable) {
//     data += chunk;
//   }
//   return data;
// }

// // Download the blob content
// async function getHomePage(courseName: string) {
//   const sasURL: string = await getSASurl(courseName);
//   const blockBlobClient = new BlockBlobClient(sasURL);

//   const downloadBlockBlobResponse = await blockBlobClient.download(0);
//   const downloaded = await streamToText(
//     await downloadBlockBlobResponse.readableStreamBody
//   );
//   return downloaded;
// }

// export default async function Course() {
export default function Course() {
  const router = useRouter();
  const { courseName } = router.query;
  // const content = await getHomePage(params.courseName); FETCH DISABLED WHILE DEVELOPING

  return (
    <div>
      {/* <ReactMarkdown className="prose" children={content} /> FETCH DISABLED WHILE DEVELOPING*/}
      <h1>Course {courseName}</h1>
    </div>
  );
}
