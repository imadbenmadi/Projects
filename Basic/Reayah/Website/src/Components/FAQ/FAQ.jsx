import React from "react";
import FAQCard from "./FAQ/FAQCard";

function FAQ() {
  const faqs = [
    {
      question: "What services does ReayahMed offer?",
      answer:
        "ReayahMed offers a variety of services including easy booking of medical appointments with specialized doctors, intelligent guidance and recommendations based on your medical data, online medical consultations, secure documentation and storage of your medical records, and publishing of health recommendations by medical professionals.",
    },
    {
      question: "How secure is my data on ReayahMed?",
      answer:
        "Your data on ReayahMed is highly secure. The platform utilizes advanced cloud and data security technologies to ensure that your medical information is protected and confidential. Measures are in place to prevent unauthorized access and to safeguard your personal health information.",
    },
    {
      question: "Can I access my medical records anytime?",
      answer:
        "Yes, you can access your medical records anytime through ReayahMed. The platform provides a secure space to store your medical data, ensuring that you can reach your records whenever you need them.",
    },
    {
      question: "How do I find nearby doctors?",
      answer:
        "ReayahMed includes site-based services that help you find close doctors. Using recommendation systems, artificial intelligence technology and patient profiles, ensuring you can easily find and book appointments with specialists in your vicinity.",
    },
  ];
  return (
    <div className="w-screen min-h-[calc(100vh-50px)] px-2   py-12   bg-gradient-to-r from-purple-700 to-purple-500 ">
      <div className="text-white  max-md:text-3xl text-center  text-5xl font-bold ">
        FAQ
      </div>
      {faqs.map((FAQ, index) => {
        return <FAQCard key={index} FAQ={FAQ} inex={index} />;
      })}
    </div>
  );
}

export default FAQ;
