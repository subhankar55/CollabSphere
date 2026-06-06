import React from "react";
import { useLocation } from "react-router-dom";



function Message(){

    const location = useLocation();

    return(

        <>
        <div className="bg-black min-h-screen w-full">
            <div className="py-[5em]">
                <p className="text-white text-center">
                    {JSON.stringify(location.state?.message)}
                </p>
            </div>
        </div>
        
        </>
    );
}


export default Message;