import React from "react";
import { useState, useEffect } from "react";
import { Outlet } from "react-router";
import axios from "axios";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import Hero from "../public/Home/Hero.png";
import Are_You_Doctore from "../public/Home/Are_You_Doctore.png";
import icon_paper from "../public/Home/icon_paper.svg";
import icon_secure from "../public/Home/icon_secure.svg";
import icon_user from "../public/Home/icon_user.svg";
import trend_up from "../public/Home/trend_up.svg";
import Logo from "../public/Logo.svg";
import Logo_perpole from "../public/Logo_perpole.png";
import search from "../public/search.svg";
import Bot from "../public/Bot.png";
import Logout_icon from "../public/Logout.svg";
import notification from "../public/notification.svg";
import user from "../public/user.svg";
import about_image from "../public/Aboutus.jpg";
import Contact from "../public/Contact/Contact.png";
import Menu_Toogler from "../public/Menu_Toogler.svg";
import { useAppContext } from "./AppContext";
import NavBar from "./Components/NavBar/NavBar";
import { Footer } from "./Components/Footer/Footer";
function App() {
    const { isAuth, set_Auth } = useAppContext();
    const [loading, setLoading] = useState(true);
    const [Active_nav, setActive_nav] = useState("Home");
    useEffect(() => {
        const fetch_images = () => {
            return new Promise((resolve, reject) => {
                const images = [
                    Hero,
                    Contact,
                    about_image,
                    Are_You_Doctore,
                    icon_paper,
                    icon_secure,
                    icon_user,
                    trend_up,
                    Logo,
                    Logo_perpole,
                    search,
                    Bot,
                    Logout_icon,
                    user,
                    notification,
                    Menu_Toogler,
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
        const fetch_fonts = () => {
            return new Promise((resolve, reject) => {
                const fontURL =
                    "https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap";

                const loadFont = (url) => {
                    return new Promise((resolve, reject) => {
                        const link = document.createElement("link");
                        link.href = url;
                        link.rel = "stylesheet";
                        link.onload = () => {
                            resolve(); // Resolve promise when font is loaded
                        };
                        link.onerror = () => {
                            document.getElementById("root").style.fontFamily =
                                "sans-serif";
                            resolve(); // Resolve even if font fails to load
                        };
                        document.head.appendChild(link);
                        document.getElementById("root").style.fontFamily =
                            "Outfit";
                    });
                };

                // Load the font
                loadFont(fontURL)
                    .then(resolve)
                    .catch(() => {
                        document.getElementById("root").style.fontFamily =
                            "sans-serif";
                        resolve();
                    });
            });
        };
        const fetchData = async () => {
            try {
                const refresh = window.localStorage.getItem("refresh");
                // console.log("refresh token from app.jsx check_auth :", refresh);
                if (refresh) {
                    const response = await axios.post(
                        "https://api.reayahmed.com/auth/token/refresh/",
                        {
                            refresh: refresh,
                        },
                        {
                            withCredentials: true,
                            // validateStatus: () => true,
                        }
                    );
                    // console.log(
                    //     "response from app.jsx check_auth :",
                    //     response.data
                    // );
                    if (response.status == 200) {
                        set_Auth(true);
                        window.localStorage.setItem(
                            "access",
                            response.data.access
                        );
                        // Navigate("/Home");
                    } else {
                        set_Auth(false);
                    }
                } else {
                    set_Auth(false);
                }
            } catch (error) {
                // console.log("error from app.jsx check_auth :", error);
                set_Auth(false);
            }
        };
        Promise.all([fetch_fonts(), fetch_images(), fetchData()])
            .then(() => {
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);
    useEffect(() => {
        console.log("isAuth : ", isAuth);
    }, [isAuth]);
    if (loading) {
        return (
            <div
                className=" w-screen h-screen flex items-center 
            justify-center gap-5 flex-col"
            >
                <img src={Logo_perpole} className=" w-24" alt="" />
                <span className="loader"></span>
            </div>
        );
    }

    return (
        <div className="relative h-screen overflow-y-auto custom-overflow overflow-x-hidden ">
            <NavBar Active_nav={Active_nav} setActive_nav={setActive_nav} />
            <div className=" mt-[50px] md:mt-[60px]">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}

export default App;
