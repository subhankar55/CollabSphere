import axios from "axios";


export const allNotifications = async function(){
    try {
        const res = await axios.get(`http://${import.meta.env.VITE_SERVER}/collabsphere/api/v1/notification/getall`,
            {
                withCredentials:true
            }
        )
        console.log(res);
        return res.data;
        
    } catch (error) {
        console.log(error.message);
    }
}



export const countUnread = async function () {
    try {
        const res = await axios.get(`http://${import.meta.env.VITE_SERVER}/collabsphere/api/v1/notification/unreads`,
            {
                withCredentials:true
            }
        )
        console.log(res);
        return res.data;
        
    } catch (error) {
        console.log(error.message);
    }
}