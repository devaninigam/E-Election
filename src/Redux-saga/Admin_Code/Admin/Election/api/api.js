import axios from "axios";
import { BASE_URL, ELECTION_CREATE_API, ELECTION_DELETE_API, ELECTION_LIST_API } from "../../../../constant";
import Swal from "sweetalert2";

// ✅ GET ELECTIONS API FUNCTION
export async function GetElectionAxios() {
  try {
    const response = await axios.get(BASE_URL + ELECTION_LIST_API);
    return { data: response.data.data, status: response.status };
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: "Failed to fetch elections. Please try again later.",
      icon: "error",
    });
    throw error;
  }
}

// ✅ POST ELECTION API FUNCTION
export async function PostElectionAxios(action) {
  try {
    const response = await axios.post(BASE_URL + ELECTION_CREATE_API, action.payload);
    return { data: response.data.data, status: response.status };
  } catch (error) {
    console.error("Error in API call:", error);

    Swal.fire({
      title: "Error!",
      text: error.response?.data?.errors[0] || "Failed to create election. Please check your input and try again.",
      icon: "error",
    });

    throw error; // Pass the error to be handled in the calling function
  }
}

// ✅ DELETE ELECTION API FUNCTION
export async function DeleteElectionAxios(action) {
  try {
    const response = await axios.delete(`${BASE_URL + ELECTION_DELETE_API}/${action.payload}`);
    return { data: action.payload, status: response.status };
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: error.response?.data?.errors[0] || "Failed to create election. Please check your input and try again.",
      icon: "error",
    });
    throw error; // Pass the error to be handled in the calling function
  }
}
