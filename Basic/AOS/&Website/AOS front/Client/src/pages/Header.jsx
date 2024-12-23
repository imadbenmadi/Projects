import basket from "../assets/icon/basket.png";
import userIcon from "../assets/icon/user.png";
// import setting from "../assets/icon/setting1.png";
import notification from "../assets/icon/notification.png";
import search from "../assets/icon/search.png";
import menu from "../assets/icon/Profile/menu-line.svg";
import userIMg from "../assets/icon/Profile/user-2-line.png";
import StoreAos from "../assets/icon/Profile/store-2-fill.svg";
import TopIMg from "../assets/icon/Profile/sparkling-2-fill.svg";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectInfo, LoginAuth, getUserProfile } from "../Redux/reducer";
import BasketCard from "../components/basket/BasketCard";
import NotificationCard from "../components/NotificationCard";
import { useEffect } from "react";
import { checkAuth, logoutUser } from "../Redux/apiCalls/authApiCall";
import { searchProducts } from "../Redux/apiCalls/productApiCalls";
import { getProfileApi } from "../Redux/apiCalls/profileApiCalls";

function Header() {
  const [isOpenBasket, setIsOpenBasket] = useState(false);
  const [isOpenNotification, setIsOpenNotification] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const Info = useSelector(selectInfo);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { pathname } = useNavigate();
  const [user, setUser] = useState(
    Info.user || {
      userData: { FirstName: "", LastName: "", Email: "" },
    }
  );
  const [searchValue, setSearchValue] = useState("");
  const handleClickNotification = () => {
    if (user) {
      setIsOpenBasket(false);
      setIsOpenNotification(!isOpenNotification);
    } else {
      Navigate("/Login");
    }
  };

  const handleClickBasket = () => {
    if (user) {
      setIsOpenNotification(false);
      setIsOpenBasket(!isOpenBasket);
    } else {
      Navigate("/Login");
    }
  };
  useEffect(() => {
    setIsOpenNotification(false);
    setIsOpenBasket(false);
  }, [pathname]);

  useEffect(() => {
    setUser(Info.user);
    getProfile();
  }, [Info.user]);

  const handelLogout = async () => {
    setTimeout(async () => {
      await dispatch(logoutUser());
      Navigate("/");
    });
  };
  const handelLogin = () => {
    setTimeout(() => {
      Navigate("/Login");
    }, 1000);
  };
  const handelSearch = (e) => {
    setSearchValue(e.target.value);
  };
  const handelClickSearch = () => {
    const search = searchProducts(searchValue);
    Navigate(`/AllProductsSearch/${searchValue}`, { search: search });
  };
  const getProfile = async () => {
    const userData = await getProfileApi(user._id);
    dispatch(getUserProfile(userData));
    // await getUserProfile(userData);
    console.log(userData);
    // setLoading(true);
  };

  return (
    <div className="     md:h-20 flex justify-center items-center w-screen z-50   bg-neutral-800 fixed top- left-0  ">
      <div className=" max-md:hidden  w-[1200px] flex items-center   ">
        <Link to="/" className="w-[10%] ">
          <div className=" w-[10%]   text-white text-3xl font-normal font-['Outfit']">
            AOS
          </div>
        </Link>
        <div className=" w-[70%] h-8 relative ">
          <input
            type="text"
            placeholder="Search for products"
            onChange={handelSearch}
            className="w-[70%] px-5 h-8 left-0 top-0  bg-white rounded-2xl placeholder:left-[31px] top-[4px]  text-stone-600 text-lg font-thin font-['Outfit'] focus:outline-none"
          />
          <button
            onClick={handelClickSearch}
            className=" w-7 h-8 right-[30%] top-0 px-5 absolute bg-sky-700 rounded-r-2xl   "
          >
            {" "}
            <img className=" top-1 left-1 absolute  w-6 h-6" src={search} />
          </button>
        </div>
        <div className=" w-[20%] z-10 relative flex justify-end gap-10 items-center">
          {user && (
            <div className="hover:cursor-pointer   z-10 ">
              <div onClick={handleClickNotification} className="relative">
                <img className="w-7 h-7 relative" src={notification} />
                {user && (
                  <div className="absolute  z-10 top-0 right-0 bg-red-500 w-4 h-4 rounded-full text-white text-xs flex justify-center items-center">
                    {" "}
                  </div>
                )}
              </div>

              {isOpenNotification && <NotificationCard />}
            </div>
          )}
          {user && (
            <div className=" hover:  cursor-pointer ">
              {" "}
              <div onClick={handleClickBasket} className="relative">
                <img className="w-7 h-7" src={basket} />
              </div>
              {isOpenBasket && <BasketCard />}
            </div>
          )}

          <div className=" pr-2">
            {user ? (
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="secondary"
                    name="Jason Hughes"
                    size="sm"
                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">
                      {user?.FirstName || ""}
                      {user?.LastName || ""}
                    </p>
                    <p className="font-semibold"> {user?.Email || ""}</p>
                  </DropdownItem>
                  <DropdownItem key="settings">
                    <Link to={`/Profile/${user?._id}`}> My Profile</Link>
                  </DropdownItem>
                  <DropdownItem key="help_and_feedback">
                    Help & Feedback
                  </DropdownItem>
                  <DropdownItem
                    key="logout"
                    className="text-red-500"
                    color="danger"
                    onClick={handelLogout}
                  >
                    Log Out
                  </DropdownItem>
                  +{" "}
                </DropdownMenu>
              </Dropdown>
            ) : (
              <Link to="/login">
                <p className="font-semibold bg-white px-4 py-2 rounded-md ">
                  Login{" "}
                </p>
              </Link>
            )}
          </div>
        </div>
      </div>
      {/* <HeaderMobile/> */}
      <div className="w-screen     md:hidden flex justify-between items-center top-0 left-0  fixed z-50  px-1 h-14  bg-black">
        <div
          style={{ transform: `translateX(${!isOpenMenu ? "-100%" : "0"})` }}
          className="h-screen w-screen  duration-500 fixed bg-black  top-14 left-0 "
        >
          <div className=" text-center pt-10 flex-col justify-start gap-5 pl-4 ">
            <Link
              to="/CheckOutPage"
              onClick={() => {
                setIsOpenMenu(!isOpenMenu);
              }}
              className="text-white  gap-3 flex justify-start items-center  py-5 text-3xl font-medium font-['Outfit']"
            >
              <img src={basket} className="w-10 h-10" alt="" />
              <div>My basket </div>
            </Link>
            <div className="text-white  gap-3 flex justify-start items-center  py-5 text-3xl font-medium font-['Outfit']">
              <img src={StoreAos} alt="" />
              <div>Trending </div>
            </div>
            <div className="text-white  gap-3 flex justify-start items-center  py-5 text-3xl font-medium font-['Outfit']">
              <img src={TopIMg} alt="" />
              <div>AOS Home </div>
            </div>
            <div className="text-white  gap-3 flex justify-start items-center  py-5 text-3xl font-medium font-['Outfit']">
              <img src={StoreAos} alt="" />
              <div>Top Departments </div>
            </div>
          </div>
        </div>

        <div
          onClick={() => {
            setIsOpenMenu(!isOpenMenu);
            setIsOpenNotification(false);
          }}
          className=" pl-2 w-1/3   "
        >
          {!isOpenMenu ? (
            <img src={menu} className="w-8 h-8" alt="" />
          ) : (
            <div className="text-3xl pl-2 text-white">X</div>
          )}
        </div>
        <Link
          to="/"
          className=" text-center  w-1/3 text-white text-xl font-normal font-['Outfit']"
        >
          AOS
        </Link>

        <div className=" pr-2 flex gap-5 w-1/3  justify-end">
          <div className=" cursor-pointer  ">
            {" "}
            {user && (
              <div className=" hover:  cursor-pointer ">
                {" "}
                <div onClick={handleClickBasket} className="relative">
                  <img className="w-7 h-7" src={basket} />
                </div>
                {isOpenBasket && <BasketCard />}
              </div>
            )}
          </div>

          {user ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name="Jason Hughes"
                  size="sm"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">
                    {user?.FirstName || ""} {user?.LastName || ""}
                  </p>
                  <p className="font-semibold"> {user?.Email || ""}</p>
                </DropdownItem>
                <DropdownItem key="settings">
                  <Link to={`/Profile/${user?._id}`}> My Profile</Link>
                </DropdownItem>
                <DropdownItem key="help_and_feedback">
                  Help & Feedback
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  className="text-red-500"
                  color="danger"
                  onClick={handelLogout}
                >
                  Log Out
                </DropdownItem>
                +{" "}
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <img src={userIMg} className="w-7 h-7 cursor-pointer" alt="" />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem
                  onClick={handelLogin}
                  key="Login"
                  className="h-14 gap-2"
                ></DropdownItem>
                <DropdownItem key="SignUp">Sign Up</DropdownItem>

                <DropdownItem key="help_and_feedback">
                  Help & Feedback
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
