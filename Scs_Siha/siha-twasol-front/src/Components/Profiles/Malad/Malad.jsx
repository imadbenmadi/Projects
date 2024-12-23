import React from "react";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useAppContext } from "../../../AppContext";
import axios from "axios";
import { Outlet } from "react-router";
import NavBar from "./NavBar/NavBar";
import Logo from "../../../../public/Logo.png";

function Director() {
    const Navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const {
        userId,
        isAuth,
        set_user,
        userType,
        set_Auth,
        user,
        set_Messages,
        set_Notifications,
    } = useAppContext();
    useEffect(() => {}, []);
    useEffect(() => {
        if (!isAuth || !userId) {
            set_Auth(false);
            Navigate("/Login");
        }
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/Malads/${userId}/Profile`,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );

                if (response.status == 200) {
                    set_user(response.data.User);
                } else {
                    set_Auth(false);
                    Navigate("/Login");
                    window.location.href = "/home";
                }
            } catch (error) {
                set_Auth(false);
                Navigate("/Login");
                window.location.href = "/home";
            }
        };
        const fetchNotifications = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/Malads/${userId}/Notifications`,
                    {
                        withCredentials: true,
                        // validateStatus: () => true,
                    }
                );
                console.log(response);

                if (response.status == 200) {
                    set_Notifications(response.data.Notifications);
                } else {
                    set_Notifications([]);
                }
            } catch (error) {
                console.log(error);

                set_Notifications([]);
            }
        };
        fetchData()
            .then(() => fetchNotifications())
            .then(() => {
                setLoading(false);
            });
    }, []);
    if (loading)
        return (
            <div className=" w-screen h-screen flex flex-col items-center justify-center">
                <img loading="lazy" src={Logo} alt="" className=" w-20 pb-6" />
                <span className="loader"></span>
            </div>
        );
    else
        return (
            <div className="relative h-screen overflow-y-auto custom-overflow overflow-x-hidden ">
                <NavBar />
                <div className=" pt-[60px]">
                    <Outlet />
                </div>
            </div>
        );
}

export default Director;
