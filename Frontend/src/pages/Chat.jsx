import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { allChats, createChat } from "../services/chatData.js";
import socket from "../services/socket.js";
import { useNavigate } from "react-router-dom";
import ChatCard from "../components/ChatCard.jsx"



function Chat({workspaceid,members}){

    const [chats,setChats] = useState([]);
    const [message,setMessage] = useState("");
    const navigate = useNavigate();
    const [typer,setTyper] = useState("");



    useEffect(() => {
        allChats(workspaceid)
        .then((result) => {
            console.log(result);
            setChats(result.data);
        })
        .catch((err) => {
            console.log(err.message);
        });
    },[])

    useEffect(() => {
        const chathandler = (data) => {
            setChats((prev) => [...prev,data]);
        }

        socket.on("newChat",chathandler);

        return () => {
            socket.off("newChat",chathandler);
        }
    },[])

    const handleMessage = (e) => {
        setMessage(e.target.value);

        socket.emit("typing",{workspaceid});
    }

    const makeChat = (e) => {
        e.preventDefault();

        createChat(workspaceid,message)
        .then((result) => {
            console.log(result);
        })
        .catch((err) => {
            navigate("/message",
                {
                    state:{
                        message:err.message || "Something went wrong!"
                    }
                }
            )
        });
    }

    useEffect(() => {
        let timeout;

        const handleTyping = (data) => {
            setTyper(data.username);
            clearTimeout(timeout);

            timeout = setTimeout(() => {
                setTyper("");
            },1000);
        }

        socket.on("userTyping",handleTyping);

        return () => {
            clearTimeout(timeout);
            socket.off("userTyping",handleTyping);
        }
    },[])

    useEffect(() => {
        if(!workspaceid) return;

        socket.emit("joinWorkspace",{workspaceid});
    },[])

    return(
        <>
            <div className="flex flex-col gap-[0.5em] h-full w-full">
                <div>
                    {
                        typer.trim() &&
                        <h1>
                            {typer} typing...
                        </h1>
                    }
                </div>

                <div>
                    {
                    chats.length > 0 &&
                    chats.map((chat) => {
                        return(
                            <ChatCard
                            key={chat._id}
                            chat={chat}
                            members={members}
                            />
                        )
                    })
                }
                </div>
                
                

                <div className="w-[95%] bottom-[0.3em] bg-gray-600 rounded-4xl p-[0.5em] mx-auto">
                    <form 
                    action="" 
                    method="post"
                    className="w-full flex items-center justify-center"
                    onSubmit={makeChat}
                    >
                        <input 
                        type="text"
                        placeholder="Chat.." 
                        value={message}
                        className="w-[90%]"
                        onChange={handleMessage}
                        />
                        <button 
                        type="submit"
                        className="hover:cursor-pointer hover:text-cyan-500"
                        >
                            Send
                        </button>
                    </form>
                </div>
                
            </div>  
        </>
    );
}


export default Chat;