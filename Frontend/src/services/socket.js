import {io} from 'socket.io-client';

const socket = io(`http://${import.meta.env.VITE_SERVER}`,{
    withCredentials:true
});


export default socket;