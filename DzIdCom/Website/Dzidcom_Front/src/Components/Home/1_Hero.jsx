import { motion } from "framer-motion";
import HeroLeft from "./Hero/HeroLeft"; // Import your HeroLeft component
import HeroRight from "./Hero/HeroRight"; // Import your HeroRight component

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5, // delay between child animations
    },
  },
};

const itemVariantsLeft = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1 } },
};
const itemVariantsRight = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1 } },
};

function Hero({ isChecked, setIsChecked }) {
  return (
    <motion.div
      className="flex lg:min-h-[calc(100vh-100px)]   md:min-h-screen justify-between w-full max-md:flex-col h-full items-start md:py-16 py-10 mx-auto max-w-[1200px]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        variants={itemVariantsLeft}
        className="md:w-[50%]  lg:w-[55%] h-fit"
      >
        <HeroLeft isChecked={isChecked} setIsChecked={setIsChecked} />
      </motion.div>
      <motion.div
        className="md:w-[45%]   lg:w-[40%] p-5 h-fit"
        variants={itemVariantsRight}
      >
        <HeroRight />
      </motion.div>
    </motion.div>
  );
}

export default Hero;
