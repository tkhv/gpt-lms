import OpenAI from "openai";
// import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import PDFParser from "pdf-parse";
import { Buffer } from "buffer";

// const openai = new OpenAI({
//   organization: "YOUR_ORG_ID",
// });

export async function getEmbeddings(file: File) {
  /* PDFLoder 
    make file to text */

  // const loader = new PDFLoader(file, {
  //   splitPages: false,
  // });

  // const docs = await loader.load();

  // console.log(docs);
  const buffer = await file.arrayBuffer();
  const data = Buffer.from(new Uint8Array(buffer)); // Convert Uint8Array to Buffer
  const text = await PDFParser(data);

  console.log("ddd");

  return text;

  // const embedding = await openai.embeddings.create({
  //   model: "text-embedding-ada-002",
  //   input: "The quick brown fox jumped over the lazy dog",
  //   encoding_format: "float",
  // });

  // console.log(embedding);
}
