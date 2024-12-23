import React from "react";

function AreYouADoctorInfoCard({ img, text, number, color, bgColor }) {
  // Convert hex color to RGBA with opacity
  const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <div className="w-52 h-48">
      <div
        style={{
          backgroundColor: hexToRgba(bgColor, 0.2),
          borderColor: color,
        }}
        className="w-full h-full flex flex-col justify-between p-5 rounded-3xl border-2"
      >
        <div
          style={{ color: color }}
          className="text-4xl font-medium font-['Outfit']"
        >
          {number}
        </div>
        <div className="flex gap-4 justify-center items-center">
          <div
            style={{ color: color }}
            className="text-xl font-medium font-['Outfit']"
          >
            {text}
          </div>
          <img src={img} className="w-14 h-14" alt="" />
        </div>
      </div>
    </div>
  );
}

export default AreYouADoctorInfoCard;
