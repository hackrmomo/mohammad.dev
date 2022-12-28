import { client } from "@/lib/prismadb";
import { makeUrlFromFileName, StaticFileType, writeStaticFile } from "@/lib/staticNext";
import { NextApiRequest as Request, NextApiResponse as Response } from "next"
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "@[...nextauth]";
import { ExifParserFactory } from "ts-exif-parser";
import { Photograph } from "@prisma/client";
import { fromUnixTime } from "date-fns"
import { fraction } from "mathjs";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "50mb",
    },
  },
}

export default async function handler(req: Request, res: Response) {
  const session = await unstable_getServerSession(req, res, authOptions);
  switch (req.method) {
    case "GET":
      const photographs = await client.photograph.findMany({
        orderBy: {
          createdAt: "asc"
        }
      });
      res.status(200).json({ photographs });
      break;

    case "POST":
      if (!session) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      try {
        const fileStream = Buffer.from(req.body.fileContent, "base64");
        const parser = ExifParserFactory.create(fileStream);
        const exif = parser.parse();
        const photoId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const photographUrl = makeUrlFromFileName("photography", photoId + ".jpg");
        await writeStaticFile(photographUrl, req.body.fileContent, StaticFileType.IMAGE);

        const shutterFraction = fraction(exif.tags?.ShutterSpeedValue + "");
        const shutterFractionString = shutterFraction.n + "/" + shutterFraction.d;

        const photograph = await client.photograph.create({
          data: {
            id: photoId,
            src: photographUrl,
            aperture: "f/" + (exif.tags?.FNumber?.toString() ?? "unknown"),
            iso: "ISO " + (exif.tags?.ISO?.toString() ?? "unknown"),
            focal: (exif.tags?.FocalLength?.toString() ?? "unknown") + " mm",
            shutter: shutterFractionString + " sec",
            location: exif.tags?.GPSInfo ?? "Unknown Location",
            takenAt: fromUnixTime(exif.tags?.DateTimeOriginal ?? 0)
          }
        });
        res.status(200).json({ photograph });
      } catch (e) {
        console.error(e);
        res.status(500).json({ err: e });
      }
      break;
  }
}