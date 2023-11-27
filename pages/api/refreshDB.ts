import { NextApiRequest, NextApiResponse } from "next";
import { refreshDBQuery } from "@/dbUtils/pgQueries";
import pool from "@/dbUtils/dbPool";

async function refreshDB() {
  try {
    return await pool.query(refreshDBQuery);
  } catch (err) {
    console.log(err);
  }
}

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const DBresponse = await refreshDB();
  res.status(200).json(DBresponse);
}
