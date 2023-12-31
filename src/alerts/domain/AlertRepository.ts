export interface AlertRepository {
  createAlert(
    affectedUserId: number,
    type: string,
    description: string,
    severity: string,
  ): Promise<any>;

  updateAlert(
    id: number
  ): Promise <any>;
}