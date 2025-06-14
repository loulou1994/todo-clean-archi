import express from "express";

import { makeExpressCallback } from "../express-callback";
import { UserControllers } from "../../../controllers";

const router = express.Router();

export const setUserRoutes = (userControllers: UserControllers) => {
  router
    .route("/")
    .post(makeExpressCallback(userControllers.addUserController))
    .get(makeExpressCallback(userControllers.getUserController))
  
  router.route("/:id")
  
  return router
};