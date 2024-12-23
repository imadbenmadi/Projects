import { useState, useEffect } from "react";
import { useAppContext } from "../../AppContext";
import { useLocation } from "react-router";
import axios from "axios";
import Laptop_Nav_Items from "./Laptop_Nav_Items";
import Swal from "sweetalert2";

import Mobile_Nav from "./Mobile_Nav";

function NavBar({ Active_nav, setActive_nav }) {
    const location = useLocation();
    const {
        isAuth,
        FirstName,
        LastName,
        _id,
        Notifications,
        set_Auth,
        store_login,
    } = useAppContext();
    // const [MobileNav_Open, set_MobileNav_Open] = useState(false);
    // function Toogle_Menu_Bar() {
    //     set_MobileNav_Open(!MobileNav_Open);
    // }
    const [user_Open, set_User_Open] = useState(false);
    function Toogle_User_Open() {
        set_User_Open(!user_Open);
    }
    const [LogoutClicked, setLogoutClicked] = useState(false);
    const Logout = async () => {
        setLogoutClicked(true);
        // try {
        //     // Send a request to the logout endpoint on the server
        //     const response = await axios.post(
        //         "http://localhost:3000/logout",
        //         {},
        //         {
        //             withCredentials: true,
        //             validateStatus: () => true,
        //         }
        //     );
        //     console.log("response from Logout : ", response);
        //     if (response.status == 204) {
        //         set_Auth(false);
        //         Swal.fire("Success!", `Logged Out Successfully`, "success");
        //         Navigate("/Login");
        //     } else {
        //         Swal.fire("Error!", `Something Went Wrong ,`, "error");
        //     }
        // } catch (error) {
        //     Swal.fire("Error!", `Something Went Wrong `, "error");
        // }
        window.localStorage.removeItem("patientId");
        window.localStorage.removeItem("doctorId");
        window.localStorage.removeItem("userId");
        window.localStorage.removeItem("access");
        window.localStorage.removeItem("refresh");
        set_Auth(false);
        // Swal.fire("Success!", `Logged Out Successfully`, "success");
        window.location.href = "/";
        setLogoutClicked(false);
    };

    useEffect(() => {
        setActive_nav(location.pathname.split("/")[1]);
    }, [location.pathname]);

    // const [unReaded_Notif, SetunReaded_Notif] = useState(false);
    // useEffect(() => {
    //     if (isAuth && Notifications) {
    //         const hasUnreadNotification = Notifications.some(
    //             (notification) => !notification.Readed
    //         );
    //         SetunReaded_Notif(hasUnreadNotification);
    //     }
    // }, [Notifications]);
    return (
        <div
            className={` fixed  h-[60px] md:h-[60px] m-0  z-40 w-full bg-perpol_b `}
            // className={`   h-[60px] md:h-[60px] m-0  z-40 w-full bg-perpol_b `}
        >
            <Laptop_Nav_Items
                Active_nav={Active_nav}
                isAuth={isAuth}
                FirstName={FirstName}
                LastName={LastName}
                _id={_id}
                user_Open={user_Open}
                Toogle_User_Open={Toogle_User_Open}
                Logout={Logout}
                LogoutClicked={LogoutClicked}
            />

            <Mobile_Nav
                Active_nav={Active_nav}
                Logout={Logout}
                LogoutClicked={LogoutClicked}
            />
        </div>
    );
}

export default NavBar;
