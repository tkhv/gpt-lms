import OpenAI from "openai";
// import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { Buffer } from "buffer";
import { Readable } from "stream";

const { DefaultAzureCredential } = require("@azure/identity");
const { ContainerClient } = require("@azure/storage-blob");
const { NextApiRequest, NextApiResponse } = require("next/server");

const { BlobServiceClient } = require("@azure/storage-blob");

async function getPDF(containerName: string, filename: string) {
  const blobServiceClient = new BlobServiceClient(
    process.env.AZURE_STORAGE_URL,
    new DefaultAzureCredential()
  );

  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(
    "lessons/" + filename
  );

  const downloadResponse = await blockBlobClient.download(0);
  const downloadedContent = await streamToBuffer(
    downloadResponse.readableStreamBody
  );

  return downloadedContent;
}

async function streamToBuffer(readableStream: Readable) {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    readableStream.on("data", (data) => {
      chunks.push(data instanceof Buffer ? data : Buffer.from(data));
    });
    readableStream.on("end", () => {
      resolve(Buffer.concat(chunks));
    });
    readableStream.on("error", reject);
  });
}

export default async function POST(
  req: typeof NextApiRequest,
  res: typeof NextApiResponse
) {
  // res.status(200).json({ message: "Hello from Next.js!" });
  const { containerName, filename } = req.query;

  console.log(filename);

  // const openai = new OpenAI({
  //   organization: "YOUR_ORG_ID",
  // });

  /* PDFLoder 
    make file to text */

  // const loader = new PDFLoader(file, {
  //   splitPages: false,
  // });

  // const uploadedFile = getPDF(containerName, filename);

  // if (!uploadedFile) {
  //   return res.status(400).json({ error: "No file uploaded." });
  // }

  res.status(500).json({ file: "uploadedFile" });
  // const embedding = await openai.embeddings.create({
  //   model: "text-embedding-ada-002",
  //   input: "The quick brown fox jumped over the lazy dog",
  //   encoding_format: "float",
  // });

  // console.log(embedding);
}
