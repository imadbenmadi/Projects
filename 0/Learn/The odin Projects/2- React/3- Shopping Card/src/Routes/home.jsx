import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";



export default function Home() {
    return (
        <div className="flex flex-col justify-center items-center " style={{}}>
            <h1 className="font-bold text-3xl">Welcom to the</h1>
            <h1 className="font-bold text-3xl mb-20">
                <span className="text-green-500">Algeria </span>
                <span className="text-black"> Online </span>
                <span className="text-red-500">Store</span>
            </h1>
            <div className="cursor-grab">
                <Swiper
                    // install Swiper modules
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={50}
                    slidesPerView={3}
                    navigation
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                >
                    <SwiperSlide>Slide 1</SwiperSlide>
                    <SwiperSlide>Slide 2</SwiperSlide>
                    <SwiperSlide>Slide 3</SwiperSlide>
                    <SwiperSlide>Slide 4</SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
}
