import mongoose from "mongoose";




const projectSchema = new mongoose.Schema({
    projectname:{
        type:String,
        required:true
    },
    workspaceid:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"workspace"
    },
    created_by:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    }

},{timestamps:true});





const Project = mongoose.model("Project",projectSchema);

export default Project;