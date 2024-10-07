// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";
import CardShop from "../components/Product/CardShop";
import { Link, useNavigate } from "react-router-dom";

import { getProductsByCategory } from "../Redux/apiCalls/productApiCalls";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

function SlidePrductCategory({ TitleOfComponent, Category }) {
  const [Products, setProducts] = useState([]);
  const swiper = useSwiper();

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const sendData = () => {
    navigate(`/AllProducts/${Category}`, {
      state: { title: TitleOfComponent },
    });
  };
  const fetchProduct = async () => {
    const data = await getProductsByCategory(Category);
    setProducts(data);
  };
  useEffect(() => {
    fetchProduct();
  }, [Category]);
  const setSwiper = (swiper) => {
    swiper.on("slideChange", () => {
      console.log("slide changed");
    });
  };

  return (
    <div className="max-w-[1300px] relative    h-fit max-md:h-fit max-h-screen mx-auto mt-24 max-md:mt-0">
      <div className=" px-5 flex justify-between items-center text-black overflow-hidden text-4xl font-normal font-['Outfit'] my-6">
        <div className="max-md:text-lg font-bold">{TitleOfComponent}</div>
        <div
          onClick={sendData}
          className=" hover:bg-black hover:text-white cursor-pointer  duration-250 text-2xl max-md:text-lg font-normal  border px-4 py-1 rounded-lg border-gray-500 "
        >
          View All
        </div>
      </div>

      {/* <Slider className="flex  w-full" {...settings}>
        {Products?.map((item) => (
          <Link key={item._id} to={`/Products/${item._id}`}>
            <CardShop
              Products={Products.length}
              image="https://as1.ftcdn.net/v2/jpg/04/60/01/36/1000_F_460013622_6xF8uN6ubMvLx0tAJECBHfKPoNOR5cRa.jpg"
              title={item.Title}
              des={item.Describtion}
              price={item.Price}
              rate={item.Product_RatingAverage}
            />
          </Link>
        ))}
      </Slider> */}
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
          onSwiper={setSwiper}
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
                  Products={Products.length}
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

export default SlidePrductCategory;
