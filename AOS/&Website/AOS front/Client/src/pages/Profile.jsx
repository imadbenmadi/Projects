import { faker } from "@faker-js/faker";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Store from "../components/Store/Store";
import Post from "../components/Store/Post";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, selectInfo } from "../Redux/reducer";
import { useParams } from "react-router-dom";
import { getProfileApi } from "../Redux/apiCalls/profileApiCalls";

import { getStoreApi } from "../Redux/apiCalls/storeApiCalls";
import Loading from "./Loading";

function Profile() {
  const [followButton, setFollowButton] = useState(false);
  const nav = useNavigate();
  const { user } = useSelector(selectInfo);
  const { userProfile } = useSelector(selectInfo);
  const { userId } = useParams();
  const dispatch = useDispatch();
  const [Stores, setStores] = useState([{}]);
  const [loading, setLoading] = useState(false);

  const HandelFollowButton = () => {
    setFollowButton(!followButton);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps

  const getStore = async () => {
    const data = await getProfileApi(userId);
    // console.log(data);
    dispatch(getUserProfile(data));
    setStores(data.Stores);
    setLoading(true);
  };
  useEffect(() => {
    if (!user) {
      nav("/");
    }
    getStore();
  }, [user]);

  return (
    <div className="flex flex-col bg-white font-['Outfit']">
      {!loading ? <Loading /> : null}
      <div className=" w-screen relative flex  justify-center ">
        <div className="  flex overflow-hidden  justify-center   relative flex-col items-center self-center px-16 pt-12 w-full max-w-[1200px] min-h-[184px] max-md:px-5 max-md:max-w-full rounded-b-lg">
          <img
            loading="lazy"
            src={faker.image.urlPicsumPhotos()}
            className="object-cover w-full absolute inset-0 size-full"
          />
        </div>

        <img
          loading="lazy"
          src={faker.image.avatar()}
          className="mt-20  border-4 border-white rounded-full absolute max-w-full aspect-square w-[143px] max-md:mt-32"
        />
      </div>
      <div className="self-center mt-10 w-full max-w-[1080px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
          <div className="flex flex-col w-[40%] max-md:ml-0 max-md:w-full">
            <div className="flex w-full flex-col self-stretch px-5 my-auto whitespace-nowrap max-md:mt-10">
              <div className="flex flex-col py-7 text-black rounded-2xl bg-zinc-100">
                <div className=" md:hidden self-center text-3xl font-semibold text-black whitespace-nowrap max-md:ml-2.5">
                  {user?.FirstName} {user?.LastName}
                </div>
                <div className="self-center text-lg font-['Outfit']">
                  About User
                </div>
                <div className="flex flex-col items-start px-5 mt-6 ml-4">
                  <div className="grow">Gender : {userProfile?.Gender}</div>
                  <div className="flex gap-0.5 mt-5  text-base max-md:ml-2.5">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/945398692d8ba8d8c50b908fa62615ca74e1bd527ff224c4976f0ea9a5e1aa2f?"
                      className="w-5 aspect-square"
                    />

                    <div className="grow">{userProfile?.Address}</div>
                  </div>

                  {userId !== user?._id ? (
                    <div className=" flex flex-col justify-center self-stretch mt-5 text-lg font-semibold text-white bg-black rounded-md">
                      <div
                        onClick={HandelFollowButton}
                        className={`cursor-pointer justify-center text-center duration-300 ${
                          followButton ? "text-black" : " text-white"
                        }  items-center px-16 py-3.5 ${
                          followButton ? "bg-zinc-300" : " bg-black"
                        }  rounded-md max-md:px-5`}
                      >
                        {!followButton ? " +Follow " : "unFollow"}
                      </div>
                    </div>
                  ) : (
                    <div className=" flex flex-col justify-center self-stretch mt-5 text-lg font-semibold text-white bg-black rounded-md">
                      <Link
                        to={`EditProfile/${userId}`}
                        className={`cursor-pointer py-3  justify-center text-center duration-300 
                        rounded-md max-md:px-5`}
                      >
                        EditProfile
                      </Link>
                    </div>
                  )}

                  <div className=" flex flex-col justify-center self-stretch mt-5 text-lg font-semibold text-white bg-green-500 rounded-md">
                    <Link
                      to="AddStore"
                      className={`cursor-pointer py-3  justify-center text-center duration-300 
                        rounded-md max-md:px-5`}
                    >
                      Create Store
                    </Link>
                  </div>
                </div>
              </div>
              {/* <div className="self-center mt-6 text-2xl text-black">Store</div>
              <div className="w-full  scrollProduct pr-4 max-h-56 overflow-y-scroll">
                {Stores?.map((item) => (
                  <Store key={item?._id} item={item._id} userId={userId} />
                ))}
              </div> */}
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[70%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow px-5 max-md:mt-10 max-md:max-w-full">
              <div className=" max-md:hidden self-start text-3xl font-semibold text-black whitespace-nowrap max-md:ml-2.5">
                {user?.FirstName} {user?.LastName}
              </div>
              <div className="flex gap-5 self-start mt-7 text-lg font-semibold whitespace-nowrap">
                {/* <div className="grow justify-center px-10 py-3.5 text-black rounded-md bg-zinc-100 max-md:px-5">
                  Reviews
                </div> */}
                <div className="flex justify-end  px-12 py-3.5 text-white bg-black rounded-md max-md:px-5">
                  Stores
                </div>
              </div>
              <div className="mt-6  max-md:max-w-full">
                <div className=" scrollProduct md:scrollProduct  pr-2 grid md:overflow-y-scroll md:scroll-ml-16 md:max-h-96 max-md: grid-cols-1 max-md:grid-cols-1 max-md:gap-1 gap-5 max-md:flex-col max-md:gap-0 max-md:">
                  {/* // loop this  */}

                  {Stores?.map((item) => (
                    <Store key={item?._id} item={item._id} userId={userId} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Profile;
