import Laptop_Nav_Items from "./Laptop_Nav_Items";
import Mobile_Nav from "./Mobile_Nav";
import { useState } from "react";
import { useLocation } from "react-router";
import { useEffect } from "react";
import { useAppContext } from "../../../../AppContext";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
function NavBar() {
    const Naviagte = useNavigate();
    const { set_Auth, store_logout } = useAppContext();
    const [Active_nav, setActive_nav] = useState("Home");
    const location = useLocation();
    useEffect(() => {
        setActive_nav(location.pathname.split("/")[2]);
    }, [location.pathname]);

    const [LogoutClicked, setLogoutClicked] = useState(false);
    const handleLogout = async () => {
        setLogoutClicked(true);
        try {
            // Send a request to the logout endpoint on the server
            const response = await axios.post(
                "http://localhost:3000/Logout",
                {},
                {
                    withCredentials: true,
                    validateStatus: () => true,
                }
            );
            if (response.status == 204) {
                // Successfully logged out, you may want to redirect to the login page or update the UI accordingly
                store_logout();
                set_Auth(false);
                Naviagte("/");
                // You can use state or context to handle the logout state in your application
            } else {
                Swal.fire("Error!", "", "error");
            }
        } catch (error) {
            Swal.fire("Error!", "", "error");
        }
        setLogoutClicked(false);
    };
    return (
        <div
            className={` fixed  h-[60px] m-0  z-40 w-full bg-white  border-b   `}
        >
            <Laptop_Nav_Items
                Active_nav={Active_nav}
                handleLogout={handleLogout}
                LogoutClicked={LogoutClicked}
            />
            <Mobile_Nav
                Active_nav={Active_nav}
                handleLogout={handleLogout}
                LogoutClicked={LogoutClicked}
            />
        </div>
    );
}

export default NavBar;
