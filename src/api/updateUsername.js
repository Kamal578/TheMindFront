import axios from "axios";

export default async function updateUsername(username) {

    const url = `${process.env.REACT_APP_API_URL}/users/username`;

    const updateUsernameDto = {
        username
    }

    try {
        const response = await axios.patch(url, updateUsernameDto, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        });
        return response.data;
    } catch (error) {
        return null;
    }

}