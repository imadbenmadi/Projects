import Hero1 from "../../../../public/Home/Hero/Hero1.png";
import Hero2 from "../../../../public/Home/Hero/Hero2.png";
import Hero3 from "../../../../public/Home/Hero/Hero3.png";
import iconHome from "../../../../public/Home/Hero/icon.png";

function HeroRight() {
  return (
      <div className="w-full mt-10 flex flex-col flex-end items-end ">
          <div className="flex justify-center   items-center relative w-[90%] md:mb-4 mb-2">
              <img
                  src={iconHome}
                  className=" hidden lg:block lg:w-16 object-contain  max-md:w-12  max-md:left-2  h-fit  z-10 md:w-12 max-sm:-left-10   -left-12 -bottom-5
                   self-end absolute"
                  alt=""
              />
              <img
                  src={Hero1}
                  alt=""
                  // className=" md:h-36 object-contain   max-sm:w-56  max-md:w-[90%]  max-sm:h-20 z-20 h-46 w-full "
                  className=" md:h-36 object-contain   max-sm:w-fit  max-md:w-[90%]  max-sm:h-28 z-20 h-46  "
              />
          </div>
          <div className="flex  justify-center   items-center gap-6  w-full  ">
              <img
                  src={Hero2}
                  // className="lg:h-40 md:h-28 object-contain  lg:w-[52%] md:w-[50%] max-md:h-40 max-md:w-[50%] max-sm:h-20  max-sm:w-28 "
                  className="lg:h-40 md:h-28 object-contain  w-fit max-md:h-40  max-sm:h-28   "
                  alt=""
              />
              <img
                  src={Hero3}
                  // className="h-56 lg:h-44 object-contain   md:h-40 md:w-[52%] md:h-42  max-sm:h-28 max-sm:w-28"
                  className="h-56 lg:h-44 md:h-42  max-sm:h-32 object-contain   md:h-40 w-fit  "
                  alt=""
              />
          </div>
      </div>
  );
}

export default HeroRight;
