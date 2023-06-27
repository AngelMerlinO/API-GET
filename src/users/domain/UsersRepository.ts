import { Users } from "./users";

export interface UsersRepository {
  getAll(): Promise<Users[] | null>;
  createUsers(
    name: string,
    password: string,
    mail: string
  ): Promise<Users | null>;
}
