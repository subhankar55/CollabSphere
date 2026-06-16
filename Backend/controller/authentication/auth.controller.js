import { isValidObjectId } from "mongoose";
import User from "../../models/user.model.js";
import ApiError from "../../utils/ApiError.utils.js";
import ApiResponse from "../../utils/ApiResponse.utils.js";
import asyncHandler from "../../utils/asyncHandler.utils.js";
import jwt from "jsonwebtoken";
import Invitation from "../../models/workspaceInvitation.model.js";
import WorkspaceUser from "../../models/workspaceUser.model.js";
import Project from "../../models/projects.model.js";
import Task from "../../models/tasks.model.js";
import Chat from "../../models/chat.model.js";
import Notification from "../../models/notification.model.js";
import Workspace from "../../models/workspace.model.js";




const registerUser = asyncHandler(
    async function(req,res){
        // Register a new user
        // collect username and password from frontend by req.body
        // verify username and password
        // create a new db instance and store username and password
        // return response

        const {username,password} = req.body;

        if(username.trim() == "" || password.trim() == ""){
            throw new ApiError(400,"Username and password are required!");
        }

        const user = await User.create({
            username,
            password
        });

        return res
        .status(201)
        .json(
            new ApiResponse(201,user,"User created successfully!")
        );

    }
);

const loginUser = asyncHandler(
    async function(req,res){
        // Login a registered user
        // get username and password from req.body of the request
        // verify if the username and password valid
        // search db for the username
        // verify db if the password is a correct one
        // generate accesstoken and refreshtoken
        // set cookie accessToken and refreshToken
        // return response

        const {username,password} = req.body;

        if(username.trim() == "" || password.trim() == ""){
            throw new ApiError(400,"Username and password are required!");
        }

        const user = await User.findOne({username});

        if(!user){
            throw new ApiError(404,"User not found!");
        }
        
        const correct = user.isPasswordCorrect(password);

        if(!correct){
            throw new ApiError(400,"Invalid password!");
        }

        const accessToken = user.generateAccesstoken();
        const refreshToken = user.generateRefreshtoken();

        user.refresh_token = refreshToken;
        await user.save();

        return res
        .status(200)
        .cookie("accessToken",accessToken,{
            httpOnly:true
        })
        .cookie("refreshToken",refreshToken,{
            httpOnly:true
        })
        .json(
            new ApiResponse(200,user,"User logged in successfully!")
        );
    }
);

const logoutUser = asyncHandler(
    async function(req,res){
        // Logout a logged in user
        // get the user_id of the logged in user from req.user._id
        // if no user_id found throw error
        // get the user by db search and update the refresh token by doing unset
        // clear all cookies 
        // return response

        const userid = req.user?._id;

        if(!userid || !isValidObjectId(userid)){
            throw new ApiError(400,"Invalid user!");
        }

        await User.findByIdAndUpdate(userid,{
            refresh_token:null
        });

        return res
        .status(200)
        .clearCookie("accessToken")
        .clearCookie("refreshToken")
        .json(
            new ApiResponse(200,null,"User logged out successfully!")
        );

    }
);

const getUser = asyncHandler(
    async function(req,res){
        // Get a logged in user details
        // get the userid
        // verify the userid
        // find the user by userid from db
        // return response

        const userid = req.user?._id;

        if(!userid || !isValidObjectId(userid)){
            throw new ApiError(400,"Invalid user!");
        }

        const user = await User.findById(userid).select("-password -refresh_token");

        return res
        .status(200)
        .json(
            new ApiResponse(200,user,"User fetched successfully!")
        );

    }
);

