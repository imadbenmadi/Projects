import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStoreProfileApi } from "../../Redux/apiCalls/storeApiCalls";
import { useDispatch } from "react-redux";
import { getStoreInfo, getStoreProfile } from "../../Redux/reducer";

function Store({ item, userId }) {
  const [store, setStore] = useState([]);
  const dispatch = useDispatch();

  const getStore = async () => {
    const data = await getStoreProfileApi(item);
    setStore(data);
  };

  useEffect(() => {
    getStore();
  }, []);
  const handleClickEdit = async () => {
    const data = await getStoreProfileApi(item);
    dispatch(getStoreProfile(data));
  };

  return (
    <div key={store._id} className="  mt-6 w-full rounded-2xl bg-zinc-200 h-28">
      <div className="flex  gap-2.5 w-[90%] items-center justify-between text-lg text-black">
        <div className="flex justify-center items-center gap-4">
          <img
            src={store?.image}
            alt=""
            className="rounded-lg   bg-zinc-300 ml-5 my-auto h-[58px] w-[58px]"
          />
          <div className="flex flex-1 my-auto word-wrap ">
            {store?.StoreName}
          </div>
        </div>

        <div className=" self-end    w-fit min-h-5 h-28">
          {" "}
          <div className="flex flex-col self-end flex-1 w-fit  justify-around items-end h-28 ">
            <Link
              to={`/Dashboard/store/${userId}/${item}`}
              onClick={handleClickEdit}
            >
              <div className=" self-end cursor-pointer text-center justify-end w-[10%]  px-10 py-3 my-auto text-xs font-semibold text-white bg-green-500 rounded  max-md:px-5">
                <span className=" w-full flex justify-center">Edit</span>
              </div>
            </Link>
            <Link to={`/store/${userId}/${item}`}>
              <div className=" cursor-pointer text-center justify-end w-[10%]  px-10 py-3 my-auto text-xs font-semibold text-white bg-black rounded  max-md:px-5">
                <span className=" w-full flex justify-center">Visit</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Store;
