import React from "react";
import Mobile from "./Mobile/Mobile";
import Laptop from "./Laptop";
function NavBar() {
    return (
        <div>
            <div className=" hidden md:flex   w-[250px] shrink-0 border-r border-r-gray_white  min-h-screen overflow-auto custom-overflow ">
                <Laptop />
            </div>
            <div className="md:hidden fixed  h-[60px] md:h-[60px] m-0  z-40 w-full bg-white border-b border-gray_white  ">
                <Mobile />
            </div>
        </div>
    );
}

export default NavBar;
