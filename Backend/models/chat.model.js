import mongoose from "mongoose";



const chatSchema = new mongoose.Schema({

    message:{
        type:String,
        required:true
    },
    sender:{
        type: String,
        required:true
    
    },
    workspaceid:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"workspace",
        required:true
    },
    sent:{
        type:Boolean,
        default:false
    },
    readby:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"user"
        }
    ],

},{timestamps:true});


const Chat = mongoose.model("Chat",chatSchema);

export default Chat;