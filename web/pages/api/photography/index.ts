import {client} from "@/lib/prismadb";
import { NextApiRequest as Request, NextApiResponse as Response } from "next"
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "@[...nextauth]";

export default async function handler(req: Request, res: Response) {
  const session = await unstable_getServerSession(req, res, authOptions);
  switch (req.method) {
    case "GET":
      const photographs = await client.photograph.findMany();
      res.status(200).json({photographs});
      break;

    case "POST":
      if (!session) {
        res.status(401).json({message: "Unauthorized"});
        return;
      }
      const photograph = await client.photograph.create({
        data: {
          src: req.body.src,
        }
      });
      res.status(200).json({photograph});
      break;
  }
}