import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, user } from "@prisma/client";
import { compare } from "bcrypt";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    (Partial<user> & { authToken: string }) | { error: string }
  >
) {
  const email = req.body["email"];
  const password = req.body["password"];

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (user) {
    const answer = await compare(password, user?.hashedPass);
    const token = answer ? await prisma.authToken.create({ data: {} }) : null;
    res
      .status(answer ? 200 : 401)
      .json(
        answer
          ? token
            ? { ...user, hashedPass: undefined, authToken: token.id }
            : { error: "The token could not be generated" }
          : { error: "The login information was incorrect" }
      );
  } else {
    res.status(401).json({ error: "The login information was incorrect" });
  }
}
