import axios from "axios";


const baseURL = "https://localhost:44319";


export const addNewUser = async (newUser) => {
    try {
        const resp = await axios.post(`${baseURL}/api/register`, newUser, {headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }});
        return(JSON.parse(resp.data))
    } catch (err) {
        // Handle Error Here
        return(err);
    }
}

export const sendLoginData = async (newUser) => {
    try {
        const resp = await axios.post(`${baseURL}/api/login`, newUser,{
            headers: {'Content-Type': 'application/json'},
            withCredentials: true,
        });
        return(JSON.parse(resp.data))
     
    } catch (err) {
        // Handle Error Here
        return(err);
    }
}

export const getUserData = async () => {
    try {
        const resp = await axios.get(`${baseURL}/api/getuserdata`, {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true,
        });
        return(JSON.parse(resp.data))
    } catch (err) {
        // Handle Error Here
        return(err.response.status);
    }
}

export const logOutUser = async () => {
    try {
        const resp = await axios.post(`${baseURL}/api/logout`, "", {
            headers: {'Content-Type': 'application/json'},
            withCredentials: true,
            });
            return(resp.data)
    } catch (err) {
        // Handle Error Here
        
        return(err);
    }
}

export const getAllPost = async () => {
    try {
        const resp = await axios.get(`${baseURL}/api/getallpost`, {
        headers: {'Content-Type': 'application/json'},
        });
        return(JSON.parse(resp.data))
    } catch (err) {
        // Handle Error Here
        return(err.response.status);
    }
}

export const postUserOffer = async (data) => {
    try {
        const resp = await axios.post(`${baseURL}/api/adduseroffer`, data, {
            headers: {'Content-Type': 'application/json'}
            });
            return(JSON.parse(resp.data))
    } catch (err) {
        // Handle Error Here
        
        return(err);
    }
}

export const newPost = async (data) => {
    try {
        const resp = await axios.post(`${baseURL}/api/addpost`, data, {
            headers: {'Content-Type': 'application/json'}
            });
            return(JSON.parse(resp.data))
    } catch (err) {
        // Handle Error Here
        
        return(err);
    }
}