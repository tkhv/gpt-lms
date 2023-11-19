require("dotenv").config();

import { FilesList } from "./types";

const { BlobServiceClient } = require("@azure/storage-blob");

const getBlobServiceClient = async () => {
  const AZURE_STORAGE_CONNECTION_STRING =
    process.env.AZURE_STORAGE_CONNECTION_STRING;

  if (!AZURE_STORAGE_CONNECTION_STRING) {
    throw Error("Azure Storage Connection string not found");
  }
  return await BlobServiceClient.fromConnectionString(
    AZURE_STORAGE_CONNECTION_STRING
  );
};

const getContainerClient = async (containerName: string) => {
  const AZURE_STORAGE_CONNECTION_STRING =
    process.env.AZURE_STORAGE_CONNECTION_STRING;
  const blobServiceClient = await getBlobServiceClient();
  return await blobServiceClient.getContainerClient(containerName);
};

export const listBlobs = async (containerName: string) => {
  try {
    const containerClient = await getContainerClient(containerName);
    const files: FilesList = [];

    for await (let blob of containerClient.listBlobsFlat()) {
      const tempBlockBlobClient = containerClient.getBlockBlobClient(blob.name);
      blob = blob.name.split("/");
      files.push({
        type: blob[0],
        name: blob[1],
        url: tempBlockBlobClient.url,
      });
    }

    return files;
  } catch (err: any) {
    console.log(`Error: ${err.message}`);
    throw err;
  }
};

export const initCourseContainer = async (containerName: string) => {
  try {
    // Create a container
    const containerClient = await getContainerClient(containerName);
    const createContainerResponse = await containerClient.create();

    console.log(
      `Created container for ${containerName} successfully`,
      createContainerResponse.requestId
    );

    // create some blobs with delimiters in names
    const content = "hello";
    const contentByteLength = Buffer.byteLength(content);

    // Initialize the container with some example data
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
  } catch (err: any) {
    console.log(`Error: ${err.message}`);
  }
};
