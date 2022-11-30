import { client } from "@/lib/prismadb";
import { NextApiRequest as Request, NextApiResponse as Response } from "next"
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "@[...nextauth]";

export default async function handler(req: Request, res: Response) {
  const { id } = req.query as { id: string };
  const session = await unstable_getServerSession(req, res, authOptions);

  switch (req.method) {
    case "GET":
      const portfolio = await client.portfolio.findUnique({
        where: {
          id: id
        }
      });
      res.status(200).json({ portfolio });
      break;

    case "PUT":
      if (!session) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      const updatedPortfolio = await client.portfolio.update({
        where: {
          id: id
        },
        data: {
          description: req.body.description,
          link: req.body.link,
          title: req.body.title,
        }
      });
      res.status(200).json({ portfolio: updatedPortfolio });
      break;

    case "DELETE":
      if (!session) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      await client.portfolio.delete({
        where: {
          id: id
        }
      });
      res.status(200).json({ message: "deleted" });
      break;
  }
}