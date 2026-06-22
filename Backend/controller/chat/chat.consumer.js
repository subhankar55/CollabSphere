import Chat from "../../models/chat.model.js";
import kafka from "./chat.kafka.js";
import { getIo } from "../../server.js";



export const kafkaConsumer = async () =>    {
    const consumer = kafka.consumer(
    {
        groupId: "chat-workers"
    }
);

await consumer.connect();

await consumer.subscribe({
    topics:["chat-message","chat-read"]
});

await consumer.run({
    eachMessage: async ({topic,message}) => {
        const io = getIo();
        try {
            const data = JSON.parse(
                message.value.toString()
            );
            if(topic == 'chat-message'){

                const chat = await Chat.create({
                    message:data.message,
                    sender:data.sender,
                    workspaceid:data.workspaceid                    
                });


                io.to(data.workspaceid.toString()).emit("newChat",chat);

            }
            else if(topic == 'chat-read'){

                await Chat.updateMany({
                    workspaceid:data.workspaceid,
                    sender:{$ne: data.username},
                    readby:{$nin: [data.username]}
                },
                {
                    $addToSet:{
                        readby: data.username
                    }
                }
                )

                io.to(data.workspaceid.toString()).emit("chatRead");

            }
        } catch (error) {
            console.log(error.message);
        }
        
    }
});
};

