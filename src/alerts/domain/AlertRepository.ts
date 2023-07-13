import { Alert } from "./Alert";

export interface AlertRepository {
  createAlert(
    affectedUserId: number,
    type: string,
    description: string,
    severity: string,
  ): Promise<Alert | null>;

  updateAlert(
    id: number
  ): Promise <any>;
}