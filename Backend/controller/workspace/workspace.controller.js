import asyncHandler from "../../utils/asyncHandler.utils.js"
import Workspace from "../../models/workspace.model.js"
import WorkspaceUser from "../../models/workspaceUser.model.js";
import User from "../../models/user.model.js";
import ApiError from "../../utils/ApiError.utils.js";
import ApiResponse from "../../utils/ApiResponse.utils.js";
import { isValidObjectId } from "mongoose";


const createWorkspace = asyncHandler(
    async (req,res) => {
        // create workspace
        // get workspace name and user id(only logged in user can create an workspace)
        // validate if user logged in and workspace name valid
        // create a new workspace document
        // create a new workspace user with the workspace id and user id
        // return response

        const {name} = req.body;
        const userid = req.user._id;

        if(!name.trim() && (!userid || !isValidObjectId(userid))){
            throw new ApiError(404,"Invalid request");
        }

        const workspace = await Workspace.create({
            name,
            created_by:userid
        });
        let workspaceuser = await WorkspaceUser.find({
            workspaceid:workspace._id,
            userid
        });
        if(!workspaceuser){
            await WorkspaceUser.create({
            workspaceid:workspace._id,
            userid,
            role:"owner"
        });
        }
        else {
            workspaceuser.role = "owner";
            await workspaceuser.save();
        }
        
        return res
        .status(201)
        .json(
            new ApiResponse(201,workspace,"Workspace created successfully")
        );


    }
)
