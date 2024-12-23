import contact_image from "../../../public/Home/contact.png";
import benefits1_image from "../../../public/Home/benefits1.png";
import benefits2_image from "../../../public/Home/benefits2.png";
import benefits3_image from "../../../public/Home/benefits3.png";
import benefits4_image from "../../../public/Home/benefits4.png";
import fb_image from "../../../public/Home/Facebook.png";
import Hero_image from "../../../public/Home/Hero.png";
import howWeWork_image2 from "../../../public/Home/how_we_work_image.png";
import howWeWork_image from "../../../public/Home/how_we_work.png";
import instagram_image from "../../../public/Home/Instagram.png";
import linkedin_image from "../../../public/Home/linkedin.png";
import Feature1_image from "../../../public/Home/Feature1.png";
import Feature2_image from "../../../public/Home/Feature2.png";
import Feature3_image from "../../../public/Home/Feature3.png";
import whatsup_image from "../../../public/Home/Whatsup.png";
import Logo from "../../../public/Logo.png";
import NavBar from "./NavBar/NavBar";
import React from "react";
import { useState, useEffect } from "react";
import Hero from "./Hero";
import Features from "./Features";
import Contact from "./Contact";
import Benefits from "./Benefits";
import HowWeWork from "./How_we_work";
import Footer from "./Footer";
function Home() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch_images = () => {
            return new Promise((resolve, reject) => {
                const images = [
                    contact_image,
                    benefits1_image,
                    benefits2_image,
                    benefits3_image,
                    benefits4_image,
                    fb_image,
                    Hero_image,
                    howWeWork_image2,
                    howWeWork_image,
                    instagram_image,
                    linkedin_image,
                    Feature1_image,
                    Feature2_image,
                    Feature3_image,
                    whatsup_image,
                ];
                images.forEach((imageSrc) => {
                    const img = new Image();
                    img.onload = () => {
                        resolve();
                    };
                    img.onerror = () => {
                        resolve();
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
                <img src={Logo} alt="" className=" w-20 pb-6" />
                <span className="loader"></span>
            </div>
        );
    }
    return (
        <div className="   relative h-screen overflow-y-auto custom-overflow overflow-x-hidden ">
            <NavBar />
            <div className=" mt-[60px]">
                <Hero />
                <Features />
                <HowWeWork />
                <Benefits />
                <Contact />
                <Footer />
            </div>
        </div>
        // <div className="relative min--screen overflow-y-auto custom-overflow overflow-x-hidden">
        //     <NavBar />
        //     <div className=" mt-[60px]">
        //         <Hero />
        //         <Features />
        //         <HowWeWork />
        //         <Benefits />
        //         <Contact />
        //         <Footer />
        //     </div>
        // </div>
    );
}

export default Home;
