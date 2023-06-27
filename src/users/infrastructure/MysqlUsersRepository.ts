import { query } from "../../database/mysql";
import { Users } from "../domain/users";
import { UsersRepository } from "../domain/UsersRepository";

export class MysqlUsersRepository implements UsersRepository {
  async getAll(): Promise<Users[] | null> {
    const sql = "SELECT * FROM movies";
    try {
      const [data]: any = await query(sql, []);
      const dataUserss = Object.values(JSON.parse(JSON.stringify(data)));

      return dataUserss.map(
        (users: any) =>
          new Users(users.id, users.name, users.password, users.mail)
      );
    } catch (error) {
      return null;
    }
  }
  async createUsers(
    name: string,
    password: string,
    mail: string
  ): Promise<Users | null> {
    const sql = "INSERT INTO users (name, password, mail) VALUES (?, ?, ?)";
    const params: any[] = [name, password, mail];
    try {
      const [result]: any = await query(sql, params);
      //El objeto Result es un objeto que contiene info generada de la bd
      /*No es necesaria la validación de la cantidad de filas afectadas, ya que, al
            estar dentro de un bloque try/catch si hay error se captura en el catch */
      return new Users(result.insertId, name, password, mail);
    } catch (error) {
      return null;
    }
  }
}
