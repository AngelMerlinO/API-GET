import express from "express";

import { updateAlertController } from "./dependencies";
import { createAlertController } from "./dependencies";

export const alertsRouter = express.Router();

alertsRouter.update("/alert", updateAlertController.run.bind(updateAlertController));
alertsRouter.post("/alert", createAlertController.run.bind(createAlertController));