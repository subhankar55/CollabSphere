import User from "../../models/user.model.js";
import ApiError from "../../utils/ApiError.utils.js";
import ApiResponse from "../../utils/ApiResponse.utils.js";
import asyncHandler from "../../utils/asyncHandler.utils.js";



const registerUser = asyncHandler(
    async function(req,res){
        // Register a new user
        // collect username and password from frontend by req.body
        // verify username and password
        // create a new db instance and store username and password
        // return response

        const {username,password} = req.body;

        if(username.trim() == "" || password.trim() == ""){
            throw new ApiError(400,"Username and password are required!");
        }

        const user = await User.create({
            username,
            password
        });

        return res
        .status(201)
        .json(
            new ApiResponse(201,user,"User created successfully!")
        );

    }
);



export {
    registerUser,
    
};