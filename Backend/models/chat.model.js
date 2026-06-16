import mongoose from "mongoose";



const chatSchema = new mongoose.Schema({

    message:{
        type:String,
        required:true
    },
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    
    },
    sent:{
        type:Boolean,
        default:false
    },
    delivered_to:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"user"
        }
    ],
    readby:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"user"
        }
    ],
    deliveredall:{
        type:Boolean,
        default:false
    },
    readall:{
        type:Boolean,
        default:false
    }

},{timestamps:true});


const Chat = mongoose.model("Chat",chatSchema);

export default Chat;