import axios from "axios";
import Swal from "sweetalert2";

export const createStore = async (storeData, userId) => {
  // Send a POST request to the server

  const data = await axios.post(
    `https://aos.skate-consult.com/Users/${userId}/CreateStore`,
    storeData,
    {
      withCredentials: true,
      validateStatus: () => true,
    }
  );

  console.log("creatte a store data : ", storeData);
  if (data.status === 200) {
    await Swal.fire({
      icon: "success",
      title: data.data.message, // Assuming the response contains a message field
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops",
      text: data.data.error, // Assuming the response contains a message field
    });
  }
};
export const getStores = async () => {
  try {
    const { data } = await axios.get("https://aos.skate-consult.com/Stores", {
      withCredentials: true,
      validateStatus: () => true,
    });
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
export const getStoreApi = async (storeId) => {
  try {
    const { data } = await axios.get(
      `https://aos.skate-consult.com/Stores/${storeId}`,
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
export const getStoreProfileApi = async (storeId) => {
  try {
    const { data } = await axios.get(
      `https://aos.skate-consult.com/Stores/${storeId}/Profile`,
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
export const updateStoreApi = async (storeId, storeData) => {
  try {
    const { data } = await axios.put(
      `https://aos.skate-consult.com/Stores/${storeId}`,
      storeData,
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
export const followStoreApi = async (userId, storeId) => {
  try {
    const { data } = await axios.post(
      `https://aos.skate-consult.com/Users/${userId}/Follow/${storeId}`,
      { userId },
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
export const deleteStoreApi = async (storeId) => {
  try {
    const { data } = await axios.delete(
      `https://aos.skate-consult.com/Stores/${storeId}`,
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
      text: error.data.error,
    });
    return false;
  }
};
