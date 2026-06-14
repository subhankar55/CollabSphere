import axios from "axios";


export const createWorkspace = async function (name){
    try {
        const res = await axios.post(`http://localhost:3000/collabsphere/api/v1/workspace/create`,
            {
                name
            },
            {
                withCredentials:true
            }
        );
        return res.data;
    } catch (error) {
        return error.message;
    }
}

export const getAllworkspaces = async function(){

    try {
        const res = await axios.get(`http://localhost:3000/collabsphere/api/v1/workspace/allworkspaces`,
            {
                withCredentials:true
            }
        );
        return res.data;
        
    } catch (error) {
        throw new Error(error.message);
    }
}


export const getWorkspaceByname = async function(name){
    try{
        const res = await axios.post(`http://localhost:3000/collabsphere/api/v1/workspace/getWorkspace`,
            {
                name
            },
            {
                withCredentials:true
            }
        );
        return res.data;

    }catch(error){
        throw new Error(error.message);
    }
}