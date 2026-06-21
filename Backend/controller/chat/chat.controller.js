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
        const userid = req.user._id;
        if(!userid || !isValidObjectId(userid)){
            throw new ApiError(404,"Invalid User!");
        }

        await producer.send({
            topic: "chat-message",
            messages:[
                {
                    value: JSON.stringify(
                        {
                            message:message,
                            sender:userid,
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


export {
    createChat,
    joinWorkspaceRoom
};

