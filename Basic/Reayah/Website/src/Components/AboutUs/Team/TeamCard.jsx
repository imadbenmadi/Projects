import React from "react";
import { CiUser } from "react-icons/ci";

function TeamCard({ name, role, img, description }) {
  return (
    <div className="w-80 h-56 px-5  max-md:w-[18rem]  bg-violet-50 rounded-xl border border-purple-500 flex-col justify-center items-center gap-6 inline-flex">
      <div className=" w-full flex justify-start items-center gap-2">
        <div className="w-16 h-16 border border-perpol flex justify-center items-center  rounded-full">
          <CiUser className="w-12 h-12 text-perpol" />
        </div>

        <div>
          <div className=" text-black text-base font-semibold font-['Outfit']">
            {name}
          </div>
          <div className=" text-black text-xs font-light font-['Outfit']">
            {role}
          </div>
        </div>
      </div>
      <div className=" text-black text-xs font-light font-['Outfit']">
        {description}
      </div>
    </div>
  );
}

export default TeamCard;
