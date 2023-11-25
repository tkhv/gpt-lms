import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import PostgresAdapter from "@auth/pg-adapter";
import pool from "@/data/dbPool";

export const options = {
  adapter: PostgresAdapter(pool), // Use CosmosDB PG for session storage
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "NOT_SET",
      clientSecret: process.env.GITHUB_SECRET || "NOT_SET",
    }),
  ],
  callbacks: {
    session: async ({ session, user }: { session: any; user: any }) => {
      if (session?.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);
