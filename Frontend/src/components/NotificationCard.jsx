import React from "react";


function NotificationCard({notification}){

    return(
        <>
        <div className="bg-gray-500 w-[90%] p-[0.5em] mx-auto my-[0.5em] rounded-md">
            <h1 className="text-white">
                {new Date(notification.createdAt).toLocaleString("en-IN",
                    {
                    timeZone: "Asia/Kolkata"
                    }
                )
                }
            </h1>
            <p className="text-white text-center">
                {notification.message}
            </p>
        </div>
        
        </>
    );

}



export default NotificationCard;