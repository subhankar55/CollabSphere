import axios from "axios";


export const authInfo = async function(){
    try{
        const res = await axios.get(`url`,
            {
                withCredentials:true
            }
        );
        return res.data;
    }catch(err){
        throw new Error(err.message);
    
    }

} 