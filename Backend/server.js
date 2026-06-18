import { Server } from "socket.io";
import socketAuth from "./middlewares/socketAuth.middleware.js";


let io;

export function initSocket(server) {
    io = new Server(server,{
        cors:{
            origin:"http://localhost:5173",
            credentials:true
        }
    });

    io.use(socketAuth);


    io.on("connection", (socket)=>{
        const userid = socket.user?._id?.toString();

        socket.join(userid);
        console.log("User connected : ",socket.user?.username);

        socket.on("disconnect",() => {
            console.log("User disconnected : ",socket.user?.username);
        })
    })
}


export function getIo(){
    if(!io){
        throw new Error("Socket.io not initialized");
    }
    return io;
    
}