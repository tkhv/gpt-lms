// This endpoint exists only to test dynamic api routes.
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { containerName } = req.query;
  res.status(200).json({ courseName: containerName });
}
