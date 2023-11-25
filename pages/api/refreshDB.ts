import { NextApiRequest, NextApiResponse } from "next";
const { Pool } = require("pg");

import { refreshDBQuery } from "@/queries/pgQueries";

const pool = new Pool({
  max: 300,
  connectionTimeoutMillis: 5000,
  host: process.env.AZURE_COSMOSDB_PG_URL,
  port: 5432,
  user: process.env.AZURE_COSMOSDB_PG_USER,
  password: process.env.AZURE_COSMOSDB_PG_PASSWORD,
  database: process.env.AZURE_COSMOSDB_PG_DBNAME,
  ssl: true,
});

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
