import { query } from "../../database/mysql";
import { Users } from "../domain/users";
import { UsersRepository } from "../domain/UsersRepository";
import amqp from 'amqplib';


const rabbitSettings = {
  protocol: 'amqp',
  hostname: '34.199.194.98',//'34.232.106.165'darinel,
  port: 5672,
  username: 'angel',
  password: 'angel',
};


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
    // const sql = "INSERT INTO users (name, password, mail) VALUES (?, ?, ?)";
    // const params: any[] = [name, password, mail];
    try {
      (async () => {
        const queue = "Alertas";
        const message = name; // Mensaje a insertar en la cola
      
        try {
          const conn = await amqp.connect(rabbitSettings);
          console.log('Conexión exitosa');
      
          const channel = await conn.createChannel();
          console.log('Canal creado exitosamente');
      
          const res = await channel.assertQueue(queue);
          console.log('Cola creada exitosamente', res);
      
          // Insertar el mensaje en la cola
           await channel.sendToQueue(queue, Buffer.from(message));
      
          console.log(`Mensaje insertado en la cola: ${message}`);
      
        } catch (error) {
          console.log("🚀 ~ file: consumer.js:28 ~ connect ~ error:", error)
          throw error;
        }
      })();
      return new Users(123, name, password, mail);
      // const [result]: any = await query(sql, params);
      //El objeto Result es un objeto que contiene info generada de la bd
      /*No es necesaria la validación de la cantidad de filas afectadas, ya que, al
            estar dentro de un bloque try/catch si hay error se captura en el catch */
      // return new Users(result.insertId, name, password, mail);
    } catch (error) {
      return null;
    }
  }
}





