import { useEffect, useState } from "react";
import { getProfileApi } from "../../Redux/apiCalls/profileApiCalls";
import { getUser } from "../../Redux/apiCalls/authApiCall";
import avatar from "../../assets/icon/Profile/chair.png";
import TextComponent from "./TextComponent";
function Review({ img, rating, comment, user }) {
  const [userData, setUserData] = useState({});
  const getUserData = async (user) => {
    const data = await getUser(user);
    console.log(data);
    setUserData(data);
  };
  useEffect(() => {
    getUserData(user);
  }, [user]);
  return (
    <div className="flex w-full py-5 px-5 z-40 ">
      <div className="flex justify-between text-start w-full gap-4 max-w-[1000px] ">
        <div className="w-[95%] h-fit bg-white px-3 py-2 rounded-lg max-md:h-fit flex flex-col ">
          <div className="flex justify-between items-cente    ">
            <div>
              <div className="flex justify-start  items-center text-2xl font-normal font-['Outfit']">
                <div className=" flex max-md:flex-col items-center gap-3">
                  <img
                    className="w-24 h-24 max-md:w-20 max-md:h-20 rounded-full"
                    src={avatar}
                  />
                  <div className="text-xl font-normal">
                    {" "}
                    {userData?.FirstName}
                    {userData?.LastName}
                    <div className="text-black text-xl font-normal font-['Outfit']">
                      Algiers,October 12, 2023
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex">
              {[...Array(rating)].map((_, index) => (
                <svg
                  key={index}
                  className="w-4 h-4 text-yellow-300 ms-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              ))}
            </div>
          </div>
          <div className=" ml-5  max-md:h-fit text-black text-xl font-bold font-['Outfit']">
            <TextComponent text={comment} maxLength={10} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Review;
