import React, { useState } from "react";
import { useLocation } from "react-router-dom";


function Project(){

    const location = useLocation();
    const [projectname,setProjectname] = useState("");

    const handleProjectname = () => {

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
                        <div className="text-white h-[85vh] w-[80%] md:w-[25%] border-[0.1em] border-cyan-300 ">
                            <h1 className="text-center text-white">
                                Projects
                            </h1>
                        </div>
                        <div className="text-white h-[85vh] w-[80%] md:w-[65%] border-[0.1em] border-cyan-300">
                            <h1 className="text-white text-center">
                                Chat
                            </h1>
                        </div>
                    </div>
                    <div className="bg-gray-200 w-[80%] md:w-[35%] mx-auto mt-[1em] p-[0.1em] rounded-lg overflow-auto">
                        <form 
                        action="" 
                        method="post"
                        className="m-[0.5em] flex flex-col md:flex-row items-center justify-center gap-[1em]"
                        >
                            <input type="text"
                            placeholder="Username"
                            value={projectname}
                            onChange={handleProjectname}
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