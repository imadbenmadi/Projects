import React from "react";
import contactImage from "../../../public/Contact/Contact.png";
import ContactInputsSide from "./ContactInputsSide";
function ContactUs() {
  return (
    <div className="mx-auto max-w-[1300px] w-screen p-4">
      <div className="pb-4 w-full">
        <div className="text-purple-500 pl-5 w-full max-md:text-center max-md:text-2xl text-4xl font-bold font-['Outfit'] leading-10">
          Contact Us
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-5 justify-center items-center">
        <div className="w-[50%] max-md:hidden">
          <img
            src={contactImage}
            className="hidden md:block px-5 w-full h-full object-cover"
            alt="Contact Us"
          />
        </div>
        <div className="md:w-1/2 w-full ">
          <ContactInputsSide />
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
