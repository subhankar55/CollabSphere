import asyncHandler from "../../utils/asyncHandler.utils.js";
import ApiError from "../../utils/ApiError.utils.js";
import ApiResponse from "../../utils/ApiResponse.utils.js";
import User from "../../models/user.model.js";
import WorkspaceUser from "../../models/workspaceUser.model.js";
import Task from "../../models/tasks.model.js";
import Project from "../../models/projects.model.js";
import { isValidObjectId } from "mongoose";


const numberOfWorkspaces = asyncHandler(
    async (req,res) => {
        // get the number of workspaces an user is in
        // get the userid
        // validate the data
        // get the number of workspaces the user is connected
        // return res

        const userid = req.user._id;

        if(!userid || !isValidObjectId(userid)){
            throw new ApiError(401,"Invalid user id!");
        }
        const workspaces = await WorkspaceUser.find({userid});

        const workspacesNumber = workspaces?.length;

        return res
        .status(200)
        .json(
            new ApiResponse(200,workspacesNumber,"Workspace numbers fetched successfully!")
        );
    }
);


const activeProjects = asyncHandler(
    async (req,res) => {
        // get the number of active projects
    }
);


const createdWorkspaces = asyncHandler(
    async (req,res) => {
        // get the number of created workspaces
        // get the userid
        // validate the data
        // get the number of workspaces the user is connected
        // return res

        const userid = req.user._id;

        if(!userid || !isValidObjectId(userid)){
            throw new ApiError(401,"Invalid user id!");
        }
        const workspaces = await WorkspaceUser.find({
            userid,
            role:"owner"
            });

        const workspacesNumber = workspaces?.length;

        return res
        .status(200)
        .json(
            new ApiResponse(200,workspacesNumber,"Created workspace numbers fetched successfully!")
        );
    }
);

const activeTasks = asyncHandler(
    async (req,res) => {
        // get the number of active tasks
    }
);

const completedTasks = asyncHandler(
    async (req,res) => {
        // get the number of completed tasks
    }
)



export {
    numberOfWorkspaces,
    activeProjects,
    createdWorkspaces,
    activeTasks,
    completedTasks
};