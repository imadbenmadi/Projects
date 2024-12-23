import React from "react";
import { useState, useEffect } from "react";
import { Outlet } from "react-router";
import axios from "axios";
import { useNavigate } from "react-router";
import Logo from "../public/Logo.png";
import { useAppContext } from "./AppContext";
function App() {
    const Navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    // const [userType, setUserType] = useState(null);
    const { set_Auth, isAuth, store_login } = useAppContext();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3000/Check_Auth",
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );
                if (response.status == 200) {
                    store_login(response.data.userId, response.data.userType);
                    // setUserType(response.data.userType);
                    set_Auth(true);
                } else {
                    set_Auth(false);
                }
            } catch (error) {
                set_Auth(false);
            }
        };
        const fetch_images = () => {
            return new Promise((resolve, reject) => {
                const images = [Logo];
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
                <img src={Logo} alt="Logo" />
                <span className="loader"></span>
            </div>
        );
    } else return <Outlet />;
}

export default App;
