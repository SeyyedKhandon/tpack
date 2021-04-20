import * as fs from "fs";
import * as path from "path";
const fetch = require("node-fetch");

const fileToDownload =
  "https://github.com/tonsky/FiraCode/releases/download/5.2/Fira_Code_v5.2.zip";

const createDir = (addr: string) => {
  try {
    if (!fs.existsSync(addr)) {
      fs.mkdirSync(addr);
    }
  } catch (err) {
    return false;
  }
  return true;
};
export const download = async (
  destinationDir: string,
  downloadStarted: CallableFunction,
  downloadFinished: CallableFunction
) => {
  const firaCodeDir = path.join(destinationDir, "firaCodeFont");
  const firaCodePath = path.join(firaCodeDir, "firaCode.zip");
  if (!createDir(firaCodeDir)) {
    throw new Error("Cannot crate the directory:" + firaCodeDir);
  }
  if (fs.existsSync(firaCodePath)) {
    return downloadFinished(firaCodePath);
  }
  downloadStarted();
  const res = await fetch(fileToDownload);
  const fileStream = fs.createWriteStream(firaCodePath);
  await new Promise((resolve, reject) => {
    res.body.pipe(fileStream);
    res.body.on("error", reject);
    fileStream.on("finish", resolve);
  });
  downloadFinished(firaCodePath);
};
