import asyncHandler from "../../utils/asyncHandler.utils.js"
import Workspace from "../../models/workspace.model.js"
import WorkspaceUser from "../../models/workspaceUser.model.js";
import User from "../../models/user.model.js";
import ApiError from "../../utils/ApiError.utils.js";
import ApiResponse from "../../utils/ApiResponse.utils.js";
import { isValidObjectId } from "mongoose";
import mongoose from "mongoose";




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

const getWorkspaceById = asyncHandler(
    async (req,res) => {
        // get an workspace by its id
        // get the workspace id
        // validate it
        // search db by workspace id
        // return res
        const workspaceid = req.params.workspaceid;
        if(!workspaceid || !isValidObjectId(workspaceid)){
            throw new ApiError(400,"Invalid workspace id");
        }
        const workspace = await Workspace.findById(workspaceid);
        if(!workspace){
            throw new ApiError(404,"Workspace not found");
        }
        return res
        .status(200)
        .json(
            new ApiResponse(200,workspace,"Workspace fetched successfully!")
        );
    }
)

const getAllWorkspacesId = asyncHandler(

    async (req,res) => {
        // get all workspaces of an user
        // get the userid from cookie
        // validate userid
        // serach db for workspace ids connected to an user
        // return res
        const userid = req.user._id;

        if(!userid || !isValidObjectId(userid)){
            throw new ApiError(400,"Invalid user id");

        }
        const workspaces = await WorkspaceUser.find({userid});

        if(workspaces.length === 0){
            throw new ApiError(404,"No workspaces found");
        }
        return res
        .status(200)
        .json(
            new ApiResponse(200,workspaces,"Workspaces fetched successfully!")
        );  
    }
)

const getAllWorkspaceUsers = asyncHandler(
    async (req,res) => {
        // get all users connected to a workspace
        // get the workspace id from params
        // now search db by that workspace id for all members
        // write aggregation pipeline to get username from user document object
        // project te username , role etc
        // return res

        const workspaceid = req.params.workspaceid;
        if(!workspaceid || !isValidObjectId(workspaceid)){
            throw new ApiError(400,"Invalid workspace id");
        }
        const users = await WorkspaceUser.aggregate([
            {
                $match:{
                    workspaceid: new mongoose.Types.ObjectId(workspaceid)
                }
            },
            {
                $lookup:{
                    from:"users",
                    localField:"userid",
                    foreignField:"_id",
                    as:"user"
                }
            },
            {
                $unwind:"$user"
            },
            {
                $project:{
                    _id:0,
                    userid:"$user._id",
                    username:"$user.username",
                    role:"$role"
                }
            }
        ]
        );
        if(users.length === 0){
            throw new ApiError(404,"No users found");
        
        }

        return res
        .status(200)
        .json(
            new ApiResponse(200,users,"Users fetched successfully!")
        );
    }
);

const upgradeMember = asyncHandler(
    async (req,res) => {
        // upgrade a member to admin
        // get the userid of the from params
        // validate if it is correct
        // get the userid who want to do this by cookie
        // check if the user is an owner
        // then update the role to admin
        // return res

        const memberid = req.params.userid;
        const workspaceid = req.params.workspaceid;


        if(!memberid || !isValidObjectId(memberid)){
            throw new ApiError(400,"Invalid target member id");

        }
        if(!workspaceid || !isValidObjectId(workspaceid)){
            throw new ApiError(400,"Invalid workspace id");
        }

        const userid = req.user._id;

        if(!userid || !isValidObjectId(userid)){
            throw new ApiError(400,"Invalid user id");
        }
        const session = await mongoose.startSession();

        try {
            session.startTransaction();

            const targetmember = await WorkspaceUser.findOne({
                userid:memberid,
                workspaceid
            }).session(session);

            if(!targetmember){
                throw new ApiError(404,"Target member not found");
            }
            if(targetmember.role === "admin" || targetmember.role === "owner"){
                throw new ApiError(400,"Target member is not eligible to upgrade");
            }

            const manager = await WorkspaceUser.findOne({
                userid,
                workspaceid
            }).session(session);

            if(!manager){
                throw new ApiError(404,"Manager not found");

            }

            if(manager.role !== "owner"){
                throw new ApiError(403,"You are not authorized to perform this action");
            
            }
            const member = await WorkspaceUser.findOneAndUpdate({
                userid:memberid,
                workspaceid
            },{
                role:"admin"
            },{
                new:true
            }).session(session);

            await session.commitTransaction();


            return res
            .status(200)
            .json(
                new ApiResponse(200,member,"Member upgraded successfully!")   
            );
            
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            await session.endSession();
        }
    }
);

const downgradeMember = asyncHandler(
    async (req,res) => {
        // downgrade a member to user  
        // get the user id of the target member
        // get the workspace id
        // get the userid of manager
        // validate them
        // now if manager is owner let him update the role to user
        // return res
        
        const memberid = req.params.userid;
        const workspaceid = req.params.workspaceid;

        const userid = req.user._id;

        if(!memberid || !isValidObjectId(memberid)){
            throw new ApiError(400,"Invalid target member id");
        
        }
        if(!workspaceid || !isValidObjectId(workspaceid)){
            throw new ApiError(400,"Invalid workspace id");
        
        }
        if(!userid || !isValidObjectId(userid)){
            throw new ApiError(400,"Invalid user id");

        };

        const session = await mongoose.startSession();

        try {
            
            session.startTransaction();
            const targetMember = await WorkspaceUser.findOne({
                userid:memberid,
                workspaceid
            }).session(session);
            if(!targetMember){
                throw new ApiError(404,"Target member not found");
            }
            if(targetMember.role === "user" || targetMember.role === "owner"){
                throw new ApiError(400,"Target member is not eligible to downgrade");

            }
            const manager = await WorkspaceUser.findOne({
                userid,
                workspaceid
            }).session(session);
            if(!manager){
                throw new ApiError(404,"Manager not found");
            }
            if(manager.role !== "owner"){
                throw new ApiError(403,"You are not authorized to perform this action");

            }

            const member = await WorkspaceUser.findOneAndUpdate({
                userid:memberid,
                workspaceid
            },{
                role:"user"
            },{
                new:true
            }).session(session);

            await session.commitTransaction();
            return res
            .status(200)
            .json(
                new ApiResponse(200,member,"Member downgraded successfully!")
            );
            

        } catch (error) {
            session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }

    }
);



export {
    createWorkspace,
    joinWorkspace,
    getWorkspaceById,
    getAllWorkspacesId
};

