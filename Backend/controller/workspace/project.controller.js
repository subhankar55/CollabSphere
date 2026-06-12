import Project from "../../models/projects.model.js";
import Workspace from "../../models/workspace.model.js";
import WorkspaceUser from "../../models/workspaceUser.model.js";
import User from "../../models/user.model.js";
import ApiError from "../../utils/ApiError.utils.js";
import ApiResponse from "../../utils/ApiResponse.utils.js";
import asyncHandler from "../../utils/asyncHandler.utils.js";
import { isValidObjectId } from "mongoose";
import mongoose from "mongoose";
import Task from "../../models/tasks.model.js";








const createProject = asyncHandler(
    async (req,res) => {
        // create a project in the workspace
        // get the workspce id and userid
        // validate them
        // validate if the user is owner or admin
        // ceate a new document object following the project model
        // return res

        const {workspaceid} = req.params;
        const userid = req.user._id;
        const projectname = req.body.name?.trim();

        if(!projectname) {
            throw new ApiError(400,"Project name is required");
        }

        if(!workspaceid || !isValidObjectId(workspaceid)){
            throw new ApiError(400,"Invalid workspace id");
        }
        if(!userid || !isValidObjectId(userid)){
            throw new ApiError(400,"You are not authorized  to create a new prject");
        }
        const session = await mongoose.startSession();


        try {
            session.startTransaction();

            const member = await WorkspaceUser.findOne({
                userid,
                workspaceid
            }).session(session);

            if(!member){
                throw new ApiError(404,"You are not a member of this workspace");
            }
            if(member.role === "user"){
                throw new ApiError(403,"You are not authorized to create a new project");
            }
            
            const project = await Project.create([{
                projectname,
                workspaceid,
                created_by:userid
            }],{session});

            await session.commitTransaction();
            return res
            .status(201)
            .json(
                new ApiResponse(201,project,"Project created successfully!")
            );

        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            await session.endSession();
        }
        
    }

)

const deleteProject = asyncHandler(
    async (req,res) => {
        // delete an existing project
        // get the project id
        // get the userid
        // validate them
        // check if the user is an admin or owner
        // delete the project
        // return res

        const {projectid,workspaceid} = req.params;
        const userid = req.user._id;
        if(!projectid || !isValidObjectId(projectid)){
            throw new ApiError(400,"Invalid project id");
        }
        if(!userid || !isValidObjectId(userid)){
            throw new ApiError(400,"You are not authorized to delete this project");

        }
        if(!workspaceid || !isValidObjectId(workspaceid)){
            throw new ApiError(400,"Invalid workspace id");
        }
        
        const session = await mongoose.startSession();

        try {
            session.startTransaction();

            const member = await WorkspaceUser.findOne({
                userid,
                workspaceid
            }).session(session);

            if(!member){
                throw new ApiError(404,"You are not a member of this workspace");
            }

            if(member.role === "user"){
                throw new ApiError(403,"You are not authorized to delete this project");

            }
            await Task.deleteMany({
                projectid
            }).session(session);

            await Project.deleteOne({
                _id:projectid
            }).session(session);

            await session.commitTransaction();
            return res
            .status(200)
            .json(
                new ApiResponse(200,null,"Project deleted successfully!")
            );

            
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            await session.endSession();
        }
    }
)


const getProjectById = asyncHandler(
    async (req,res) => {
        // get a project by its id
        // get the project id
        // validate it 
        // search db for that project
        // return res

        const {projectid} = req.params;

        if(!projectid || !isValidObjectId(projectid)){
            throw new ApiError(400,"Invalid project id");

        }
        const project = await Project.findById(projectid);

        if(!project){
            throw new ApiError(404,"Project not found");
        }
        return res
        .status(200)
        .json(
            new ApiResponse(200,project,"Project fetched successfully!")    
        );
    }
)

const getAllProjects = asyncHandler(
    async (req,res) => {
        // get all projects of a workspace
        // get workspace id and user id
        // validate them
        // search db for the projects having this workspace id and userid
        // return res

        const {workspaceid} = req.params;
        const userid = req.user._id;

        if(!workspaceid || !isValidObjectId(workspaceid)){
            throw new ApiError(400,"Invalid workspace id");
        }
        if(!userid || !isValidObjectId(userid)){
            throw new ApiError(400,"Invalid user id");

        }
        const projects = await Project.find({
            workspaceid
        })
        return res
        .status(200)
        .json(
            new ApiResponse(200,projects,"Projects fetched successfully!")  
        );

    }
);


export {
    createProject,
    deleteProject,
    getProjectById,
    getAllProjects

}