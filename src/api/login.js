import axios from "axios";

export default async function login(email, password) {

    const data = { email, password}
    const url = `${process.env.REACT_APP_API_URL}/auth/login`;

    try {
        const response = await axios.post(url, data);
        return response.data.access_token;
    } catch (error) {
        return null;
    }

}