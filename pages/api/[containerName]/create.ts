const { NextApiRequest, NextApiResponse } = require("next/server");
import { getServerSession } from "next-auth/next";
import { options } from "../auth/[...nextauth]";

const { DefaultAzureCredential } = require("@azure/identity");
const { ContainerClient } = require("@azure/storage-blob");

import pool from "@/dbUtils/dbPool";

/* This POST endpoint is called by the client to create a container for a course.
    A 200 response is returned if the container is created successfully. 
    Else, a 500 response is returned. */

export default async function POST(
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

  // get TA emails from request body
  const TAEmails: String[] = JSON.parse(req.body).map((TA: any) => TA.text);

  await initContainer(containerName);
  await initDefaultFiles(containerName); // temp data for testing
  await initDatabase(containerName, email, TAEmails);
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

// This function initializes the container with dashboard/syllabus.md
async function initDefaultFiles(containerName: string) {
  const containerClient = await new ContainerClient(
    process.env.AZURE_STORAGE_URL + `/${containerName}`,
    new DefaultAzureCredential()
  );

  // !!! TEMPORARY DATA !!!
  const content = "Hello! This is temp data from api/[containerName]/create.ts";
  const contentByteLength = Buffer.byteLength(content);

  // Initialize the container
  const blockBlobClient = containerClient.getBlockBlobClient(
    "dashboard/syllabus.md"
  );
  const { requestId } = await blockBlobClient.upload(
    content,
    contentByteLength
  );

  return;
}

// This function updates the database with the container info
async function initDatabase(
  containerName: string,
  email: string,
  TAEmails: String[]
) {
  const createCourseQuery = `INSERT INTO courses (courseName, creatorEmail) VALUES ($1, $2);`;
  const TAQuery = `INSERT INTO course_tas (courseName, taEmail) VALUES ($1, $2);`;
  try {
    await pool.query(createCourseQuery, [containerName, email]);
  } catch (err) {
    console.log(err);
    return;
  }
  try {
    TAEmails.forEach(async (TAEmail) => {
      await pool.query(TAQuery, [containerName, TAEmail]);
    });
  } catch (err) {
    console.log(err);
    return;
  }
}
