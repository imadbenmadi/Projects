import React from "react";
import AreYouADoctorInfoCard from "./AreYouADoctorInfo/AreYouADoctorInfoCard";
import icon1 from "../../../../public/Home/icon_paper.svg";
import icon2 from "../../../../public/Home/icon_secure.svg";
import icon3 from "../../../../public/Home/icon_user.svg";
import icon4 from "../../../../public/Home/user-tick.svg";

function AreYouADoctorInfo() {
  const data = [
    {
      img: icon3,
      text: "Verified Doctor",
      number: "+1500",
      color: "#32DEBF",
      bgColor: "#32DEBF",
    },
    {
      img: icon1,
      text: "Topics",
      number: "+2000",
      color: "#9747FF",
      bgColor: "#9747FF",
    },
    {
      img: icon2,
      text: "Patient treated",
      number: "+20.3K",
      color: "#32DEBF",
      bgColor: "#32DEBF",
    },
    {
      img: icon4,
      text: "Files Archived",
      number: "+18.5K",
      color: "#9747FF",
      bgColor: "#9747FF",
    },
  ];

  return (
    <div className="flex gap-5 my-5 justify-center items-center flex-wrap">
      {data.map((item, index) => (
        <AreYouADoctorInfoCard
          key={index}
          img={item.img}
          text={item.text}
          number={item.number}
          color={item.color}
          bgColor={item.bgColor}
        />
      ))}
    </div>
  );
}

export default AreYouADoctorInfo;
