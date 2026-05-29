import http from "http";
import app from "./app.js"; 
import { initSocket } from "./server.js";
import dotenv from "dotenv";
import {connectDB} from "./db/index.js";

dotenv.config();


const server = http.createServer(app);

initSocket(server);

const port = process.env.PORT || 3000;

async function startServer(){
    try{
        await connectDB();
        server.listen(port,()=>{
            console.log(`Server is running on port ${port}`);
        })
    }
    catch(error){
        console.log("Server failed to start",error);
    }

}
startServer();