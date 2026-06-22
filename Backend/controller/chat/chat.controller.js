import Chat from "../../models/chat.model.js";
import ApiError from "../../utils/ApiError.utils.js";
import ApiResponse from "../../utils/ApiResponse.utils.js";
import asyncHandler from "../../utils/asyncHandler.utils.js";
import producer from "./chat.producer.js";
import { isValidObjectId } from "mongoose";


const createChat = asyncHandler(
    async (req, res) => {
        // create a new chat
        // recieve the message from body
        // get workspace id from params
        // validate the data
        // add a job to the producer as per the kafka topic
        // consumer will handle the rest
        // return res

        const {workspaceid} = req.params;
        const {message} = req.body;

        if(!workspaceid || !isValidObjectId(workspaceid)){
            throw new ApiError(400,"Invalid workspace id!");
        }

        if(!message || !message.trim()){
            throw new ApiError(400,"Message is needed!");
        }
        const username = req.user.username;
        if(!username || !username.trim()){
            throw new ApiError(404,"Invalid User!");
        }

        await producer.send({
            topic: "chat-message",
            messages:[
                {
                    value: JSON.stringify(
                        {
                            message:message,
                            sender:username,
                            workspaceid:workspaceid
                        }
                    )
                }
            ]
        });

        return res
        .status(201)
        .json(
            new ApiResponse(201,null,"Chat created successfully!")
        );
    }
);

const getAllChats = asyncHandler(
    async (req,res) => {
        // get all chats of an workspace
        // get the workspaceid from params
        // search db for chats connected to that workspace id
        // return chats

        const {workspaceid} = req.params;
        if(!workspaceid || !isValidObjectId(workspaceid)){
            throw new ApiError(404,"Invalid workspace id");
        }

        const chats = await Chat.find({workspaceid});
        if(chats.length == 0){
            throw new ApiError(404,"No chats found");
        }
        return res
        .status(200)
        .json(
            new ApiResponse(200,chats,"Chats fetched successfully!")
        );
    }
)



const joinWorkspaceRoom = (socket) => {
    socket.on(
        'joinWorkspace', ({workspaceid}) => {

            if(!workspaceid){
                return socket.emit('workspaceJoinError',
                    {
                        message:"Workspace id is required!"
                    }
                );
            }

            socket.join(workspaceid.toString());

            socket.emit("workspaceJoined",{workspaceid});
        }
    )
};

const markAsRead = (socket) => {
    socket.on(
        "markRead", async ({workspaceid}) => {
            await producer.send({
                topic:'chat-read',
                messages:[
                    {
                        value: JSON.stringify(
                            {
                                workspaceid:workspaceid,
                                username:socket.user?.username
                            }
                        )
                    }
                ]
            })
            console.log("mark as read added to kafka");
        }
    );
}


const type = (socket) => {
    socket.on(
        "typing", ({workspaceid}) => {
            if(!workspaceid){
                return socket.emit('workspaceJoinError',
                    {
                        message:"Workspace id is required!"
                    }
                );
            }
            socket.to(workspaceid.toString()).emit("userTyping",{username:socket.user.username});
        }
    )
}


export {
    createChat,
    getAllChats,
    joinWorkspaceRoom,
    markAsRead,
    type
};

