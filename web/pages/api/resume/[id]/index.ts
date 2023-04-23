import { client } from "@/lib/prismadb";
import { NextApiRequest as Request, NextApiResponse as Response } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@[...nextauth]";

export default async function handler(req: Request, res: Response) {
  const { id } = req.query as { id: string };
  const session = await getServerSession(req, res, authOptions);

  switch (req.method) {
    case "GET":
      const resume = await client.resume.findUnique({
        where: {
          domain: id.split("@")[1],
        },
      });
      if (!resume) {
        res
          .status(200)
          .redirect(
            `${
              process.env["S3_URL"] ?? ""
            }/resume/resumeBASE.pdf`
          );
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
          id: id,
        },
      });
      res.status(200).json({ message: "deleted" });
      break;
  }
}
