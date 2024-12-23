import axios from "axios";

export const getProductsBasket = async (userId) => {
  try {
    const response = await axios.get(
      `https://aos.skate-consult.com/Users/${userId}/Basket`,

      {
        withCredentials: true,
        validateStatus: () => true,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const addProductToBasket = async (userId, productId) => {
  try {
    const response = await axios.post(
      `https://aos.skate-consult.com/Users/${userId}/Basket/${productId}`,

      {
        ProductId: productId,
      },
      {
        withCredentials: true,
        validateStatus: () => true,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const removeProductFromBasket = async (userId, productId) => {
  try {
    const response = await axios.delete(
      `https://aos.skate-consult.com/Users/${userId}/Basket/${productId}`,

      {
        withCredentials: true,
        validateStatus: () => true,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};
