import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../components/misc/usePrisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<boolean>
) {
  const authToken = req.headers.authorization;
  if (authToken) {
    const dbToken = await prisma.authToken.findFirst({
      where: {
        id: authToken,
      },
    });
    res.status(dbToken ? 200 : 401).json(dbToken !== null);
  } else {
    res.status(401).json(false);
  }
}
