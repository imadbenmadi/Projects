import Laptop_NavBar from "./NavBar/Laptop_NavBar";
import Mobile_NavBar from "./NavBar/Mobile_NavBar";
import { Outlet, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
function Dashboard() {
    const Navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [Active_nav, setActive_nav] = useState(null);
    const [Auth, setAuth] = useState(false);
    const [windowWidth, SetwindowWidth] = useState(window.innerWidth);

    const [openNav, SetOpenNav] = useState(false);
    useEffect(() => {
        window.addEventListener("resize", () => {
            SetwindowWidth(window.innerWidth);
        });
    }, []);
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                "http://localhost:3000/Dashboard/check_Auth",
                {
                    withCredentials: true,
                    validateStatus: () => true,
                }
            );

            if (response.status == 200) {
                setAuth(true);
                setLoading(false);
            } else {
                setAuth(false);
                setLoading(false);
                Navigate("/Dashboard_Login");
            }
        } catch (error) {
            setAuth(false);
            setLoading(false);
            Navigate("/Dashboard_Login");
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    if (loading)
        return (
            <div className=" w-screen h-screen flex items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    if (Auth)
        return (
            <div className=" flex">
                {windowWidth < 768 ? (
                    <>
                        <div
                            className={
                                openNav
                                    ? "w-[35%] bg-black h-screen"
                                    : "w-[15%] bg-black h-screen"
                            }
                        >
                            <Mobile_NavBar
                                Active_nav={Active_nav}
                                setActive_nav={setActive_nav}
                                openNav={openNav}
                                SetOpenNav={SetOpenNav}
                            />
                        </div>
                        <div
                            className={
                                openNav
                                    ? "w-[65%] h-screen overflow-auto custom-overflow"
                                    : "w-[85%] h-screen overflow-auto custom-overflow"
                            }
                        >
                            <Outlet />
                        </div>
                    </>
                ) : (
                    <>
                        <div className=" w-[20%] bg-black h-screen">
                            <Laptop_NavBar
                                Active_nav={Active_nav}
                                setActive_nav={setActive_nav}
                            />
                        </div>
                        <div className="w-[80%] pt-6  h-screen overflow-auto custom-overflow  ">
                            <Outlet />
                        </div>
                    </>
                )}
            </div>
        );
}

export default Dashboard;
