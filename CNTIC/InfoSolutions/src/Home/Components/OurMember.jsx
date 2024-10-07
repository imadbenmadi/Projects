import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CardOfMember from "./CardOfMember";
import imgSalah from "../../assets/salah.jpg";
import imgImad from "../../assets/imad.jpg";
import imgakram from "../../assets/akram.jpg";
import imgchaker from "../../assets/chaker.jpg";

function OurMember() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.8 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <div className="py-5 my-5">
      <div className="font-bold mx-auto text-xl text-center py-5 md:p-10 md:text-3xl">
        {" "}
        من هم مبرمجون هذا الموقع ?{" "}
      </div>
      <motion.div
        className="mx-auto grid max-w-4xl gap-5 grid-cols-4 max-lg:grid-cols-2 max-md:grid-cols-1"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div ref={ref} variants={itemVariants}>
          <CardOfMember
            image={imgSalah}
            fullName="salah eddine khenfer"
            skilles="full stack"
            dec="I'm delighted to develop this website aimed at assisting individuals in accomplishing various tasks and enhancing their studying experience "
            linkFac={"https://www.facebook.com/salah.khenfer.733/"}
            linkGit={"https://github.com/salahkhenfer"}
            linkInsta={"https://www.instagram.com/bnlili_off"}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <CardOfMember
            image={imgImad}
            fullName="imad eddine benmadi"
            skilles="full stack"
            dec="I'm thrilled to be working on this website dedicated to helping people tackle a wide range of tasks and enriching their learning journey"
            linkInsta={"https://www.instagram.com/_imad_benmadi_/"}
            linkGit={"https://github.com/imadbenmadi"}
            linkFac={"https://www.facebook.com/profile.php?id=100029091319970"}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <CardOfMember
            image={imgchaker}
            fullName="chaker Tamar"
            skilles="mobile developer"
            dec="I'm thrilled to be working on this website dedicated to helping people tackle a wide range of tasks and enriching their learning journey"
            linkInsta={""}
            linkGit={""}
            linkFac={""}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <CardOfMember
            image={imgakram}
            fullName="AKRAM"
            skilles="mobile developer"
            dec="I'm thrilled to be working on this website dedicated to helping people tackle a wide range of tasks and enriching their learning journey"
            linkInsta={""}
            linkGit={""}
            linkFac={""}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default OurMember;
