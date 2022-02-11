// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { portfolio, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<portfolio[]>
) {
  const portfolios = await prisma.portfolio.findMany();
  console.log(portfolios)
  await res.status(200).json(portfolios);
}
