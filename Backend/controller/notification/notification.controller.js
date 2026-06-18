import Notification from "../../models/notification.model.js";
import asyncHandler from "../../utils/asyncHandler.utils.js";
import ApiError from "../../utils/ApiError.utils.js";
import ApiResponse from "../../utils/ApiResponse.utils.js";
import { isValidObjectId } from "mongoose";


const getAllNotifications = asyncHandler(
    async (req,res) => {
        // get all notifications
        // get the userid
        // validate the info
        // search the db for all notifications whose reciepent is the user
        // return res

        const userid = req.user._id;

        if(!userid || !isValidObjectId(userid)){
            throw new ApiError(400,"Invalid user id");

        }

        const notifications = await Notification.find({reciepent:userid});

        if(notifications.length === 0){
            throw new ApiError(404,"No notifications found");
        
        }

        return res
        .status(200)
        .json(
            new ApiResponse(200,notifications,"Notifications found successfully!")
        );

    }
);



const getUnreadCount = asyncHandler(
    async (req,res) => {
        // get unread count
        // get the userid
        // validate the info
        // get all notifications connected to the user and which are not markedasread
        // return the length of the array

        const userid = req.user._id;

        if(!userid || !isValidObjectId(userid)){
            throw new ApiError(400,"Invalid user id");
        }

        const unReadNotifications = await Notification.find({reciepent:userid,markedasread:false});

        return res
        .status(200)
        .json(
            new ApiResponse(200,unReadNotifications.length,"Unread notifications count found successfully!")
        );

    }
);

const registerNotificationEvents = (socket) => {
    socket.on(
        `notificationsViewed`,
        async () => {
            try{
                await Notification.updateMany(
                    {
                        reciepent:socket.user._id,
                        markedasread:false
                    },
                    {
                        $set:{
                            markedasread:true
                        }
                    }
                )

                socket.emit("notificationsMarkedViewed");


            }catch(error){
                console.log(error);
            }
        }
    )
}




export {
    getAllNotifications,
    getUnreadCount,
    registerNotificationEvents


}