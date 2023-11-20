const { NextRequest, NextResponse } = require("next/server");

const { DefaultAzureCredential } = require("@azure/identity");
const { ContainerClient } = require("@azure/storage-blob");

type File = {
  type: "quiz" | "assignment" | "lesson";
  name: string;
  url: string;
};
type FilesList = File[];

/* This GET endpoint is called by the client to list all files in a specified container.
    A FilesList is returned. */

export async function GET(
  request: typeof NextRequest,
  { params }: { params: { containerName: string } }
) {
  const containerClient = await new ContainerClient(
    process.env.AZURE_STORAGE_URL + `/${params.containerName}`,
    new DefaultAzureCredential()
  );

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

  return NextResponse.json(files);
}
