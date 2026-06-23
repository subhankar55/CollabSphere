import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {workspaces, 
        createdWorkspaces,
        projects,
        tasks,
        completedTasks

 } from "../services/dashboardData";

 import { useAuth } from "../context/authContext.js";



function Dashboard(){

    const [workspaceNumber,setWorkspaceNumber] = useState(-1);
    const [createdworkspaceNumber,setCreatedWorkspaceNumber] = useState(-1);
    const [projectNumber,setProjectNumber] = useState(-1);
    const [taskNumber,setTaskNumber] = useState(-1);
    const [completedTaskNumber,setCompletedTaskNumber] = useState(-1);
    const {username} = useAuth();

    useEffect(()=>{
        workspaces()
        .then((result) => {
            console.log("1",result.data);
            setWorkspaceNumber(result.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    },[]);
    useEffect(()=>{
        createdWorkspaces()
        .then((result)=>{
            console.log("2",result.data);
            setCreatedWorkspaceNumber(result.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    },[]);
    useEffect(()=>{
        projects()
        .then((result)=>{
            console.log("3",result.data);
            setProjectNumber(result.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    },[]);
    useEffect(()=>{
        tasks()
        .then((result)=>{
            console.log("4",result.data);
            setTaskNumber(result.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    },[]);
    useEffect(()=>{
        completedTasks()
        .then((result)=>{
            console.log("5",result.data);
            setCompletedTaskNumber(result.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    },[]);

    return(
        <>
            <div className="bg-black min-h-screen w-full p-[0.5em]">
                <h1 className="text-center text-white text-2xl p-[2em]">
                    {username}
                </h1>
                <div className="bg-black overflow-auto h-[70vh] w-[90%] border-[0.01em] mx-auto border-cyan-300 p-[1em] flex gap-[1em] flex-col md:flex-row items-center justify-center">
                    <div className="w-[90%] md:w-[20%] bg-gray-500 text-white text-center h-[30%] md:h-[60%] p-[3em] rounded-lg">
                        Workspaces:{workspaceNumber}
                    </div>
                    <div className="w-[90%] md:w-[20%] bg-gray-500 text-white text-center h-[30%] md:h-[60%] p-[3em] rounded-lg">
                        Workspaces Created:{createdworkspaceNumber}
                    </div>
                    <div className="w-[90%] md:w-[20%] bg-gray-500 text-white text-center h-[30%] md:h-[60%] p-[3em] rounded-lg">
                        Projects:{projectNumber}
                    </div>
                    <div className="w-[90%] md:w-[20%] bg-gray-500 text-white text-center h-[30%] md:h-[60%] p-[3em] rounded-lg">
                        Active Tasks:{taskNumber}
                    </div>
                    <div className="w-[90%] md:w-[20%] bg-gray-500 text-white text-center h-[30%] md:h-[60%] p-[3em] rounded-lg">
                        Completed tasks:{completedTaskNumber}
                    </div>
                </div>
            </div>
        </>
    );
}


export default Dashboard;