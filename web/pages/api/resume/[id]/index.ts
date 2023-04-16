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
          domain: id.split("@")[1],
        }
      });
      if (!resume) {
        res.status(200).redirect(`${process.env["MOHAMMAD_URL"] ?? ""}static/resume/Mohammad%20Al-Ahdal%20BASE.pdf`);
        return;
      }
      res.status(200).redirect(resume.src);
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