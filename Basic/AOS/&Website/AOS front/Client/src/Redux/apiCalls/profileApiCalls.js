import axios from "axios";
import Swal from "sweetalert2";
import { getUserProfile } from "../reducer";

export const editProfileApi = async (user, userId) => {
  try {
    const { data } = await axios.put(
      "https://aos.skate-consult.com/Users/" + userId,
      user,

      {
        withCredentials: true,
        validateStatus: () => true,
      }
    );
    console.log(data);
    Swal.fire({
      icon: "success",
      title: "Profile Updated Successfully",
      showConfirmButton: false,
      timer: 1500,
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.response.data.message,
    });
  }
};
export const getProfileApi = async (userId) => {
  try {
    const { data } = await axios.get(
      `https://aos.skate-consult.com/Users/${userId}/Profile`,
      {
        withCredentials: true,
        validateStatus: () => true,
      }
    );
    console.log(data);
    return data; // Return the fetched data
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.response.data.message,
    });
  }
};
