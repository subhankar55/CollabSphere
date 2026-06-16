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