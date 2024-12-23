import NavBar from "./NavBar/NavBar";
import { Outlet } from "react-router-dom";

function DefaultLandingPage() {
    return (
        <div>
            <NavBar />
            <Outlet />
        </div>
    );
}

export default DefaultLandingPage;
