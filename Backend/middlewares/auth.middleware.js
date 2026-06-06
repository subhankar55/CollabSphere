import asyncHandler from "../utils/asyncHandler.utils.js";
import ApiError from "../utils/ApiError.utils.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";


const verifyJWT = asyncHandler(
    async function(req,res,next){

        try {
            const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer","");

            if(!token){
                throw new ApiError(401,"Unauthorized request!");
            }

            const decodedtoken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);

            const user = await User.findById(decodedtoken?._id).select("-password -refresh_token");

            if(!user){
                throw new ApiError(401,"Unauthorized request!");
            }

            req.user = user;

            next();
            

        } catch (error) {
            throw new ApiError(401,error?.message || "Invalid access token!");
        }
    }
);

export default verifyJWT;