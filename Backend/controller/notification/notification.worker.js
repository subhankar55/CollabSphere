import { Worker } from "bullmq";
import Notification from "../../models/notification.model.js";
import { getIo } from "../../server.js";
import dotenv from "dotenv";

dotenv.config();




new Worker(
    'notification',
    
    async (job) => {
        console.log("Processing the job");

        const notification = await Notification.create({
            message:job.data.message,
            reciepent:job.data.reciepent,
            sender:job.data.sender,
            markedasread:false
        });

        const io = getIo();

        io.to(job.data.reciepent.toString()).emit("notification",notification);

        console.log("Job processed");

    },
    {
        connection:{
            host:process.env.REDIS_HOST,
            port:process.env.REDIS_PORT
        }
    }


)