import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import PostgresAdapter from "@auth/pg-adapter";
import pool from "@/dbUtils/dbPool";

// This function returns a list of courseNames that the user is an admin for.
export async function getAdminFor(email: string) {
  const query = `SELECT courseName FROM courses WHERE creatorEmail = $1 UNION SELECT courseName FROM course_tas WHERE taEmail = $1;`;
  let result = await pool.query(query, [email]);
  for (let i = 0; i < result.rows.length; i++) {
    result.rows[i] = result.rows[i].coursename;
  }
  return result.rows;
}

// This function returns a list of courseNames that the user is in.
export async function getCourseList(email: string) {
  const query = `SELECT courseName FROM course_enrollments WHERE studentEmail = $1 UNION SELECT courseName FROM course_tas WHERE taEmail = $1 UNION SELECT courseName FROM courses WHERE creatorEmail = $1;`;
  let result = await pool.query(query, [email]);
  for (let i = 0; i < result.rows.length; i++) {
    result.rows[i] = result.rows[i].coursename;
  }
  return result.rows;
}

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
        session.user.isAdminFor = await getAdminFor(user.email);
        session.user.courseList = await getCourseList(user.email);
      }
      return session;
    },
  },
};

const authHandler = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);

export default authHandler;
