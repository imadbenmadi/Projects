/* eslint-disable react/prop-types */
function ProductOnce({
  item,
  handleDelete,
  index,
  setIsEditProduct,
  handleEdit,
}) {
  return (
    <div
      key={item._id}
      className=" font-['Outfit']  px-6 py-7 rounded-3xl mt-5 h-fit  max-w-[1300px]  bg-zinc-100 "
    >
      <div className="flex justify-center items-center  gap-5 max-md:flex-col max-md:gap-0 max-md:">
        <div className="flex  flex-col justify-center items-center  min-w-[30%] max-md:ml-0 max-md:w-[60%]">
          <img
            loading="lazy"
            src={item.image}
            className="max-w-full  rounded-lg  w-full aspect-square  h-full "
          />
        </div>
        <div className="flex flex-col ml-5 w-[70%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow mt-6 max-md:mt-10 max-md:max-w-full">
            <div className="flex gap-5 justify-between max-md:flex-wrap max-md:max-w-full">
              <div className="flex flex-col">
                <div className="text-3xl font-bold leading-6 text-black wrap max-md:text-xl">
                  {item.Title}
                </div>
                <div className="flex flex-col pr-16 md:pl-5 mt-3 text-lg leading-6 text-neutral-800 max-md:pr-5">
                  <div className="mt-2">
                    {" "}
                    <span className=" text-xl  wrap  font-bold">
                      description
                    </span>{" "}
                    :{item.Describtion}{" "}
                  </div>
                  <div className="mt-4">
                    <span className=" text-xl font-bold">Prix</span>:
                    {item.Price}{" "}
                  </div>
                </div>
              </div>

              <div className="self-start mt-5 ml-5 text-lg leading-6 whitespace-nowrap text-neutral-800 max-md:ml-2.5">
                <span className=" text-xl font-bold">Rating</span> :{" "}
                {item.Product_RatingAverage}
              </div>
              <div className="flex flex-col max-md:flex-row max-md:justify-between max-md:items-center self-start mt-5 text-lg leading-4 text-white whitespace-nowrap max-md:w-[100%]">
                <div
                  onClick={() => handleDelete(index)}
                  className=" cursor-pointer justify-center px-10 py-4 max-md:w-[45%] bg-red-500 rounded max-md:px-5"
                >
                  Delete
                </div>
                <div
                  onClick={() => {
                    setIsEditProduct();
                    handleEdit(index);
                  }}
                  className=" cursor-pointer justify-center px-12 py-4 mt-5 max-md:mt-0 max-md:w-[45%] bg-orange-400 rounded max-md:px-5"
                >
                  Edit
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductOnce;
