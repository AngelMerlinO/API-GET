import express from "express";
import { Signale } from "signale";
import { usersRouter } from "./users/infrastructure/UsersRouter";
import { alertsRouter } from "./alerts/infraestructure/AlertsRouter";
const app = express();

const signale = new Signale();

app.use(express.json());
app.use("/users", usersRouter);
app.use("/alerts", alertsRouter)

app.listen(3000, () => {
  signale.success("Server online in port 3000");
});
