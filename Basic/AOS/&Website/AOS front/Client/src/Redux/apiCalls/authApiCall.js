import Swal from "sweetalert2";
import axios from "axios";
import { Logout, LogoutAuth, login, register } from "../reducer";
import { Navigate } from "react-router-dom";
// login User
export const loginUser = (Email, Password) => {
  return async (dispatch) => {
    await axios
      .post(
        "https://aos.skate-consult.com/Login",
        {
          Email,
          Password,
        },
        {
          withCredentials: true,
          validateStatus: () => true,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          dispatch(login(response.data.userData));
          Swal.fire({
            icon: "success",
            title: "Login Successful",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          // Check if response.data exists before accessing its properties
          const errorMessage = response.data.error;
          console.log(response);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: errorMessage,
          });
        }
      })
      .catch((error) => {
        // Handle error if the request fails
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "An error occurred while processing your request.",
        });
      });
  };
  // console.log(data);
};

// logout User

export const logoutUser = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        "https://aos.skate-consult.com/Logout",
        {},
        {
          withCredentials: true,
          validateStatus: () => true,
        }
      );
      console.log(data);
      dispatch(Logout());
      Swal.fire({
        icon: "success",
        title: "Logout Successful",
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
};
// Path: src/redux/apiCalls/categoryApiCall.js

export const registerUser = (user) => {
  return async (dispatch) => {
    await axios
      .post("https://aos.skate-consult.com/Register", user, {
        withCredentials: true,
        validateStatus: () => true,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);

          dispatch(register(response.data));

          Swal.fire({
            icon: "success",
            title: "Register Successful",
            showConfirmButton: false,
            timer: 1500,
          });
          // dispatch(login(user.Email, user.Password));
        } else {
          // Check if response.data exists before accessing its properties
          const errorMessage = response.data.error;
          console.log(response);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: errorMessage,
          });
        }
      })
      .catch((error) => {
        // Handle error if the request fails
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "An error occurred while processing your request.",
        });
      });
  };
};

export const checkAuth = async () => {
  const response = await axios.get("https://aos.skate-consult.com/check_Auth", {
    withCredentials: true,
    validateStatus: () => true,
  });

  if (response.status === 200) {
    console.log(response.data.userData);
    return response.data.userData;
  } else {
    console.log("user not authenthicated  2");
    return false;
  }
};

export const getUser = async (user) => {
  const response = await axios.get(
    `https://aos.skate-consult.com/Users/${user}`,
    {
      withCredentials: true,
      validateStatus: () => true,
    }
  );

  if (response.status === 200) {
    return response.data;
  } else {
    console.log("user not authenthicated  2");
    return false;
  }
};
