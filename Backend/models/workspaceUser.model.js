import mongoose from "mongoose";



const workspaceUserSchema = new mongoose.Schema({

    workspaceid:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"workspace",
        required:true
    },
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    role:{
        type:String,
        required:true,
        enum:["owner","admin","user"],
        default:"user"
    }

},{timestamps:true});




const WorkspaceUser = mongoose.model("WorkspaceUser",workspaceUserSchema);

export default WorkspaceUser;