import express from "express";
import { Signale } from "signale";
const cors = require("cors");

import { usersRouter } from "./users/infrastructure/UsersRouter";
import { alertsRouter } from "./alerts/infraestructure/AlertsRouter";

const app = express();
const signale = new Signale();

app.use(express.json());
app.use(cors()); // Use cors middleware to enable CORS
app.use("/users", usersRouter);
app.use("/alerts", alertsRouter);

app.listen(3002, () => {
  signale.success("Server online in port 3002");
});
