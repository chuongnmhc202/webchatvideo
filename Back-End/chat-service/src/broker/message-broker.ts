import { Consumer, Kafka, logLevel, Partitioners, Producer } from "kafkajs";
import { MessageBrokerType, MessageHandler, PublishType } from "./broker.type";
import { MessageType, OrderEvent, TOPIC_TYPE } from "../types";

// configuration properties
const CLIENT_ID = "socket-service";
const GROUP_ID = "socket-service-group";
const BROKERS = ["localhost:29092"];

const kafka = new Kafka({
    clientId: CLIENT_ID,
    brokers: BROKERS,
    logLevel: logLevel.INFO,
  });
  
  let producer: Producer;
  let consumer: Consumer;

  const createTopic = async (topic: string[]) => {
    const topics = topic.map((t) => ({
      topic: t,
      numPartitions: 6,
      replicationFactor: 1, // based on available brokers
    }));
  
    const admin = kafka.admin();
    await admin.connect();
    const topicExists = await admin.listTopics();
    console.log("topicExists", topicExists);
    for (const t of topics) {
      if (!topicExists.includes(t.topic)) {
        await admin.createTopics({
          topics: [t],
        });
      }
    }
    await admin.disconnect();
  };

  const connectProducer = async <T>(): Promise<T> => {
    await createTopic(["Message", "Notification", "Typing", "Read"]);
  
    if (producer) {
      console.log("producer already connected with existing connection");
      return producer as unknown as T;
    }
  
    producer = kafka.producer({
      createPartitioner: Partitioners.DefaultPartitioner,
    });
  
    await producer.connect();
    console.log("producer connected with a new connection");
    return producer as unknown as T;
  };
  
  const disconnectProducer = async (): Promise<void> => {
    if (producer) {
      await producer.disconnect();
    }
  };


  const publish = async (data: PublishType): Promise<boolean> => {
    const producer = await connectProducer<Producer>();
    const result = await producer.send({
      topic: data.topic,
      messages: [
        {
          headers: data.headers,
          key: data.event,
          value: JSON.stringify(data.message),
        },
      ],
    });
    console.log("publishing result", result);
    return result.length > 0;
  };

  // Consumer functionality
const connectConsumer = async <T>(): Promise<T> => {
    if (consumer) {
      return consumer as unknown as T;
    }
  
    consumer = kafka.consumer({
      groupId: GROUP_ID,
    });
  
    await consumer.connect();
    return consumer as unknown as T;
  };
  
  const disconnectConsumer = async (): Promise<void> => {
    if (consumer) {
      await consumer.disconnect();
    }
  };


const subscribe = async (
  messageHandler: MessageHandler,
  topic: TOPIC_TYPE
): Promise<void> => {
  const consumer = await connectConsumer<Consumer>();
  await consumer.subscribe({ topic, fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      if (topic !== "Message") return;

      if (message.key && message.value) {
        const inputMessage: MessageType = {
          headers: message.headers,
          event: message.key.toString() as OrderEvent,
          data: JSON.parse(message.value.toString()),
        };

        try {
          await messageHandler(inputMessage);
        // ✅ Nếu lưu DB thành công → commit offset
        await consumer.commitOffsets([
          { topic, partition, offset: (Number(message.offset) + 1).toString() },
        ]);
        } catch (error: any) {
          console.error(`❌ Error processing message (offset ${message.offset}):`, error?.message);

          // Nếu lỗi là do HTTP 400 (client sai) → không cần retry
          if (error?.response?.status === 400) {
            console.warn("Skipping message due to client error (400).");
            // vẫn commit offset → Kafka không retry lại
          } else {
            // Với lỗi khác → có thể retry bằng cách throw
            throw error;
          }
        }

        // ✅ Commit offset ngay cả khi 400
        await consumer.commitOffsets([
          { topic, partition, offset: (Number(message.offset) + 1).toString() },
        ]);
      }
    },
  });
};

  
  export const MessageBroker: MessageBrokerType = {
    connectProducer,
    disconnectProducer,
    publish,
    connectConsumer,
    disconnectConsumer,
    subscribe,
  };