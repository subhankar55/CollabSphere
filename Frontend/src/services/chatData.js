import axios from "axios";

export const createChat = async (workspaceid,message) => {
    try {
        const res = await axios.post(`http://localhost:3000/collabsphere/api/v1/chat/createChat/${workspaceid}`,{
            message:message
        },
        {
            withCredentials:true
        }
    );
    console.log(res);
    return res.data
    } catch (error) {
        throw new Error(error.message);
    }
}


export const allChats = async (workspaceid) => {
    try {
        const res = await axios.get(`http://localhost:3000/collabsphere/api/v1/chat/allChats/${workspaceid}`,
            {
                withCredentials:true
            },
        );

        console.log(res);
        return res.data;
    } catch (error) {
        throw new Error(error.message);
    }
}