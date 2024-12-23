import React, { useEffect, useState } from "react";
import CheckoutCard from "./CheckoutCard";
import CheckOutPayment from "./CheckOutPayment";
import { useDispatch, useSelector } from "react-redux";
import { Basket, getUserProfile, selectInfo } from "../../Redux/reducer";
import { getProfileApi } from "../../Redux/apiCalls/profileApiCalls";
import { getProductsBasket } from "../../Redux/apiCalls/basketApiCalls";

function CheckOutPage() {
  const { basketData } = useSelector(selectInfo);
  const dispatch = useDispatch();
  const { user } = useSelector(selectInfo);
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const { userProfile } = useSelector(selectInfo);
  const getAllProductsBasket = () => {
    if (userProfile) {
      userProfile.basket.forEach((product) => {
        const productId = product.ProductId._id;
        if (!products.some((p) => p._id === productId)) {
          setProducts((prev) => [...prev, product.ProductId]);
          if (products.length > 0) {
            dispatch(Basket(products));
          }
        }
      });
    }
  };
  useEffect(() => {
    getAllProductsBasket();
    getProfile();
  }, []);
  //  const dispatch = useDispatch();
  const getProfile = async () => {
    const userData = await getProfileApi(user._id);

    // await getUserProfile(userData);
    console.log(userData);
    // setLoading(true);
  };

  useEffect(() => {
    const fetchData = () => {
      // getProfile();
      setLoading(false); // Set loading to false after the profile data is fetched
    };

    let totalPrice = 0;
    products.forEach((product) => {
      totalPrice += product.Price;
    });
    if (products.length > 0) {
      dispatch(Basket(products));

      setTotalPrice(totalPrice);
      setLoading(false); // Set loading to false after products are processed
    }

    fetchData();

    setLoading(false);
    // getProfile();
  }, []);

  // getAllProductsBasket();
  // Add products to the dependency array
  return (
    <div className="max-w-[1200px] mx-auto pt-32">
      <div className="flex justify-between items-center max-md:flex-col">
        <div className="max-md:order-2 w-3/4 md:px-10 max-md:w-full">
          {basketData.map((product) => (
            <CheckoutCard key={product._id} />
          ))}
        </div>
        <div className="lg:w-2/4 w-screen self-start">
          <CheckOutPayment />
        </div>
      </div>
    </div>
  );
}

export default CheckOutPage;
