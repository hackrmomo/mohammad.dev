import { client } from "@/lib/prismadb";
import { NextApiRequest as Request, NextApiResponse as Response } from "next"
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "@[...nextauth]";

export default async function handler(req: Request, res: Response) {
  const { id } = req.query as { id: string };
  const session = await unstable_getServerSession(req, res, authOptions);

  switch (req.method) {
    case "GET":
      const blog = await client.blog.findUnique({
        where: {
          id: id
        }
      });
      res.status(200).json({ blog });
      break;

    case "PUT":
      if (!session) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      const updatedBlog = await client.blog.update({
        where: {
          id: id
        },
        data: {
          title: req.body.title,
          markdown: req.body.content,
          link: req.body.link,
        }
      });
      res.status(200).json({ blog: updatedBlog });
      break;

    case "DELETE":
      if (!session) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      await client.blog.delete({
        where: {
          id: id
        }
      });
      res.status(200).json({ message: "deleted" });
      break;
  }
}