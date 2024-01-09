import axios from "axios";

export default async function getAvatars() {

    const url = `${process.env.REACT_APP_API_URL}/avatars`

    const response = await axios.get(url);
    return response.data;
}
