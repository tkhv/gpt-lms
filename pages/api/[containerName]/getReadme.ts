const { NextApiRequest, NextApiResponse } = require("next/server");

const { ContainerClient } = require("@azure/storage-blob");
const { DefaultAzureCredential } = require("@azure/identity");

async function streamToText(readable: any) {
  readable.setEncoding("utf8");
  let data = "";
  for await (const chunk of readable) {
    data += chunk;
  }
  return data;
}

export default async function GET(
  req: typeof NextApiRequest,
  res: typeof NextApiResponse
) {
  const { containerName } = req.query;

  try {
    const containerClient = await new ContainerClient(
      process.env.AZURE_STORAGE_URL + `/${containerName}`,
      new DefaultAzureCredential()
    );

    const blockBlobClient =
      containerClient.getBlockBlobClient("readme/syllabus.md");

    // Download the blob content
    const downloadBlockBlobResponse = await blockBlobClient.download(0);
    const downloaded = await downloadBlockBlobResponse.readableStreamBody;
    const mkd = await streamToText(downloaded);

    // Return the blob content in the response
    res.status(200).json({ content: mkd });
  } catch (error) {
    res.status(500).json({ error: "Error fetching blob content" });
  }
}
