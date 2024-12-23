import React from "react";

function ServiceCard({ image, text }) {
  return (
    <div className="w-full text-center">
      <img src={image} alt="" className="w-full mx-auto object-cover" />
      <div className="text-lg py-3 ">{text}</div>
    </div>
  );
}

export default ServiceCard;
