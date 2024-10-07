import axios from "axios";
import { json } from "react-router";
import Swal from "sweetalert2";

export const sendContactForm = async (data) => {
  try {
    const response = await axios.post(
      `https://api.reayahmed.com/base/contact-us/`,

      data
    );
    Swal.fire({
      icon: "success",
      title: "Success",
      text: response.data.msg,
    });
    return response.data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.response.data.message,
    });
    return error.response.data;
  }
};
