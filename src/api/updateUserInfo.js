import axios from "axios";

export async function updateUserInfo(data) {

    const url = `${process.env.REACT_APP_API_URL}/users/update-user`

    try {
        const response = await axios.patch(url, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        });
        return response.data;
    } catch (error) {
        return null;
    }
}