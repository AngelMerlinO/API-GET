import { Users } from "../domain/users";
import { UsersRepository } from "../domain/UsersRepository";

export class GetAllUsersUseCase {
  constructor(readonly usersRepository: UsersRepository) {}

  async run(): Promise<Users[] | null> {
    try {
      const result = await this.usersRepository.getAll();
      console.log(result);
      return result;
    } catch (error) {
      return null;
    }
  }
}
