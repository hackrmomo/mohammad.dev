import fs from "fs";

export const writeStaticFile = async (path: string, content: string, type: StaticFileType) => {
  // files come in the format of https://mohammad.dev/static/*
  const filePath = "./public" + path.replace("https://mohammad.dev", "");
  await fs
    .promises
    .writeFile(filePath, content, { encoding: type === StaticFileType.PDF ? "base64" : "base64" });
};

export const makeUrlFromFileName = (route: string, fileName: string) => {
  return `https://mohammad.dev/static/${route}/${fileName}`;
};

export const removeStaticFile = async (path: string) => {
  const filePath = "./public" + path.replace("https://mohammad.dev", "");
  await fs
    .promises
    .rm(filePath);
};

export enum StaticFileType {
  IMAGE = "image",
  PDF = "pdf"
}