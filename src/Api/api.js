import axios from "axios";
const baseURL = "https://localhost:44319";

export const sendLoginData = async (newUser) => {
    try {
        
        const resp = await axios.post(`${baseURL}/UsersAction/InsertNewUser`, newUser, {headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }});
       
        return(resp.data)
    } catch (err) {
        // Handle Error Here
        return(err);
    }
}