import { injectable } from "inversify";
import amqp from "amqplib";
import { connectRabitMq } from "../rabitmq.config";
import { ApiError } from "../utils/ApiHelper";

@injectable()
export class RabitMqService {
  private channel: amqp.Channel | undefined;
  private connection: amqp.Connection | undefined;
  constructor() {
    this.init();
  }

  private async init() {
    const rabit = await connectRabitMq();
    this.channel = rabit?.channel;
    this.connection = rabit?.connection;
    this.consumeMessages("my-queue");
  }

  getChannel() {
    return this.channel;
  }

  async consumeMessages(queueName: string) {
    if (!this.channel) {
      return;
    }
    await this.channel.assertQueue(queueName);
    await this.channel.consume(queueName, (message) => {
      if (!message) {
        return;
      }
      if (!this.channel) {
        return;
      }
      try {
        const data = JSON.parse(message.content.toString());
        console.log("Received data:", data);
        this.channel.ack(message);
      } catch (error) {
        console.error('Caught error in RabitMqService : consumeMessages => ', error)
      }
    });
  }

  async closeConnection(): Promise<void> {
    if (this.channel) {
      await this.channel.close();
    }
    if (this.connection) {
      await this.connection.close();
    }
  }
}
