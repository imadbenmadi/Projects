import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import dashboard from "../assets/icon/Profile/dashboard-fill.png";
import money from "../assets/icon/Profile/money-dollar-circle-fill.png";
import folder from "../assets/icon/Profile/folder-download-fill.png";
import user from "../assets/icon/Profile/user-2-line.png";

import { useEffect, useState } from "react";
import HeaderMobile from "../components/HeaderMobile";
import { getStoreInfo, getStoreProfile, login } from "../Redux/reducer";
import { useDispatch } from "react-redux";
import { checkAuth } from "../Redux/apiCalls/authApiCall";
import { getStoreProfileApi } from "../Redux/apiCalls/storeApiCalls";

function Dashboard() {
  const [isOpen, setIsOpen] = useState(true);

  const { storeId } = useParams();
  const { userId } = useParams();
  const pathname = useLocation().pathname;
  const dispatch = useDispatch();
  const check = async () => {
    const data = await checkAuth();
    if (data) {
      await dispatch(login(data));
    }
  };
  useEffect(() => {
    check();
  }, []);

  const getStore = async () => {
    const data = await getStoreProfileApi(storeId);
    dispatch(getStoreProfile(data));
  };
  useEffect(() => {
    getStore();
  }, []);
  // const getStoreProfile = async (storeId) => {
  //   const data = await getStoreProfileApi(storeId);
  //   dispatch(getStoreProfile(data));
  // };
  // useEffect(() => {
  //   // getAllCategoriesFunction();
  //   getStoreProfile(storeId);
  // }, []);

  return (
    <div className="flex gap-0 h-screen w-screen duration-500  relative   self-center bg-white max-md:flex-wrap">
      <div className=" md:flex ">
        {/* <div
          className=" z-50  hidden  absolute duration-500 max-md:block -top-5 -right-5   h-20 w-20 bg-black rounded-[20px]"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        ></div> */}
        <HeaderMobile
          setIsOpen={() => {
            setIsOpen(!isOpen);
          }}
          isOpen={isOpen}
        />
        <div
          className={`  duration-700  font-['Outfit'] ${
            !isOpen
              ? " max-md:translate-x-0  max-md:absolute duration-700 z-50 "
              : "max-md:-translate-x-[100%]  max-md:absolute  duration-700 z-50"
          } flex-col fixed  max-w-[1300px] duration-700  justify-around items-center  w-[10vw]   max-md:w-[100%] h-[100%] max-md:h-[92%]  max-md:fixed bg-black`}
        >
          <div className="flex flex-col  justify-between relative max-md:items-start max-md:pr-2 items-center mt-10 h-[40%]">
            <Link to={`/Dashboard/store/${userId}/${storeId}`}>
              <div
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
                className={` px-4 cursor-pointer duration-300 flex justify-center items-center w-16 max-md:w-fit h-16 ${
                  pathname == "/Dashboard" && "bg-purple-600"
                } hover:bg-purple-600 rounded-3xl`}
              >
                <img className="w-10 h-10" src={dashboard} alt="" />
                <div className="text-white pl-2 text-lg md:hidden  ">
                  Information Store{" "}
                </div>
              </div>
            </Link>
            <Link to="ContolProducts">
              <div
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
                className={` px-4 cursor-pointer duration-300 flex justify-center items-center w-16 max-md:w-fit h-16 ${
                  pathname == "/Dashboard/ContolProducts" && "bg-purple-600"
                } hover:bg-purple-600 rounded-3xl`}
              >
                <img className=" w-10 h-10" src={money} alt="" />
                <div className="text-white pl-2 text-lg  md:hidden ">
                  Products{" "}
                </div>
              </div>
            </Link>
            <Link to="ContolCells">
              <div
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
                className={` px-4  cursor-pointer duration-300 flex justify-center items-center w-16 max-md:w-fit h-16 ${
                  pathname == "/Dashboard/ContolCells" && "bg-purple-600"
                } hover:bg-purple-600 rounded-3xl`}
              >
                <img className="w-10 h-10" src={folder} alt="" />
                <div className="text-white pl-2 text-lg  md:hidden ">
                  Your requests
                </div>
              </div>
            </Link>
          </div>

          <div className="self-end  h-[40%] flex justify-center items-end">
            <Link to={`/Profile/${userId}`}>
              <div className="  cursor-pointer   duration-300 flex justify-center items-center w-16 h-16 hover:bg-purple-600 rounded-3xl">
                {" "}
                <img className="w-10 h-10 " src={user} alt="" />
              </div>
            </Link>
          </div>
        </div>

        <div
          // onClick={() => {
          //   setIsOpen(false);
          // }}
          className="flex md:ml-[10vw] max-md:pl-5  flex-col w-[100vw]  h-screen     max-md:max-w-full"
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
