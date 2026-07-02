import axios from "axios";


export const workspaces = async() => {
    try {
        const res = await axios.get(`http://${import.meta.env.VITE_SERVER}/collabsphere/api/v1/dashboard/workspaces`,
            {
                withCredentials:true
            }
        );
        return res.data;
    } catch (error) {
        throw new Error(error);
    }
}

export const createdWorkspaces = async () => {
    try {
        const res = await axios.get(`http://${import.meta.env.VITE_SERVER}/collabsphere/api/v1/dashboard/createdWorkspaces`,
            {
                withCredentials:true
            }
        );
        return res.data;
    } catch (error) {
        throw new Error(error);
    }
}

export const projects = async () => {
    try {
        const res = await axios.get(`http://${import.meta.env.VITE_SERVER}/collabsphere/api/v1/dashboard/projects`,
            {
                withCredentials:true
            }
        );

        return res.data;
    } catch (error) {
        throw new Error(error);
    }
}

export const tasks = async () => {
    try {
        const res = await axios.get(`http://${import.meta.env.VITE_SERVER}/collabsphere/api/v1/dashboard/tasks`,{
            withCredentials:true
        });
        return res.data
    } catch (error) {
        throw new Error(error);
    }
}

export const completedTasks = async () => {
    try {
        const res = await axios.get(`http://${import.meta.env.VITE_SERVER}/collabsphere/api/v1/dashboard/completedTasks`,
            {
                withCredentials:true
            }
        )
        return res.data;
    } catch (error) {
        throw new Error(error);
    }
}