const updatePassword = asyncHandler(
    async function(req,res){
        // Update a logged in user password
        // collect userid or username
        // validate them
        // whatever exists search by that
        // and update the password
        // save the db
        // return response

        const userid = req.user?._id;

        let username;
        if(!userid || !isValidObjectId(userid)){
            username = req.body.username;
        }

        if(!username?.trim() && !userid) {
            throw new ApiError(400,"Username is required, or user must be logged in!");
        }
        const password = req.body.password;

        if(!password?.trim()){
            throw new ApiError(400,"Password is required!");
        }

        let user;

        if(userid){
            user = await User.findById(userid);

        }
        else if(username){
            user = await User.findOne({username});
        }

        if(!user){
            throw new ApiError(404,"User not found!");
        
        }

        user.password = password;
        await user.save();

        return res
        .status(200)
        .json(
            new ApiResponse(200,user,"Password updated successfully!")
        );


    }
);

const deleteUser = asyncHandler(
    async function(req,res){
        // Delete a logged in user
        // get userid from req.user 
        // validate the userid
        // delete the user by id
        // return response

        const userid = req.user?._id;

        if(!userid || !isValidObjectId(userid)){
            throw new ApiError(400,"Invalid user!");
        }

        await WorkspaceUser.deleteMany({userid:userid});
        await Invitation.deleteMany({$or:[{senderid:userid},{receiverid:userid}]});
        await Project.deleteMany({created_by:userid});
        await Task.deleteMany({$or:[{created_by:userid},{assigned_to:userid}]});
        await Chat.deleteMany({sender:userid});
        await Notification.deleteMany({$or:[{reciepent:userid},{sender:userid}]});
        await Workspace.deleteMany({created_by:userid});

        await User.deleteOne({_id:userid});

        return res
        .status(200)
        .json(
            new ApiResponse(200,null,"User deleted successfully!")
        );


    }
);

const refreshAccessToken = asyncHandler(
    async function(req,res){
        // Refresh access Token of a logged_in User
        // get refreshToken from req.cookie
        // decode the refreshToken using secret
        // validate the decoded token
        // get userid from this decoded refreshToken
        // check if the refreshToken stored in the db is same as the incoming refreshToken
        // generate an accessToken for that user
        // set cookies
        // return response
        
        const incomingRefreshToken = req.cookies?.refreshToken || req.header("refreshToken");


        if(!incomingRefreshToken){
            throw new ApiError(401,"Unauthorized request!");
        }
        const decodedtoken = jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET);
        if(!decodedtoken){
            throw new ApiError(401,"Unauthorized request!");

        }
        const userid = decodedtoken?._id;

        const user = await User.findById(userid);

        if(!user){
            throw new ApiError(404,"User not found!");
        }

        if(incomingRefreshToken !== user.refresh_token){
            throw new ApiError(401,"Unauthorized request!");
        }

        const accessToken = user.generateAccesstoken();

        return res
        .status(200)
        .cookie("accessToken",accessToken,{
            httpOnly:true
        })
        .json(
            new ApiResponse(200,null,"Access token refreshed successfully!")
        );

    }
);

const checkDuplicity = asyncHandler(
    async function(req,res) {
        // Check if the username exists
        // get the username 
        // validate the username
        // search the db by this username 
        // return the user if found else return null

        const {username} = req.body;

        if(!username.trim()){
            throw new ApiError(404,"Invalid Username!");
        }
        const user = await User.findOne({username});

        return res
        .status(200)
        .json(
            new ApiResponse(200,user,"Duplicity checked successfully")
        )
    }
);

const UserById = asyncHandler(
    async function(req,res){
        // get user by id
        // get the userid
        // validate it
        // search db for the user by id
        // return res

        const {userid} = req.params;

        if(!userid || !isValidObjectId(userid)){
            throw new ApiError(400,"Invalid user!");
        }

        const user = await User.findById(userid);

        if(!user){
            throw new ApiError(404,"User not found!");
        }

        return res
        .status(200)
        .json(
            new ApiResponse(200,user,"User fetched successfully!")
        );
    }
)





export {
    registerUser,
    loginUser,
    logoutUser,
    getUser,
    updatePassword,
    deleteUser,
    refreshAccessToken,
    checkDuplicity,
    UserById

    
};