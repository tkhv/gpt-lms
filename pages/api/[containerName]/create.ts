const { NextApiRequest, NextApiResponse } = require("next/server");

const { DefaultAzureCredential } = require("@azure/identity");
const { ContainerClient } = require("@azure/storage-blob");

type File = {
  type: "quiz" | "assignment" | "lesson";
  name: string;
  url: string;
};

/* This GET endpoint is called by the client to create a container for a course.
    A 200 response is returned if the container is created successfully. 
    Else, a 500 response is returned. */

export default async function GET(
  req: typeof NextApiRequest,
  res: typeof NextApiResponse
) {
  let { containerName } = req.query;
  containerName = containerName.toLowerCase(); // containers cannot have uppercase or symbols

  const containerClient = await new ContainerClient(
    process.env.AZURE_STORAGE_URL + `/${containerName}`,
    new DefaultAzureCredential()
  );

  const createContainerResponse = await containerClient.create();

  console.log(
    `Created container for ${containerName} successfully: `,
    createContainerResponse.requestId
  );

  // !!! TEMPORARY DATA !!!
  const content = "hello";
  const contentByteLength = Buffer.byteLength(content);

  // Initialize the container
  for (const blobName of [
    "readme/readme.md",
    "quizzes/quiz1.json",
    "lessons/lesson1.json",
    "assignments/assignment1.json",
  ]) {
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const { requestId } = await blockBlobClient.upload(
      content,
      contentByteLength
    );
  }

  res.status(200).json({ requestId: createContainerResponse.requestId });
}
