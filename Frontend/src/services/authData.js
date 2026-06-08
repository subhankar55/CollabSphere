import axios from "axios";


export const authInfo = async function(){
    try{
        const res = await axios.get(`http://localhost:3000/collabsphere/api/v1/auth/user`,
            {
                withCredentials:true
            }
        );
        return res.data;
    }catch(err){

        if(err.response?.status === 401){
            await axios.get(`http://localhost:3000/collabsphere/api/v1/auth/refresh`,
                {
                    withCredentials:true
                }
            );
            const result = await axios.get(`http://localhost:3000/collabsphere/api/v1/auth/user`,
                {
                    withCredentials:true
                }
            );
            return result.data;
        }

        throw new Error(err.message);
    
    }

} 



export const login = async function(username,password){

    try {
        const res = await axios.post(
            `http://localhost:3000/collabsphere/api/v1/auth/login`,
            {
            username,
            password
            },
            {
                withCredentials:true
            }
    );

        return res.data;
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
    
}


export const register = async function(username,password){
    try {
        const res = await axios.post(
            `http://localhost:3000/collabsphere/api/v1/auth/register`,
            {
                username,
                password
            },
            {
                withCredentials:true
            }
        );
        return res.data.message;
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}



export const logout = async function(){
    try {
        const res = await axios.get(`http://localhost:3000/collabsphere/api/v1/auth/logout`,{
            withCredentials:true     
        })
        return res.data.message;
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}

export const del = async function(){
    try {
        const res = await axios.delete(`http://localhost:3000/collabsphere/api/v1/auth/delete`,{
            withCredentials:true
        })
        return res.data.message;
    } catch (error) {
        console.log(error);
        return error.message;
    }
}

export const duplicityCheck = async function(username){
    try {
        const res = await axios.post(`http://localhost:3000/collabsphere/api/v1/auth/isduplicate`,{
            username
        },
    {
        withCredentials:true
    })
    return res.data;
    } catch (error) {
        console.log(error);
        throw new Error("Username duplicity check failed!");
    }
}