import { OpenAI } from "langchain/llms/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { VectorDBQAChain } from "langchain/chains";
const { NextApiRequest, NextApiResponse } = require("next/server");

export default async function POST(
  req: typeof NextApiRequest,
  res: typeof NextApiResponse
) {
  const { containerName, filename } = req.query;
  // get usrMsg from request body json
  const usrMsg = JSON.parse(req.body).usrMsg;

  console.log("usrMsg: ", usrMsg);

  // Cost check
  const cost = 0.0001 * (usrMsg.length / 4 / 1000);
  console.log(cost);
  if (cost > 0.002) {
    res.status(400).json({ error: "Might be too expensive" });
    return;
  }

  const model = new OpenAI();
  const pinecone = new Pinecone();
  const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX || "");
  const vectorStore = await PineconeStore.fromExistingIndex(
    new OpenAIEmbeddings(),
    { pineconeIndex }
  );
  const chain = VectorDBQAChain.fromLLM(model, vectorStore, {
    k: 1,
  });
  const response = await chain.call({ query: usrMsg });
  console.log(response.text);

  res.status(500).json({ reply: response.text });
}
