"use client";

import { useRouter } from "next/router";
import React from "react";
import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from "next";
import { useUserContext } from "@/context/userContext";
import { Course, CourseList } from "@/lib/types";

// type Repo = {
//   name: string;
//   stargazers_count: number;
// };

// export const getStaticPaths = (async () => {
//   return {
//     paths: [
//       {
//         params: {
//           name: "next.js",
//         },
//       }, // See the "paths" section below
//     ],
//     fallback: true, // false or "blocking"
//   };
// }) satisfies GetStaticPaths;

// export const getStaticProps = (async (context) => {
//   const res = await fetch("https://api.github.com/repos/vercel/next.js");
//   const repo = await res.json();
//   return { props: { repo } };
// }) satisfies GetStaticProps<{
//   repo: Repo;
// }>;

// const courseList: CourseList = [
//   { id: 1, name: "cs3312" },
//   { id: 2, name: "cs2200" },
//   { id: 3, name: "cs4400" },
// ];

// export const getStaticPaths = (async () => {
//   const paths = courseList.map((course) => ({
//     params: { path: course.name },
//   }));
//   return { paths, fallback: false };
// }) satisfies GetStaticPaths;

// export const getStaticProps = (async (context) => {
//   const courseName = courseList.find((course) => course.name === context);
//   return { props: { courseName } };
// }) satisfies GetStaticProps<{
//   courseName: Course | undefined;
// }>;

// export async function getStaticProps({ params }) {
//   const courseName = courseList.find((course) => course.name === params.path);
//   return { props: { courseName } };
// }

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
  // const { courseList } = useUserContext();
  // const router = useRouter();
  // const { courseName } = router.query;
  // console.log(repo);
  // const content = await getHomePage(params.courseName); FETCH DISABLED WHILE DEVELOPING

  return (
    <div>
      {/* <ReactMarkdown className="prose" children={content} /> FETCH DISABLED WHILE DEVELOPING*/}
      <h1>Course</h1>
    </div>
  );
}
