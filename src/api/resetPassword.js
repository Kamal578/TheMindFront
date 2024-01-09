import axios from "axios";

export default async function resetPassword(password) {

    const url = `${process.env.REACT_APP_API_URL}/auth/reset-password`;

    const resetPasswordDto = { password }

    try {
        const response = await axios.post(url, resetPasswordDto, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        });
        return response.data;
    } catch (error) {
        return null;
    }

}