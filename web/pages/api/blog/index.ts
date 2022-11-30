import {client} from "@/lib/prismadb";
import { NextApiRequest as Request, NextApiResponse as Response } from "next"
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "@[...nextauth]";

export default async function handler(req: Request, res: Response) {
  const session = await unstable_getServerSession(req, res, authOptions);
  switch (req.method) {
    case "GET":
      const blogs = await client.blog.findMany();
      res.status(200).json({blogs});
      break;

    case "POST":
      if (!session) {
        res.status(401).json({message: "Unauthorized"});
        return;
      }
      const blog = await client.blog.create({
        data: {
          title: req.body.title,
          markdown: req.body.content,
          link: req.body.link,
        }
      });
      res.status(200).json({blog});
      break;
  }
}