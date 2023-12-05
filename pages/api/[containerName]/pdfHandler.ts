import OpenAI from "openai";
// import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import PDFParser from "pdf-parse";
import { Buffer } from "buffer";
const { NextApiRequest, NextApiResponse } = require("next/server");

export default async function POST(
  req: typeof NextApiRequest,
  res: typeof NextApiResponse
) {
  const { containerName } = req.query;
  // const openai = new OpenAI({
  //   organization: "YOUR_ORG_ID",
  // });

  /* PDFLoder 
    make file to text */

  // const loader = new PDFLoader(file, {
  //   splitPages: false,
  // });

  // const docs = await loader.load();

  // console.log(docs);
  const data = Buffer.from(new Uint8Array(req.body));
  const text = await PDFParser(data);

  console.log("ddd");

  res.status(200).json({ text: text });

  // const embedding = await openai.embeddings.create({
  //   model: "text-embedding-ada-002",
  //   input: "The quick brown fox jumped over the lazy dog",
  //   encoding_format: "float",
  // });

  // console.log(embedding);
}
