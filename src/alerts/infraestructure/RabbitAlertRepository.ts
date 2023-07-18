import { Alert } from "../domain/Alert";
import { AlertRepository } from "../domain/AlertRepository";
import amqp from 'amqplib';
//import io from 'socket.io-client';

//const socket = io('http://localhost:4000'); //corregir a la IP donde esté desplegado el socket

const rabbitSettings = {
  protocol: 'amqp',
  hostname: '34.199.194.98',//'34.232.106.165'darinel,
  port: 5672,
  mail: 'angel',
  password: 'angel',
};


export class RabbitAlertRepository implements AlertRepository {
  async createAlert(
    affectedUserId: number,
    type: string,
    description: string,
    severity: string,
  ): Promise<Alert | null> {
    try {
        const alert = new Alert(affectedUserId,type,description,severity);
        //socket.emit('alert', alert);
        (async () => {
        const queue = "Alerts";
        const message = JSON.stringify(alert);// Mensaje a insertar en la cola
      
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

  async createNotiAlert(
    affectedUserId: number,
    description: string,
    severity: string,
  ): Promise<any> {
    try {
        const noti = {
            affectedUserId,
            description,
            severity
        };
        //socket.emit('alert', alert);
        (async () => {
        const queue = "Notifications";
        const message = JSON.stringify(noti);// Mensaje a insertar en la cola
      
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
      return noti;
    } catch (error) {
      return null;
    }
  }
}