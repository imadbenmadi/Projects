import { useEffect, useState } from "react";
import chair from "../assets/icon/chair.png";
import minichair from "../assets/icon/miniChair.png";
import love from "../assets/icon/love.png";
import SlideProduct from "./SlideProduct";
import Review from "../components/Product/Review";
import "../index.css";
import { faker } from "@faker-js/faker";
import { useLocation, useParams } from "react-router-dom";
import { Basket, getUserProfile, selectInfo } from "../Redux/reducer";
import { useDispatch, useSelector } from "react-redux";
import Rating from "react-rating";
import {
  addComment,
  addRate,
  getSingleProduct,
} from "../Redux/apiCalls/productApiCalls";
import SlidePrductCategory from "./SlidePrductCategory";
import CommentSection from "../components/Product/CommentSection";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import moment from "moment";
import { addProductToBasket } from "../Redux/apiCalls/basketApiCalls";
import Swal from "sweetalert2";
import { getProfileApi } from "../Redux/apiCalls/profileApiCalls";
function Product() {
  const { productId } = useParams();
  const { user, basketData } = useSelector(selectInfo);
  const [product, setProdect] = useState({});
  const [price, setPrice] = useState(0);
  const [counter, setCounter] = useState(1);
  const pathName = useLocation().pathname;
  const [loading, setLoading] = useState(false);
  const [disabledAddtoBasket, setDisabledAddtoBasket] = useState(false);
  const [rate, setRate] = useState(0);
  const [comment, setComment] = useState("");
  const [singlComment, setsinglComment] = useState({});
  const getProduct = async () => {
    const data = await getSingleProduct(productId);
    setProdect(data);
    return data;
  };
  const fetchProduct = async () => {
    const data = await getProduct();
    setProdect(data);
    setPrice(data.Price);
  };

  useEffect(() => {
    fetchProduct();
    setDisabledAddtoBasket(false);
    console.log(product);

    window.scrollTo(0, 0);
  }, [pathName]);

  const handleAdd = () => {
    setPrice(price + product.Price);
    setCounter(counter + 1);
  };

  const handleSubtract = () => {
    if (counter > 1) {
      setPrice(price - product.Price);
    }
    if (counter > 1) {
      setCounter(counter - 1);
    }
  };

  const [productsBasket, setProductsBasket] = useState([]);

  const getAllProductsBasket = () => {
    if (userProfile) {
      userProfile?.basket?.forEach((product) => {
        const productId = product.ProductId._id;
        if (!basketData.some((p) => p._id === productId)) {
          setProductsBasket((prev) => [...prev, product.ProductId]);
          dispatch(Basket(productsBasket));
        }
      });
    }
  };
  const handelClickAddToCart = async () => {
    try {
      const data = await addProductToBasket(user._id, productId);
      console.log(data);
      dispatch(Basket([...basketData, product]));
      setDisabledAddtoBasket(true);
      Swal.fire({
        icon: "success",
        title: "Product add basket successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };
  const userProfile = useSelector(getUserProfile);

  const dispatch = useDispatch();

  const getProfile = async () => {
    const userData = await getProfileApi(user._id);
    dispatch(getUserProfile(userData));
    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getProfile();
    };
    fetchData();
    getAllProductsBasket();
  }, []);

  const handelAddcommentAndreview = async (e) => {
    e.preventDefault();
    try {
      setsinglComment({ comment: comment, rate: rate });
      await addComment(comment, user._id, productId);
      await addRate(rate, user._id, productId);
      fetchProduct();
      setProdect((prev) => ({
        ...prev,
        Comments: [...prev.Comments, singlComment],
      }));
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };
  // useEffect(() => {
  //   if (product.Comments) {

  //   }
  // }, [singlComment]);

  return (
    <div className=" pt-14 h-fit py-5  w-screen ">
      <div className=" min-h-fit   w-full  overflow-hidden bg-white  flex justify-center  items-start">
        {/* the Product   */}
        <div className="mt-10 h-fit  ">
          {/* <div className="text-neutral-400  px-2 text-lg font-normal font-['Outfit']">
            Home & Kitchen›Furniture›Game & Recreation Room Furniture›Gaming
            Chairs›Computer Gaming Chairs
          </div> */}

          <div className=" max-w-[1300px] w-screen   h-fit mt-10 flex max-md:w-screen  max-md:flex-col   ">
            {/* the left */}
            <div className="w-[50%]    max-md:w-screen  h-96 max-md:h-fit left-0 top-0 relative max-md:flex-col flex flex-col justify-between  ">
              <div className="w-full h-full  ">
                {" "}
                <img className="w-96 h-96  " src={chair} />
              </div>
            </div>
            {/* the right */}
            <div className=" w-full flex flex-col justify-center items-baseline md:w-[50%] ">
              <div className="text-black text-4xl px-2 font-normal font-['Outfit']">
                {product.Title}
              </div>
              <div className="flex justify-between items-center mt-3">
                <div className="flex items-center">
                  <Rating
                    emptySymbol={
                      <svg
                        className="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    }
                    fullSymbol={
                      <svg
                        className="w-4 h-4 text-yellow-300 ms-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        {" "}
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    }
                    initialRating={product.Product_RatingAverage}
                    // initialRating={4}
                    readonly={true}
                    start={0} // Start with 0 stars
                  />
                </div>
                <div className="text-black px-2 text-base font-normal font-['Outfit']"></div>
              </div>
              <div className="w-[90%] px-2 h-48 text-black text-lg font-normal font-['Outfit']">
                date: {moment(product.Date).format("MMMM Do YYYY")}
                <br />
                Color : Black
                <br />
                Category : {product.Category}
              </div>
              {/* counter & price  */}
              <div className="flex justify-between w-full">
                <div className="flex">
                  <button
                    className="w-12 h-12 text-white bg-black rounded-tl-xl rounded-bl-xl"
                    onClick={handleSubtract}
                  >
                    -
                  </button>
                  <div>
                    <div>
                      <div className="text-black  w-12 h-12 flex justify-center items-center text-xl font-normal font-['Outfit']">
                        {counter}
                      </div>
                    </div>
                  </div>
                  <button
                    className="w-12 h-12 text-white bg-black rounded-tr-xl rounded-br-xl"
                    onClick={handleAdd}
                  >
                    +
                  </button>
                </div>
                <div className="text-black text-4xl font-normal font-['Outfit']">
                  price : {price?.toFixed(2)}DZD
                </div>
              </div>

              <div className=" flex justify-start gap-3 items-center mt-5">
                <div
                  className={`w-fit ${
                    !disabledAddtoBasket
                      ? "bg-black text-white"
                      : "bg-gray-600 text-black "
                  } h-16  rounded-2xl flex justify-center items-center cursor-pointer`}
                >
                  <button
                    onClick={handelClickAddToCart}
                    disabled={disabledAddtoBasket}
                    className="text-white px-5 text-2xl font-normal font-['Outfit']  "
                  >
                    {disabledAddtoBasket ? "Added to basket" : "Add to basket"}
                  </button>
                </div>
                <div className="w-20 h-16 bg-zinc-500 rounded-2xl flex justify-center cursor-pointer items-center">
                  <img src={love} className="w-8 h-8" />
                </div>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* About the Product  */}
      <div className=" h-fit max-md:w-screen my-5 mx-2 text-center  flex justify-center  items-start">
        <div className=" max-w-[1300px] w-screen mx-2 max-md:w-screen h-fit py-10 bg-black rounded-2xl  ">
          <div className="flex justify-center max-md:w-screen w-[1000px] mx-auto mt-5">
            <div className="w-56  h-12 bg-white rounded-xl flex justify-center items-center">
              <div className="w-32 max-md:w-screen h-6 text-black text-lg font-normal font-['Outfit']">
                Product details
              </div>
            </div>
          </div>
          {/* <div className="text-white text-4xl max-md:w-screen font-normal font-['Outfit'] flex justify-between w-[1000px] mx-auto mt-5">
            Devoko Ergonomic Gaming Chair Racing Style
          </div> */}
          <div className=" w-[1000px] max-md:w-screen mx-auto mt-5">
            <div className="text-white text-lg font-normal font-['Outfit']">
              About this item
              <br />
            </div>
            <span className="text-white text-lg max-md:w-screen font-normal font-['Outfit']">
              {product.Describtion}
            </span>
          </div>
        </div>
      </div>
      <SlidePrductCategory
        TitleOfComponent="✨ SIMILAR PRODUCTS "
        Category={product.Category}
      />
      {/* Reviews */}
      <div className=" w h-fit w-screen bg-white flex   max-md:h-fit  justify-center  items-start">
        <div className="max-md:h-fit w-full  mx-auto ">
          <div className="text-black  text-center max-md:h-fit text-4xl my-10 font-normal  w-full  font-['Outfit'] ">
            📝 Reviews
          </div>
          <div className=" h-fit text-center mx-auto md:max-w-[1200px] w-full  px-3 py-3 max-md:w-screen   max-md:h-fit   bg-gray-200 rounded-3xl ">
            {product.Comments?.length === 0 ? (
              <div className="text-black mx-auto  max-md:h-fit text-4xl my-10 font-normal  w-full  font-['Outfit'] ">
                No reviews yet
              </div>
            ) : (
              <div className=" section mx-auto w-full  overflow-y-scroll  h-fit  ">
                <CommentSection product={product} />
              </div>
            )}
            {/* comment sction  */}
            {user && (
              <form className="mb-6 ">
                <div className="py-2 w-[80%] max-md:mx-auto px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                  <label htmlFor="comment" className="sr-only">
                    Your comment
                  </label>
                  <textarea
                    id="comment"
                    rows="6"
                    className="px-0 h-10 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                    placeholder="Write a comment..."
                    required
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                  <Rating
                    emptySymbol={
                      <svg
                        className="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    }
                    fullSymbol={
                      <svg
                        className="w-4 h-4 text-yellow-300 ms-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        {" "}
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    }
                    onChange={(rate) => setRate(rate)}
                    // initialRating={0}
                    // start={0}
                    // stop={5}

                    // Start with 0 stars
                  />
                </div>
                <div
                  type="submit"
                  onClick={handelAddcommentAndreview}
                  className="cursor-pointer inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                >
                  Post comment
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
