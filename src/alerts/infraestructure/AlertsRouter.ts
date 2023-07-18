import express from "express";

import { updateAlertController } from "./dependencies";
import { createAlertController } from "./dependencies";
import { createNotiAlertController } from "./dependencies";

export const alertsRouter = express.Router();

alertsRouter.put("/", updateAlertController.run.bind(updateAlertController));
alertsRouter.post("/", createAlertController.run.bind(createAlertController));
alertsRouter.post("/notifications", createNotiAlertController.run.bind(createNotiAlertController));