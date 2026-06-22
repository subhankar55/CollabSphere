import kafka from "./chat.kafka.js";

export const createTopics = async () => {
    const admin = kafka.admin();

    await admin.connect();

    await admin.createTopics({
        topics: [
            {
                topic: "chat-message",
                numPartitions: 1,
                replicationFactor: 1
            },
            {
                topic: "chat-read",
                numPartitions: 1,
                replicationFactor: 1
            }
        ]
    });

    await admin.disconnect();

    console.log("Topics created");
};