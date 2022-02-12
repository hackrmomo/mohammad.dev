import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<boolean>
) {
  const authToken = req.headers.authorization;
  const dbToken = await prisma.authToken.findFirst({
    where: {
      id: authToken,
    },
  });
  res.status(dbToken ? 200 : 401).json(dbToken !== null);
}
