import path from "node:path";
import express from "express";
import cors from "cors";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";

import "express-async-errors"
import 'dotenv/config'

import { corsOptions } from "./configs/cors";
import { type Controllers } from "../../controllers";
import { overwriteResponseSend } from "./middlewares/overwrite-res-send";
import { SuccessLogMiddleware, ErrorLogMiddleware } from "./middlewares/loggers";
import { errorHandler } from "./middlewares/global-error-handler";
import { setUserRoutes } from "./routes/user-routes";
import { setTaskRoutes } from "./routes/task-routes";


const rootDir = process.env.NODE_ENV == "development" ? "src" : "dist"

// const fullPath = path.join(rootDir, "/..")
const openapiDocument = YAML.load(process.env.OPENAPI_DOCUMENT!)

// YAML.load(
//   path.join(__dirname, "../../../", "openapi.yaml")
// );

export class ExpressApp {
  private static instance: ExpressApp;
  private app = express();

  private constructor() {}

  public static get getInstance(): ExpressApp {
    if (!ExpressApp.instance) {
      ExpressApp.instance = new ExpressApp();
    }

    return ExpressApp.instance;
  }

  public runServer(port: number, controllers: Controllers) {
    this.app.use(overwriteResponseSend)
    this.app.use(SuccessLogMiddleware);
    this.app.use(ErrorLogMiddleware);
    
    this.app.use(cors(corsOptions));
    this.app.use(express.json());

    this.app.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(openapiDocument)
    );

    this.app.use("/api/v1/users", setUserRoutes(controllers));
    this.app.use("/api/v1/tasks", setTaskRoutes(controllers));

    this.app.use("*", (req, res) => {
      res.status(404);

      if (req.accepts("html")) {
        res.sendFile(path.join(__dirname, "..", "..", "public", "404.html"));
      } else if (req.accepts("json")) {
        res.json({ message: "404 not found" });
      } else {
        res.type("txt").send("404 not found");
      }
    });

    this.app.use(errorHandler)

    this.app.listen(port, () => {
      console.log("server is running on port " + port);
    });
  }
}