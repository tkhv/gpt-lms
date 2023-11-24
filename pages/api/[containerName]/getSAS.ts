const { NextApiRequest, NextApiResponse } = require("next/server");

const {
  BlobServiceClient,
  BlobSASPermissions,
  SASProtocol,
  generateBlobSASQueryParameters,
} = require("@azure/storage-blob");
const { DefaultAzureCredential } = require("@azure/identity");

/* This GET endpoint is called by the client to get a SAS token for a specified blobName (filename).
  The SAS token has a 10 minute expiry and has permissions to add, create, delete, read, and write 
  that specific blob. The client can then use the SAS token to authenticate with Azure Storage. */

export default async function GET(
  req: typeof NextApiRequest,
  res: typeof NextApiResponse
) {
  const { containerName, filename } = req.query;

  const storageURL = process.env.AZURE_STORAGE_URL;
  const accountName = process.env.AZURE_ACCOUNT_NAME;

  // Time limits
  const TEN_MINUTES = 10 * 60 * 1000;
  const NOW = new Date();
  const TEN_MINUTES_BEFORE_NOW = new Date(NOW.valueOf() - TEN_MINUTES);
  const TEN_MINUTES_AFTER_NOW = new Date(NOW.valueOf() + TEN_MINUTES);

  const blobServiceClient = new BlobServiceClient(
    storageURL,
    new DefaultAzureCredential()
  );

  const userDelegationKey = await blobServiceClient.getUserDelegationKey(
    TEN_MINUTES_BEFORE_NOW,
    TEN_MINUTES_AFTER_NOW
  );

  const sasOptions = {
    filename,
    containerName,
    permissions: BlobSASPermissions.parse("acdrw"), // add/create/delete/read/write
    protocol: SASProtocol.HttpsAndHttp,
    startsOn: TEN_MINUTES_BEFORE_NOW,
    expiresOn: TEN_MINUTES_AFTER_NOW,
  };

  const sasToken = generateBlobSASQueryParameters(
    sasOptions,
    userDelegationKey,
    accountName
  ).toString();

  const sasUrl = `${storageURL}/${containerName}/${filename}?${sasToken}`;

  res.status(200).json({ sasURL: sasUrl });
}
