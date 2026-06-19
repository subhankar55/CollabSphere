import Task from "../../models/tasks.model.js";
import Project from "../../models/projects.model.js";
import asyncHandler from "../../utils/asyncHandler.utils.js";
import ApiError from "../../utils/ApiError.utils.js";
import ApiResponse from "../../utils/ApiResponse.utils.js";
import { isValidObjectId } from "mongoose";
import WorkspaceUser from "../../models/workspaceUser.model.js";
import Workspace from "../../models/workspace.model.js";
import User from "../../models/user.model.js";
import notificationQueue from "../notification/notification.queue.js";






const createTask = asyncHandler(

    async (req,res) => {
        // create a Task
        // get the userid
        // validate it
        // search workspace user and find the member's role
        // if member is not admin or owner reject the request
        // get the project id 
        // get the description
        // get the asigend member
        // get the deadline 
        // get the priority
        // get the platform link
        // validate all the data
        // create a new task with this data
        // return res

        const userid = req.user._id;

        if(!userid || !isValidObjectId(userid)){
            throw new ApiError(400,"Invalid user id");
        }

        const {projectid} = req.params;

        if(!projectid || !isValidObjectId(projectid)){
            throw new ApiError(400,"Invalid project id");

        }

        const project = await Project.findOne({_id:projectid});

        if(!project){
            throw new ApiError(404,"Project not found");
        }

        const workspaceid = project.workspaceid;

        const member = await WorkspaceUser.findOne({workspaceid:workspaceid,userid:userid});

        if(!member){
            throw new ApiError(404,"Member not found");
        }

        if(member.role === "user"){
            throw new ApiError(403,"You are not authorized to perform this action");
        }

        const {description,assignedTo,deadline,priority,platformlink} = req.body;

        if(!description.trim() || !assignedTo.trim() || !deadline || !priority.trim() || !platformlink.trim()){
            throw new ApiError(400,"All fields are required");
        }

        const assigneduser = await User.findOne({username:assignedTo});

        if(!assigneduser){
            throw new ApiError(404,"User not found");
        }

        const assigned_to = assigneduser?._id;

        

        const task = await Task.create({
            projectid:projectid,
            description:description,
            created_by:userid,
            assigned_to:assigned_to,
            deadline:deadline,
            status:"pending",
            priority:priority,
            platformlink:platformlink
        });

        const reminder = new Date(deadline).getTime() - 24*60*60*1000;
        const delay = reminder - Date.now();

        if(delay > 0){
            await notificationQueue.add('taskReminder',
            {
                message:`Only 1 day left to complete a task assigned by ${req.user.username}!`,
                reciepent:assigned_to,
                sender:userid
            },
            {
                jobId:`reminder-${task._id.toString()}`,
                delay:delay
            }
        );
    }

        const job = await notificationQueue.add('taskCreated',{
            message:`You are assigned a new task by ${req.user.username}!`,
            reciepent:assigned_to,
            sender:userid
        });

        console.log("Job added : ", job?.id);

        return res
        .status(201)
        .json(
            new ApiResponse(201,task,"Task created successfully!")
        );
        

    }

);

const updateTask = asyncHandler(

    async (req,res) => {
        // update a Task
        // get the task id
        // validate it
        // search db and get the task document
        // get the description
        // get the deadline
        // get the priority
        // get the platform link
        // update the task document
        // save the document 
        // return res

        const {taskid} = req.params;

        if(!taskid || !isValidObjectId(taskid)){
            throw new ApiError(400,"Invalid task id");
        }

        
        const userid = req.user._id;

        if(!userid || !isValidObjectId(userid)){
            throw new ApiError(400,"Invalid user id");
        }

        const task = await Task.findOne({_id:taskid});

        if(!task){
            throw new ApiError(404,"Task not found");
        }

        if(task.created_by.toString() != userid.toString()){
            throw new ApiError(403,"You are not authorized to perform this action");
        }

        const {description,deadline,priority,platformlink} = req.body;

        if(!description.trim() && !deadline && !priority.trim() && !platformlink.trim()){
            throw new ApiError(400,"Atleast one field is required!");
        
        }

        if(description.trim()){
            task.description = description;
        
        }
        let delay = 0;
        if(deadline){
            task.deadline = deadline;
            const reminder = new Date(deadline).getTime() - 24*60*60*1000;
            delay = reminder - Date.now();
        }
        if(priority.trim()){
            task.priority = priority;
        }
        if(platformlink.trim()){
            task.platformlink = platformlink;
        }

        task.status = "updated";

        await task.save();

        if(delay > 0){
            await notificationQueue.add(
                `taskReminder`,
                {
                    message:`Only 1 day left to complete a task assigned by ${req.user.username}`,
                    reciepent:task.assigned_to,
                    sender:userid
                },
                {
                    jobId:`reminder-${task._id.toString()}`,
                    delay:delay
                }
            )
        }


        await notificationQueue.add('taskUpdated',{
            message:`Your task has been updated by ${req.user.username}!`,
            reciepent:task.assigned_to,
            sender:userid
        });

        return res
        .status(200)
        .json(
            new ApiResponse(200,task,"Task updated successfully!")
        );

    }

);


