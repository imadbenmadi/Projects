import CardHome from "../components/CardHome";
import HomeImage from "../assets/icon/HomeImage1.png";

import microwave from "../assets/icon/microwave-oven.png";
import girl from "../assets/icon/girl-dynamic-color.png";
import headphone from "../assets/icon/headphone-dynamic-color.png";
import book2 from "../assets/icon/book2.png";

import "swiper/swiper-bundle.css";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SlideProduct from "./SlideProduct";
import { getRecomedProduct } from "../Redux/apiCalls/RecomandProduct";
import { Basket, getUserProfile, login, selectInfo } from "../Redux/reducer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SlidePrductCategory from "./SlidePrductCategory";
import { getProductsByCategory } from "../Redux/apiCalls/productApiCalls";
import { GetAllCategories } from "../Redux/apiCalls/categoriesApiCalls";
// ...your previous imports and component definition
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { getProfileApi } from "../Redux/apiCalls/profileApiCalls";
import { getProductsBasket } from "../Redux/apiCalls/basketApiCalls";
function Home() {
  const [recomanded, setRecomanded] = useState([]);
  const { user } = useSelector(selectInfo);
  const [Category, setCategory] = useState([]);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const getRecomanded = async () => {
    const data = await getRecomedProduct(user._id);
    // console.log(data.recommendedProducts);
    setRecomanded(data.recommendedProducts);
    return data.recommendedProducts;
  };
  const getCategory = async () => {
    const data = await GetAllCategories();
    setCategory(data);
    console.log(data);
  };
  const dispatch = useDispatch();
  const getProfile = async () => {
    const userData = await getProfileApi(user._id);

    dispatch(getUserProfile(userData));
    console.log(userData);
    // setLoading(true);
  };

  useEffect(() => {
    const fetchRecomanded = async () => {
      const data = await getRecomanded();
      setRecomanded(data);
    };
    if (user) {
      fetchRecomanded();

      // getProfile();
    }
    getCategory();
  }, []);

  return (
    <div>
      <div className="  overflow-hidden w-screen p-0 m-0 h-[96vh] max-md:h-[40vh]  relative">
        {/* Your images go here */}

        <Slider
          {...settings}
          className="  w-screen h-full  overflow-hidden md:w-full max-md:h-[40vh]   "
        >
          <div className="slider-item  max-md:h-[40vh] md:w-full w-screen overflow-hidden ">
            <img
              className="home-image object-cover md:h-[100vh]   md:w-full   "
              src={HomeImage}
              alt="Home Image"
            />
          </div>
          <div className="slider-item  max-md:h-[40vh] md:w-full w-screen overflow-hidden ">
            <img
              className="home-image object-cover md:h-[100vh]   md:w-full   "
              src={HomeImage}
              alt="Home Image"
            />
          </div>
          <div className="slider-item  max-md:h-[40vh] md:w-full w-screen overflow-hidden ">
            <img
              className="home-image object-cover md:h-[100vh]   md:w-full   "
              src={HomeImage}
              alt="Home Image"
            />
          </div>
        </Slider>
        {/* <Swiper
          className="  w-screen h-full  overflow-hidden md:w-full max-md:h-[40vh]   "
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          // onSwiper={setSwiper}
          // spaceBetween={10}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true, dynamicBullets: true }}

          //   scrollbar={{ draggable: true }}
        >
          <SwiperSlide className="  max-md:h-[40vh] md:w-full w-screen overflow-hidden ">
            <img
              className="home-image object-cover md:h-[100vh]   md:w-full   "
              src={HomeImage}
              alt="Home Image"
            />
          </SwiperSlide>
          <SwiperSlide className=" max-md:h-[40vh] md:w-full w-screen overflow-hidden ">
            <img
              className="home-image object-cover md:h-[100vh]   md:w-full   "
              src={HomeImage}
              alt="Home Image"
            />
          </SwiperSlide>
          <SwiperSlide className="  max-md:h-[40vh] md:w-full w-screen overflow-hidden ">
            <img
              className="home-image object-cover md:h-[100vh]   md:w-full   "
              src={HomeImage}
              alt="Home Image"
            />
          </SwiperSlide>
        </Swiper> */}
        <div className="   flex justify-center overflow-hidden  max-w-[1200px] mx-auto    ">
          <div className="   max-md:flex-col max-md:max-w-screen   flex justify-between items-end absolute top-72 max-md:top-32  ">
            {/* <Swiper
              className="  w-screen h-full  overflow-hidden md:w-full max-md:h-[40vh]   "
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              // onSwiper={setSwiper}
              // spaceBetween={10}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true, dynamicBullets: true }}

              //   scrollbar={{ draggable: true }}
            >
              <SwiperSlide className="  max-md:h-[40vh] md:w-full w-screen overflow-hidden ">
                <img
                  className="home-image object-cover md:h-[100vh]   md:w-full   "
                  src={HomeImage}
                  alt="Home Image"
                />
              </SwiperSlide>
              <SwiperSlide className=" max-md:h-[40vh] md:w-full w-screen overflow-hidden ">
                <img
                  className="home-image object-cover md:h-[100vh]   md:w-full   "
                  src={HomeImage}
                  alt="Home Image"
                />
              </SwiperSlide>
              <SwiperSlide className="  max-md:h-[40vh] md:w-full w-screen overflow-hidden ">
                <img
                  className="home-image object-cover md:h-[100vh]   md:w-full   "
                  src={HomeImage}
                  alt="Home Image"
                />
              </SwiperSlide>
            </Swiper> */}
            <div className="grid max-lg:grid-cols-4 gap-2 lg:hidden  ">
              <CardHome img={microwave} text={"Books"} color="from-rose-200" />
              <CardHome img={headphone} text={"Tech"} color="from-teal-200" />
              <CardHome img={girl} text={"Clothes"} color="from-green-200" />
              <CardHome img={book2} text={"Books"} color="from-rose-200" />
            </div>
            <div className="max-lg:hidden flex justify-between  ">
              <CardHome img={microwave} text={"Books"} color="from-rose-200" />
              <CardHome img={headphone} text={"Tech"} color="from-teal-200" />
              <CardHome img={girl} text={"Clothes"} color="from-green-200" />
              <CardHome img={book2} text={"Books"} color="from-rose-200" />
            </div>
          </div>
        </div>
      </div>
      {user && (
        <SlideProduct
          TitleOfComponent="Recomanded Product "
          Products={recomanded}
        />
      )}
      {Category.map((item) => (
        <SlidePrductCategory
          key={item._id}
          TitleOfComponent={item.Category}
          Category={item.Category}
        />
      ))}
      {/* <SlidePrductCategory TitleOfComponent="✨Mobile " Category="mobile" />
      <SlidePrductCategory TitleOfComponent="✨ TRENDING SELL" />
      <SlidePrductCategory TitleOfComponent="✨ TRENDING SELL" />
      <SlidePrductCategory TitleOfComponent="👕 Clothes" /> */}
    </div>
  );
}

export default Home;
