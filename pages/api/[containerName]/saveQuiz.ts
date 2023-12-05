const { NextApiRequest, NextApiResponse } = require("next/server");

const { ContainerClient } = require("@azure/storage-blob");
const { DefaultAzureCredential } = require("@azure/identity");
import { Quiz } from "@/lib/types";

export default async function GET(
  req: typeof NextApiRequest,
  res: typeof NextApiResponse
) {
  const { containerName } = req.query;

  try {
    // Get the Quiz type from the request body
    const quiz: Quiz = req.body;
    console.log(containerName, quiz);

    const containerClient = await new ContainerClient(
      process.env.AZURE_STORAGE_URL + `/${containerName}`,
      new DefaultAzureCredential()
    );

    const blockBlobClient = containerClient.getBlockBlobClient(
      "quiz/" + quiz.name
    );
    console.log(blockBlobClient);
    const { requestId } = await blockBlobClient.upload(
      JSON.stringify(quiz),
      JSON.stringify(quiz).length
    );
    res.status(200).json({ requestId: "requestId" });
  } catch (error) {
    res.status(500).json({ error: "Error creating blob" });
  }
}
