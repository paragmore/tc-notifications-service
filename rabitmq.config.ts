import amqp from "amqplib";
export const connectRabitMq = async () => {
  console.info("CONNECTING: Rabit Mq");
  const url = process.env.RABIT_MQ_URI;
  if (!url) {
    console.log("RABIT_MQ_URI not present");
    return;
  }
  const connection = await amqp.connect(url);
  const channel = await connection.createChannel();
  console.info("CONNECTED: Rabit Mq");
  return { channel, connection };
};
