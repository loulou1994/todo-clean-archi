import express from "express";

import { makeExpressCallback } from "../express-callback";
import { TaskControllers } from "../../../controllers";

const router = express.Router();

export const setTaskRoutes = (taskControllers: TaskControllers) => {
  router
    .route("/")
    .get(makeExpressCallback(taskControllers.readTasksController))
    .post(makeExpressCallback(taskControllers.createTaskController));

  return router;
};
