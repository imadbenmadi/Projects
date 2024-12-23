import  { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../../public/Logo.png";
import Menu_Toogler from "./Menu_Toogler";
import Mobile_Nav_Items from "./Mobile_Nav_Items";

function Mobile_Nav() {
  const [MobileNav_Open, set_MobileNav_Open] = useState(false);
  function Toogle_Menu_Bar() {
    set_MobileNav_Open(!MobileNav_Open);
  }
  return (
    <>
      <div className=" flex gap-5 items-center justify-between mx-3 md:hidden h-full ">
        <div>
          <Link to={"/"} className="select-none">
            <img src={Logo} alt="Logo" className=" w-[110px] lg:w-[145px] " />
          </Link>
        </div>
        <Menu_Toogler
          MobileNav_Open={MobileNav_Open}
          set_MobileNav_Open={set_MobileNav_Open}
          Toogle_Menu_Bar={Toogle_Menu_Bar}
        />
      </div>
      <Mobile_Nav_Items
        MobileNav_Open={MobileNav_Open}
        Toogle_Menu_Bar={Toogle_Menu_Bar}
      />
    </>
  );
}

export default Mobile_Nav;
