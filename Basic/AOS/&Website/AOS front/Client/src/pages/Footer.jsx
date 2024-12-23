import { useInView } from "framer-motion";
import { useRef } from "react";
import { IoMdMail } from "react-icons/io";
import { Link } from "react-router-dom";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";

function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <footer className="flex mt-5 flex-col justify-between text-white  md:px-10 bg-black">
      <div
        ref={ref}
        style={{
          transform: isInView ? "none" : "translateY(10%)",
          opacity: isInView ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.1s",
        }}
        className="flex flex-col gap-5 justify-between self-center max-w-[1200px] mx-auto"
      >
        <div className="flex flex-col md:flex-row gap-5 justify-between mt-8 max-w-[1200px] mx-auto">
          <div className="flex gap-3 justify-center mt-2 ">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green"
            >
              <IoLogoWhatsapp className="text-4xl" />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue"
            >
              <FaFacebookSquare className="text-4xl" />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-500"
            >
              <FaInstagram className="text-4xl" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <IoMdMail className="text-green text-4xl" />
            </a>
          </div>
          <div className="flex items-center">
            <a
              href="mailto:skate.consult@gmail.com"
              className="ml-2 text-gray break-words text-[16px] md:text-[24px]"
              style={{ wordBreak: "break-all" }}
            >
              algerify@gmail.com
            </a>
          </div>
        </div>
      </div>
      <div className="self-center py-6 text-xl font-medium leading-6 whitespace-nowrap text-neutral-500 max-md:ml-2.5">
        © 2024 Algerify. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
