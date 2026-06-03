import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();



const userSchema = new mongoose.Schema({

        username:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        refresh_token:{
            type:String,
            required:true
        }

},{timestamps:true});



userSchema.pre("save",async function(){
    if(!this.isModified("password")){
        return;
    }

    this.password = await bcrypt.hash(this.password,10);

});

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password);

};

userSchema.methods.generateAccesstoken = function(){
    return jwt.sign(
        {
            _id:this._id,
            username:this.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY

        }
    )
};


userSchema.methods.generateRefreshtoken = function(){

    return jwt.sign(
        {
            _id:this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
};




const User = mongoose.model("User",userSchema);

export default User;