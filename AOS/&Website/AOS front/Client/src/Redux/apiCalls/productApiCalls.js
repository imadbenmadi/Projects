import axios from "axios";
import Swal from "sweetalert2";
import { reach } from "yup";

export const createProduct = async (product, StoreId) => {
  try {
    const response = await axios.post(
      `https://aos.skate-consult.com/Stores/${StoreId}/Products/Create`,
      product,
      {
        withCredentials: true,
        validateStatus: () => true,
      }
    );

    return response.data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
  }
};
export const getProducts = async (StoreId) => {
  try {
    const response = await axios.get(
      `https://aos.skate-consult.com/Stores/${StoreId}/Products`,
      {
        withCredentials: true,
        validateStatus: () => true,
      }
    );

    return response.data.products;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
  }
};
export const deleteProduct = async (StoreId, ProductId) => {
  try {
    const response = await axios.delete(
      `https://aos.skate-consult.com/Stores/${StoreId}/Products/${ProductId}`,
      {
        withCredentials: true,
        validateStatus: () => true,
      }
    );

    return response.data.message;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
  }
};
export const editProduct = async (product, StoreId, ProductId) => {
  try {
    const response = await axios.put(
      `https://aos.skate-consult.com/Stores/${StoreId}/Products/${ProductId}`,
      product,
      {
        withCredentials: true,
        validateStatus: () => true,
      }
    );

    return response.data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
  }
};
export const getSingleProduct = async (ProductId) => {
  try {
    const response = await axios.get(
      `https://aos.skate-consult.com/Products/${ProductId}`,
      {
        withCredentials: true,
        validateStatus: () => true,
      }
    );

    return response.data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
  }
};
export const getProductsByCategory = async (Category) => {
  try {
    const response = await axios.get(
      `https://aos.skate-consult.com/Products/Categories/${Category}`,
      {
        withCredentials: true,
        validateStatus: () => true,
      }
    );
    return response.data.products;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
  }
};
export const searchProducts = async (search) => {
  try {
    const response = await axios.get(
      `https://aos.skate-consult.com/Products/Search/${search}`,
      {
        withCredentials: true,
        validateStatus: () => true,
      }
    );
    return response.data.products;
  } catch (error) {
    return false;
  }
};
export const addComment = async (comment, userId, ProductId) => {
  try {
    const response = await axios.post(
      `https://aos.skate-consult.com/Users/${userId}/CommentProduct/${ProductId}`,
      {
        Comment: comment,
      },
      {
        withCredentials: true,
        validateStatus: () => true,
      }
    );
    console.log(response);
    if (response.status === 200) {
      Swal.fire("Success!", "Comment added successfully", "success");
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: response.data.error,
      });
    }
    console.log(response.status);
    return response.data;
  } catch (error) {
    console.log(error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  }
};
export const addRate = async (rate, userId, ProductId) => {
  try {
    const response = await axios.post(
      `https://aos.skate-consult.com/Users/${userId}/RateProduct/${ProductId}`,
      {
        rate: rate,
      },
      {
        withCredentials: true,
        validateStatus: () => true,
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  }
};
