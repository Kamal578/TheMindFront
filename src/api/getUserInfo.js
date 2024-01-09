import axios from "axios";

export async function getUserInfo() {

    const url = `${process.env.REACT_APP_API_URL}/users/me`

    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        });
        return response.data;
    } catch (error) {
        return null;
    }
}