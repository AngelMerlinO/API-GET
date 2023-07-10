import { Request, Response } from "express";
import { UpdateAlertUseCase } from "../../application/UpdateAlertUseCase";


export class UpdateAlertController {
  constructor(readonly updateAlertUseCase: UpdateAlertUseCase,) {}

  async run(req: Request, res: Response) {
    const data = req.body;
    try {
      const estado = await this.updateAlertUseCase.run(
        data.id,
        data.status
      );

      if (estado)
        //Code HTTP : 201 -> Creado
        res.status(201).send({
          status: "success",
          data: {
            id: estado?.id,
            status: estado?.status
          },
        });
      else
        res.status(204).send({
          status: "error",
          data: "NO fue posible actualizar el registro",
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