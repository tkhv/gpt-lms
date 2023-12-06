import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "langchain/vectorstores/pinecone";
const { DefaultAzureCredential } = require("@azure/identity");
const { NextApiRequest, NextApiResponse } = require("next/server");
const { BlobServiceClient } = require("@azure/storage-blob");

async function getPDF(containerName: string, filename: string): Promise<Blob> {
  const blobServiceClient = new BlobServiceClient(
    process.env.AZURE_STORAGE_URL,
    new DefaultAzureCredential()
  );

  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(
    "lessons/" + filename
  );

  const downloadResponse = await blockBlobClient.download(0);

  // Convert the downloaded data into a Blob object
  return await new Response(downloadResponse.readableStreamBody).blob();
}

export default async function POST(
  req: typeof NextApiRequest,
  res: typeof NextApiResponse
) {
  const { containerName, filename } = req.query;

  // Loading and parsing the PDF as docs
  const blob: Blob = await getPDF(containerName, filename);
  const loader = new PDFLoader(blob, {
    splitPages: false,
    parsedItemSeparator: "",
  });
  const docs = await loader.load();

  // Cost check
  const numChars = docs
    .concat(docs)
    .reduce((acc, doc) => acc + doc.pageContent.length, 0);
  const cost = 0.0001 * (numChars / 4 / 1000);
  console.log(cost);
  if (cost > 0.002) {
    res.status(400).json({ error: "Might be too expensive" });
    return;
  }

  // This is commented out to prevent accidentally passing in too many tokens.
  // Get and store the embeddings in Pinecone
  // const pinecone = new Pinecone();
  // const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX || "");
  // await PineconeStore.fromDocuments(docs, new OpenAIEmbeddings(), {
  //   pineconeIndex,
  //   maxConcurrency: 5, // Maximum number of batch requests to allow at once. Each batch is 1000 vectors.
  // });

  res.status(500).json({ file: filename });
}
