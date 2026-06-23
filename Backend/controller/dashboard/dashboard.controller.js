import asyncHandler from "../../utils/asyncHandler.utils.js";
import ApiError from "../../utils/ApiError.utils.js";
import ApiResponse from "../../utils/ApiResponse.utils.js";
import User from "../../models/user.model.js";
import WorkspaceUser from "../../models/workspaceUser.model.js";
import Task from "../../models/tasks.model.js";
import Project from "../../models/projects.model.js";
import mongoose, { isValidObjectId } from "mongoose";


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
        // get the userid
        // validate the data
        // get the all workspace id connected to this project
        // get the all projects count connected to each workspaceid
        // return the number

        const userid = req.user._id;
        if(!userid || !isValidObjectId(userid)){
            throw new ApiError(401,"Invalid user!");
        }
        const result = await WorkspaceUser.aggregate([
            {
                $match: {
                    userid: new mongoose.Types.ObjectId(userid)
                }
            },
            {
                $lookup:{
                    from:"projects",
                    localField:"workspaceid",
                    foreignField:"workspaceid",
                    as:"projects"
                }
            },
            {
                $project:{
                    projectCount:{
                        $size:"$projects"
                    }
                }
            },
            {
                $group:{
                    _id:null,
                    totalprojects:{
                        $sum:"$projectCount"
                    }
                }
            }
        ]);

        return res
        .status(200)
        .json(
            new ApiResponse(200,result[0].totalprojects,"Number of active projects fetched successfully!")
        );
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
        // get the user id
        // validate the info
        // search the tasks assigned to this userid and which are not completed
        // return res
        const userid = req.user._id;
        if(!userid || !isValidObjectId(userid)){
            throw new ApiError(401,"Invalid user!");
        }

        const tasks = await Task.find({
            assigned_to:userid,
            status:{
                $in:["pending","updated","review"]
            }
        });

        return res
        .status(200)
        .json(
            new ApiResponse(200,tasks.length,"Number of active tasks fetched successfully!")
        );
    }
);

const completedTasks = asyncHandler(
    async (req,res) => {
        // get the number of completed tasks
        // get the user id
        // validate the info
        // search the tasks assigned to this userid and which are completed
        // return res
        const userid = req.user._id;
        if(!userid || !isValidObjectId(userid)){
            throw new ApiError(401,"Invalid user!");
        }

        const tasks = await Task.find({
            assigned_to:userid,
            status:"completed"
        });
        const ans = tasks?.length || 0;
        return res
        .status(200)
        .json(
            new ApiResponse(200,ans,"Number of completed tasks fetched successfully!")
        );
    }
)



export {
    numberOfWorkspaces,
    activeProjects,
    createdWorkspaces,
    activeTasks,
    completedTasks
};