import React, { useEffect, useState } from "react";
import { getUserById } from "../services/authData.js";
import { workspaceById } from "../services/workspaceData.js";



function InvitationCard({invitation}){

    const [sender,setSender] = useState("");
    const [workspace,setWorkspace] = useState("");
    const senderid = invitation.senderid;
    const workspaceid = invitation.workspaceid;

    useEffect(()=>{
        getUserById(senderid)
        .then((result)=>{
            console.log(result);
            setSender(result.data?.username);
        })
        .catch((err)=>{
            console.log(err);
        })
    },[]);

    useEffect(() => {
        workspaceById(workspaceid)
        .then((result) => {
            console.log(result);
            setWorkspace(result.data?.name);
        })
        .catch((err) => {
            console.log(err);
        })
    },[]);

    const join = () => {

    }

    const reject = () => {

    }

    return(
        <>
        <div className="bg-gray-700 w-[98%] md:w-[80%] mx-auto my-[0.3em] p-[0.2em] rounded-lg">
            <h1 className="text-white text-center">
                You are invited to {workspace}!
            </h1>
            <h1 className="text-white text-center">
                Sent by {sender}.
            </h1>
            <div className="flex gap-[2em] items-center justify-center m-[0.5em]">
                <button
                onClick={join}
                className="bg-green-500 px-[0.5em] text-white rounded-md hover:cursor-pointer hover:text-black"
                >
                    Join
                </button>
                <button
                onClick={reject}
                className="bg-red-500 px-[0.5em] text-white rounded-md hover:cursor-pointer hover:text-black"
                >
                    Reject
                </button>
            </div>
        </div>
        </>
    );
}


export default InvitationCard;