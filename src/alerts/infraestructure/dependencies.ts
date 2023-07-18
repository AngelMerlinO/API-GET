import { CreateAlertUseCase } from "../application/CreateAlertUseCase";
import { UpdateAlertUseCase } from "../application/UpdateAlertUseCase";
import { CreateNotiAlertUseCase } from "../application/CreateNotiAlertUseCase";
import { CreateAlertController } from "./controllers/CreateAlertController";
import { UpdateAlertController } from "./controllers/UpdateAlertController";
import { CreateNotiAlertController } from "./controllers/CreateNotiAlertController";
import { RabbitAlertRepository } from "./RabbitAlertRepository";


export const rabbitAlertRepository = new RabbitAlertRepository();
export const createAlertUseCase = new CreateAlertUseCase(rabbitAlertRepository);
export const updateAlertUseCase = new UpdateAlertUseCase(rabbitAlertRepository);
export const createNotiAlertUseCase = new CreateNotiAlertUseCase(rabbitAlertRepository);

export const createAlertController = new CreateAlertController(createAlertUseCase);
export const updateAlertController = new UpdateAlertController(updateAlertUseCase);
export const createNotiAlertController = new CreateNotiAlertController(createNotiAlertUseCase);