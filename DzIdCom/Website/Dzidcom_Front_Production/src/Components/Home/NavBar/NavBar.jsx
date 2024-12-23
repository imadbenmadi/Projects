import Laptop_Nav_Items from "./Laptop_Nav_Items";
import Mobile_Nav from "./Mobile_Nav";
function NavBar() {
  return (
    <div
      className={` fixed  h-[60px] md:h-[60px] m-0  z-40 w-full dark:bg-black bg-white border-b dark:border-black `}
    >
      <Laptop_Nav_Items />
      <Mobile_Nav />
    </div>
  );
}

export default NavBar;
