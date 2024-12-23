import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { FaHome } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

export default function MenuBar() {
    const [MobileMenuVisible, setMobileMenuVisibility] = useState(false);
    const [DesktopMenuVisible, setDesktopMenuVisible] = useState(true);
    const toggleMobileMenu = () => {
        setMobileMenuVisibility(!MobileMenuVisible);
    };
    const toggleDesktopMenu = () => {
        setDesktopMenuVisible(!DesktopMenuVisible);
    };
    return (
        <>
            {/* Mobile menu bar */}

            <div className="lg:hidden  ">
                <div
                    className={`${
                        MobileMenuVisible
                            ? "translate-y-[-100%] "
                            : " translate-y-[0%] delay-200 "
                    }transition-translate duration-300 ease-in-out bg-Blue w-[100px] h-[100px] rounded-br-[80px] 
                    flex  flex-col gap-1 justify-center items-end
                    fixed top-[-25px] left-[-45px]  z-10`}
                    onClick={toggleMobileMenu}
                >
                    <div className=" w-5 h-1 mr-6 bg-white rounded"></div>
                    <div className=" w-5 h-1 mr-6 bg-white rounded"></div>
                    <div className=" w-5 h-1 mr-6 bg-white rounded"></div>
                </div>

                <div
                    className={`${
                        MobileMenuVisible
                            ? " h-screen delay-200"
                            : " h-0 delay-200"
                    } flex w-full fixed transition-all z-[999] `}
                >
                    <div
                        className={`${
                            MobileMenuVisible
                                ? " translate-x-[0%] delay-200"
                                : " translate-x-[-100%]"
                        } 
                            ${
                                MobileMenuVisible
                                    ? " block delay-200 h-screen overflow-auto"
                                    : " hiddden delay-200"
                            }
                         bg-Blue w-[65%] h-[100vh] relative transition-all duration-300  ease-in-out`}
                    >
                        <div
                            className="w-[40px] h-[40px] text-xl bg-white text-Blue font-bold 
                            rounded-bl-xl  rounded-tr-xl rounded-tl-sm  rounded-br-sm 
                            flex justify-center items-center absolute right-2 top-2"
                            onClick={toggleMobileMenu}
                        >
                            <IoClose className=" font-bold text-2xl" />
                        </div>
                        <div className="flex flex-col items-start justify-start gap-7 pt-4 h-[100%] text-white font-semibold ">
                            <Link
                                className="ml-3 flex items-center gap-2 text-xl"
                                to={"/"}
                                onClick={toggleMobileMenu}
                            >
                                <div className=" bg-white text-Blue text-xl p-2 rounded-md">
                                    <FaHome />
                                </div>
                                Home
                            </Link>
                            <div className=" w-full h-1 bg-white"></div>
                            <Link
                                className=" ml-3 flex items-center gap-2 text-xl"
                                to={"/PL"}
                                onClick={toggleMobileMenu}
                            >
                                <div className="font-bold bg-white text-Blue text-xl p-2 rounded-md">
                                    PL
                                </div>
                                Programation Linéer
                            </Link>
                            <Link
                                className="ml-3 flex items-center gap-2 text-xl"
                                to={"/PS"}
                                onClick={toggleMobileMenu}
                            >
                                <div className=" font-bold bg-white text-Blue text-xl p-2 rounded-md">
                                    PS
                                </div>
                                Propabilité Statistique
                            </Link>

                            {/* <Link
                                className="ml-3"
                                to={"/TG"}
                                onClick={toggleMobileMenu}
                            >
                                Théory Des Graphs
                            </Link>
                            <Link
                                className="ml-3"
                                to={"/TL"}
                                onClick={toggleMobileMenu}
                            >
                                Théory des Langage
                            </Link>
                            <Link
                                className="ml-3"
                                to={"/MN"}
                                onClick={toggleMobileMenu}
                            >
                                Méthodes Numérique
                            </Link> */}

                            <div className=" w-full h-1 bg-white "></div>
                            <Link
                                className="ml-3 flex items-center gap-2 text-xl"
                                to={"/SM"}
                                onClick={toggleMobileMenu}
                            >
                                <div className=" font-bold bg-white text-Blue text-xl p-2 rounded-md">
                                    PS
                                </div>
                                Systéme Machine
                            </Link>
                        </div>
                    </div>

                    <div
                        className={`${
                            MobileMenuVisible
                                ? " translate-x-0 bg-gray-400 transition-colors delay-300 duration-300 ease-in-out"
                                : " translate-x-full bg-transparent"
                        } w-[35%] h-[100vh] opacity-[0.3] `}
                        onClick={toggleMobileMenu}
                    ></div>
                </div>
            </div>

            {/* Laptop Menu Bar */}
            {DesktopMenuVisible ? (
                <div className="hidden lg:block   min-h-screen   bg-Blue w-[250px]     shrink-0 ">
                    <div className=" fixed top-0 ">
                        <div className=" flex justify-end pr-2 pt-2 ">
                            <div
                                className="w-[40px] h-[40px] text-xl bg-white  text-Blue font-bold 
                            rounded-bl-xl  rounded-tr-xl rounded-tl-sm  rounded-br-sm 
                            flex justify-center items-center  right-2 top-2 cursor-pointer"
                                onClick={toggleDesktopMenu}
                            >
                                <IoClose className=" font-bold text-2xl" />
                            </div>
                        </div>

                        <div className=" pt-6 w-[250px]  flex flex-col gap-7 text-white font-semibold custom-overflow overflow-auto">
                            <Link
                                className="ml-3 flex items-center gap-2 text-xl"
                                // onClick={toggleDesktopMenu}
                                to={"/"}
                            >
                                <div className=" bg-white text-Blue text-xl p-2 rounded-md">
                                    <FaHome />
                                </div>
                                Home
                            </Link>
                            <div className=" w-full h-1 bg-white"></div>
                            <Link
                                className=" ml-3 flex items-center gap-2 text-xl"
                                to={"/PL"}
                                // onClick={toggleDesktopMenu}
                            >
                                <div className="font-bold bg-white text-Blue text-xl p-2 rounded-md">
                                    PL
                                </div>
                                Programation Linéer
                            </Link>
                            <Link
                                className="ml-3 flex items-center gap-2 text-xl"
                                to={"/PS"}
                                // onClick={toggleDesktopMenu}
                            >
                                <div className=" font-bold bg-white text-Blue text-xl p-2 rounded-md">
                                    PS
                                </div>
                                Propabilité Statistique
                            </Link>

                            <div className=" w-full h-1 bg-white "></div>
                            <Link
                                className="ml-3 flex items-center gap-2 text-xl"
                                to={"/SM"}
                                // onClick={toggleDesktopMenu}
                            >
                                <div className=" font-bold bg-white text-Blue text-xl p-2 rounded-md">
                                    SM
                                </div>
                                Systéme Machine
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <div className=" hidden lg:block   bg-Blue w-[70px]  h-screen shrink-0  ">
                    <div className="flex flex-col gap-7 pt-4  text-white font-semibold bg-Blue fixed w-[70px] h-screen  overflow-y-auto flex-wrap custom-overflow ">
                        <div
                            className=" flex flex-col gap-1  w-full items-center cursor-pointer"
                            onClick={toggleDesktopMenu}
                        >
                            <div className=" w-8 h-1 bg-white rounded"></div>
                            <div className=" w-8 h-1 bg-white rounded"></div>
                            <div className=" w-8 h-1 bg-white rounded"></div>
                        </div>
                        <Link
                            className="ml-3 flex items-center gap-2 text-xl"
                            to={"/"}
                        >
                            <div className=" bg-white text-Blue text-xl p-2 rounded-md">
                                <FaHome />
                            </div>
                        </Link>
                        <div className=" w-full h-1 bg-white"></div>
                        <Link
                            className=" ml-3 flex items-center gap-2 text-xl"
                            to={"/PL"}
                        >
                            <div className="font-bold bg-white text-Blue text-xl p-2 rounded-md">
                                PL
                            </div>
                        </Link>
                        <Link
                            className="ml-3 flex items-center gap-2 text-xl"
                            to={"/PS"}
                        >
                            <div className=" font-bold bg-white text-Blue text-xl p-2 rounded-md">
                                PS
                            </div>
                        </Link>

                        <div className=" w-full h-1 bg-white "></div>
                        <Link
                            className="ml-3 flex items-center gap-2 text-xl"
                            to={"/SM"}
                        >
                            <div className=" font-bold bg-white text-Blue text-xl p-2 rounded-md">
                                SM
                            </div>
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
}
