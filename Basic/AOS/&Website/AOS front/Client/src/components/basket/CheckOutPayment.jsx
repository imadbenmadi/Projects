import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Basket, getUserProfile, selectInfo } from "../../Redux/reducer";
import { getProfileApi } from "../../Redux/apiCalls/profileApiCalls";
import Loading from "../../pages/Loading";
import { getProductsBasket } from "../../Redux/apiCalls/basketApiCalls";

function CheckOutPayment() {
  const { user } = useSelector(selectInfo);
  const { userProfile } = useSelector(selectInfo);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const getProfile = async () => {
    const userData = await getProfileApi(user._id);
    dispatch(getUserProfile(userData));
  };
  useEffect(() => {
    if (user) {
      getProfile();
    }
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col  px-2.5 py-10 w-full rounded-3xl bg-zinc-100 max-md:mt-5 max-md:max-w-full">
          <div className="flex gap-5 justify-between md:mx-7 text-black max-md:mx-2.5">
            <div className="text-2xl font-semibold">Address</div>
          </div>
          <div className="flex gap-3 py-3 pr-9 pl-3 mx-7 mt-2 bg-white rounded-2xl max-md:pr-5 max-md:mx-2.5">
            <div className="flex justify-center items-center self-start px-2 w-10 h-10 bg-neutral-700 rounded-[43px]">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/6efd4144817dda9d55310b862492464f2d7f9b75acb6c4e1bd737272072f77a6?"
                className="aspect-square w-[26px]"
              />
            </div>
            <div className="flex flex-col grow shrink-0 justify-center pt-1.5 basis-0 w-fit">
              <div className="text-xl text-black">{userProfile?.Address}</div>
              {/* <div className="mt-2 text-xs text-neutral-600"></div> */}
            </div>
          </div>
          {/* <div className="self-start mt-7 ml-7 text-2xl font-semibold text-black max-md:ml-2.5">
        Shipping
      </div> */}
          {/* <div className="flex gap-3 py-3 pr-9 pl-3 mx-7 mt-2.5 bg-white rounded-2xl max-md:pr-5 max-md:mx-2.5">
        <div className="flex justify-center items-center self-start px-2 bg-neutral-700 h-[38px] rounded-[43px] w-[38px]">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/39e929a9285a1580504952a2a78a9365209fca19c6b4edeadeec4055b0fae82d?"
            className="w-6 aspect-square"
          />
        </div>
        <div className="grow justify-center py-3.5 text-xl text-black whitespace-nowrap w-fit">
          Yalidin
        </div>
      </div> */}
          <div className="mx-7 mt-6 text-2xl font-semibold text-black max-md:mx-2.5">
            Total : 0DZD
          </div>
          {/* <div className="flex w-full relative   gap-5 justify-between py-2  pl-4  mt-2 text-base bg-white rounded-3xl max-md:mx-2.5">
        <input
          className=" py-2 focus:outline-none  px-2 text-zinc-500"
          placeholder="Promo code"
        />
        <div className=" absolute top-2 right-2 justify-center px-5 py-2 text-white whitespace-nowrap rounded-2xl bg-zinc-900 max-md:px-5">
          Redeem
        </div>
      </div> */}
          <div className="justify-center items-center px-16 py-6 mt-11 text-2xl font-bold text-white whitespace-nowrap bg-black rounded-3xl max-md:px-5 max-md:mt-10 max-md:max-w-full">
            Checkout
          </div>
        </div>
      )}
    </>
  );
}

export default CheckOutPayment;
