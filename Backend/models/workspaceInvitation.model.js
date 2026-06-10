import mongoose from "mongoose";



const invitationSchema = new mongoose.Schema({

workspaceid:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"workspace"
},
senderid:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"user"
},
receiverid:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"user"
},
status:{
    type:String,
    required:true,
    enum:["pending","accepted","rejected"],
    default:"pending"
}

},
{timestamps:true});



const Invitation = mongoose.model("Invitation",invitationSchema);

export default Invitation;