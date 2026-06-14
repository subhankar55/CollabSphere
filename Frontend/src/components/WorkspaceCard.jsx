import React from "react";


function WorkspaceCard({workspace}){

    const enter = (workspaceid) => {

    }

    const Delete = (workspaceid) => {

    }



    return(
        <>
        <div className="bg-gray-700 w-[90%] mx-auto p-[1em] rounded-lg">
            <div className="text-white text-center">
                {workspace.name}
            </div>
            <div className="text-white text-center">
                {workspace.role}
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center gap-[1em] my-[0.5em]">
                <button
                className="bg-green-500 px-[0.5em] rounded-md text-white"
                onClick={() => enter(workspace.workspaceid)}
                >
                    Enter
                </button>
                <button
                className="bg-red-400 px-[0.5em] rounded-md text-white"
                onClick={() => Delete(workspace.workspaceid)}
                >
                    Delete
                </button>
            </div>
        </div>
        </>
    )
}

export default WorkspaceCard;