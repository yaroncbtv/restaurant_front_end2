import axios from "axios";
import { userDataValue, setUserData } from '../Store/State';
import { useSelector, useDispatch } from 'react-redux';

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
        // const resp = await axios.get(`${baseURL}/api/getuserdata`, {
        //     headers: {'Content-Type': 'application/json'},
        //     withCredentials: true,
        // });
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
        // const resp = await fetch(`${baseURL}/api/logout`, {
        //     method: 'POST',
        //     headers: {'Content-Type': 'application/json'},
        //     credentials: 'include',
        // });
            return(resp.data)
    } catch (err) {
        // Handle Error Here
        
        return(err);
    }
}