const getTaskbyId = asyncHandler(

    async (req,res) => {
        // get a Task by Id
        // get the taskid 
        // validate the data
        // search db for the task
        // return res

        const {taskid} = req.params;

        if(!taskid || !isValidObjectId(taskid)){
            throw new ApiError(400,"Invalid task id");
        }

        const task = await Task.findOne({_id:taskid});

        if(!task){
            throw new ApiError(404,"Task not found");
        }

        return res
        .status(200)
        .json(
            new ApiResponse(200,task,"Task found successfully!")
        );


    }

);

const allTasks = asyncHandler(

    async (req,res) => {
        // get all Tasks
        // get the project id
        // validate the data
        // search db for all the tasks connected to this projectid
        // return the res

        const {projectid} = req.params;

        if(!projectid || !isValidObjectId(projectid)){
            throw new ApiError(400,"Invalid project id");
        
        }

        const tasks = await Task.find({projectid:projectid});

        if(tasks.length === 0){
            throw new ApiError(404,"No tasks found");
        
        }

        return res
        .status(200)
        .json(
            new ApiResponse(200,tasks,"Tasks found successfully!")
        );


    }

);

const updateToReview = asyncHandler(

    async (req,res) => {
        // update task status to review
        // get the taskid
        // validate data
        // search db and find task
        // check the task status
        // update only if it is in pending or updated mode
        // update to review
        // return res

        const {taskid} = req.params;

        const userid = req.user._id;

        if(!userid || !isValidObjectId(userid)){
            throw new ApiError(400,"Invalid user id");
        }

        if(!taskid || !isValidObjectId(taskid)){
            throw new ApiError(400,"Invalid task id");
        }

        const task = await Task.findOne({_id:taskid});

        if(!task){
            throw new ApiError(404,"Task not found");
        }

        if(task.assigned_to.toString() != userid.toString()){
            throw new ApiError(403,"You are not authorized to perform this action");
        }

        if(task.status != "pending" && task.status != "updated"){
            throw new ApiError(400,"Task is not in pending or updated mode");
        }

        task.status = "review";

        await task.save();

        return res
        .status(200)
        .json(
            new ApiResponse(200,task,"Task updated to review successfully!")
        );


    }

);

const updateToCompleted = asyncHandler(

    async (req,res) => {
        // update task status to completed
        // get the taskid
        // validate the data
        // search db and find the task
        // check the task status
        // update only if it is in review mode
        // update to completed
        // return res

        const {taskid} = req.params;
        const userid = req.user._id;

        if(!userid || !isValidObjectId(userid)){
            throw new ApiError(400,"Invalid user id");
        }
        

        if(!taskid || !isValidObjectId(taskid)){
            throw new ApiError(400,"Invalid task id");
        }

        const task = await Task.findOne({_id:taskid});

        if(!task){
            throw new ApiError(404,"Task not found");
        }

        if(task.created_by.toString() != userid.toString()){
            throw new ApiError(403,"You are not authorized to perform this action");
        }

        if(task.status != "review"){
            throw new ApiError(400,"Task is not in review mode");
        }

        task.status = "completed";

        await task.save();

        return res
        .status(200)
        .json(
            new ApiResponse(200,task,"Task updated to completed successfully!") 
        );

    
    }

);


const deleteTask = asyncHandler(

    async (req,res) => {
        // delete a Task
        // get the taskid
        // validate the taskid
        // search db and find the task
        // delete the task
        // return res
        const {taskid} = req.params;

        if(!taskid || !isValidObjectId(taskid)){
            throw new ApiError(400,"Invalid task id");

        }

        const userid = req.user._id;
        if(!userid || !isValidObjectId(userid)){
            throw new ApiError(400,"Invalid user id");
        }

        const task = await Task.findById(taskid);

        if(!task){
            throw new ApiError(404,"Task not found");
        }

        if(task.created_by.toString() != userid.toString()){
            throw new ApiError(403,"You are not authorized to perform this action");
        }

        await task.deleteOne();
             
        await notificationQueue.add('taskDeleted',{
            message:`Your task has been deleted by ${req.user.username}!`,
            reciepent:task.assigned_to,
            sender:userid
        });
        

        return res
        .status(200)
        .json(
            new ApiResponse(200,null,"Task deleted successfully!")
        );

    }

);








export {
    createTask,
    updateTask,
    getTaskbyId,
    allTasks,
    updateToReview,
    updateToCompleted,
    deleteTask
};