import { Alert } from "../domain/Alert";
import { AlertRepository } from "../domain/AlertRepository";

export class CreateAlertUseCase {
  constructor(readonly alertRepository: AlertRepository) {}

  async run(
    affectedUserId: number,
    type: string,
    description: string,
    severity: string
  ): Promise<Alert | null> {
    try {
      const alert = await this.alertRepository.createAlert(
        affectedUserId,
        type,
        description,
        severity,
      );
      return alert;
    } catch (error) {
      return null;
    }
  }
}
