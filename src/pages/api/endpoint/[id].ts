// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type DataElement = {
  id: number;
  title: string;
  date: string;
};

interface Data {
  data: DataElement[];
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;

  res.status(200).json({
    data: [
      {
        id: 1,
        title: `swr teste id: ${id}`,
        date: new Date().toISOString(),
      },
    ],
  });
}
