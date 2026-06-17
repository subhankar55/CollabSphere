import axios from "axios";


export const createTask = async function(description,username,deadline,priority,url,projectid){
    try{
        const res = await axios.post(`http://localhost:3000/collabsphere/api/v1/task/createTask/${projectid}`,
            {
                description:description,
                assignedTo:username,
                deadline:deadline,
                priority:priority,
                platformlink:url
            },
            {
                withCredentials:true
            }
        );
        console.log(res);
        return res.data;
    }catch(error){
        return error.message;
    }
}



export const getAllTasks = async function(projectid){
    try{
        const res = await axios.get(`http://localhost:3000/collabsphere/api/v1/task/allTasks/${projectid}`,
            {
                withCredentials:true
            }
        );
        console.log(res);
        return res.data;

    }catch(error){
        console.log(error);
        throw new Error(error.message);
    }


}


export const updateTask = async function(description,deadline,priority,url,taskid){
    try{
        const res = await axios.patch(`http://localhost:3000/collabsphere/api/v1/task/updateTask/${taskid}`,
            {
                description:description,
                deadline:deadline,
                priority:priority,
                platformlink:url
            },
            {
                withCredentials:true
            }
        );
        console.log(res);
        return res.data;
    }catch(error){
        throw new Error(error);
    }

}


export const reviewTask = async function(taskid){
    try{
        const res = await axios.patch(`http://localhost:3000/collabsphere/api/v1/task/updateToReview/${taskid}`,
            {},
            {
                withCredentials:true
            }
        );
        console.log(res);
        return res.data;
    }catch(error){
        throw new Error(error);
    }
}


export const doneTask = async function(taskid) {
    try {
        const res = await axios.patch(`http://localhost:3000/collabsphere/api/v1/task/updateToCompleted/${taskid}`,
            {},
            {
                withCredentials:true
            }
        );
        console.log(res);   
        return res.data;
    } catch (error) {
        throw new Error(error);
    
    }
}


export const deleteTask = async function(taskid){
    try{
        const res = await axios.delete(`http://localhost:3000/collabsphere/api/v1/task/deleteTask/${taskid}`,
            {
                withCredentials:true
            }
        );
        console.log(res);
        return res.data;
    }catch(error){
        throw new Error(error);
    }

}