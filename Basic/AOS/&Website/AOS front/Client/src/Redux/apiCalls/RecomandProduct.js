import axios from "axios";

export const getRecomedProduct = async (userId) => {
  try {
    const response = await axios.get(
      `https://aos.skate-consult.com/Users/${userId}/Recommended_Products`,
      {
        withCredentials: true,
        validateStatus: () => true,
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
  }
};
