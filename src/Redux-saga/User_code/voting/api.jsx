import axios from "axios";
import { BASE_URL, POST_VOTE } from "../../constant";

// POST
export const postVoteApi = (action) => {
    return axios.post(BASE_URL + POST_VOTE, action.payload).then(res => {
        const data = res.data
        const status = res.status

        return { data, status }
    })
}