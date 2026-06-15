import React from "react";


function MemberCard({member}){

    return(
        <>
        <div className="bg-gray-700 w-[90%] mx-auto my-[0.5em] p-[0.5em] rounded-md">
            <h1 className="text-white text-center">
                Username : {member.username}
            </h1>
            <h2 className="text-white text-center">
                Role: {member.role}
            </h2>
            <div className="flex gap-[2em] items-center justify-center">
                <button className="bg-green-500 px-[0.5em] rounded-md hover:cursor-pointer hover:text-black">
                    up
                </button>
                <button className="bg-red-500 px-[0.5em] rounded-md hover:cursor-pointer hover:text-black">
                    down
                </button>
            </div>
        </div>

        </>
    );
}

export default MemberCard;