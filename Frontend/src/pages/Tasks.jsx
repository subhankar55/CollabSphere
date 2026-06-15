import React from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";



function Tasks(){

    const location = useLocation();
    const [open,setOpen] = useState(false);



    return(
        <>
        <div className="bg-black min-h-screen w-full">
            <div className="h-full w-full p-[1em]">
                <h1 className="text-cyan-300 text-center text-lg">
                    Project : {location.state?.projectname}
                </h1>
                <div className="bg-gray-200 w-[80%] md:w-[35%] mx-auto my-[1em] p-[0.1em] rounded-lg overflow-auto">
                        <form 
                        action="" 
                        method="post"
                        className="m-[0.5em] flex flex-col md:flex-row items-center justify-center gap-[1em]"
                        >
                            <input type="text"
                            placeholder="Ask gemini"
                            className="bg-white p-[0.1em] w-[95%] md:w-[60%]"
                            />
                            <button 
                            type="submit"
                            className="bg-green-500 text-white rounded-md px-[0.5em] hover:cursor-pointer"
                            >
                                Send
                            </button>
                        </form>
                    </div>
                <button
                className="bg-orange-500 px-[0.5em] rounded-md hover:cursor-pointer hover:text-black ml-[3em] my-[2em]"
                >
                    Notification
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
                        className="m-[0.5em] flex flex-col md:flex-row items-center justify-center gap-[1em]"
                        >
                            <input type="text"
                            placeholder="Task name"
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
                    </div>
                }
                <div className="h-[70vh] w-[95%] md:w-[60%] border-[0.1em] border-cyan-300 rounded-lg mx-auto my-[1em]">
                    <h1 className="text-white text-center p-[0.5em] m-[0.5em]">
                        Tasks
                    </h1>
                </div>
            </div>
        </div>
        
        </>
    );
}



export default Tasks;