import { Request, Response } from "express";

import { GetAllUsersUseCase } from "../../application/GetAllUsersUseCase";

export class GetAllUsersController {
  constructor(readonly getAllUsersUseCase: GetAllUsersUseCase) {}

  async run(req: Request, res: Response) {
    try {
      const users = await this.getAllUsersUseCase.run();
      console.log(users);
      if (users)
        //Code HTTP : 200 -> Consulta exitosa
        res.status(200).send({
          status: "success",
          data: users.map((users: any) => {
            return {
              id: users.id,
              name: users.name,
              password: users.password,
              mail: users.mail,
            };
          }),
        });
      else
        res.status(400).send({
          status: "error",
          msn: "Ocurrio algún problema",
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
