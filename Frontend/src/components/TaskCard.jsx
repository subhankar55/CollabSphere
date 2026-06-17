import React, { useEffect, useState } from "react";
import { getUserById } from "../services/authData.js";
import { reviewTask, updateTask,doneTask,deleteTask } from "../services/taskData.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext.js";





function TaskCard({task}){

    const createrid = task.created_by;
    const targetid = task.assigned_to;

    const [worker,setWorker] = useState("");
    const [supervisor,setSupervisor] = useState("");
    const [openReview,setOpenReview] = useState(false);
    const [openDone,setOpenDone] = useState(false);
    const [open,setOpen] = useState(false);


    const [desc,setDesc] = useState("");
    const [deadline,setDeadline] = useState(null);
    const [prior,setPrior] = useState("");
    const [url,setUrl] = useState("");
    const [days,setDays] = useState(null);
    const [formatedDate,setFormatedDate] = useState("");
    
        

    const priority = task.priority;
    const status = task.status;

    const navigate = useNavigate();


    const {username} = useAuth();


    useEffect(() => {
        setFormatedDate(new Date(task.deadline).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata"
        }))
    },[])

    useEffect(() => {

        getUserById(createrid)
        .then((result) => {
            console.log(result);
            setSupervisor(result.data?.username);
        })
        .catch((err) => {
            console.log(err);
        });
    },[]);

    useEffect(() => {

        getUserById(targetid)
        .then((result) => {
            console.log(result);
            setWorker(result.data?.username);
        })
        .catch((err) => {
            console.log(err);
        });
    },[]);

    useEffect(() => {
        setOpenReview(false);
        setOpenDone(false);
        if((status == "pending" || status == "updated") && worker == username){
            setOpenReview(true);
        }
        else if(status == "review" && supervisor == username){
            setOpenDone(true);
        }
    },[worker,supervisor])


    const handleDesc = (e) => {
            setDesc(e.target.value);
        }
    
    const handleDays = (e) => {
            setDays(Number(e.target.value));
        }
    
    useEffect(() => {
            const date = new Date();
            date.setDate(date.getDate() + days);
            setDeadline(date);        
        },[days])
    
    const handlePrior = (e) => {
            setPrior(e.target.value);
        }
    
    const handleUrl = (e) => {
            setUrl(e.target.value);
        }
    
    const updateTaskById = (e) => {
            
            e.preventDefault();
            console.log(desc);
            console.log(deadline);
            console.log(prior);
            console.log(url);
            console.log(task._id);
    
            updateTask(desc,deadline,prior,url,task._id)
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

    const review = (e) => {
        e.preventDefault();
        reviewTask(task._id)
        .then((result) => {
            console.log(result);
            window.location.reload();
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

    const done = (e) => {
        e.preventDefault();

        doneTask(task._id)
        .then((result) => {
            console.log(result);
            window.location.reload();
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

    const remove = (e) => {
        e.preventDefault();

        deleteTask(task._id)
        .then((result) => {
            console.log(result);
            window.location.reload();
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


    return(
        <>
        <div className="bg-gray-800 w-[98%] md:w-[80%] mx-auto rounded-lg my-[1em] p-[0.5em]">
            <h1 className="text-white text-center bg-gray-900 w-[50%] rounded-md mx-auto my-[0.4em] p-[0.3em]">
                AssignedTo : {worker}
            </h1>
            <h1 className="text-white text-center bg-gray-900 w-[50%] rounded-md mx-auto my-[0.4em] p-[0.3em]">
                AssignedBy : {supervisor}
            </h1>
            <h1 className="text-white text-center bg-gray-900 w-[50%] rounded-md mx-auto my-[0.4em] p-[0.3em]">
                Deadline : {formatedDate}
            </h1>
            <p className="text-white text-center bg-gray-900 w-[90%] rounded-md mx-auto my-[0.4em] p-[0.3em]">
                Task : {task.description}
            </p>
            <div className="flex items-center justify-center">
                <a 
                href={task.platformlink}
                className="text-white m-[0.5em] bg-cyan-700 p-[0.2em] rounded-md"
                >
                    Link
                </a>
                <span className={`${priority == "high" ? "bg-red-600" : priority == "medium" ? "bg-orange-600" : "bg-yellow-500"} m-[0.5em] text-white rounded-md p-[0.2em]`}>
                    Priority: {priority}
                </span>
                <span className={`${status == "pending" || status == "updated" ? "bg-red-600" : status == "review" ? "bg-orange-600" : "bg-green-500"} m-[0.5em] text-white rounded-md p-[0.2em]`}>
                    {status}
                </span>
            </div>
            <div className="flex items-center justify-center gap-[1em]">
                <button
                onClick={() => setOpen(!open)}
                className="bg-orange-600 text-white rounded-md p-[0.2em] m-[0.2em] hover:cursor-pointer"
                >
                    update
                </button>
                <button
                onClick={remove}
                className="bg-red-600 text-white rounded-md p-[0.2em] m-[0.2em] hover:cursor-pointer"
                >
                    delete
                </button>
                {
                    openReview && 
                    <button
                    onClick={review}
                    className="bg-green-600 text-white rounded-md p-[0.2em] m-[0.2em] hover:cursor-pointer"
                    >
                        Review
                    </button>
                }
                {
                    openDone && 
                    <button
                    onClick={done}
                    className="bg-green-600 text-white rounded-md p-[0.2em] m-[0.2em] hover:cursor-pointer"
                    >
                        Done
                    </button>
                }
            </div>
            {
                open &&
                <div className="w-full m-[0.5em] p-[0.5em]">
                    <div className="bg-gray-200 w-[90%] mx-auto mb-[1em] p-[0.1em] rounded-lg overflow-auto">
                        <form 
                        action="" 
                        method="post"
                        onSubmit={updateTaskById}
                        className="m-[0.5em] flex flex-col items-center justify-center gap-[1em] overflow-auto"
                        >
                            <input 
                            type="text"
                            placeholder="Describe the task"
                            value={desc}
                            onChange={handleDesc}
                            className="bg-white p-[0.4em] w-[95%] md:w-[80%] rounded-md"
                            />
                            <input 
                            type="number"
                            placeholder="Enter deadline"
                            step="1"
                            min="0"
                            value={days}
                            onChange={handleDays}
                            className="bg-white p-[0.4em] w-[95%] md:w-[80%] rounded-md"
                            />
                            <div className="bg-white p-[0.4em] w-[95%] md:w-[80%] rounded-md">
                                <label htmlFor="priority">Priority:</label>
                                <select 
                                name="priority" 
                                id="priority"
                                value={prior}
                                onChange={handlePrior}
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
                            className="bg-white p-[0.4em] w-[95%] md:w-[80%] rounded-md"
                            />
                            
                            <button 
                            type="submit"
                            className="bg-green-500 text-white rounded-md px-[0.5em] hover:cursor-pointer"
                            >
                                Update
                            </button>
                        </form>
                    </div>
                </div>
            }
        </div>
        
        </>
    );
}


export default TaskCard;