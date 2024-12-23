import React from "react";
import { useState, useEffect } from "react";
import { Outlet } from "react-router";
import axios from "axios";
import { useNavigate } from "react-router";
import Logo from "../public/Logo.png";
import Login_icon from "../public/Login.png";
import { useAppContext } from "./AppContext";
import NavBar from "./Components/NavBar/NavBar";
function App() {
    const Navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const { set_Auth } = useAppContext();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3000/Admin_CheckAuth",
                    {
                        withCredentials: true,
                        // validateStatus: () => true,
                    }
                );

                if (response.status == 200) {
                    set_Auth(true);
                    // Navigate("/Home");
                } else {
                    set_Auth(false);
                    Navigate("/Login");
                }
            } catch (error) {
                set_Auth(false);
                Navigate("/Login");
            }
        };
        const fetch_images = () => {
            return new Promise((resolve, reject) => {
                const images = [Logo, Login_icon];
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
                    "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap";
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
                            "Poppins";
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
        // Promise.all([fetchData()]);
        Promise.all([fetch_fonts(), fetch_images(), fetchData()])
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
    } else
        return (
            <div className="relative h-screen overflow-y-auto custom-overflow overflow-x-hidden flex items-start justify-start  ">
                <div className="  h-screen overflow-y-auto custom-overflow shrink-0 ">
                    <NavBar />
                </div>
                <div className=" pt-[60px] md:pt-0 w-screen md:w-[calc(100vw-210px)] h-screen overflow-y-auto custom-overflow">
                    <Outlet />
                </div>
            </div>
        );
}

export default App;
