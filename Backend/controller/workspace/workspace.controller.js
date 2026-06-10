import asyncHandler from "../../utils/asyncHandler.utils.js"
import Workspace from "../../models/workspace.model.js"
import WorkspaceUser from "../../models/workspaceUser.model.js";
import User from "../../models/user.model.js";
import ApiError from "../../utils/ApiError.utils.js";
import ApiResponse from "../../utils/ApiResponse.utils.js";
import { isValidObjectId } from "mongoose";


const createWorkspace = asyncHandler(
    async (req,res) => {  
        // get the name of the workspace and userid from request
        // validate the workspace name and userid
        // create a new workspace document object
        // create a new workspaceUser document object
        // return response
        
        const workspacename = req.body.name?.trim();

        if(!workspacename) {
            throw new ApiError(400,"Workspace name is required");
        }

        const userid = req.user._id;

        if(!userid || !isValidObjectId(userid)){
            throw new ApiError(400,"Invalid user id");
        }

        const session = await mongoose.startSession();
        
        try{

            session.startTransaction();

            const workspace = await Workspace.create([{
                name:workspacename,
                created_by:userid
            }],{session});

            await WorkspaceUser.create([{
                workspaceid:workspace[0]._id,
                userid,
                role:"owner"
            }],{session});

            await session.commitTransaction();

            return res
            .status(201)
            .json(
                new ApiResponse(201,workspace[0],"Workspace created successfully!")
            );

        }catch(error){
            await session.abortTransaction();
            throw error;
        }finally{
            session.endSession();
        }  

    }
);

const joinWorkspace = asyncHandler(
    async (req,res) => {

        // join an workspace
        // get the userid 
        // validate userid
        // get the workspace id
        // validate the workspace id
        // create a new workspace user
        // return res

        const userid = req.user._id;

        if(!userid || !isValidObjectId(userid)){
            throw new ApiError(400,"Invalid user id");

        }
        const workspaceid = req.params.workspaceid;

        if(!workspaceid || !isValidObjectId(workspaceid)){
            throw new ApiError(400,"Invalid workspace id");
        }
        const workspaceuser = await WorkspaceUser.create({
            workspaceid,
            userid,
            role:"user"
        });

        return res
        .status(201)
        .json(
            new ApiResponse(201,workspaceuser,"Workspace joined successfully!")
        );

    }

)





export {
    createWorkspace,
    joinWorkspace
};

