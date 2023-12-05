import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
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

  // Getting the embeddings
  const embeddingsModel = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
    batchSize: 512,
  });
  // let embeddings = [];
  // for (const doc of docs) {
  //   embeddings.push(await embeddingsModel.embedQuery(doc.pageContent));
  // }

  // To test the embeddings model:
  // const embeddings = await embeddingsModel.embedQuery("Hello");
  // console.log(embeddings);

  res.status(500).json({ file: "uploadedFile" });
}

/*

cost check:

  // 4 characters is 1 token. 1000 tokens is 0.0001 USD.
  const cost = 0.0001 * ("Ourtext".length / 4 / 1000);
  if (cost > 0.002) {
    res.status(400).json({ error: "Might be too expensive" });
    return;
  }

*/
