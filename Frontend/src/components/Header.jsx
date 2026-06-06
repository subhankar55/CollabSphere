import React, { useState } from "react";
import { NavLink,Link } from "react-router-dom";
import { useAuth } from "../context";
import {FaUserCircle} from "react-icons/fa"


function Header(){


    const {username} = useAuth();
    const [open,setOpen] = useState(false);
    const logout = () => {

    }


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
                                        <div className="absolute top-[2em] right-0 md:top-auto md:right-0 rounded-md h-[15vh] md:h-[15vh] w-[25%] md:w-[15%] bg-gray-700 border-[0.05em] border-white z-50 p-[0.5em] shadow-white shadow-md">
                                            <div className="m-[0.05em]">
                                                <p className="text-white text-center">
                                                    {username}
                                                </p>
                                            </div>
                                            <button
                                                onClick={logout}
                                                className="text-cyan-200 block mx-auto"
                                            >
                                            Logout
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