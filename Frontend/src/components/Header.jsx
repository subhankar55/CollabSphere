import React from "react";
import { NavLink } from "react-router-dom";


function Header(){

    return(
        <>
            <header className="w-full">
                <div className="bg-black p-[1em]">
                    <nav className="bg-black relative p-[0.5em] border-[0.001em] rounded-sm border-cyan-300 ">
                        <div className="flex gap-[1em] justify-center">
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
                        <button className="text-white absolute right-[1em] top-[0.4em]">
                            Login
                        </button>
                    </nav>
                </div>
            </header>
        </>
    );
}

export default Header;