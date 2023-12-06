import { NextApiRequest, NextApiResponse } from "next";
import pool from "@/dbUtils/dbPool"; // Import your database connection pool

type StudentEmailRow = {
  email: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { courseName } = req.query;

  if (req.method === "GET") {
    try {
      const studentEmailsQuery = `
        SELECT u.email
        FROM users u
        INNER JOIN course_enrollments ce ON u.email = ce.studentEmail
        WHERE ce.courseName = $1;
      `;

      const result = await pool.query(studentEmailsQuery, [courseName]);
      const studentEmails = result.rows.map(
        (row: StudentEmailRow) => row.email
      );

      res.status(200).json({ courseName, studentEmails });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
