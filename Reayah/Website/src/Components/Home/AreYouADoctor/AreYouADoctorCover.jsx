import React from "react";
import imageCover from "../../../../public/Home/Are_You_Doctore.png";

function AreYouADoctorCover() {
  return (
    <div className="relative bg-center  bg-cover bg-[url('../../../../public/Home/Are_You_Doctore.png')] w-screen h-40 md:h-[50vh]">
      <div className="bg-purple-700 opacity-70 w-full h-full">
        <div className="flex opacity-100 flex-col justify-center items-center w-full h-full">
          <div className=" text-white text-4xl max-md:text-2xl font-semibold font-['Outfit']">
            Are you a doctor?
          </div>
          <div className=" text-teal-400 text-xl max-md:text-xs font-light underline font-['Outfit']">
            Become a part from Reayah.
          </div>
        </div>
      </div>
    </div>
  );
}

export default AreYouADoctorCover;
