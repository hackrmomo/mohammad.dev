import { client } from "@/lib/prismadb";
import { removeStaticFile } from "@/lib/staticNext";
import { NextApiRequest as Request, NextApiResponse as Response } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "@[...nextauth]";

export default async function handler(req: Request, res: Response) {
  const { id } = req.query as { id: string };
  const session = await unstable_getServerSession(req, res, authOptions);

  switch (req.method) {
    case "GET":
      const photograph = await client.photograph.findUnique({
        where: {
          id: id,
        },
      });
      res.status(200).json({ photograph });
      break;

    case "PUT":
      if (!session) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      const photographToUpdate = await client.photograph.findUnique({
        where: {
          id: id,
        },
      });
      if (!photographToUpdate) {
        res.status(404).json({ message: "Photograph not found" });
        return;
      }
      const { aperture, focal, shutter, iso, location } = req.body;
      await client.photograph.update({
        where: {
          id: id,
        },
        data: {
          aperture: aperture,
          focal: focal,
          shutter: shutter,
          iso: iso,
          location: location,
        },
      });
      res.status(200).json({ message: "updated" });
      break;

    case "DELETE":
      if (!session) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      const photographToDelete = await client.photograph.findUnique({
        where: {
          id: id,
        },
      });
      if (!photographToDelete) {
        res.status(404).json({ message: "Photograph not found" });
        return;
      }
      await removeStaticFile(photographToDelete.src);
      await client.photograph.delete({
        where: {
          id: id,
        },
      });
      res.status(200).json({ message: "deleted" });
      break;
  }
}
