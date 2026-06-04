import React from "react";
import {Link} from "react-router-dom";



function Register(){

    return(
        <>
            <div className="bg-black min-h-screen w-full px-[2em] py-[5em]">

                <div className="h-[75vh] w-full md:w-[50%] bg-cyan-900 mx-auto rounded-3xl border-[0.01em] border-cyan-400 shadow-[0_0_20px_rgba(103,232,249,0.8)] p-[1em] overflow-auto">
                    <form 
                    action="" 
                    method="post"
                    className="w-full h-full flex flex-col items-center justify-center p-[0.01em]"
                    >
                        <input 
                        type="text" 
                        placeholder="Enter Username" 
                        className="bg-white w-[90%] md:w-[70%] h-[12%] rounded-2xl p-[1em] m-[1em]"
                        />
                        <input 
                        type="text" 
                        placeholder="Enter password" 
                        className="bg-white w-[90%] md:w-[70%] h-[12%] rounded-2xl p-[1em] m-[1em]"
                        />
                        <input 
                        type="text" 
                        placeholder="Confirm password" 
                        className="bg-white w-[90%] md:w-[70%] h-[12%] rounded-2xl p-[1em] m-[1em]"
                        />
                        <button 
                        type="submit"
                        className="bg-green-600 hover:bg-green-500 text-white px-[1em] py-[0.5em] rounded-2xl m-[1em] border-[0.01em] border-green-200 shadow-md shadow-green-100 hover:cursor-pointer "
                        >
                            Register
                        </button>
                        <p className="text-white">
                            Already Registered?{" "}
                            <Link
                                to="/login"
                                className="text-blue-300"
                            >
                                login
                            </Link>
                        </p>
                    </form>
                </div>

            </div>
        </>
    )
};


export default Register;