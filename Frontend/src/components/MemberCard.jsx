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
        </div>

        </>
    );
}

export default MemberCard;