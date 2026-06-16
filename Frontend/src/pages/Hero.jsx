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
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi voluptates illo ducimus inventore rem? Accusamus placeat porro sint ducimus similique unde pariatur ullam voluptate velit. Aliquid ea facere enim odit?
                                    Pariatur excepturi culpa nulla deserunt voluptas quas explicabo, quo corrupti labore reprehenderit repellendus cum sit repellat voluptate modi vero amet eaque nisi. Eos nemo, maiores aliquid quo accusantium omnis ullam!
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


