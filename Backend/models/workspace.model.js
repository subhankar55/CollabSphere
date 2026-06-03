import mongoose from "mongoose";



const workspaceSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    created_by:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    }

},{timestamps:true});

const Workspace = mongoose.model("Workspace",workspaceSchema);

export default Workspace;