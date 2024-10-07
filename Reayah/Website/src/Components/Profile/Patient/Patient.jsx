import React from "react";
import { useState, useEffect } from "react";
import { Outlet } from "react-router";
import axios from "axios";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";

import Appointments_icon from "../../../../public/Profiles/Nav/Appointments.svg";
import Medical_Folders from "../../../../public/Profiles/Nav/Medical_Folders.svg";
import Consultation from "../../../../public/Profiles/Nav/Consultation.svg";
import inbox_icon from "../../../../public/Profiles/Nav/inbox.svg";
import Settings_icon from "../../../../public/Profiles/Nav/Settings.svg";
import Logo_perpole from "../../../../public/Logo_perpole.png";

import { useAppContext } from "../../../AppContext";
import NavBar from "./NavBar/NavBar";
function Patient() {
    const { isAuth, set_Auth, set_user, user } = useAppContext();
    const [loading, setLoading] = useState(true);
    const [Active_nav, setActive_nav] = useState("Home");
    const Navigate = useNavigate();
    const patientId = window.localStorage.getItem("patientId");
    const doctorId = window.localStorage.getItem("doctorId");
    useEffect(() => {
        const fetch_images = () => {
            return new Promise((resolve, reject) => {
                const images = [
                    Appointments_icon,
                    Medical_Folders,
                    Consultation,
                    inbox_icon,
                    Settings_icon,
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
                const response = await axios.get(
                    `https://api.reayahmed.com/patient/${patientId}/`,
                    {
                        withCredentials: true,
                        // validateStatus: () => true,
                    }
                );
                console.log("response from  get Profile :", response.data);
                if (response.status == 200) {
                    set_user(response.data);
                } else {
                    set_Auth(false);
                    // window.localStorage.removeItem("refresh");
                    // window.localStorage.removeItem("access");
                    // window.location.href = "/";
                }
            } catch (error) {
                console.log("error from  Get Profile :", error);
                set_Auth(false);
                // window.localStorage.removeItem("refresh");
                // window.localStorage.removeItem("access");
                // window.location.href = "/";
            }
        };
        if (patientId == "null" || doctorId !== "null") Navigate("/");
        else
            Promise.all([fetch_fonts(), fetch_images(), fetchData()])
                .then(() => {
                    setLoading(false);
                    // Navigate(`/Patients/${patientId}/Profile`);
                })
                .catch(() => {
                    setLoading(false);
                });
    }, []);
    useEffect(() => {
        console.log("user : ", user);
    }, [user]);
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
        <div className="relative max-h-screen overflow-y-auto custom-overflow overflow-x-hidden block md:flex ">
            <NavBar Active_nav={Active_nav} setActive_nav={setActive_nav} />
            <div className="  pt-[60px] md:pt-0 w-full">
                <Outlet />
            </div>
        </div>
    );
}

export default Patient;
