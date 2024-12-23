import { useRef, useState } from "react";

import { useInView } from "framer-motion";
import { BiArrowFromTop } from "react-icons/bi";
import { BsArrowDown } from "react-icons/bs";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";

const KeyFeaturesCard = ({ feature }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [isOpen, setIsOpen] = useState(false);
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div
      ref={ref}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "none" : "translatex(50px)",
        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.02s",
      }}
      className=" md:w-[60%]  max-md:mx-2 max-md:px-2 my-5 mx-auto rounded-lg bg-zinc-100 py-1 md:px-5 duration-500"
    >
      <button
        className={`w-full flex items-center justify-start gap-4 hover:bg-gray md:py-[17px]  bg-zinc-100 rounded-[3px]${
          isOpen ? "rounded-[3px]" : ""
        }`}
        onClick={toggleAccordion}
      >
        <div className="w-full py-1 text-left max-md:text-sm text-zinc-700 text-lg">
          {feature?.id}.{feature?.title}
        </div>
        <div
          className={`transform duration-300 mr-auto ${
            isOpen ? "-rotate-90" : "rotate-90"
          }`}
        >
          <IoIosArrowBack />
        </div>
      </button>
      <div
        className={`overflow-hidden max-md:text-sm transition-all duration-300 flex justify-end flex-col ${
          isOpen ? "h-auto" : "h-0"
        }`}
      >
        {feature?.description}
      </div>
    </div>
  );
};

export default KeyFeaturesCard;
