import { client } from "@/lib/prismadb";
import { NextApiRequest as Request, NextApiResponse as Response } from "next"
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "@[...nextauth]";
import { makeUrlFromFileName, StaticFileType, writeStaticFile } from "@/lib/staticNext";

export default async function handler(req: Request, res: Response) {
  const session = await unstable_getServerSession(req, res, authOptions);
  switch (req.method) {
    case "GET":
      const resumes = await client.resume.findMany();
      res.status(200).json({ resumes });
      break;

    case "POST":
      console.log(req.body);
      if (!session) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      try {
        let domain = req.body.domain.split(".")[0].toUpperCase();
        if (domain === "") {
          domain = "BASE";
        }
        const resumeUrl = makeUrlFromFileName("resume", "Mohammad Al-Ahdal " +  domain + ".pdf");
        console.log(resumeUrl);
        await writeStaticFile(resumeUrl, req.body.resume, StaticFileType.PDF);
        const resume = await client.resume.upsert({
          create: {
            domain: req.body.domain,
            src: resumeUrl
          },
          update: {
            src: resumeUrl,
          }, where: {
            domain: req.body.domain
          }
        });
        res.status(200).json({ resume });
      } catch (e) {
        res.status(200).json({ err: e });
      }
      break;
  }
}