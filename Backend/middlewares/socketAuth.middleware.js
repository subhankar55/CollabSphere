import ApiError from "../utils/ApiError.utils.js";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";







const socketAuth = async (socket,next) => {
            try{
                const token = cookie.parse(socket.handshake.headers.cookie || "")?.accessToken;

                if(!token){
                    throw new ApiError(401,"Unauthorized websocket request!");
                }

                const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);

                const user = await User.findById(decodedToken?._id).select("-password -refresh_token");

                if(!user){
                    throw new ApiError(401,"Unauthorized websocket request!");
                }

                socket.user = user;

                return next();
                
            }catch(error){
                return next(
                    new ApiError(401,error?.message || "Invalid access token!")
                )
            }
        }


export default socketAuth;