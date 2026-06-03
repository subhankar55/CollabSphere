import mongoose from "mongoose";



const workspaceUserSchema = new mongoose.Schema({

    workspaceid:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"workspace"
    },
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
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