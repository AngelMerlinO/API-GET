import { Alert } from "../domain/Alert";
import { AlertRepository } from "../domain/AlertRepository";

export class CreateNotiAlertUseCase {
  constructor(readonly alertRepository: AlertRepository) {}

  async run(
    affectedUserId: number,
    description: string,
    severity: string
  ): Promise<Alert | null> {
    try {
      const alert = await this.alertRepository.createNotiAlert(
        affectedUserId,
        description,
        severity,
      );
      return alert;
    } catch (error) {
      return null;
    }
  }
}