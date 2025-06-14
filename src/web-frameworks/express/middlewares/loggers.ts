import path from "node:path";
import { createWriteStream } from "node:fs";
import { type Response } from "express";
import morgan from "morgan";

import { createDirIfNotExists } from "../../../utils/create-dir";

const rootDir = process.env.NODE_ENV == "development" ? "src" : "dist";
const logsDir = path.resolve(rootDir, "logs");

createDirIfNotExists(logsDir);

const accessSuccessLogStream = createWriteStream(path.join(logsDir, "reqLog"), {
  flags: "a",
});
const accessErrorLogStream = createWriteStream(path.join(logsDir, "errorLog"), {
  flags: "a",
});

morgan.token("resBody", (_, res: Response) => {
  // Ensure res.body is converted to a string or return undefined if not present
  return res.body ? JSON.stringify(res.body) : undefined;
});

export const SuccessLogMiddleware = morgan(
  ":remote-addr [:date[clf]] :method :url :status :referrer :user-agent",
  {
    stream: accessSuccessLogStream,
    skip: (_, res) => res.statusCode >= 400,
  }
);

export const ErrorLogMiddleware = morgan(
  ":remote-addr [:date[clf]] :method :url :status :referrer :user-agent :resBody",
  {
    stream: accessErrorLogStream,
    skip: (_, res) => res.statusCode < 400,
  }
);
