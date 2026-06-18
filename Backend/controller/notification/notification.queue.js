import { Queue } from "bullmq";
import dotenv from "dotenv";

dotenv.config();


const notificationQueue = new Queue('notification',{
    connection:{
        host:process.env.REDIS_HOST,
        port:process.env.REDIS_PORT,
    }

})

export default notificationQueue;