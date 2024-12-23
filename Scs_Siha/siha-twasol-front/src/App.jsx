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
    const { set_Auth, store_login } = useAppContext();
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
                    // store_login(response.data.userId, response.data.userType);
                    // setUserType(response.data.userType);
                    if (!response.data.userType || !response.data.userId) {
                        set_Auth(false);
                        return;
                    }
                    set_Auth(true);
                    store_login(response.data.userId, response.data.userType);

                    // if (response.data.userType == "Director") {
                    //     Navigate(`/Director`);
                    // } else if (response.data.userType == "Malad") {
                    //     Navigate(`/Malad`);
                    // } else if (response.data.userType == "Doctor") {
                    //     Navigate(`/Doctor`);
                    // } else if (response.data.userType == "Worker") {
                    //     Navigate(`/Worker`);
                    // } else {
                    //     set_Auth(false);
                    //     return;
                    // }
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

        // const fetch_fonts = () => {
        //     return new Promise((resolve, reject) => {
        //         const fontURL =
        //             // "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap";
        //             "https://fonts.googleapis.com/css2?family=Cairo:wght@200..1000&display=swap";
        //         const loadFont = (url) => {
        //             return new Promise((resolve, reject) => {
        //                 const link = document.createElement("link");
        //                 link.href = url;
        //                 link.rel = "stylesheet";
        //                 link.onload = () => {
        //                     resolve(); // Resolve promise when font is loaded
        //                 };
        //                 link.onerror = () => {
        //                     document.getElementById("root").style.fontFamily =
        //                         "sans-serif";
        //                     resolve(); // Resolve even if font fails to load
        //                 };
        //                 document.head.appendChild(link);
        //                 document.getElementById("root").style.fontFamily =
        //                     "cairo";
        //             });
        //         };

        //         // Load the font
        //         loadFont(fontURL)
        //             .then(resolve)
        //             .catch(() => {
        //                 document.getElementById("root").style.fontFamily =
        //                     "sans-serif";
        //                 resolve();
        //             });
        //     });
        // };
        const fetch_fonts = () => {
            return new Promise((resolve) => {
                const fontURL =
                    "https://fonts.googleapis.com/css2?family=Poppins:wght@100..900&display=swap";
                const link = document.createElement("link");
                link.href = fontURL;
                link.rel = "stylesheet";
                link.onload = () => {
                    document.getElementById("root").style.fontFamily =
                        "Poppins, sans-serif";
                    resolve();
                };
                link.onerror = () => {
                    document.getElementById("root").style.fontFamily =
                        "sans-serif";
                    resolve();
                };
                document.head.appendChild(link);
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
                <img src={Logo} alt="" className=" w-20 pb-6" />
                <span className="loader"></span>
            </div>
        );
    } else
        return (
            <div className=" text-right">
                <Outlet />
            </div>
        );
}

export default App;
