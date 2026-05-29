import { Server } from "socket.io";
let io;

export function initSocket(server) {
    io = new Server(server,{
        cors:{
            origin: "*"
        }
    });

    io.on("connection", (socket)=>{
        console.log("User connected : ",socket.id);
        socket.on("disconnect",() => {
            console.log("User disconnected : ",socket.id);
        })
    })
}


export function getIo(){
    if(!io){
        throw new Error("Socket.io not initialized");
    }
    return io;

}