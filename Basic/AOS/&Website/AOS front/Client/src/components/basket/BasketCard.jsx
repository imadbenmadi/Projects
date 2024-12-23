import React, { useEffect } from "react";
import chair from "../../assets/icon/Profile/chair.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import BasketCardProduct from "./BasketCardProduct";
import { useDispatch, useSelector } from "react-redux";
import { Basket, getUserProfile, selectInfo } from "../../Redux/reducer";
import { getProfileApi } from "../../Redux/apiCalls/profileApiCalls";
import {
  getProductsBasket,
  removeProductFromBasket,
} from "../../Redux/apiCalls/basketApiCalls";
import Swal from "sweetalert2";

function BasketCard() {
  const [counter, setCounter] = React.useState(1);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const { userProfile, basketData } = useSelector(selectInfo);
  // const [product, setProduct] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const { user } = useSelector(selectInfo);
  const getAllProductsBasket = async () => {
    if (userProfile) {
      const data = await getProductsBasket(user._id);
      const uniqueProductIds = new Set();

      data.forEach((product) => {
        uniqueProductIds.add(product.ProductId);
      });

      const uniqueProducts = Array.from(uniqueProductIds);
      setProducts(uniqueProducts);
    }
  };
  useEffect(() => {
    getAllProductsBasket();
  }, [userProfile, user]);

  const dispatch = useDispatch();
  const getProfile = async () => {
    const userData = await getProfileApi(user._id);
    dispatch(getUserProfile(userData));
    // await getUserProfile(userData);
    console.log(userData);
    // setLoading(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!userProfile) {
        await getProfile();
      }
      setLoading(false); // Set loading to false after the profile data is fetched
    };
    if (userProfile) {
      let totalPrice = 0;
      products.forEach((product) => {
        totalPrice += product.Price;
      });
      if (products.length > 0) {
        dispatch(Basket(products));
      }
      setTotalPrice(totalPrice);
      setLoading(false); // Set loading to false after products are processed
    }

    fetchData();
    if (products.length > 0) {
      dispatch(Basket(products));
    }
  }, []);

  useEffect(() => {
    if (userProfile) {
      getAllProductsBasket();
      // let totalPrice = 0;
      // userProfile.basket.forEach((product) => {
      //   totalPrice += product.ProductId.Price;
      // });
      // setTotalPrice(totalPrice);
      setLoading(false);
      if (products.length > 0) {
        dispatch(Basket(products));
      }
      // Set loading to false after products are processed
    }
  }, []);
  useEffect(() => {
    if (products.length > 0) {
      dispatch(Basket(products));
    }
  }, [products]);

  // Rest of your code remains the same

  // console.log(totalPrice);

  const hendelRemoveProduct = async (productId, productPrice) => {
    try {
      const data = await removeProductFromBasket(user._id, productId);
      console.log(data);
      // console.log(productId, productPrice);

      setProducts((prev) => prev.filter((p) => p._id !== productId));
      // setTotalPrice(() => totalPrice - productPrice);
      dispatch(Basket(products));
      Swal.fire({
        icon: "success",
        title: "Product removed from basket",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  const variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className=" max-md:top-14 w-96 max-md:fixed max-md:left-0 max-md:w-full     absolute h-fit overflow-hidden z-30 top-[200%] left-[-100%] flex flex-col px-5 py-6 font-semibold text-black bg-white rounded-3xl "
    >
      {loading ? (
        <div>loading...</div>
      ) : (
        <div className="flex flex-col p-5 w-full bg-white rounded-2xl">
          <div className="self-center text-xl text-black">MY Basket</div>
          <div className="w-full h-1 bg-slate-400 my-2 "></div>
          <div className=" overflow-y-scroll h-[50vh]">
            {/* this is one of Product in the basket */}
            {basketData?.map((product) => (
              <div
                key={product._id}
                className="flex w-full gap-5 justify-between mt-2"
              >
                <div className="flex flex-auto gap-1.5 text-black">
                  <img
                    loading="lazy"
                    src={chair}
                    className="shrink-0 aspect-square w-[77px]"
                  />
                  <div className="flex flex-col flex-1 self-start mt-1">
                    <div className="text-black">{product.Title}</div>
                    <div className="mt-5">{product.Price} DZD</div>
                  </div>
                </div>
                <div className="flex  self-center  bg-gray-300 text-center rounded-lg h-fit relative flex-col   text-white ">
                  <div
                    onClick={() =>
                      hendelRemoveProduct(product._id, product.Price)
                    }
                    className="text-black  text-2xl px-2 py-1 mx-3"
                  >
                    {" "}
                    x
                  </div>
                  {/* <div>
          <div
            onClick={incrementCounter}
            className="relative bg-black px-3  rounded-lg"
          >
            <button>+</button>
          </div>
          <div className="relative  text-black">{counter}</div>
          <div
            onClick={decrementCounter}
            className="relative bg-black rounded-lg w-full px-3 "
          >
            <button>-</button>
          </div>
        </div> */}
                </div>{" "}
              </div>
              // <BasketCardProduct
              //   key={product.ProductId._id}
              //   product={product.ProductId}
              //   image={chair}
              //   incrementCounter={incrementTotel}
              //   decrementCounter={decrementTotel}
              // />
            ))}
          </div>

          <div className="flex flex-col  rounded-lg bg-zinc-100">
            {/* <div className="mx-5 text-black">Total {totalPrice}$</div> */}
            <Link
              to="/CheckOutPage"
              className="justify-center mx-2 items-center px-16 py-3.5 mt-5 text-white bg-black rounded-md"
            >
              Checkout
            </Link>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default BasketCard;
