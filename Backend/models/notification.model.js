import mongoose from "mongoose";



const notificationSchema = new mongoose.Schema({

    message:{
        type:String,
        required:true
    },
    reciepent:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
        },
    
    markedasread:{
        type:Boolean,
        default:false
    }

},{timestamps:true});



const Notification = mongoose.model("Notification",notificationSchema);

export default Notification;