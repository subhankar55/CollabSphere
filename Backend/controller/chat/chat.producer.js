import kafka from "./chat.kafka.js";

const producer = kafka.producer();

await producer.connect();

export default producer;