import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";



const taskSchema = new mongoose.Schema({

    projectid:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"project"
    },
    description:{
        type:String,
        required:true
    },
    created_by:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    assigned_to:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    deadline:{
        type:Date,
        required:true
    },
    status:{
        type:String,
        required:true,
        enum:["pending","review","updated","completed"],
        default:"pending"
    },
    priority:{
        type:String,
        required:true,
        enum:["low","medium","high"],
        default:"low"
    },
    platformlink:{
        type:String,
        required:true
    }

},{timestamps:true});


taskSchema.plugin(mongooseAggregatePaginate);



const Task = mongoose.model("Task",taskSchema);

export default Task;