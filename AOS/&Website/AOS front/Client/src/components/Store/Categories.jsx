import { faker } from "@faker-js/faker";
import React from "react";
import cat from "../../assets/icon/Profile/categories.png";
import { Link } from "react-router-dom";
function Categories() {
  const generateRandomData = () => {
    return {
      image: faker.image.urlLoremFlickr(),
    };
  };

  // Generate an array of random items
  const itemsArray = Array.from({ length: 1 }, () => generateRandomData());

  return (
    <div className="flex flex-col self-center relative  px-5 mt-14 w-full max-w-[1157px] mx-auto max-md:mt-10 max-md:max-w-full">
      <div className="text-4xl text-black max-md:max-w-full">✨ Categories</div>
      <div className="mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
          <div className="flex flex-col w-[58%] h-full max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow justify-center text-7xl font-semibold text-white whitespace-nowrap max-md:mt-9 max-md:max-w-full max-md:text-4xl">
              <div className=" overflow-hidden relative flex-col justify-center items-start pt-40 pr-16 pb-32 pl-20 w-full min-h-[354px] max-md:py-10 max-md:pr-5 max-md:pl-8 max-md:max-w-full max-md:text-4xl">
                <img
                  loading="lazy"
                  src={cat}
                  className="object-cover z-0 h-full absolute inset-0 size-full"
                />
                <div className="z-50 absolute "> MEN</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 h-full w-[42%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow justify-center text-7xl font-semibold text-white whitespace-nowrap max-md:mt-9 max-md:max-w-full max-md:text-4xl">
              <div className="overflow-hidden relative flex-col justify-center items-start px-12 pt-40 pb-32 w-full min-h-[354px] max-md:px-5 max-md:py-10 max-md:max-w-full max-md:text-4xl">
                <img
                  loading="lazy"
                  src={cat}
                  className="object-cover absolute  h-full  inset-0 size-full"
                />
                <div className="z-50 absolute "> MEN</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-9 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
          <div className="flex flex-col w-[42%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow justify-center text-7xl font-semibold text-white max-md:mt-9 max-md:max-w-full max-md:text-4xl">
              <div className="overflow-hidden relative flex-col justify-center items-center px-16 pt-40 pb-32 w-full min-h-[354px] max-md:px-5 max-md:py-10 max-md:max-w-full max-md:text-4xl">
                <img
                  loading="lazy"
                  src={cat}
                  className="object-cover absolute h-full inset-0 size-full"
                />
                <div className="z-50 absolute "> MEN</div>{" "}
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[58%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow justify-center text-7xl font-semibold text-white whitespace-nowrap max-md:mt-9 max-md:max-w-full max-md:text-4xl">
              <div className="overflow-hidden relative flex-col justify-center items-start px-14 pt-40 pb-32 w-full min-h-[354px] max-md:px-5 max-md:py-10 max-md:max-w-full max-md:text-4xl">
                <img
                  loading="lazy"
                  src={cat}
                  className="object-cover absolute h-full inset-0 size-full"
                />
                <div className="z-50 absolute "> MEN</div>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Link to="AllProducts">
        <div className=" flex justify-center cursor-pointer items-center self-center px-16 py-4 mt-24 max-w-full text-2xl font-semibold text-white whitespace-nowrap bg-black rounded-xl w-[263px] max-md:px-5 max-md:mt-10">
          View All
        </div>
      </Link>
    </div>
  );
}

export default Categories;
