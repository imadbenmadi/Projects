import React from "react";
import WhyChooseCard from "./WhyChooseCard";

function WhyChooseReaya() {
  const data = [
    {
      title: "Convenience",
      color: "32DEBF",
      bgColor: "CBFFF6",
      description:
        "Book appointments, manage prescriptions, and access medical records—all in one place.",
    },
    {
      title: "Accessibility",
      color: "9747FF",
      bgColor: "F8EFFF",
      description:
        "Our platform is accessible to patients across Algeria, ensuring that everyone has access to quality healthcare services.",
    },
    {
      title: "Affordability",
      color: "32DEBF",
      bgColor: "CBFFF6",
      description:
        "Reayah offers affordable healthcare services, ensuring that patients receive the care they need without breaking the bank.",
    },
    {
      title: "Quality Care",
      color: "9747FF",
      bgColor: "F8EFFF",
      description:
        "Our platform connects patients with qualified healthcare professionals, ensuring that they receive quality care at all times.",
    },
  ];
  return (
    <div className="lg:max-w-[1300px]  w-screen mx-auto px-5 my-10 ">
      <div className="text-center font-bold text-5xl w-full my-10">
        Why Choose Reayah?
      </div>
      <div className="flex justify-center max-lg:flex-wrap items-center gap-4 lg:max-w-[1000px] mx-auto">
        {data.map((item, index) => (
          <WhyChooseCard
            key={index}
            title={item.title}
            description={item.description}
            color={item.color}
            bgColor={item.bgColor}
          />
        ))}
      </div>
   
    </div>
  );
}

export default WhyChooseReaya;
