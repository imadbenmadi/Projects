import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useAppContext } from "../../AppContext";
import axios from "axios";
import { Outlet } from "react-router";
import NavBar from "./NavBar/NavBar";
import Logo from "../../../public/Logo.png";
function Teacher() {
    const Navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const { userId, isAuth, set_user, set_Notifications } = useAppContext();

    useEffect(() => {
        if (!isAuth || !userId) {
            // window.location.href = "/Login";
            Navigate("/");
        }
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://api.flexedu-dz.com/Teachers/${userId}/Profile`,
                    {
                        withCredentials: true,
                        // validateStatus: () => true,
                    }
                );

                if (response.status == 200) {
                    set_user(response.data.User);
                } else {
                    set_Auth(false);
                    // window.location.href = "/Login";
                    Navigate("/Login");
                }
            } catch (error) {
                set_Auth(false);
                // window.location.href = "/Login";
                Navigate("/Login");
            }
        };
        const fetchNotifications = async () => {
            try {
                const response = await axios.get(
                    `https://api.flexedu-dz.com/Teachers/${userId}/Notifications`,
                    {
                        withCredentials: true,
                        // validateStatus: () => true,
                    }
                );

                if (response.status == 200) {
                    set_Notifications(response.data.Notifications);
                } else {
                    set_Notifications([]);
                }
            } catch (error) {
                set_Notifications([]);
            }
        };
        const fetch_images = () => {
            return new Promise((resolve, reject) => {
                const images = [Logo];
                let loadedCount = 0;
                if (images.length === 0) resolve();
                images.forEach((imageSrc) => {
                    const img = new Image();
                    img.onload = () => {
                        loadedCount++;
                        if (loadedCount === images.length) {
                            resolve();
                        }
                    };
                    img.onerror = () => {
                        resolve();
                    };
                    img.src = imageSrc;
                });
            });
        };
        // Promise.all([fetchData()]);
        Promise.all([fetch_images(), fetchData(), fetchNotifications()])
            .then(() => {
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);

    if (loading)
        return (
            <div className=" w-screen h-screen flex flex-col items-center justify-center">
                {/* <img src={Logo} alt="Logo" /> */}
                <span className="loader"></span>
            </div>
        );
    else
        return (
            <div className="relative  custom-overflow overflow-x-hidden ">
                <NavBar />
                <div className=" pt-[60px]">
                    <Outlet />
                </div>
            </div>
        );
}

export default Teacher;
// return <div className=" text-center font-bold text-xl">Teacher</div>;
