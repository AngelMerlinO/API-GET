import { CreateUsersUseCase } from "../application/CreateUsersUseCase";
import { GetAllUsersUseCase } from "../application/GetAllUsersUseCase";
import { CreateUsersController } from "./controllers/CreateUsersController";
import { GetAllUsersController } from "./controllers/GetAllUsersController";
import { MysqlUsersRepository } from "./MysqlUsersRepository";

export const mysqlUsersRepository = new MysqlUsersRepository();
export const createUsersUseCase = new CreateUsersUseCase(mysqlUsersRepository);
export const getAllUseCase = new GetAllUsersUseCase(mysqlUsersRepository);

export const createUsersController = new CreateUsersController(
  createUsersUseCase
);
export const getAllUsersController = new GetAllUsersController(getAllUseCase);
