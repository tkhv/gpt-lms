import { OpenAI } from "langchain/llms/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { VectorDBQAChain } from "langchain/chains";
import { Quiz } from "@/lib/types";

const { NextApiRequest, NextApiResponse } = require("next/server");

export default async function POST(
  req: typeof NextApiRequest,
  res: typeof NextApiResponse
) {
  const { containerName, filename } = req.query;
  let quiz = false;
  // get usrMsg from request body json
  let usrMsg = JSON.parse(req.body).usrMsg;

  // Cost check
  const cost = 0.0001 * (usrMsg.length / 4 / 1000);
  console.log(cost);
  if (cost > 0.00001) {
    res.status(400).json({ error: "Might be too expensive" });
    return;
  }

  if (usrMsg.startsWith("/create")) {
    // remove "/create" from usrMsg
    quiz = true;
    usrMsg = usrMsg.slice(8);
    usrMsg +=
      ". Make sure to format your answers in a list of strings like so: ['Question 1', 'Question 2']";
    console.log(usrMsg);
  }
  console.log("usrMsg: ", usrMsg);

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

  if (quiz) {
    // Parse the string into an array of questions
    const questionsArray = JSON.parse(response.text.replace(/'/g, '"'));

    // Create a QuizQuestion object for each question
    const quizQuestions: QuizQuestion[] = questionsArray.map(
      (question: string, index: number) => {
        return {
          questionNum: index,
          questionType: "FRQ",
          question: question,
          options: [],
          answer: "",
          points: 1,
        };
      }
    );

    // Create a Quiz object
    const quiz: Quiz = {
      name: "GPTa Quiz",
      questions: quizQuestions,
      totalPoints: quizQuestions.reduce(
        (total, question) => total + question.points,
        0
      ),
      submissions: {},
    };

    // Save the quiz to the container by posting to saveQuiz.ts
    try {
      const res = fetch(
        process.env.NEXTAUTH_URL + `/api/${containerName}/saveQuiz`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(quiz),
        }
      );
      console.log(await res);
    } catch (err) {
      console.error(err);
    }
  }

  res.status(500).json({ reply: response.text });
}

type QuizSubmission = {
  answers: string[];
  score: number | undefined;
};

type QuizQuestion = {
  questionNum: number;
  questionType: "MCQ" | "FRQ";
  question: string;
  options: string[];
  answer: number | string;
  points: number;
};
