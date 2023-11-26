const { NextApiRequest, NextApiResponse } = require("next/server");
import { getServerSession } from "next-auth/next";
import { options } from "../auth/[...nextauth]";

const { DefaultAzureCredential } = require("@azure/identity");
const { ContainerClient } = require("@azure/storage-blob");

import pool from "@/dbUtils/dbPool";

/* This GET endpoint is called by the client to create a container for a course.
    A 200 response is returned if the container is created successfully. 
    Else, a 500 response is returned. */

export default async function GET(
  req: typeof NextApiRequest,
  res: typeof NextApiResponse
) {
  const session = await getServerSession(req, res, options);
  if (!session) {
    res.status(500).json({ error: "You must be signed in." });
  }
  const email = session.user.email;
  let { containerName } = req.query; // containers cannot have uppercase or symbols
  containerName = containerName.toLowerCase();

  await initContainer(containerName);
  await initDefaultFiles(containerName); // temp data for testing
  await initDatabase(containerName, email);
  res.status(200).json({ "data.containerName": containerName });
}

// This function initializes an empty container
async function initContainer(containerName: string) {
  const containerClient = await new ContainerClient(
    process.env.AZURE_STORAGE_URL + `/${containerName}`,
    new DefaultAzureCredential()
  );

  const createContainerResponse = await containerClient.create();

  console.log(
    `Created container for ${containerName} successfully: `,
    createContainerResponse.requestId
  );
  return;
}

/* This function initializes the container with the following files in the specified paths:
    - dashboard/readme.md
    - quizzes/quiz1.json
    - lessons/lesson1.pdf
    - assignments/assignment1.json
*/
async function initDefaultFiles(containerName: string) {
  const containerClient = await new ContainerClient(
    process.env.AZURE_STORAGE_URL + `/${containerName}`,
    new DefaultAzureCredential()
  );

  // !!! TEMPORARY DATA !!!
  const content = "hello";
  const contentByteLength = Buffer.byteLength(content);

  // Initialize the container
  for (const blobName of [
    "dashboard/readme.md",
    "quizzes/quiz1.json",
    "lessons/lesson1.pdf",
    "assignments/assignment1.json",
  ]) {
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const { requestId } = await blockBlobClient.upload(
      content,
      contentByteLength
    );
  }

  return;
}

// This function updates the database with the container info
async function initDatabase(containerName: string, email: string) {
  const createCourseQuery = `INSERT INTO courses (courseName, creatorEmail) VALUES ($1, $2);`;
  try {
    await pool.query(createCourseQuery, [containerName, email]);
  } catch (err) {
    console.log(err);
    return;
  }
}
