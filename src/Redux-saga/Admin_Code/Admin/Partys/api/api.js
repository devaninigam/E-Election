import axios from "axios";
import { BASE_URL, PARTY_CREATE_API, PARTY_DELETE_API, PARTY_LIST_API } from "../../../../constant";
import Swal from "sweetalert2";

// ELECTION GET API IS IN FUNCTION
export function GetPartyAxios() {
  return axios.get(BASE_URL + PARTY_LIST_API).then((res) => {
    const data = res.data.data;
    const status = res.status;
    return {
      data,
      status
    }
  }).catch((error) => console.log(error))
}

// ELECTION POST API IS IN FUNCTION
export function PostPartyAxios(action) {
  console.log(action.payload);
  return axios.post(BASE_URL + PARTY_CREATE_API, action.payload)
    .then((res) => {
      const data = res.data.data;
      const status = res.status;
      return {
        data,
        status
      };
    })
    .catch((error) => {
      Swal.fire({
        title: "Error!",
        text: error?.response?.data?.errors[0] || "Failed to fetch elections. Please try again later.",
        icon: "error",
      });
      throw error;
    })
}

// ELECTION DELETE API IS IN FUNCTION
export function DeletePartyAxios(action) {
  return axios.delete(`${BASE_URL + PARTY_DELETE_API}/${action.payload}`)
    .then((res) => {
      const data = action.payload;
      const status = res.status;
      return {
        data,
        status
      };
    })
    .catch((error) => {
      console.log("Error in API call", error);
      throw error;
    });
}
