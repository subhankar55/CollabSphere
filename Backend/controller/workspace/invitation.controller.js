import Invitation from "../../models/workspaceInvitation.model.js";
import WorkspaceUser from "../../models/workspaceUser.model.js";
import Workspace from "../../models/workspace.model.js";
import User from "../../models/user.model.js";
import ApiError from "../../utils/ApiError.utils.js";
import ApiResponse from "../../utils/ApiResponse.utils.js";
import asyncHandler from "../../utils/asyncHandler.utils.js";
import { isValidObjectId } from "mongoose";




const inviteUser = asyncHandler(

    async (req,res) => {
        // send Invitation 
        // get the username of the reciever
        // get the workspace id of the sender
        // also get the user id of the sender
        // validate them
        // create a new document object of invitation
        // send res

        const username = req.body.username?.trim();
        const workspaceid = req.params.workspaceid;
        const senderid = req.user._id;

        if(!username) {
            throw new ApiError(400,"Username is required");

        }
        if(!workspaceid || !isValidObjectId(workspaceid)){
            throw new ApiError(400,"Invalid workspace id");
        }
        
        if(!senderid || !isValidObjectId(senderid)){
            throw new ApiError(400,"Invalid sender id");
        }


            const receiver = await User.findOne({username});

            if(!receiver){
                throw new ApiError(404,"User not found");
            }
            if(senderid.toString() === receiver._id.toString()){
                throw new ApiError(400,"You cannot invite yourself");

            }
            const existingInvitation = await Invitation.findOne({
                workspaceid,
                receiverid:receiver._id
            });

            if(existingInvitation){
                throw new ApiError(400,"Invitation already sent");
            }

            const workspacemember = await WorkspaceUser.findOne({
                workspaceid,
                userid:receiver._id
            });

            if(workspacemember){
                throw new ApiError(400,"User is already a member of the workspace");
            }

            const inviter = await WorkspaceUser.findOne({
                workspaceid,
                userid:senderid
            });

            if(!inviter || inviter.role === "user"){
                throw new ApiError(400,"You are not elgible to send an invitation");
            }

            const invitation = await Invitation.create({
                workspaceid,
                senderid,
                receiverid:receiver._id
            });


            return res
            .status(201)
            .json(
                new ApiResponse(201,invitation,"Invitation sent successfully!")
            );

    }

)


const getInvitations = asyncHandler(
    async (req,res) => {
        // get invitations by user id
        // get the user id
        // validate the userid
        // search db for all the invitations
        // return response

        const userid = req.user._id;
        if(!userid || !isValidObjectId(userid)){
            throw new ApiError(400,"Invalid user id");
        }

        const invitations = await Invitation.find({receiverid:userid,status:"pending"});

        console.log(invitations);
        if(invitations.length === 0) {
            throw new ApiError(404,"No invitations found");
        
        }
        
        return res
        .status(200)
        .json(
            new ApiResponse(200,invitations,"Invitations fetched successfully!")
        );

    }
)



export {
    inviteUser,
    getInvitations

};