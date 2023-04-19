import { client } from "@/lib/prismadb";
import { NextApiRequest as Request, NextApiResponse as Response } from "next"
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "@[...nextauth]";
import { removeStaticFile } from "@/lib/staticNext";
import { randomUUID } from "crypto";
import { makeUrlFromFileName } from "@/lib/staticNext";
import { writeStaticFile } from "@/lib/staticNext";
import { StaticFileType } from "@/lib/staticNext";

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
      const oldBlog = await client.blog.findUnique({
        where: {
          id: id
        }
      });


      const oldImgSrcs = (oldBlog?.markdown.match(/<img.*?src="(.*?)".*?>/g))?.map((imgSrc: string) => imgSrc.match(/src="(.*?)"/)?.[1]) || [];
      const omittedImgSrcs: string[] = (req.body.markdown.match(/<img.*?src="(.*?)".*?>/g)).map((imgSrc: string) => imgSrc.match(/src="(.*?)"/)?.[1]) || [];
      for (const imgSrc of oldImgSrcs) {
        if (imgSrc && imgSrc.startsWith(process.env.MOHAMMAD_URL!)) {
          if (!omittedImgSrcs.includes(imgSrc)) {
            try {
              await removeStaticFile(imgSrc);
            } catch (e) {
              console.log(e);
            }
          }
        }
      }

      const newImgSrcs: (string | undefined)[] = (req.body.markdown.match(/<img.*?src="(.*?)".*?>/g)).map((imgSrc: string) => imgSrc.match(/src="(.*?)"/)?.[1]) || [];
      for (const imgSrc of newImgSrcs) {
        try {
          if (imgSrc && imgSrc.startsWith("data:")) {
            const uuid = randomUUID();
            const data = imgSrc.split(",")[1];
            const newSrc = makeUrlFromFileName("blog", uuid + ".png");
            await writeStaticFile(newSrc, data, StaticFileType.IMAGE);
            req.body.markdown = req.body.markdown.replace(imgSrc, newSrc);
          }
        } catch (e) {
          console.log(e);
        }
      }

      const updatedBlog = await client.blog.update({
        where: {
          id: id
        },
        data: {
          title: req.body.title,
          markdown: req.body.markdown,
        }
      });
      res.status(200).json({ blog: updatedBlog });
      break;

    case "DELETE":
      if (!session) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      const deletedBlog = await client.blog.delete({
        where: {
          id: id
        }
      });

      const imgSrcs = (deletedBlog.markdown.match(/<img.*?src="(.*?)".*?>/g))?.map((imgSrc: string) => imgSrc.match(/src="(.*?)"/)?.[1]) || [];
      for (const imgSrc of imgSrcs) {
        if (imgSrc && imgSrc.startsWith(process.env.MOHAMMAD_URL!)) {
          try {
            await removeStaticFile(imgSrc);
          } catch (e) {
            console.log(e);
          }
        }
      }

      res.status(200).json({ message: "deleted" });
      break;
  }
}