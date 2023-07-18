import { Request, Response } from "express";
import { CreateNotiAlertUseCase } from "../../application/CreateNotiAlertUseCase";


export class CreateNotiAlertController {
  constructor(readonly createNotiAlertUseCase: CreateNotiAlertUseCase) {}

  async run(req: Request, res: Response) {
    const data = req.body;
    try {
      const alert = await this.createNotiAlertUseCase.run(
        data.affectedUserId,
        data.description,
        data.severity,
      );

      if (alert)
        //Code HTTP : 201 -> Creado
        res.status(201).send({
          status: "success",
          data: {
            affectedUserId: alert?.affectedUserId,
            description: alert?.description,
            severity: alert?.severity
          },
        });
      else
        res.status(204).send({
          status: "error",
          data: "NO fue posible mandar la notificación",
        });
    } catch (error) {
      //Code HTTP : 204 Sin contenido
      res.status(204).send({
        status: "error",
        data: "Ocurrio un error",
        msn: error,
      });
    }
  }
}