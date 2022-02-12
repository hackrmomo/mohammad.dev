import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../components/misc/usePrisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<boolean>
) {
  res.status(200).json((await prisma.user.count()) == 0);
}
