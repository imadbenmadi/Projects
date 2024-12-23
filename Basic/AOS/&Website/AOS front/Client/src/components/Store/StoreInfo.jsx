import { faker } from "@faker-js/faker";
import React, { useEffect } from "react";
import { getProfileApi } from "../../Redux/apiCalls/profileApiCalls";
import { getUserProfile, selectInfo } from "../../Redux/reducer";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  followStoreApi,
  getStoreProfileApi,
} from "../../Redux/apiCalls/storeApiCalls";
import Swal from "sweetalert2";

function StoreInfo() {
  const { userProfile } = useSelector(selectInfo);
  const { storeId } = useParams();
  const { user } = useSelector(selectInfo);
  const dispatch = useDispatch();
  const [store, setStore] = React.useState({});
  const getProfile = async () => {
    const userData = await getProfileApi(user._id);
    dispatch(getUserProfile(userData));
  };
  const getStore = async () => {
    const store = await getStoreProfileApi(storeId);
    setStore(store);
    console.log(store);
  };
  const generateRandomData = () => {
    return {
      id: faker.string.uuid(),
      productName: faker.commerce.productName(),

      avatar: faker.image.avatar(),
      Background: faker.image.avatarLegacy(),
    };
  };
  useEffect(() => {
    if (!userProfile) {
      getProfile();
    }

    getStore();
  }, []);
  // Generate an array of random items
  const itemsArray = Array.from({ length: 1 }, () => generateRandomData());

  const [followButton, setFollowButton] = React.useState(true);

  const HandelFollowButton = () => {
    const follow = followStoreApi(storeId, user._id);
    console.log(follow);

    // setFollowButton(!followButton);
  };
  return (
    <div className="flex flex-col self-center w-full mx-auto text-2xl font-semibold text-black max-w-[1300px] max-md:max-w-full">
      <img
        loading="lazy"
        src={itemsArray[0].Background}
        className="ml-20  aspect-[3.7] h-52 rounded-b-lg max-w-20 max-md:max-w-full"
      />
      <div className="flex gap-5 md:justify-between justify-center items-center pr-5 mt-6 w-full max-md:flex-wrap max-md:max-w-full">
        <div className="flex gap-5 justify-between items-center md:ml-20 whitespace-nowrap">
          <img
            loading="lazy"
            src={itemsArray[0].avatar}
            className=" bg-white rounded-full aspect-square  w-32 h-32"
          />
          <div className="grow my-auto">{store.StoreName}</div>
        </div>
        <div className=" flex flex-col justify-center self-center mt-5 text-lg font-semibold text-white rounded-md">
          <div
            onClick={HandelFollowButton}
            className={`cursor-pointer justify-center self-center text-center duration-300 ${
              followButton ? "text-black" : " text-white"
            }  items-center px-16 py-3.5 ${
              followButton ? "bg-zinc-300" : " bg-black"
            }  rounded-md max-md:px-5`}
          >
            {!followButton ? " +Follow " : "unFollow"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoreInfo;
