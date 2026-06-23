import React, { useState } from "react";
import { NavLink,Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext.js";
import {FaUserCircle} from "react-icons/fa";
import { logout,del } from "../services/authData.js";


function Header(){


    const {username,updateUsername} = useAuth();
    const navigate = useNavigate();
    
    const [open,setOpen] = useState(false);
    const Logout = () => {
        logout()
        .then((result) => {
            console.log(result);
            updateUsername("");
            navigate("/message",{
                state:{
                    message:result
                }
            });
        })
        .catch((err) => {
            navigate("/message",{
                state:{
                    message:err
                }
            });
        })
    }

    const Delete = () => {
        del()
        .then((result) => {
            updateUsername("");
            navigate("/message",{
                state:{
                    message:result
                }
            });
        })
        .catch((err) => {
            navigate("/message",{
                state:{
                    message:err.message
                }
            })
        });
    }

    const dashboard = (e) => {
        e.preventDefault();

        navigate("/dashboard");
    }

    console.log(username);
    console.log(typeof username);

    return(
        <>
            <header className="w-full">
                <div className="bg-black p-[1em]">
                    <nav className="bg-black relative p-[0.5em] md:border-[0.001em] rounded-sm md: border-cyan-300 ">
                        <div className="flex gap-[0.1em] md:gap-[1em] flex-col md:flex-row md:justify-center">
                        <NavLink
                            to = "/"
                            className={
                                ({isActive}) =>{
                                    return isActive 
                                    ? "text-cyan-400" 
                                    : "text-white"
                                }
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to = "/docs"
                            className={
                                ({isActive}) =>{
                                    return isActive 
                                    ? "text-cyan-400" 
                                    : "text-white"
                                }
                            }
                        >
                            Docs
                        </NavLink>
                        <NavLink
                            to = "/workspace"
                            className={
                                ({isActive}) =>{
                                    return isActive 
                                    ? "text-cyan-400" 
                                    : "text-white"
                                }
                            }
                        >
                            Workspace
                        </NavLink>
                        <NavLink
                            to = "/pricing"
                            className={
                                ({isActive}) =>{
                                    return isActive 
                                    ? "text-cyan-400" 
                                    : "text-white"
                                }
                            }
                        >
                            Pricing
                        </NavLink>
                        </div>
                        {
                        !username?.trim() ? 
                        (<Link 
                         to="/login"
                         className="text-white absolute right-[1em] top-[0.4em] hover:text-cyan-400"
                        >
                            Login
                        </Link>)
                        : 
                        (
                            <>
                                <button 
                                className="text-white text-3xl absolute right-[0.5em] top-[0.15em] hover:cursor-pointer"
                                onClick={() => setOpen(!open)}
                                >
                                    <FaUserCircle/>
                                </button>
                                {
                                    open && (
                                        <div className="absolute top-[2em] right-0 md:top-auto md:right-0 rounded-md h-[20vh] md:h-[20vh] w-[38%] md:w-[15%] bg-gray-700 border-[0.05em] border-white z-50 p-[0.5em] shadow-white shadow-md">
                                            <div className="m-[0.05em]">
                                                <p className="text-white text-center">
                                                    {username}
                                                </p>
                                            </div>
                                            <button
                                                onClick={Logout}
                                                className="text-cyan-200 block mx-auto hover:cursor-pointer"
                                            >
                                            Logout
                                            </button>
                                            <button
                                                onClick={Delete}
                                                className="text-red-600 block mx-auto hover:cursor-pointer"
                                            >
                                                Delete
                                            </button>
                                            <button
                                            onClick={dashboard}
                                            className="text-orange-500 block mx-auto hover:cursor-pointer"
                                            >
                                                Dashboard
                                            </button>
                                        </div>
                                    )
                                }

                            </>
                        
                        
                        )
                        }
                    </nav>
                </div>
            </header>
        </>
    );
}

export default Header;