import axios from "axios";
import { BASE_URL, GET_TOTAL_COUNT } from "../../../../constant"

// ELECTION GET API IS IN FUNCTION
export function GetTotalCountAxios() {
  return axios.get(BASE_URL + GET_TOTAL_COUNT).then((res) => {
    const data = res.data.data;
    const status = res.status;
    return {
      data,
      status
    }
  }).catch((error) => console.log(error))
} 