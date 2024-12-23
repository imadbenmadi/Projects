import { Outlet, useNavigate } from "react-router-dom";
import "./App.css";
import Footer from "./pages/Footer";
import Header from "./pages/Header";

import { Basket, getUserProfile, login, selectInfo } from "./Redux/reducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { checkAuth, getUser, loginUser } from "./Redux/apiCalls/authApiCall";
import Loading from "./pages/Loading";
import { getProfileApi } from "./Redux/apiCalls/profileApiCalls";
import { getProductsBasket } from "./Redux/apiCalls/basketApiCalls";

// import Login from "./pages/login";
function App() {
  const dispatch = useDispatch();
  const { user } = useSelector(selectInfo);
  const [products, setProducts] = useState([]);

  const { userProfile } = useSelector(selectInfo);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const [loading, setLoading] = useState(true);
  const check = async () => {
    const data = await checkAuth();

    if (data) {
      await dispatch(login(data));
      if (user) {
        getProfile();
      }
    }
  };
  const getProfile = async () => {
    const userData = await getProfileApi(user._id);
    dispatch(getUserProfile(userData));
    // await getUserProfile(userData);
    console.log(userData);
    // setLoading(true);
  };

  useEffect(() => {
    check();

    getProfile();

    setLoading(false);
  }, []);

  // const nav = useNavigate();
  // useEffect(() => {
  //   if (!user) {
  //     //show the website to the user as a guest : show login button , sign up button ....
  //     nav("/");
  //     console.log("user not authenthicated ");
  //   } else {
  //     //show the website to the user as a user : show the user profile icon ,notifications , logout button ....
  //     console.log("user authenthicated ");
  //   }
  // }, [user]);

  // useEffect(() => {
  //   if (!Auth) {
  //     navigate("/sign-in");
  //   }
  // }, [Auth, navigate]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-screen relative  overflow-hidden scrollProduct  overflow-y-scroll ">
          <Header />

          <Outlet />

          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
