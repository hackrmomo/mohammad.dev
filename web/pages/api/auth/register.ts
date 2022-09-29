// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma, user } from "../../../components/misc/usePrisma";
import { hash } from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    (Partial<user> & { authToken: string }) | { error: string }
  >
) {
  if ((await prisma.user.count()) < 1) {
    const email = req.body["email"];
    const password = req.body["password"];
    const firstName = req.body["firstName"];
    const lastName = req.body["lastName"];

    const user = await prisma.user.create({
      data: {
        email,
        hashedPass: await hash(password, 10),
        firstName,
        lastName,
      },
    });

    const token = await prisma.authToken.create({ data: {} });

    res
      .status(200)
      .json({ ...user, hashedPass: undefined, authToken: token.id });
  } else {
    res.status(401).json({ error: "The user has already been initialized" });
  }
}
