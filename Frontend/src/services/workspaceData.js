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


export const createProject = async function(workspaceid,name) {
    try {
        const res = await axios.post(`http://localhost:3000/collabsphere/api/v1/workspace/${workspaceid}/project/create`,
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



export const deleteProject = async function(workspaceid,projectid){
    try {
        const res = await axios.delete(`http://localhost:3000/collabsphere/api/v1/workspace/${workspaceid}/project/${projectid}/delete`,
            {
                withCredentials:true
            }
        );
        return res.data;
    } catch (error) {
        return error.message;
    
    }
}

export const allProjects = async function(workspaceid){
    try {
        const res = await axios.get(`http://localhost:3000/collabsphere/api/v1/workspace/${workspaceid}/projects`,
            {
                withCredentials:true
            }
        );
        return res.data;
    } catch (error) {
        throw new Error(error.message);
    
    }
}


export const inviteUser = async function(workspaceid,username){
    try{
        const res = await axios.post(`http://localhost:3000/collabsphere/api/v1/workspace/${workspaceid}/invite`,{
            username
        },
        {
            withCredentials:true
        })

        return res.data;
    }catch(error){
        return error.message;
    }
}

export const allInvitations = async function(){
    try{
        const res = await axios.get(`http://localhost:3000/collabsphere/api/v1/workspace/invitations`,{
            withCredentials:true
        
        }
        );
        console.log(res);
        return res.data;

    }catch(error){
        throw new Error(error.message);
    
    }
}

export const allMembers = async function(workspaceid) {
    try {
        const res = await axios.get(`http://localhost:3000/collabsphere/api/v1/workspace/${workspaceid}/users`,
            {
                withCredentials:true
            }
        );
        return res.data;
    
    } catch (error) {
        throw new Error(error.message);
    
    }
}


export const workspaceById = async function(workspaceid){

    try {
        
        const res = await axios.get(`http://localhost:3000/collabsphere/api/v1/workspace/${workspaceid}`,{
            withCredentials:true
        });
        return res.data;
    } catch (error) {
        throw new Error(error.message);
    
    }
}