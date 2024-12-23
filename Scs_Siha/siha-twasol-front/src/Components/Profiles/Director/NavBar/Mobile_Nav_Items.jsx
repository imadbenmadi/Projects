import { Link } from "react-router-dom";
import { TbLogout2 } from "react-icons/tb";

function Mobile_Nav_Items({
    MobileNav_Open,
    Toogle_Menu_Bar,
    Active_nav,
    handleLogout,
    LogoutClicked,
}) {
    return (
        <div className="flex md:hidden">
            <div
                className={`  ${
                    MobileNav_Open
                        ? " translate-x-[0vw]"
                        : " translate-x-[200vh] "
                } absolute   transition-transform duration-300 select-none w-[100vw]
                  z-50    text-black_text  bg-white `}
            >
                <div className="  h-screen text-xl  pt-8 overflow-y-auto ">
                    <div className=" flex flex-col justify-start items-center h-[80%]  ">
                        <div className="text-center flex flex-col gap-8 my-8 ">
                            <Link
                                onClick={Toogle_Menu_Bar}
                                to={"/Director/Workers"}
                                className={`${
                                    Active_nav == "Workers"
                                        ? "text-blue_v"
                                        : "text-black_text"
                                } select-none    `}
                            >
                                <div className={"select-none"}>
                                    <span className=" relative">العمال </span>
                                </div>
                            </Link>
                            <Link
                                onClick={Toogle_Menu_Bar}
                                to={"/Director/Services"}
                                className={`${
                                    Active_nav == "Services"
                                        ? "text-blue_v"
                                        : "text-black_text"
                                } select-none   `}
                            >
                                الاقسام
                            </Link>
                            <Link
                                onClick={Toogle_Menu_Bar}
                                to={"/Director/Doctors"}
                                className={`${
                                    Active_nav == "Doctors"
                                        ? "text-blue_v"
                                        : "text-black_text"
                                } select-none    `}
                            >
                                <div className={"select-none"}>
                                    <span className=" relative">الاطباء </span>
                                </div>
                            </Link>
                            <Link
                                onClick={Toogle_Menu_Bar}
                                to={"/Director/Blogs"}
                                className={`${
                                    Active_nav == "Blogs"
                                        ? "text-blue_v"
                                        : "text-black_text"
                                } select-none   `}
                            >
                                المقالات
                            </Link>

                            <Link
                                onClick={Toogle_Menu_Bar}
                                to={"/Director/Events"}
                                className={`${
                                    Active_nav == "Events"
                                        ? "text-blue_v"
                                        : "text-black_text"
                                } select-none   `}
                            >
                                الاحداث
                            </Link>
                        </div>
                        <div className=" w-screen h-[2px] bg-gray_white "></div>

                        <div className=" pt-8">
                            {LogoutClicked ? (
                                <div className="w-full ">
                                    <span className="small-loader font-bold  w-full m-auto"></span>
                                </div>
                            ) : (
                                <div
                                    className="cursor-pointer w-full 
                                    flex items-center gap-3 text-red-500"
                                    onClick={() => {
                                        handleLogout();
                                    }}
                                >
                                    <TbLogout2 className="  text-xl" />
                                    تسجيل الخروج
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Mobile_Nav_Items;
