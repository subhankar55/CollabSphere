import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getAllworkspaces, 
        getWorkspaceByname, 
        createWorkspace,
        allInvitations 

} from "../services/workspaceData.js";
import WorkspaceCard from "../components/WorkspaceCard.jsx";
import InvitationCard from "../components/InvitationCard.jsx";
import { useNavigate } from "react-router-dom";

function Workspace(){

    const [open,setOpen] = useState(false);
    const [workspacename,setWorkspacename] = useState("");
    const [workspaces,setWorkspaces] = useState([]);
    const [errorWorkspacename,setErrorWorkspacename] = useState("")
    const [invitations,setInvitations] = useState([]);

    const navigate = useNavigate();

    const handleWorkspacename = (e) => {
        setWorkspacename(e.target.value);
    }


    const makeWorkspace = (e) => {
        e.preventDefault();

        if(errorWorkspacename?.trim()) {
            alert("Workspacename exists!");
            return;
        }

        createWorkspace(workspacename)
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

    useEffect(() => {
        getAllworkspaces()
        .then((result) => {
            console.log(result);
            setWorkspaces(result.data);
        })
        .catch((error) => {
            console.log(error);
        })
    },
    []);


    useEffect(() => {
        allInvitations()
        .then((result) => {
            console.log(result);
            setInvitations(result.data);
        })
        .catch((error) => {
            console.log(error);
        })
    },
    []);


    useEffect(() => {
        getWorkspaceByname(workspacename)
        .then((result) => {
            if(result.data){
                setErrorWorkspacename("Workspacename exists!");
            }
            else {
                setErrorWorkspacename("");
            }
        })
    },[workspacename]);

    

    return(
        <>
            <div className="min-h-screen bg-black">

                <div className="p-[2em]">
                    <motion.button
                    className="text-white block mx-auto  bg-pink-900 p-[0.4em] rounded-lg text-xl hover:cursor-pointer hover:text-black"
                    initial={{scale:0}}
                    animate={{scale:1}}
                    onClick={() => {setOpen(!open);}}
                    >
                        Create Workspace
                    </motion.button>
                    {
                        open && <div className="bg-gray-400 w-[95%] md:w-[30%] h-[8vh] mx-auto my-[1em] rounded-md ">
                            <form
                            action="" 
                            method="post"
                            onSubmit={makeWorkspace}
                            className="flex p-[0.5em] items-center justify-center"
                            >
                                <input type="text" 
                                placeholder="Enter workspace name"
                                value={workspacename}
                                onChange={handleWorkspacename}
                                className="bg-white w-[90%] h-[5vh] border-none rounded-md p-[0.5em]"
                                />
                                <button 
                                type="submit"
                                className="bg-green-700 py-[0.1em] px-[0.5em] rounded-md hover:cursor-pointer text-white"
                                >
                                    create
                                </button>
                            </form>
                            {
                                errorWorkspacename?.trim() && 
                                <h2 className="text-red-500 text-center">
                                    {errorWorkspacename}
                                </h2>
                            }
                        </div>
                    }
                </div>
                <div className="h-[80vh] w-[90%] md:w-[70%] mx-auto flex flex-col md:flex-row gap-[2em]">
                     <div
                     className="h-full w-full bg-black border-[0.01em] border-cyan-500 overflow-auto "
                     >
                        <h2 className="text-cyan-200 text-center text-lg p-[1em]">
                            Workspaces
                        </h2>
                        {   workspaces?.length > 0 &&
                            workspaces.map((workspace) => {
                                return(
                                    <WorkspaceCard
                                    key={workspace.id}
                                    workspace={workspace}
                                    />
                                )
                                
                            })
                        }
                        {
                            (!workspaces || workspaces.length <= 0) &&
                            <h2 className="text-white text-center">
                                No workspaces to show!
                            </h2>
                        }
                     </div>

                     <div
                     className="h-full w-full bg-black border-[0.01em] border-cyan-500 overflow-auto"
                     >
                        <h2 className="text-cyan-200 text-center text-lg p-[1em]">
                            Invitations!
                        </h2>
                        {   invitations?.length > 0 &&
                            invitations.map((invitation) => {
                                return(
                                    <InvitationCard
                                    key={invitation._id}
                                    invitation={invitation}
                                    />
                                )
                                
                            })
                        }
                     </div>
                </div>

            </div>
        </>
    );
}

export default Workspace;