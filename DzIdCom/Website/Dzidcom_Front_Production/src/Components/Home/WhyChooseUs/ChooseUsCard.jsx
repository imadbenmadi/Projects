import React from "react";

function ChooseUsCard({ image, text }) {
  return (
    <div className="w-full text-center">
      <img
        src={image}
        alt=""
        className="w-[200px] mx-auto h-[200px] object-cover"
      />
      <div className="text-xs ">{text}</div>
    </div>
  );
}

export default ChooseUsCard;
