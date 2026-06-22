import React from "react";


function ChatCard({chat,members}){

    const readByAll = chat.readby?.length == (members - 1);

    return(
        <>
            <div className="bg-gray-800 w-[95%] mx-auto my-[0.5em] rounded-md p-[0.5em]">
                <h1 className="text-white">
                    {new Date(chat.createdAt).toLocaleString("en-IN",
                    {
                    timeZone: "Asia/Kolkata"
                    }
                )
                }
                </h1>
                <h1 className="text-white">
                    {chat.sender}
                </h1>
                <p className="text-white">
                    {chat.message}
                </p>
                {
                    !readByAll &&
                    <span className="text-xs text-blue-500">
                         ✓
                    </span>
                }
                {
                    readByAll &&
                    <span className="text-xs text-blue-500">
                         ✓✓
                    </span>
                }
            </div>
        </>
    );
}

export default ChatCard;