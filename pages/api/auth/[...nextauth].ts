import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import PostgresAdapter from "@auth/pg-adapter";
const { Pool } = require("pg");

// Store user accounts in CosmosDB Postgres as well
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

const options = {
  adapter: PostgresAdapter(pool),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "NOT_SET",
      clientSecret: process.env.GITHUB_SECRET || "NOT_SET",
    }),
  ],
  debug: false,
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);
