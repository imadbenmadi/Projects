import React from "react";
import KeyFeaturesCard from "./KeyFeaturesCard";

function KeyFeatures() {
  const features = [
    {
      id: 1,
      title: "Doctor Appointments and Recommendations",
      description:
        "Users can easily and quickly book appointments with specialized doctors. This feature simplifies the process of scheduling medical visits, saving time and effort for patients.",
    },
    {
      id: 2,
      title: "Prescription Management",
      description:
        "The platform provides intelligent guidance and assistance to users based on their medical data and health needs. This includes recommendations for managing prescriptions and ensuring that patients follow their treatment plans effectively.",
    },
    {
      id: 3,
      title: "Doctor Classification",
      description:
        "Doctors on the platform are classified according to their specialties. This allows users to easily find and select the right specialist for their specific medical needs, ensuring they receive appropriate and expert care.",
    },
    {
      id: 4,
      title: "Personalized Patient Files",
      description:
        "Documenting and Storing Medical Data, The platform offers a secure space to document and store patients' medical data. This ensures that medical records are easily accessible at any time, providing convenience and safety for patients' information.",
    },
  ];
  return (
    <div className="w-screen h-fit px-2 my-10  py-12  md:py-32 bg-gradient-to-r from-purple-700 to-purple-500 ">
      <div className="text-white  max-md:text-3xl text-center  md:pb-10 text-5xl font-bold ">
        Key Features:
      </div>
      {features.map((feature, index) => {
        return <KeyFeaturesCard key={index} feature={feature} />;
      })}
    </div>
  );
}

export default KeyFeatures;
