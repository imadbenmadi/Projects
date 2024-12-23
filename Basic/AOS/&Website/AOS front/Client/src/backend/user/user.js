import axios from "axios";

const getUserProfile = () => {
  return axios.get(
    "http://localhost:3000/Users/65fe4f92f2c3180f8ddb3023/Profile"
  );
};
