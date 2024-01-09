import axios from "axios"

export const getRoomByPlayerUsername = async (playerUsername) => {

    const url = `${process.env.REACT_APP_API_URL}/game/player/${playerUsername}/room`

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
