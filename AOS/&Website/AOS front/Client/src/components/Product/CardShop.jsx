import React from "react";
import Vector from "../../assets/icon/Vector.png";
import TextComponent from "./TextComponent";

function CardShop({ image, title, des, rate, price }) {
  return (
    <div
      className={` w-[90%]
      overflow-hidden flex-col justify-between   mx-auto  h-fit mb-4  rounded-3xl cursor-pointer duration-400 ease-in bg-zinc-100  hover:shadow-xl`}
    >
      <div className="w-[95%] h-[40%]  pt-2 h-25 mx-auto overflow-hidden  rounded-2xl  ">
        <img
          src={image}
          className="w-full h-full rounded-2xl   object-cover"
          alt="Your Image"
        />
      </div>

      <div className=" px-2 py-5 h-full flex-col items-end justify-between">
        <div className="text-black  text-lg font-normal font-['Outfit']">
          {title.slice(0, 10)}
          {des && <TextComponent text={des} maxLength={50} />}
        </div>
        <div className=" flex  justify-between items-center">
          <div className="text-black text-sm md:text-lg font-normal font-['Outfit']">
            {price} DZD
          </div>
          <div className="flex justify-center items-center gap-2">
            <div className="text-yellow-500 text-lg font-normal font-['Outfit']">
              {rate}
            </div>
            <img src={Vector} className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardShop;
