import {client} from "@/lib/prismadb";
import { NextApiRequest as Request, NextApiResponse as Response } from "next"
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "@[...nextauth]";

export default async function handler(req: Request, res: Response) {
  const session = await unstable_getServerSession(req, res, authOptions);
  switch (req.method) {
    case "GET":
      const portfolios = await client.portfolio.findMany();
      res.status(200).json({portfolios});
      break;

    case "POST":
      if (!session) {
        res.status(401).json({message: "Unauthorized"});
        return;
      }
      const portfolio = await client.portfolio.create({
        data: {
          title: req.body.title,
          description: req.body.description,
          link: req.body.link,
        }
      });
      res.status(200).json({portfolio});
      break;
  }
}