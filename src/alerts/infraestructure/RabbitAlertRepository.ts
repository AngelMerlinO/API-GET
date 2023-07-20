import { Alert } from "../domain/Alert";
import { AlertRepository } from "../domain/AlertRepository";
import amqp from 'amqplib';
//import io from 'socket.io-client';

//const socket = io('http://localhost:4000'); //corregir a la IP donde esté desplegado el socket

const rabbitSettings = {
  protocol: 'amqp',
  hostname: '34.199.194.98',//'34.232.106.165'darinel,
  port: 5672,
  username: 'angel',
  password: 'angel',
};


export class RabbitAlertRepository implements AlertRepository {
  async createAlert(
    affectedUserId: number,
    type: string,
    description: string,
    severity: string,
  ): Promise<any> {
    try {
        const alert = new Alert(affectedUserId,type,description,severity);
        const notification = {
            affectedUserId,
            severity,
            description
        };
        //socket.emit('alert', alert);
        (async () => {
        const queue1 = "Alerts";
        const queue2 = "Notifications"
        const message1 = JSON.stringify(alert);// Mensaje a insertar en la cola
        const message2 = JSON.stringify(notification);// Mensaje a insertar en la cola
      
        try {
          const conn = await amqp.connect(rabbitSettings);
          console.log('Conexión exitosa');
      
          const channel1 = await conn.createChannel();
          console.log('Canal 1 creado exitosamente');
          const channel2 = await conn.createChannel();
          console.log('Canal 2 creado exitosamente');
      
          const res1 = await channel1.assertQueue(queue1);
          console.log(`Cola ${queue1} creada exitosamente`, res1);

          const res2 = await channel2.assertQueue(queue2);
          console.log(`Cola ${queue2} creada exitosamente`, res2);
      
          // Insertar el mensaje en la cola
           await channel1.sendToQueue(queue1, Buffer.from(message1));
           await channel2.sendToQueue(queue2, Buffer.from(message2));
      
          console.log(`Mensaje insertado en la cola: ${message1}`);
          console.log(`Mensaje insertado en la cola: ${message2}`);
      
        } catch (error) {
          console.log("🚀 ~ file: consumer.js:28 ~ connect ~ error:", error)
          throw error;
        }
      })();
      return alert;
    } catch (error) {
      return null;
    }
  }


  async updateAlert(
    id: number
  ): Promise<any> {
    try {
        const identificador = id;
        (async () => {
        const queue = "Updates";
        const message = JSON.stringify(identificador);// Mensaje a insertar en la cola

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
      return identificador;
    } catch (error) {
      return null;
    }
  }

}