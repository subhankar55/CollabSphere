import React from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { createTask, getAllTasks } from "../services/taskData.js";
import { useNavigate } from "react-router-dom";
import TaskCard from "../components/TaskCard.jsx";
import { countUnread } from "../services/notificationData.js";
import socket from "../services/socket.js";
import {chatWithGemini} from "../services/geminiData.js"
import { IoSend } from "react-icons/io5";





function Tasks(){

    const location = useLocation();
    const navigate = useNavigate();
    const [open,setOpen] = useState(false);
    const [description,setDescription] = useState("");
    const [username,setUsername] = useState("");
    const [deadline,setDeadline] = useState(null);
    const [priority,setPriority] = useState("");
    const [url,setUrl] = useState("");
    const [days,setDays] = useState(null);
    const [tasks,setTasks] = useState([]);
    const [count,setCount] = useState(0);
    const [aimessage,setAimessage] = useState("");
    const [message,setMessage] = useState("");


    const handleDescription = (e) => {
        setDescription(e.target.value);
    }

    const handleUsername = (e) => {
        setUsername(e.target.value);
    }

    const handleDays = (e) => {
        setDays(Number(e.target.value));
    }

    useEffect(() => {
        const date = new Date();
        date.setDate(date.getDate() + days);
        setDeadline(date);        
    },[days])

    const handlePriority = (e) => {
        setPriority(e.target.value);
    }

    const handleUrl = (e) => {
        setUrl(e.target.value);
    }

    const makeTask = (e) => {
        e.preventDefault();
        console.log(deadline);
        console.log(description);
        console.log(username);
        console.log(priority);
        console.log(url);
        console.log(location.state?.projectid);

        createTask(description,username,deadline,priority,url,location.state?.projectid)
        .then((result) => {
            console.log(result);
            navigate("/message",{
                state:{
                    message:result.message
                }
            })

        })
        .catch((err) => {
            console.log(err.message);
            navigate("/message",{
                state:{
                    message:err.message || "Something went wrong!"
                }
            })
        });

    }

    useEffect(() => {
        getAllTasks(location.state?.projectid)
        .then((result) => {
            console.log(result);
            setTasks(result.data);
        })
        .catch((err) => {
            console.log(err.message);
        });
    },[]);

    useEffect(
        () => {
            countUnread()
            .then((result) => {
                console.log(result);
                setCount(Number(result.data));
            })
            .catch((err) => {
                console.log(err.message);
            });

        },[]
    );

    useEffect(
        () => {

            const handleCount = () => {
                setCount(prev => prev + 1);
            }

            socket.on("notification",handleCount);

            return () => {
                socket.off("notification",handleCount);
            }

        },[]
    );

    useEffect(
        () => {

            const handleCount = () => {
                setCount(0);
            }

            socket.on("notificationsMarkedViewed",handleCount);

            return () => {
                socket.off("notificationsMarkedViewed",handleCount);
            }

        },[]
    );

    const enterNotification = (e) => {
        e.preventDefault();

        navigate("/notifications");
    }

    console.log("count:",count);

    const askGemini = (e) => {
        console.log("gemini 1")
        e.preventDefault();
        chatWithGemini(message)
        .then((result) => {
            console.log("Gemini Api called")
            setAimessage(result);
            setMessage("");
        })
        .catch((err) => {
            setMessage("");
            console.log(err);
            navigate("/message",{
                state:{
                    message: "Something went wrong inside Gemini!"
                }
            })
        });
    }

    console.log("gemini Api:",import.meta.env.VITE_GEMINI_API_KEY);

    return(
        <>
        <div className="bg-black min-h-screen w-full">
            <div className="h-full w-full p-[1em]">
                <h1 className="text-cyan-300 text-center text-lg">
                    Project : {location.state?.projectname}
                </h1>
                <div className="bg-gray-200 w-[90%] md:w-[70%] mx-auto my-[1em] p-[0.1em] rounded-lg overflow-auto">
                        {
                            aimessage.trim() && 
                            <div className="w-full">
                                {aimessage}
                            </div>
                        }
                        <form 
                        action="" 
                        onSubmit={askGemini}
                        className="m-[0.5em] flex flex-col md:flex-row items-center justify-center gap-[0.5em]"
                        >
                            <input type="text"
                            placeholder="Ask gemini"
                            value={message}
                            onChange={(e) => {setMessage(e.target.value)}}
                            className="bg-white p-[0.5em] w-[95%] md:w-[60%] rounded-4xl"
                            />
                            <button 
                            type="submit"
                            className="rounded-md p-[0.3em] hover:cursor-pointer"
                            >
                               <IoSend className="text-green-500" 
                               size={30}
                               />
                            </button>
                        </form>
                        {
                            aimessage.trim() &&
                            <button
                            onClick={() => {setAimessage("");}}
                            className="bg-orange-500 text-white rounded-md px-[0.5em] hover:cursor-pointer block mx-auto"
                            >
                                clear
                            </button>
                        }
                    </div>
                <button
                onClick={enterNotification}
                className="bg-yellow-500 px-[0.5em] rounded-md hover:cursor-pointer hover:text-black ml-[3em] my-[2em] relative"
                >
                    Notification
                    {
                        count > 0 && 
                        <span className="bg-red-600 text-white absolute top-0 right-[0.001em] flex items-center justify-center h-[3vh] w-[20%] rounded-full">
                            {count}
                        </span>
                    }
                </button>

                <button
                onClick={() => {setOpen(!open)}}
                className="bg-orange-500 px-[0.5em] rounded-md hover:cursor-pointer hover:text-black ml-[3em] my-[2em]"
                >
                    Create Task
                </button>
                {
                    open &&
                    <div>
                        <div className="bg-gray-200 w-[80%] md:w-[35%] mx-auto mb-[1em] p-[0.1em] rounded-lg overflow-auto">
                        <form 
                        action="" 
                        method="post"
                        onSubmit={makeTask}
                        className="m-[0.5em] flex flex-col items-center justify-center gap-[1em]"
                        >
                            <input 
                            type="text"
                            placeholder="Describe the task"
                            value={description}
                            onChange={handleDescription}
                            className="bg-white p-[0.4em] w-[95%] md:w-[80%] h-[5vh] rounded-md"
                            />
                            <input 
                            type="text" 
                            placeholder="Username of member"
                            value={username}
                            onChange={handleUsername}
                            className="bg-white p-[0.4em] w-[95%] md:w-[80%] h-[5vh] rounded-md"
                            />
                            <input 
                            type="number"
                            placeholder="Enter deadline"
                            step="1"
                            min="0"
                            value={days}
                            onChange={handleDays}
                            className="bg-white p-[0.4em] w-[95%] md:w-[80%] h-[5vh] rounded-md"
                            />
                            <div className="bg-white p-[0.4em] w-[95%] md:w-[80%] h-[5vh] rounded-md">
                                <label htmlFor="priority">Priority:</label>
                                <select 
                                name="priority" 
                                id="priority"
                                value={priority}
                                onChange={handlePriority}
                                >
                                    <option value="">Select Priority</option>
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>
                            <input 
                            type="url" 
                            placeholder="Enter platform url"
                            value={url}
                            onChange={handleUrl}
                            className="bg-white p-[0.4em] w-[95%] md:w-[80%] h-[5vh] rounded-md"
                            />
                            
                            <button 
                            type="submit"
                            className="bg-green-500 text-white rounded-md px-[0.5em] hover:cursor-pointer"
                            >
                                Create
                            </button>
                        </form>
                    </div>
                    </div>
                }
                <div className="h-[90vh] w-[95%] md:w-[60%] border-[0.1em] border-cyan-300 rounded-lg mx-auto my-[1em] overflow-auto">
                    <h1 className="text-white text-center p-[0.5em] m-[0.5em]">
                        Tasks
                    </h1>
                    {
                        tasks.length > 0 &&
                        tasks.map((task) => {
                            return(
                                <TaskCard
                                key={task._id}
                                task={task}
                                />
                            )
                        }
                    )
                    }
                </div>
            </div>
        </div>
        
        </>
    );
}



export default Tasks;