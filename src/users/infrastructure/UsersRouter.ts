import express from "express";

import { getAllUsersController } from "./dependencies";
import { createUsersController } from "./dependencies";


export const usersRouter = express.Router();

usersRouter.get("/", getAllUsersController.run.bind(getAllUsersController));
usersRouter.post("/", createUsersController.run.bind(createUsersController));
