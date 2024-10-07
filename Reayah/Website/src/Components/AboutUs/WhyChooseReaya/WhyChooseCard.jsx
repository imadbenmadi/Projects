import React from "react";

function WhyChooseCard({ title, description, color, bgColor }) {
  return (
    <div
      className="bg-white  p-5 w-64 h-64 flex justify-center flex-col items-center text-center rounded-lg border shadow-lg"
      style={{
        borderColor: `#${color}`,
        backgroundColor: `#${bgColor}`,
      }}
    >
      <div className="mb-3 text-xl font-bold" style={{ color: `#${color}` }}>
        {title}
      </div>
      <div className="text-black text-opacity-70">{description}</div>
    </div>
  );
}

export default WhyChooseCard;
