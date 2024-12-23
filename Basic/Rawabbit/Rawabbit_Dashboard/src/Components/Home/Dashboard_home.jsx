import { useState } from "react";
// import { useOutletContext } from "react-router-dom";
import { IoIosNotifications } from "react-icons/io";
import { IoNewspaper } from "react-icons/io5";
import { FaBook, FaUser } from "react-icons/fa";
import { FaHandshake } from "react-icons/fa";
import logo from "../../../public/Logo.png";
function Dashboard_Home() {
    // if (!user)
    //     return (
    //         <div className="w-full h-screen flex items-center justify-center">
    //             <span className="loader"></span>
    //         </div>
    //     );
    return (
        <div>
            <div className="text-4xl m-auto font-bold w-full md:w-fit pt-4 pl-4  lg:text-3xl mb-2 text-center text-blue ">
                <img src={logo} className="w-[100px] m-auto" />
                Dashboard
            </div>
            <div className=" flex items-center justify-center flex-col text-xl md:text-3xl text-gray  gap-10 w-full h-[60vh]">
                <div className=" flex gap-4 md:gap-12">
                    <div className=" bg-[#286a69] px-4 py-2 rounded text-white w-[140px] md:w-[200px]">
                        <div className="flex gap-1 items-center justify-center ">
                            <FaUser />
                            {/* {user.user.Services.length} */}0
                        </div>
                        <div className=" text-center">Users</div>
                    </div>
                    {/* <div className=" bg-[#7e549e] px-4 py-2 rounded text-white w-[140px] md:w-[200px]">
                        <div className="flex gap-1 items-center justify-center  ">
                            <IoIosNotifications />
                            // {user.user.Notifications.length} 
                            0
                        </div>
                        <div className=" text-center">Notifications</div>
                    </div> */}
                </div>
                <div className=" flex gap-4 md:gap-12">
                    <div className=" bg-[#213059] px-4 py-2 rounded text-white w-[140px] md:w-[200px]">
                        <div className="flex gap-1 items-center justify-center ">
                            <FaBook />
                            {/* {user.user.Courses.length} */}0
                        </div>
                        <div className=" text-center">Websites</div>
                    </div>

                    <div className=" bg-[#c2549d] px-4 py-2 rounded text-white w-[140px] md:w-[200px]">
                        <div className="flex gap-1 items-center justify-center ">
                            <IoNewspaper />
                            {/* {user.Courses_requests.length +
                                user.Services_requests.length} */}
                            0
                        </div>
                        <div className=" text-center">Requests</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard_Home;
