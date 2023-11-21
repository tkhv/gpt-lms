const { Pool } = require("pg");

import { NextRequest, NextResponse } from "next/server";

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

async function createUser(un: string, pass: string) {
  const createTableQuery = `CREATE TABLE IF NOT EXISTS Users (username text UNIQUE,password text);`;
  const insertUserQuery = `INSERT INTO Users (username,password) VALUES ($1, $2);`;

  try {
    await pool.query(createTableQuery);
    await pool.query(insertUserQuery, [un, pass]);
  } catch (err) {
    console.log(err);
  }
}

export async function POST(request: NextRequest) {
  let req = await request.json();
  createUser(req.username, req.password);

  return NextResponse.json("Created the Users table and inserted rows.");
}
