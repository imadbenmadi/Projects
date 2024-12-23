import axios from "axios";

export const GetAllCategories = async () => {
  try {
    const res = await axios.get(
      "https://aos.skate-consult.com/Products/Categories"
    );
    return res.data;
  } catch (error) {
    return error;
  }
};
