import { client } from "@/lib/prismadb";
import { NextApiRequest as Request, NextApiResponse as Response } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@[...nextauth]";
import { makeUrlFromFileName, writeStaticFile, StaticFileType } from "@/lib/s3";
import { randomUUID } from "crypto";

export default async function handler(req: Request, res: Response) {
  const session = await getServerSession(req, res, authOptions);
  switch (req.method) {
    case "GET":
      const blogs = await client.blog.findMany();
      res.status(200).json({ blogs });
      break;

    case "POST":
      if (!session) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      // get all img tags and extract the src
      const imgTags = req.body.content.match(/<img.*?src="(.*?)".*?>/g);
      const imgSrcs: string[] =
        imgTags?.map((imgTag: string) => imgTag.match(/src="(.*?)"/)?.[1]) ||
        [];
      for (const imgSrc of imgSrcs) {
        if (imgSrc.startsWith("data:")) {
          const uuid = randomUUID();
          const data = imgSrc.split(",")[1];
          const dataBuffer = Buffer.from(data, "base64");
          const newSrc = makeUrlFromFileName("blog", uuid + ".png");
          await writeStaticFile(newSrc, dataBuffer, StaticFileType.IMAGE);
          req.body.content = req.body.content.replace(imgSrc, newSrc);
        }
      }
      const blog = await client.blog.create({
        data: {
          title: req.body.title,
          markdown: req.body.content,
        },
      });
      res.status(200).json({ blog });
      break;
  }
}
