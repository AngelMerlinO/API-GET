import { AlertRepository } from "../domain/AlertRepository";

export class UpdateAlertUseCase {
  constructor(readonly alertRepository: AlertRepository) {}

  async run(
    id : number
  ): Promise<any> {
    try {
      const estado = await this.alertRepository.updateAlert(
        id
      );
      return estado;
    } catch (error) {
      return null;
    }
  }
}