import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";

import ClientsSaidCard from "./ClientsSaid/ClientsSaidCard";
import user from "../../../public/Home/Client said/user.png";
import CustomPagination from "./ClientsSaid/CustomPagination";
import { Navigation, Autoplay } from "swiper/modules";
import "./ClientsSaid/clientSaidStyle.css";
import { useInView, motion } from "framer-motion";
function ClientsSaid({ isChecked }) {
    const navigate = useNavigate();

    const [Feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handlePrevClick = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slidePrev();
        }
    };

    const handleNextClick = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideNext();
        }
    };
    useEffect(() => {
        setLoading(true);
        const fetchFeedbacks = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/Home_Feedbacks`,
                    {
                        withCredentials: true,
                        // validateStatus: () => true,
                    }
                );
                if (response.status === 200) {
                    // setFeedbacks(response.data.Feedbacks);
                    const transformedFeedbacks = response.data.map(
                        (feedback) => ({
                            image: feedback.image_link || user,
                            user: feedback.full_user_name,
                            text: feedback.Comment,
                            Rate: feedback.Rate,
                        })
                    );
                    setFeedbacks(transformedFeedbacks);
                    // setFeedbacks([]);
                } else {
                    // setError(response.data);
                    setFeedbacks([]);
                }
            } catch (error) {
                // setError(error);
                setFeedbacks([]);
            } finally {
                setLoading(false);
            }
        };

        fetchFeedbacks();
    }, []);
    const dataChoose = Feedbacks;
    const [activeSlide, setActiveSlide] = useState(0);
    const swiperRef = useRef(null);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.5 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                staggerChildren: 1, // delay between child animations
            },
        },
    };

    // const dataChoose = [
    //     {
    //         image: user,
    //         user: "Loretta Upton",
    //         text: "Illo nihil vitae possimus minima consequatur itaque doloremque. Illo nihil vitae possimus minima consequatur itaque doloremque. Illo nihil vitae possimus minima consequatur itaque doloremque.",
    //     },
    //     {
    //         image: user,
    //         user: "Loretta Upton",
    //         text: "Illo nihil vitae possimus minima consequatur itaque doloremque. Illo nihil vitae possimus minima consequatur itaque doloremque. Illo nihil vitae possimus minima consequatur itaque doloremque.",
    //     },
    //     {
    //         image: user,
    //         user: "Loretta Upton",
    //         text: "Illo nihil vitae possimus minima consequatur itaque doloremque. Illo nihil vitae possimus minima consequatur itaque doloremque. Illo nihil vitae possimus minima consequatur itaque doloremque.",
    //     },
    //     {
    //         image: user,
    //         user: "Loretta Upton",
    //         text: "Illo nihil vitae possimus minima consequatur itaque doloremque. Illo nihil vitae possimus minima consequatur itaque doloremque. Illo nihil vitae possimus minima consequatur itaque doloremque.",
    //     },
    //     {
    //         image: user,
    //         user: "Loretta Upton",
    //         text: "Illo nihil vitae possimus minima consequatur itaque doloremque. Illo nihil vitae possimus minima consequatur itaque doloremque. Illo nihil vitae possimus minima consequatur itaque doloremque.",
    //     },
    //     // Add more data objects as needed
    // ];
    if (loading) {
        return (
            <div className="w-screen h-[60vh] flex flex-col items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    } else if (error) {
        return null;
    } else if (!Feedbacks || Feedbacks.length === 0) return null;
    else
        return (
            <div className="lg:px-16  max-md:px-5 px-5  max-w-[1200px] mx-auto">
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    // initial="hidden"
                    // animate={isInView ? "visible" : ""}
                >
                    <div
                        className="text-5xl dark:text-white leading-[72.8px] 
                    text-center text-zinc-800 max-md:max-w-full max-md:text-4xl"
                    >
                        {!isChecked
                            ? "What our users say about us"
                            : "What our users say about us"}
                    </div>
                    {/* <div className=" text-black">hui</div> */}
                </motion.div>
                <Swiper
                    ref={swiperRef}
                    modules={[Navigation, Autoplay]}
                    className="mt-10 h-[400px] w-[100%]"
                    effect="coverflow"
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView="auto"
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 200,
                        modifier: 1,
                        slideShadows: false,
                    }}
                    spaceBetween={10}
                    breakpoints={{
                        0: { slidesPerView: 1, spaceBetween: 10 },
                        400: { slidesPerView: 1, spaceBetween: 20 },
                        640: { slidesPerView: 1, spaceBetween: 20 },
                        768: { slidesPerView: 2, spaceBetween: 40 },
                        1024: { slidesPerView: 3, spaceBetween: 50 },
                    }}
                    onSlideChange={(swiper) =>
                        setActiveSlide(swiper.activeIndex)
                    }
                    loop={true}
                    autoplay={{
                        delay: 3500,
                        disableOnInteraction: false,
                    }}

                    // navigation={true}
                    // navigation={true}
                >
                    {dataChoose.map((item, index) => (
                        <SwiperSlide key={index}>
                            <ClientsSaidCard
                                image={item.image}
                                text={item.text}
                                user={item.user}
                                Rate={item.Rate}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
                {/* Custom pagination */}
                <CustomPagination
                    totalSlides={dataChoose.length}
                    activeIndex={activeSlide}
                    onPrevClick={handlePrevClick}
                    onNextClick={handleNextClick}
                />
            </div>
        );
}

export default ClientsSaid;
