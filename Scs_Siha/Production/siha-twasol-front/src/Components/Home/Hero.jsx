import React from "react";
import Hero_image from "../../../public/Home/Hero.png";
import { useNavigate } from "react-router-dom";
function Hero() {
    const Navigate = useNavigate();
    return (
        <div>
            <div
                className=" flex flex-col md:flex-row justify-center items-center md:items-start
              md:gap-12 md:mt-40 mt-20"
            >
                <img src={Hero_image} className=" w-[320px] shrink-0" alt="" />
                <div className="h-full md:pt-12 max-w-[380px] px-4">
                    <div className=" font-semibold text-2xl  ">
                        كل ما تحتاجه من خدمات التواصل الصحي ستجده معنا في هذه
                        المنصة
                    </div>
                    <div className=" text-sm pt-4">
                        SCS انضم إلى منصة <br />و استمتع بتجربة تواصل صحي
                        جديدة و مميزة
                    </div>
                    <div
                        onClick={() => {
                            Navigate("/Register");
                        }}
                        className=" w-[90%] mx-auto py-2 font-bold cursor-pointer px-4 text-center bg-blue_v text-white mt-6  rounded-lg"
                    >
                        إبدأ معنا
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;
