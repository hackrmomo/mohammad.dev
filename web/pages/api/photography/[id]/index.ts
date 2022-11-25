import { client } from "@/lib/prismadb";
import { NextApiRequest as Request, NextApiResponse as Response } from "next"
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "@[...nextauth]";

export default async function handler(req: Request, res: Response) {
  const { id } = req.query as { id: string };
  const session = await unstable_getServerSession(req, res, authOptions);

  switch (req.method) {
    case "GET":
      const photograph = await client.photograph.findUnique({
        where: {
          id: id
        }
      });
      res.status(200).json({ photograph });

    case "DELETE":
      if (!session) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      await client.photograph.delete({
        where: {
          id: id
        }
      });
      res.status(200).json({ message: "deleted" });
  }
}