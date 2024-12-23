import image1 from "../../../public/Home/Services/image1.png";
import image2 from "../../../public/Home/Services/image2.png";
import image3 from "../../../public/Home/Services/image3.png";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import ServiceCard from "./Services/ServiceCard";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Autoplay, Navigation } from "swiper/modules";

function Services({ isChecked }) {
    const dataChoose = [
        {
            image: image1,
            text: "Graphic Designer",
        },
        {
            image: image2,
            text: "SMM / SEO",
        },
        {
            image: image3,
            text: "Content creation",
        },
        {
            image: image2,
            text: "SMM / SEO",
        },
    ];
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.5, // delay between child animations
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : ""}
            className=" lg:px-16 max-md:px-5 px-5 dark:text-white  py-16  md:min-h-[calc(100vh-120px)]"
        >
            <motion.div variants={itemVariants}>
                <div className="text-5xl  dark:text-white  leading-[72.8px] text-zinc-800 max-md:max-w-full max-md:text-4xl">
                    {!isChecked
                        ? "The services we provide"
                        : "Areas in which you can apply"}
                </div>
                <div className="mt-2 text-xl dark:text-white max-md:text-xs text-zinc-800 max-md:max-w-full">
                    {isChecked
                        ? "  Discover services to help your company thrive with our freelance platform."
                        : "Discover the jobs you can apply for as a freelancer on our website"}
                </div>
            </motion.div>

            <Swiper
                className="mt-10"
                spaceBetween={50}
                modules={[Navigation, Autoplay]}
                loop={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    400: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    640: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 50,
                    },
                }}
            >
                {dataChoose.map((item, index) => (
                    <SwiperSlide key={index}>
                        <motion.div variants={itemVariants}>
                            <ServiceCard
                                image={item.image}
                                text={item.text}
                                key={index}
                            />
                        </motion.div>
                    </SwiperSlide>
                ))}{" "}
            </Swiper>
        </motion.div>
    );
}

export default Services;
