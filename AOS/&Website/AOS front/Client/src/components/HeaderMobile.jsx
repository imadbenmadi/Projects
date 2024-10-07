import user from "../assets/icon/Profile/user-2-line.png";
import menu from "../assets/icon/Profile/menu-line.svg";
import closemenu from "../assets/icon/Profile/close-line.svg";

// eslint-disable-next-line react/prop-types
function HeaderMobile({ setIsOpen, isOpen }) {
  return (
    <div className="w-screen md:hidden items-center justify-between flex max-h-screen h-[8%] bg-black ">
      <div
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="w-6 h-6 "
      >
        {isOpen ? <img src={menu} alt="" /> : <img src={closemenu} alt="" />}
      </div>
      <div className=" text-white text-xl font-normal font-['Outfit']">AOS</div>

      <div className="w-6 h-6  ">
        <img src={user} alt="" />
      </div>
    </div>
  );
}

export default HeaderMobile;
