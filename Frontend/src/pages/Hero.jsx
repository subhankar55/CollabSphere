import React from "react";
import bgimage from "../assets/HeroBg.jpg";
import { motion } from "framer-motion";
import {useMediaQuery} from "react-responsive";
import { useNavigate } from "react-router-dom";





function Hero(){

const isMobile = useMediaQuery({maxWidth: 768});
const navigate = useNavigate();

const toRegister = (e) => {

    e.preventDefault();

    navigate("/register");

}

    return(
        <div>
            <div className="min-h-screen relative">
                <div className="absolute inset-0 bg-black">
                    <div className="min-h-screen flex flex-col items-center justify-center gap-[4em]">
                        <div>
                            <button
                            onClick={toRegister}
                            className="text-white bg-orange-600 px-[0.5em] rounded-lg hover:cursor-pointer hover:bg-orange-900 hover:text-cyan-200"
                            >
                                Register
                            </button>
                        </div>
                        <motion.div className="h-[70vh] w-[90%] md:w-[60%] bg-cover bg-center border-2 border-cyan-400 rounded-lg relative overflow-y-auto"
                            style={{
                                backgroundImage:`url(${bgimage})`,
                                backgroundBlendMode:"multiply"
                            }}
                            animate={{
                                boxShadow: isMobile ?
                                [
                                    "0 0 5px #22d3ee",
                                    "0 0 20px #22d3ee",
                                    "0 0 5px #22d3ee",
                                ]
                                :[
                                    "0 0 10px #22d3ee",
                                    "0 0 40px #22d3ee",
                                    "0 0 10px #22d3ee",
                                ],
                            }} 
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                            }}
                        >
                            <div className="absolute inset-0 bg-black/40 z-0">  
                            </div>
                            <div className="relative z-10">
                                <h1 className="text-white text-center my-[1em] font-bold">Product Description</h1>
                                <p className="text-white p-[1em]">
                                    CollabSphere is a comprehensive AI-powered collaboration platform built to simplify the way teams plan, manage, and deliver projects. It provides a centralized workspace where organizations, startups, development teams, and freelancers can collaborate efficiently without relying on multiple disconnected tools. Users can create workspaces, organize projects, assign tasks with priorities and deadlines, communicate through real-time chat, and receive instant notifications for important project updates. With secure role-based access control, every team member has the appropriate level of access, ensuring smooth and organized collaboration. The integrated AI Assistant helps teams generate tasks, streamline project planning, and improve productivity with intelligent workflow suggestions, while the analytics dashboard offers valuable insights into project progress, team activity, and task completion. Whether you're managing a small personal project or coordinating a large team, CollabSphere provides everything you need to stay organized, communicate effectively, and deliver high-quality results from one modern, intelligent platform.
                                </p>
                            </div>
                            
                        </motion.div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}


export default Hero;


