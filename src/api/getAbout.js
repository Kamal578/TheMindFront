import axios from "axios";

export default async function getAbout() {

    const url = `${process.env.REACT_APP_API_URL}/about`

    const response = await axios.get(url);
    return response.data;
}
