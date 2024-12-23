import React from "react";
import item from "../../../../public/Home/ower goal/item.png";
import itemWhite from "../../../../public/Home/ower goal/itemWhite.svg";

function OurGOoalItem({ isCheaked }) {
  return (
    <div>
      {" "}
      {isCheaked ? (
        <img src={item} className="mt-2  w-[31px] max-md:w-5" />
      ) : (
        <img src={itemWhite} className="mt-2  w-[31px] max-md:w-5" />
      )}
      <div className="mt-3.5 max-md:max-w-full max-md:text-sm dark:text-white ">
        Encouraging self-entrepreneurship stipulated in modern Algerian laws
      </div>
    </div>
  );
}

export default OurGOoalItem;
