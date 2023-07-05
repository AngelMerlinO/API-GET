import { Request, Response } from "express";
import { CreateAlertUseCase } from "../../application/CreateAlertUseCase";


export class CreateAlertController {
  constructor(readonly createAlertUseCase: CreateAlertUseCase) {}

  async run(req: Request, res: Response) {
    const data = req.body;
    try {
      const alert = await this.createAlertUseCase.run(
        data.affectedUserId,
        data.type,
        data.description,
        data.severity,
      );

      if (alert)
        //Code HTTP : 201 -> Creado
        res.status(201).send({
          status: "success",
          data: {
            affectedUserId: alert?.affectedUserId,
            type: alert?.type,
            description: alert?.description,
            severity: alert?.severity
          },
        });
      else
        res.status(204).send({
          status: "error",
          data: "NO fue posible agregar el registro",
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