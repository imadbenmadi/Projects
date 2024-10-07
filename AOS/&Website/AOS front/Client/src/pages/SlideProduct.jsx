import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CardShop from "../components/Product/CardShop";
import homeImage from "../assets/icon/HomeImage1.png";
import { Link, useNavigate } from "react-router-dom";
import { faker } from "@faker-js/faker";
import { useRef, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Assuming you are using Font Awesome for icons
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
// eslint-disable-next-line react/prop-types
function SlideProduct({ TitleOfComponent, Products }) {
  const settings = {
    // dots: true,
    // nextArrow: true,
    // prevArrow: true,
    color: "red",
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    autoplay: true,
    autoplaySpeed: 2000,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          // dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  const category = Products[0]?.Category; // Assuming you have product data
  const navigate = useNavigate(); // Get the navigate function

  const sendData = () => {
    const url = `/AllProducts/${category}`; // Construct the URL dynamically
    navigate(url, { state: { title: "TitleOfComponent" } }); // Navigate with state
  };
  useEffect(() => {
    console.log(Products);
  }, [Products]);

  return (
    <div className="max-w-[1300px]  h-fit max-md:h-fit max-h-screen mx-auto mt-24 max-md:mt-0">
      <div className=" px-5 flex justify-between items-center text-black overflow-hidden text-4xl font-normal font-['Outfit'] my-6">
        <div className="max-md:text-lg font-bold">{TitleOfComponent}</div>
        <div
          onClick={sendData}
          className=" hover:bg-black hover:text-white cursor-pointer  duration-250 text-2xl max-md:text-lg font-normal  border px-4 py-1 rounded-lg border-gray-500 "
        >
          View All
        </div>
      </div>
      {/* <Slider className=" w-full  px-10" {...settings}>
        {Products?.map((item) => (
          <Link key={item._id} to={`/Products/${item._id}`}>
            <CardShop
              image="https://as1.ftcdn.net/v2/jpg/04/60/01/36/1000_F_460013622_6xF8uN6ubMvLx0tAJECBHfKPoNOR5cRa.jpg"
              title={item.Title}
              des={item.Describtion}
              price={item.Price}
              rate={item.Product_RatingAverage}
            />
          </Link>
        ))}
      </Slider> */}

      {/* <Swiper
        className="w-full"
        breakpoints={{
          640: {
            slidesPerView: 1, // Mobile: Show 1 slide
          },
          1024: {
            slidesPerView: 3, // Tablet: Show 3 slides
          },
        }}
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={10}
        //   slidesPerView={5}
        navigation
        pagination={{ clickable: true, dynamicBullets: true }}
        className="mySwiper"

        //   scrollbar={{ draggable: true }}
      >
        {Products?.map((item) => (
          <Link key={item._id} to={`/Products/${item._id}`}>
            <CardShop
              image="https://as1.ftcdn.net/v2/jpg/04/60/01/36/1000_F_460013622_6xF8uN6ubMvLx0tAJECBHfKPoNOR5cRa.jpg"
              title={item.Title}
              des={item.Describtion}
              price={item.Price}
              rate={item.Product_RatingAverage}
            />
          </Link>
        ))}
      </Swiper> */}
      <div className="relative">
        <Swiper
          breakpoints={{
            640: {
              slidesPerView: 2, // Mobile: Show 1 slide
            },
            1024: {
              slidesPerView: 5, // Tablet: Show 3 slides
            },

            9999: {
              slidesPerView: 5, // Tablet: Show 3 slides
            },
          }}
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          // onSwiper={setSwiper}
          spaceBetween={10}
          //   slidesPerView={5}
          navigation
          pagination={{ clickable: true, dynamicBullets: true }}
          className="mySwiper"

          //   scrollbar={{ draggable: true }}
        >
          {Products?.map((item) => (
            <SwiperSlide key={item._id}>
              <Link to={`/Products/${item._id}`}>
                <CardShop
                  image="https://as1.ftcdn.net/v2/jpg/04/60/01/36/1000_F_460013622_6xF8uN6ubMvLx0tAJECBHfKPoNOR5cRa.jpg"
                  title={item.Title}
                  des={item.Describtion}
                  price={item.Price}
                  rate={item.Product_RatingAverage}
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default SlideProduct;
