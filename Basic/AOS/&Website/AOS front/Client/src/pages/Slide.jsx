// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import HomeImage from "../assets/icon/HomeImage1.png";


import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
function Slide() {
  return (
    <Swiper
      className="home-image"
      width="1200"
      id="swiper-color"
      navigation
      spaceBetween={5}
      slidesPerView={1}
      autoplay
    >
      {Array.from(Array(5)).map((el, i) => {
        return (
          <SwiperSlide className="w-screen" key={`slide-${i}`} style={{}}>
            <img className=" home-image" src={HomeImage} alt={`Slide ${i}`} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default Slide;
