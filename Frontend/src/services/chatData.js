import axios from "axios";

export const createChat = async (workspaceid,message) => {
    try {
        const res = await axios.post(`http://${import.meta.env.VITE_SERVER}/collabsphere/api/v1/chat/createChat/${workspaceid}`,{
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
        const res = await axios.get(`http://${import.meta.env.VITE_SERVER}/collabsphere/api/v1/chat/allChats/${workspaceid}`,
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