// CustomPagination.js

import React from "react";
import { BiArrowFromLeft } from "react-icons/bi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const CustomPagination = ({
  totalSlides,
  activeIndex,
  onPrevClick,
  onNextClick,
}) => {
  return (
    <div className="custom-pagination">
      <button onClick={onPrevClick} className="pagination-arrow prev">
        <IoIosArrowBack
          className="dark:text-white"
          style={{ fontSize: "1.7rem", fontWeight: "bold" }}
        />
      </button>
      {Array.from({ length: totalSlides }).map((_, index) => (
        <span
          key={index}
          className={` pagination-dot ${
            index === activeIndex ? "bg-slate-600 " : "bg-slate-200"
          }`}
        ></span>
      ))}
      <button onClick={onNextClick} className="pagination-arrow next">
        <IoIosArrowForward
          className="dark:text-white"
          style={{ fontSize: "1.7rem", fontWeight: "bold" }}
        />
      </button>
    </div>
  );
};

export default CustomPagination;
