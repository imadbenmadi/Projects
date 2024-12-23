import FeedBackCard from "./FeedBackCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const FeedBack = () => {
    return (
        <section className="w-full bg-white py-24 p-4">
            <div className="md:max-w-[1100px] m-auto max-w-[400px]">
                <h1 className="py-4 text-3xl font-bold">
                    Students <span className="text-[#20B486]">Feed back</span>
                </h1>
                <p className="text-[#6D737A] py-2">
                    Various versions have evolved over the years, sometimes by
                    accident.
                </p>

                <Swiper
                    slidesPerView={2}
                    spaceBetween={30}
                    pagination={{ clickable: true }}
                    navigation={true}
                    breakpoints={{
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                        600: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        500: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        300: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                    }}
                    modules={[Pagination, Navigation]}
                    className="px-5"
                >
                    <SwiperSlide>
                        <FeedBackCard />
                    </SwiperSlide>
                    <SwiperSlide>
                        <FeedBackCard />
                    </SwiperSlide>
                    <SwiperSlide>
                        <FeedBackCard />
                    </SwiperSlide>
                    <SwiperSlide>
                        <FeedBackCard />
                    </SwiperSlide>
                    <SwiperSlide>
                        <FeedBackCard />
                    </SwiperSlide>
                </Swiper>
            </div>
        </section>
    );
};

export default FeedBack;
