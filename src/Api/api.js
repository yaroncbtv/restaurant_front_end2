import axios from "axios";
const baseURL = "https://localhost:44319";

export const addNewUser = async (newUser) => {
    try {
        const resp = await axios.post(`${baseURL}/api/register`, newUser, {headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }});
        return(resp.data)
    } catch (err) {
        // Handle Error Here
        return(err);
    }
}

export const sendLoginData = async (newUser) => {
    try {
        const resp = await axios.post(`${baseURL}/api/login`, newUser, {headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },credentials: 'include'});
        console.log(JSON.parse(resp.data))
        return(resp.data)
    } catch (err) {
        // Handle Error Here
        return(err);
    }
}