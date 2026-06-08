import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import { login } from "../services/authData.js";


function Login(){

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    const handle_username = (e) => {
        setUsername(e.target.value);
    }
    const handle_password = (e) => {
        setPassword(e.target.value);
    }

    const userlogin = (e) => {
        e.preventDefault();


        login(username,password)
        .then((result) => {
            console.log(result);
            navigate("/message",{
            state:{
                message:result
            }
        })
        })
        .catch((err) => {
            console.log(err);
            navigate("/message",{
            state:{
                message:err
            }
        })
        })       

    }


    return(

        <>
            <div className="bg-black min-h-screen w-full px-[2em] py-[6em]">

                <div className="h-[60vh] w-[98%] md:w-[50%] bg-cyan-900 mx-auto rounded-3xl border-[0.01em] border-cyan-400 shadow-[0_0_20px_rgba(103,232,249,0.8)] p-[1em]">
                    <form 
                    action="" 
                    method="post"
                    onSubmit={userlogin}
                    className="w-full h-full flex flex-col items-center justify-center p-[0.01em]"
                    >
                        <input 
                        type="text" 
                        placeholder="Enter Username"
                        value={username} 
                        onChange={handle_username}
                        className="bg-white w-[90%] md:w-[70%] h-[12%] rounded-2xl p-[1em] m-[1em]"
                        />
                        <input 
                        type="password" 
                        placeholder="Enter password" 
                        value={password}
                        onChange={handle_password}
                        className="bg-white w-[90%] md:w-[70%] h-[12%] rounded-2xl p-[1em] m-[1em]"
                        />
                        <button 
                        type="submit"
                        className="bg-green-600 hover:bg-green-500 text-white px-[1em] py-[0.5em] rounded-2xl m-[1em] border-[0.01em] border-green-200 shadow-md shadow-green-100 hover:cursor-pointer "
                        >
                            Login
                        </button>
                        <p className="text-white">
                            No account?{" "}
                            <Link
                                to="/register"
                                className="text-blue-300"
                            >
                                Register
                            </Link>
                        </p>
                    </form>
                </div>

            </div>
        </>
    );
}


export default Login;