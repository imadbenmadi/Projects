import { Link } from "react-router-dom";
import Logo from "../../../../public/Logo.png";
function Laptop_Nav_Items() {
  return (
    <div className="hidden  md:flex  items-center justify-between mx-2 lg:mx-12  md:text-md lg:text-lg  font-[500] dark:text-white text-black_text h-full p-2 ">
      <div>
        <Link to={"/"} className="select-none">
          <img src={Logo} alt="Logo" className=" w-[100px] lg:w-[135px] " />
        </Link>
      </div>
      <div className="flex gap-6 lg:gap-12">
        <div className=" md:hover:text-perpol_v transition-all duration-150  cursor-pointer">
          <a
            href={"/Home#Hero"}
            className={
              " md:hover:text-perpol_v transition-all duration-150 select-none"
            }
          >
            How it works?
          </a>
        </div>
        <div className=" md:hover:text-perpol_v transition-all duration-150  cursor-pointer">
          <a
            href={"/Home#Goal"}
            className={
              " md:hover:text-perpol_v transition-all duration-150 select-none"
            }
          >
            Owr goal
          </a>
        </div>
        <div className=" md:hover:text-perpol_v transition-all duration-150  cursor-pointer">
          <a
            href={"/Home#Our_features"}
            className=" md:hover:text-perpol_v transition-all duration-150 select-none"
          >
            Our features
          </a>
        </div>

        <div className=" md:hover:text-perpol_v transition-all duration-150  cursor-pointer">
          <a
            href={"/Home#Contact_us"}
            className=" md:hover:text-perpol_v transition-all duration-150 select-none"
          >
            Contact us
          </a>
        </div>
      </div>
      <div className="flex gap-4 justify-center items-center h-full">
        <div className=" flex items-center justify-center gap-3">
          <span className="   text-md rounded-lg cursor-pointer">
            <Link to={"/Login"} className="select-none">
              Login
            </Link>
          </span>
          <span className=" w-[2px] h-5  bg-white"></span>
          <span className="bg-perpol_v text-[#fff] px-3 py-2 text-md rounded-xl cursor-pointer">
            <Link to={"/Register"} className="select-none">
              Sign up
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Laptop_Nav_Items;
