import {client} from "@/lib/prismadb";
import { NextApiRequest as Request, NextApiResponse as Response } from "next"
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "@[...nextauth]";

export default async function handler(req: Request, res: Response) {
  const session = await unstable_getServerSession(req, res, authOptions);
  switch (req.method) {
    case "GET":
      const resumes = await client.resume.findMany();
      res.status(200).json({resumes});
      break;

    case "POST":
      if (!session) {
        res.status(401).json({message: "Unauthorized"});
        return;
      }
      const resume = await client.resume.create({
        data: {
          domain: req.body.domain,
          src: req.body.src,
        }
      });
      res.status(200).json({resume});
      break;
  }
}