import React, { useRef } from "react";
import owerGoalImage from "../../../public/Home/ower goal/ower_goal_image.png";
import star from "../../../public/Home/ower goal/star.png";
import stars from "../../../public/Home/ower goal/stars.png";
import OurGOoalItem from "./OurGoal/OurGOoalItem";
import { motion, useInView } from "framer-motion";

function Ower_Goal({ isCheaked }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 1, // delay between child animations
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -50, scale: 1.52 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.5 } },
  };

  const itemVariantsCard = {
    hidden: { opacity: 0, x: -50, scale: 0 },
    visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 2 } },
  };
  const itemVariantsItem = {
    hidden: { opacity: 0, y: -50, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 2 } },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : ""}
    >
      {" "}
      <div className="flex max-md:h-fit flex-col mt-10 items-center px-10 pt-14 pb-20 bg-fuchsia-200 max-md:px-5">
        <div className="w-full max-w-[1200px] max-md:max-w-full relative ">
          <div className="flex  max-md:flex-col max-md:gap-0 relative ">
            <div className="flex md:left-5   relative flex-col w-6/12 max-md:ml-0 max-md:w-full">
              <img
                src={star}
                className="self-end z-20 absolute top-[40%] -left-20 max-w-full   w-[167px]"
              />
              <motion.div
                variants={itemVariantsCard}
                className="flex  flex-col z-30 grow md:px-8 max-md:px-2 py-5 mt-10 w-full text-base bg-white dark:bg-black  rounded-[31.045px] text-zinc-800 max-md:mt-10 max-lg:max-w-96 max-md:mx-auto"
              >
                <motion.div variants={itemVariants}>
                  <div className="text-4xl max-md:text-3xl  dark:text-white   leading-[55.9px] max-md:max-w-full">
                    Our Goals
                  </div>
                  <div className="mt-3 leading-[130%]  dark:text-white  max-md:max-w-full">
                    The economic advantages of our project
                  </div>
                </motion.div>
                <motion.div variants={itemVariantsItem}>
                  <OurGOoalItem />
                </motion.div>
                <motion.div variants={itemVariantsItem}>
                  <OurGOoalItem />
                </motion.div>
                <motion.div variants={itemVariantsItem}>
                  <OurGOoalItem />
                </motion.div>
                <motion.div variants={itemVariantsItem}>
                  <OurGOoalItem isChecked={isCheaked} />
                </motion.div>
              </motion.div>
            </div>
            <div className="flex flex-col  w-6/12 max-md:ml-0 max-md:w-full">
              <motion.div
                variants={itemVariants}
                className="flex flex-col max-md:max-w-full md:relative "
              >
                <img
                  src={stars}
                  className="md:self-end max-w-full absolute  top-0 right-0 w-[120px]"
                />
                <img
                  srcSet={owerGoalImage}
                  className="mt-36 w-full mt-50 max-md:max-w-full max-md:hidden self-center"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Ower_Goal;
