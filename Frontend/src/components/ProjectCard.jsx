import React, { useEffect, useState } from "react";
import { getUserById } from "../services/authData";
import { deleteProject, deleteWorkspace } from "../services/workspaceData";
import { useNavigate } from "react-router-dom";

function ProjectCard({projectname,userid,projectid,workspaceid}){
    const [username,setUsername] = useState("");

    const navigate = useNavigate();

    useEffect(() => {

        getUserById(userid)
        .then((result) => {
            console.log("Api Called")
            console.log(result);
            setUsername(result.data?.username);
        })
        .catch((err) => {
            console.log(err.message);
        });

    },[])


    const Enter = (e) => {
        e.preventDefault();

        navigate("/tasks",{
            state:{
                projectid,
                projectname
            }
        })
    }


    const Delete = (e) => {

        e.preventDefault();

        deleteProject(workspaceid,projectid)
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
        })
    }
    
    return(
        <>
        <div className="bg-gray-600 my-[1em] mx-auto w-[95%] md:w-[70%] p-[0.5em] rounded-lg">
            <h1 className="text-center text-white p-[0.2em]">
                {projectname}
            </h1>
            <div className="text-center text-white p-[0.2em]">
                CreatedBy : {username}
            </div>
            <div className="flex gap-[2em] items-center justify-center">
                <button
                className="bg-orange-500 px-[0.5em] rounded-md hover:cursor-pointer hover:text-black"
                onClick={Enter}
                >
                    Enter
                </button>
                <button
                className="bg-red-600 px-[0.5em] rounded-md hover:cursor-pointer hover:text-black"
                onClick={Delete}
                >
                    Delete
                </button>
            </div>
        </div>
        </>
    );
}


export default ProjectCard;