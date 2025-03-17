import axios from "axios";
import { BASE_URL, PARTYCONNECT_CREATE_API, PARTYCONNECT_DELETE_API, PARTYCONNECT_LIST_API } from "../../../../constant";
import Swal from "sweetalert2";

// PARTYCONNECT GET API FUNCTION
export async function GetPartyCnnectAxios() {
  try {
    const res = await axios.get(BASE_URL + PARTYCONNECT_LIST_API);
    return { data: res.data.data, status: res.status };
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: "Failed to fetch party connections. Please try again later.",
      icon: "error",
    });
    console.error("Error fetching party connections:", error);
    throw error;
  }
}

// PARTYCONNECT POST API FUNCTION
export async function PostPartyConnectAxios(action) {
  try {
    const res = await axios.post(BASE_URL + PARTYCONNECT_CREATE_API, action.payload);
    return { data: res.data.data, status: res.status };
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: "Failed to create party connection. Please check your input and try again.",
      icon: "error",
    });
    console.error("Error creating party connection:", error);
    throw error;
  }
}

// PARTYCONNECT DELETE API FUNCTION
export async function DeletePartyConnectAxios(action) {
  try {
    const res = await axios.delete(`${BASE_URL + PARTYCONNECT_DELETE_API}/${action.id}`);
    return { data: res.data.data, status: res.status };
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: "Failed to delete party connection. Please try again later.",
      icon: "error",
    });
    console.error("Error deleting party connection:", error);
    throw error;
  }
}
