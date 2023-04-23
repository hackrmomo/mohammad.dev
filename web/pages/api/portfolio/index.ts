import { client } from "@/lib/prismadb";
import { NextApiRequest as Request, NextApiResponse as Response } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@[...nextauth]";
import {
  writeStaticFile,
  makeUrlFromFileName,
  StaticFileType,
} from "@/lib/s3";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "50mb",
    },
  },
};

export default async function handler(req: Request, res: Response) {
  const session = await getServerSession(req, res, authOptions);
  switch (req.method) {
    case "GET":
      const portfolios = await client.portfolio.findMany({
        orderBy: {
          createdAt: "asc",
        },
      });
      res.status(200).json({ portfolios });
      break;

    case "POST":
      if (!session) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      const portfolioId = Math.random().toString(36).slice(-8);
      let portfolioImageSrc: string | undefined = undefined;
      try {
        portfolioImageSrc = makeUrlFromFileName(
          "portfolio",
          portfolioId + ".jpg"
        );
        const dataBuffer = Buffer.from(req.body.imageContent, "base64");
        await writeStaticFile(
          portfolioImageSrc,
          dataBuffer,
          StaticFileType.IMAGE
        );
      } catch (e) {
        portfolioImageSrc = undefined;
        console.error(e);
      }
      const portfolio = await client.portfolio.create({
        data: {
          id: portfolioId,
          title: req.body.title,
          description: req.body.description,
          link: req.body.link,
          imageSrc: portfolioImageSrc,
        },
      });
      res.status(200).json({ portfolio });
      break;
  }
}
