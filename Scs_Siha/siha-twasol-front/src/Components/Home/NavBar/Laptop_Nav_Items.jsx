import { Link } from "react-router-dom";
import Logo from "../../../../public/Logo.png";
function Laptop_Nav_Items() {
    return (
        <div
            className="hidden  md:flex  items-center justify-between mx-2 lg:mx-12
          md:text-md lg:text-lg  font-[500]  text-black_text h-full p-2 "
        >
            <div>
                <img
                    loading="lazy"
                    src={Logo}
                    alt="Logo"
                    className=" w-[50px]  "
                />
            </div>
            <div className="flex gap-6 lg:gap-12">
                <div className=" md:hover:text-blue_v transition-all duration-150  cursor-pointer">
                    <a
                        href={"/Home#Features"}
                        className={
                            " md:hover:text-blue_v transition-all duration-150 select-none"
                        }
                    >
                        ميزاتنا
                    </a>
                </div>
                <div className=" md:hover:text-blue_v transition-all duration-150  cursor-pointer">
                    <a
                        href={"/Home#How_we_work"}
                        className={
                            " md:hover:text-blue_v transition-all duration-150 select-none"
                        }
                    >
                        كيف نعمل
                    </a>
                </div>
                {/* <div className=" md:hover:text-blue_v transition-all duration-150  cursor-pointer">
                    <a
                        href={"/Home#Benefits"}
                        className=" md:hover:text-blue_v transition-all duration-150 select-none"
                    >
                        فائدتنا
                    </a>
                </div> */}

                <div className=" md:hover:text-blue_v transition-all duration-150  cursor-pointer">
                    <a
                        href={"/Home#Contact"}
                        className=" md:hover:text-blue_v transition-all duration-150 select-none"
                    >
                        اتصل بنا
                    </a>
                </div>
            </div>
            <div className="flex gap-4 justify-center items-center h-full">
                <div className=" flex items-center justify-center gap-3">
                    <span className="   text-md rounded-lg cursor-pointer">
                        <Link to={"/Login"} className="select-none">
                            تسجبل الدخول
                        </Link>
                    </span>
                    <span className=" w-[2px] h-5  bg-white"></span>
                    <span className="bg-blue_v text-[#fff] px-3 py-2 text-md rounded-xl cursor-pointer">
                        <Link to={"/Register"} className="select-none">
                            حساب جديد
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Laptop_Nav_Items;
