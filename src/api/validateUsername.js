import axios from "axios";

export default async function validateUsername(username) {

    const url = `${process.env.REACT_APP_API_URL}/users/validate/${username}`;

    const response = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
    });
    return response.data;
}