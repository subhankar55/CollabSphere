import React, { useEffect, useState } from "react";
import { allNotifications } from "../services/notificationData.js";
import socket from "../services/socket.js";
import NotificationCard from "../components/NotificationCard.jsx";


function Notification(){

    const [notifications,setNotifications] = useState([]);

    useEffect(
        () => {
            allNotifications()
            .then((result) => {
                console.log(result);
                setNotifications(result.data);
            })
            .catch((err) => {
                console.log(err.message);
            })
        },[]
    );

    useEffect(
        () => {
            const handleNotifications = (data) => {
                setNotifications((prev) => [...prev,data]);
                socket.emit("notificationsViewed");
            }

            socket.on("notification",handleNotifications);

            return () => {
                socket.off("notification",handleNotifications);
            }
        },[]
    );

    useEffect(
        () => {
            socket.emit("notificationsViewed");
        },[]
    );




    return(
        <>
        <div className="bg-black min-h-screen py-[5em]">
            <div className="h-[70vh] w-[95%] md:w-[60%] border-[0.1em] border-cyan-300 rounded-lg mx-auto p-[1em] overflow-auto">
                <h1 className="text-white text-center">
                    Notifications!
                </h1>
                {
                    notifications.length > 0 &&
                    notifications.map((notification) => {
                        return(
                            <NotificationCard
                            key={notification?._id}
                            notification={notification}
                            />
                        );
                    })
                }

            </div>
        </div>
        </>
    );
}


export default Notification;