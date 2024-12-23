import React from "react";
import Hero from "./1_Hero";
import Why_Choose_us from "./2_Why_Choose_us";
import Ower_Goal from "./3_Ower_Goal";
import Services from "./4_Services";
import Clients_said from "./5_Clients_said";
import Contact from "./6_Contact";
import { useState, useEffect } from "react";
import Footer from "./7_Footer";
import login_image from "../../../public/Login.png";
import register_image from "../../../public/Register.png";
import user1 from "../../../public/user1.png";
import contact_image from "../../../public/Home/Contact/contact_image.png";

import Facebook_image from "../../../public/Home/Footer/Facebook.png";
import Instagram_image from "../../../public/Home/Footer/Instagram.png";
import gmail_image from "../../../public/Home/Footer/gmail.png";

import hero_arrow from "../../../public/Home/Hero/Arrow.png";
import hero_icon from "../../../public/Home/Hero/icon.png";
import hero_search from "../../../public/Home/Hero/search.png";
import Hero1 from "../../../public/Home/Hero/Hero1.png";
import Hero2 from "../../../public/Home/Hero/Hero2.png";
import Hero3 from "../../../public/Home/Hero/Hero3.png";

import ower_goal_image from "../../../public/Home/ower goal/ower_goal_image.png";
import ower_goal_star from "../../../public/Home/ower goal/star.png";
import ower_goal_stars from "../../../public/Home/ower goal/stars.png";
import ower_goal_item from "../../../public/Home/ower goal/item.png";

import Services_image1 from "../../../public/Home/Services/image1.png";
import Services_image2 from "../../../public/Home/Services/image2.png";
import Services_image3 from "../../../public/Home/Services/image3.png";

import Why_choose_us_image1 from "../../../public/Home/Why choose us/image1.png";
import Why_choose_us_image2 from "../../../public/Home/Why choose us/image2.png";
import Why_choose_us_image3 from "../../../public/Home/Why choose us/image3.png";
import Why_choose_us_image4 from "../../../public/Home/Why choose us/image4.png";
import Why_choose_us_image5 from "../../../public/Home/Why choose us/image5.png";
import Why_choose_us_image6 from "../../../public/Home/Why choose us/image6.png";
import NavBar from "../../Components/Home/NavBar/NavBar";

import Logo from "../../../public/Logo.png";
function Home() {
    const [loading, setLoading] = useState(true);
    const [isChecked, setIsChecked] = useState(
        localStorage.getItem("isChecked") === "true" ? true : false
    );
    useEffect(() => {
        const fetch_images = () => {
            return new Promise((resolve, reject) => {
                const images = [
                    login_image,
                    register_image,
                    user1,
                    contact_image,
                    Facebook_image,
                    Instagram_image,
                    gmail_image,
                    hero_arrow,
                    hero_icon,
                    hero_search,
                    Hero1,
                    Hero2,
                    Hero3,
                    ower_goal_image,
                    ower_goal_star,
                    ower_goal_stars,
                    ower_goal_item,
                    Services_image1,
                    Services_image2,
                    Services_image3,
                    Why_choose_us_image1,
                    Why_choose_us_image2,
                    Why_choose_us_image3,
                    Why_choose_us_image4,
                    Why_choose_us_image5,
                    Why_choose_us_image6,
                ];
                let loadedCount = 0;
                if (images.length === 0) resolve();
                images.forEach((imageSrc) => {
                    const img = new Image();
                    img.onload = () => {
                        loadedCount++;
                        if (loadedCount === images.length) {
                            resolve(); // Resolve promise when all images are loaded
                        }
                    };
                    img.onerror = () => {
                        resolve(); // Reject if any image fails to load
                    };
                    img.src = imageSrc;
                });
            });
        };

        Promise.all([fetch_images()])
            .then(() => {
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);
    if (loading) {
        return (
            <div className=" w-screen h-screen flex flex-col items-center justify-center">
                <img src={Logo} alt="" />
                <span className="loader"></span>
            </div>
        );
    }
    return (
        <div className=" dark:bg-black dark:text-white scroll-smooth duration-500 scroll-d relative min-h-h-screen overflow-y-auto custom-overflow overflow-x-hidden ">
            <NavBar />
            <div className=" mt-[50px] md:mt-[60px] h-fit ">
                <div className="scroll-smooth  ">
                    <div id="Hero" className=" max-w-[1200px] mx-auto h-fit">
                        <Hero
                            isChecked={isChecked}
                            setIsChecked={setIsChecked}
                        />
                        <Why_Choose_us />
                    </div>
                    <div id="Goal">
                        <Ower_Goal isCheaked={isChecked} />
                    </div>
                    <div id="Our_features" className=" max-w-[1200px] mx-auto">
                        <Services isChecked={isChecked} />
                    </div>

                    <Clients_said isChecked={isChecked} />
                    <div id="Contact_us">
                        <Contact />
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default Home;
