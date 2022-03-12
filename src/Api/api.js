import axios from "axios";
const baseURL = "https://localhost:44319";

export const sendLoginData = async (newUser) => {
    try {
        console.log(newUser)
        const resp = await axios.post(`${baseURL}/UsersAction/InsertNewUser`, newUser, {headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }});
       
        console.log(resp.data);
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
}