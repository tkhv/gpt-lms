// This endpoint exists only to test dynamic api routes.
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { containerName } = req.query;
  const NEXTAUTH_URL = process.env.NEXTAUTH_URL;
  const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;
  res
    .status(200)
    .json({ courseName: containerName, NEXTAUTH_URL, NEXTAUTH_SECRET });
}
