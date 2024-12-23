import React, { useRef } from "react";
import Logo from "../../../public/Logo.png";
import { Link } from "react-router-dom";
import feacbook from "../../../public/Home/Facebook.png";
import Instagram from "../../../public/Home/Instagram.png";
// import Whatsup from "../../../public/Home/Whatsup.png";
import linkedin from "../../../public/Home/linkedin.png";
// import gmail_image from "../../../public/Home/Footer/gmail.png";
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
            className=" bg-zinc-100 py-4 mt-10  text-black "
        >
            <div className="max-w-[1200px] mx-auto text-center">
                <div>
                    <div className=" font-semibold mb-6 flex justify-center items-center gap-12 w-full text-right">
                        <div
                            // to={"/"}
                            className="shrink-0 "
                        >
                            <img
                                src={Logo}
                                alt="Logo"
                                className="  w-[70px] shrink-0 "
                            />
                        </div>
                        <div className=" flex justify-center items-center gap-6  flex-wrap  w-fut shrink-0">
                            <a
                                href="/Home#Features"
                                className="   w-fit max-md:w-fit  my-auto"
                            >
                                <div className="text-center  ">ميزاتنا</div>
                            </a>
                            <a
                                href="/Home#How_we_work"
                                className="   max-md:w-fit  my-auto"
                            >
                                <div className="text-center"> كيف نعمل</div>
                            </a>

                            <a
                                href="/Home#Contact"
                                className=" my-auto max-md:w-fit "
                            >
                                اتصل بنا{" "}
                            </a>
                        </div>

                        {/* <a
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
                        </Link> */}
                    </div>
                </div>
                <hr className="h-[2px] my-2  bg-gray-300"></hr>
                <div className="flex justify-center gap-6 items-center mx-auto  w-full  mt-12 max-md:mt-10">
                    <a href="https://www.facebook.com/profile.php?id=100074782714472&mibextid=ZbWKwL">
                        <img src={feacbook} className=" w-10 " />
                    </a>
                    <a href="https://www.instagram.com/yahiaoui_wissal?igsh=MTdyZjJnaW1hZnRtZA==">
                        <img src={Instagram} className=" w-10 " />
                    </a>
                    <a href="https://www.linkedin.com/in/wissal-khadidja-yahiaoui-030620282?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">
                        <img src={linkedin} className=" w-10 " />
                    </a>{" "}
                </div>
                <div className="self-center mt-16 text-sm leading-5 text-center text-black max-md:mt-10">
                    {/* <div className=" block pb-4 font-semibold text-lg">
                        {" "}
                        imadbenmadi@gilmail.com
                    </div> */}
                    <div className="">© {currentYear}</div>
                </div>
            </div>
        </motion.div>
    );
}

export default Footer;
