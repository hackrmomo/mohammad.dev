import { client } from "@/lib/prismadb";
import { NextApiRequest as Request, NextApiResponse as Response } from "next"
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "@[...nextauth]";

export default async function handler(req: Request, res: Response) {
  const { id } = req.query as { id: string };
  const session = await unstable_getServerSession(req, res, authOptions);

  switch (req.method) {
    case "GET":
      const resume = await client.resume.findUnique({
        where: {
          id: id
        }
      });
      res.status(200).json({ resume });
      break;

    case "PUT":
      if (!session) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      const updatedResume = await client.resume.update({
        where: {
          id: id
        },
        data: {
          domain: req.body.domain,
          src: req.body.src,
        }
      });
      res.status(200).json({ resume: updatedResume });
      break;

    case "DELETE":
      if (!session) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      await client.resume.delete({
        where: {
          id: id
        }
      });
      res.status(200).json({ message: "deleted" });
      break;
  }
}