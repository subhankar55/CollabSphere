import React from "react";
import bgimage from "../assets/HeroBg.jpg";

function Hero(){


    return(
        <div>
            <div className="min-h-screen relative">
                <div className="absolute inset-0 bg-black">
                    <div className="min-h-screen flex items-center justify-center">
                        <div className="h-[70vh] w-[60%] bg-cover bg-center border-4 border-white rounded-lg relative"
                            style={{
                                backgroundImage:`url(${bgimage})`,
                                backgroundBlendMode:"multiply"
                            }} 
                        >
                            <div className="absolute inset-0 bg-black opacity-30">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}


export default Hero;


