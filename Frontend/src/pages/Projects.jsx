import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { allMembers, allProjects, 
        createProject, 
        inviteUser
    } from "../services/workspaceData";
import ProjectCard from "../components/ProjectCard";
import MemberCard from "../components/MemberCard";
import Chat from "./Chat.jsx";


function Project(){

    const location = useLocation();
    const navigate = useNavigate();
    const [projectname,setProjectname] = useState("");
    const [projects,setProjects] = useState([]);
    const [username,setUsername] = useState("");
    const [members,setMembers] = useState([]);

    const handleProjectname = (e) => {
        setProjectname(e.target.value);
    }

    const makeProject = (e) => {
        e.preventDefault();

        createProject(location.state?.workspaceid,projectname)
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
                    message:err.message
                }
            })
        });
    }

    useEffect(() => {

        allProjects(location?.state?.workspaceid)
        .then((result) => {
            console.log(result);
            setProjects(result.data);
        })
        .catch((err) => {
            console.log(err.message);
        });

    },[])


    useEffect(() => {

        allMembers(location?.state?.workspaceid)
        .then((result) => {
            console.log(result);
            setMembers(result.data);
        })
        .catch((err) => {
            console.log(err.message);
        });

    },[])

    const handleUsername = (e) => {
        setUsername(e.target.value);
    }

    const invite = (e) => {
        e.preventDefault();

        inviteUser(location.state?.workspaceid,username)
        .then((result) => {
            console.log(result);
            navigate("/message",{
                state:{
                    message:result.message
                }
            })
        })
        .catch((err) => {
            navigate("/message",{
                state:{
                    message:err.message
                }
            })
        });
    }

    return(
        <>
            <div className="min-h-screen bg-black p-[1em]">
                <div className="bg-black w-full  bg-cover">
                    <h1 className="text-cyan-500 text-center text-2xl p-[1em]">
                       Workspace: {location.state?.name}
                    </h1>
                    <div className="bg-gray-200 w-[80%] md:w-[35%] mx-auto my-[1em] p-[0.1em] rounded-lg overflow-auto">
                        <form 
                        action="" 
                        method="post"
                        onSubmit={makeProject}
                        className="m-[0.5em] flex flex-col md:flex-row items-center justify-center gap-[1em]"
                        >
                            <input type="text"
                            placeholder="Project name"
                            value={projectname}
                            onChange={handleProjectname}
                            className="bg-white p-[0.1em] w-[95%] md:w-[60%]"
                            />
                            <button 
                            type="submit"
                            className="bg-green-500 text-white rounded-md px-[0.5em] hover:cursor-pointer"
                            >
                                Create
                            </button>
                        </form>
                    </div>
                    <div className="flex flex-col md:flex-row gap-[1em] justify-center items-center">
                        <div className="text-white h-[85vh] w-[80%] md:w-[25%] border-[0.1em] border-cyan-300 rounded-md overflow-auto">
                            <h1 className="text-white text-center">
                                Members
                            </h1>
                            {
                                members.length > 0 && 
                                members.map((member) => {
                                    return(
                                        <MemberCard
                                        key={member.userid}
                                        member={member}
                                        workspaceid={location.state?.workspaceid}
                                        />
                                    )
                                })
                            }
                        </div>
                        <div className="text-white h-[85vh] w-[80%] md:w-[45%] border-[0.1em] border-cyan-300 rounded-md overflow-auto">
                            <h1 className="text-center text-white">
                                Projects
                            </h1>
                            {
                                projects.length > 0 && 
                                projects.map((project) => {
                                    return(
                                        <ProjectCard
                                        key={project._id}
                                        projectname={project.projectname}
                                        userid={project.created_by}
                                        projectid={project._id}
                                        workspaceid={location.state?.workspaceid}
                                        />
                                    )
                                })
                            }
                        </div>
                        <div className="text-white h-[85vh] w-[80%] md:w-[55%] border-[0.1em] border-cyan-300 rounded-md overflow-auto">
                            <h1 className="text-white text-center">
                                Chat
                            </h1>
                            <Chat
                            workspaceid={location.state?.workspaceid}
                            members={members.length}
                            />
                        </div>
                    </div>
                    <div className="bg-gray-200 w-[80%] md:w-[35%] mx-auto mt-[1em] p-[0.1em] rounded-lg overflow-auto">
                        <form 
                        action="" 
                        method="post"
                        onSubmit={invite}
                        className="m-[0.5em] flex flex-col md:flex-row items-center justify-center gap-[1em]"
                        >
                            <input type="text"
                            placeholder="Username"
                            value={username}
                            onChange={handleUsername}
                            className="bg-white p-[0.1em] w-[95%] md:w-[60%]"
                            />
                            <button 
                            type="submit"
                            className="bg-green-500 text-white rounded-md px-[0.5em] hover:cursor-pointer"
                            >
                                Invite
                            </button>
                        </form>
                    </div>
                </div>
                
            </div>
        </>
    );
}



export default Project;