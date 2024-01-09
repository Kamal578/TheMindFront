import axios from "axios";

export async function register(data) {
    const url = `${process.env.REACT_APP_API_URL}/auth/register`;
    
    try {
        const response = await axios.post(url, data);
        return response.data;
    } catch (error) {
        return null;
    }
    }