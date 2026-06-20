import kafka from "./chat.kafka.js";



const consumer = kafka.consumer(
    {
        groupId: "chat-workers"
    }
);

await consumer.connect();

await consumer.subscribe({
    topic:"chat-message"
});

await consumer.run({
    eachMessage: async ({message}) => {
        const data = JSON.parse(
            message.value.toString()
        );
        console.log(data);
    }
});

