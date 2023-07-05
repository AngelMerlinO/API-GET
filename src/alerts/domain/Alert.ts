export class Alert {
    constructor(
      readonly affectedUserId: number,
      readonly type: string,
      readonly description: string,
      readonly severity: string,
    ) {}
}
  