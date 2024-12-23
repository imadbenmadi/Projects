import React, { useRef } from "react";
import Logo from "../../../public/Logo.png";
import { Link } from "react-router-dom";
import feacbook from "../../../public/Home/Footer/Facebook.png";
import Instagram from "../../../public/Home/Footer/Instagram.png";
import gmail_image from "../../../public/Home/Footer/gmail.png";
import { motion, useInView } from "framer-motion";

function Footer() {
    var currentYear = new Date().getFullYear();

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const itemVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } },
    };
    return (
        <motion.div
            ref={ref}
            variants={itemVariants}
            initial="hidden"
            animate={isInView ? "visible" : ""}
            className=" bg-zinc-100 py-4 mt-10 dark:bg-black dark:text-white text-black_text "
        >
            <div className="max-w-[1200px] mx-auto text-center">
                <div>
                    <div className="flex  content-center max-md:gap-4 max-md:flex-col justify-center items-center max-w-full text-sm font-bold leading-5  max-md:flex-wrap">
                        <a
                            href="#Hero"
                            className="   w-fit max-md:w-fit  my-auto"
                        >
                            <div className="text-center  ">Why choose us</div>
                        </a>
                        <a
                            href="#Goal"
                            className="  w-[12%] max-md:w-fit  my-auto"
                        >
                            <div className="text-center">Our goals</div>
                        </a>

                        <a
                            href="#Our_features"
                            className=" w-[12%] my-auto max-md:w-fit "
                        >
                            Our services
                        </a>
                        <Link
                            to={"/"}
                            className="select-none  :w-[20%] max-md:order-first"
                        >
                            <img
                                src={Logo}
                                alt="Logo"
                                className=" w-full lg:w-[145px] "
                            />
                        </Link>
                        <a
                            href="#Contact_us"
                            className=" w-[12%] max-md:w-fit    my-auto"
                        >
                            <div>Contact us </div>
                        </a>
                        <Link to="/Login" className="  w-[12%] ">
                            <div>Hire</div>
                        </Link>
                        <Link
                            to="/Privacy"
                            className=" w-[12%] max-md:w-fit my-auto"
                        >
                            Privacy
                        </Link>
                    </div>
                </div>
                <hr className="h-[2px] my-2 max-md:hidden bg-gray-300"></hr>
                <div className="flex justify-center gap-6 items-center mx-auto  w-full  mt-12 max-md:mt-10">
                    <a href="https://www.facebook.com/profile.php?id=61559810925193">
                        <img src={feacbook} className=" w-10 " />
                    </a>
                    <a href="https://www.instagram.com/dzid_com/">
                        <img src={Instagram} className=" w-10 " />
                    </a>
                    <a href="mailto:dziidcom@gmail.com">
                        <img src={gmail_image} className=" w-8 " />
                    </a>{" "}
                </div>
                <div className="self-center mt-16 text-sm leading-5 text-center text-black max-md:mt-10">
                    © {currentYear}
                </div>
            </div>
        </motion.div>
    );
}

export default Footer;
