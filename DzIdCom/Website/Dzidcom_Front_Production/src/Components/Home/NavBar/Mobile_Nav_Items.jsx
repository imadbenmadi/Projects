import { Link } from "react-router-dom";

function Mobile_Nav_Items({ MobileNav_Open, Toogle_Menu_Bar }) {
  return (
    <div className="flex md:hidden">
      <div
        className={`  ${
          MobileNav_Open ? " translate-x-[0vw]" : " translate-x-[200vh] "
        } absolute   transition-transform duration-300 select-none w-[100vw]
                  z-50    text-black_text  dark:text-white dark:bg-black bg-white `}
      >
        <div className="  h-screen text-xl  pt-8 overflow-y-auto ">
          <div className=" flex flex-col justify-start items-center h-[80%]  ">
            <div className="flex flex-col gap-6 pb-6 justify-around w-[120px] text-center font-semibold ">
              <Link
                onClick={Toogle_Menu_Bar}
                to={"/Register"}
                className="select-none px-3 py-2 rounded-lg"
              >
                Sign up
              </Link>
              <Link
                onClick={Toogle_Menu_Bar}
                to={"/Login"}
                className="select-none   px-3 py-2 rounded-lg "
              >
                Log in
              </Link>
            </div>
            <div className=" w-full h-[2px] bg-gray_white "></div>
            <div className="text-center flex flex-col gap-12 mt-10">
              <a
                onClick={Toogle_Menu_Bar}
                href={"/Home#Hero"}
                className="select-none   "
              >
                How it works?
              </a>
              <a
                onClick={Toogle_Menu_Bar}
                href={"/Home#Goal"}
                className="select-none    "
              >
                Owr goal
              </a>
              <a
                onClick={Toogle_Menu_Bar}
                href={"/Home#Our_features"}
                className="select-none    "
              >
                Our features
              </a>
              <a
                onClick={Toogle_Menu_Bar}
                href={"/Home#Contact_us"}
                className="select-none   "
              >
                Contact us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mobile_Nav_Items;
