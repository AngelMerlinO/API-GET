import { CreateAlertUseCase } from "../application/CreateAlertUseCase";
import { UpdateAlertUseCase } from "../application/UpdateAlertUseCase";
import { CreateAlertController } from "./controllers/CreateAlertController";
import { UpdateAlertController } from "./controllers/UpdateAlertController";
import { RabbitAlertRepository } from "./RabbitAlertRepository";


export const rabbitAlertRepository = new RabbitAlertRepository();
export const createAlertUseCase = new CreateAlertUseCase(rabbitAlertRepository);
export const updateAlertUseCase = new UpdateAlertUseCase(rabbitAlertRepository);

export const createAlertController = new CreateAlertController(createAlertUseCase);
export const updateAlertController = new UpdateAlertController(updateAlertUseCase);