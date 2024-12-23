import React, { useRef } from "react";
import howWeWork_image2 from "../../../public/Home/how_we_work_image.png";
import howWeWork_image from "../../../public/Home/how_we_work.png";
import { useInView, motion } from "framer-motion";

function How_we_work() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const itemVariants = {
        hidden: { opacity: 0, y: -50, scale: 0.8 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1 } },
    };
    return (
        <div
            className="min-h-[70vh] relative flex items-center justify-center my-6 "
            id="How_we_work"
        >
            <div className=" absolute top-3 left-10">
                <img
                    src={howWeWork_image}
                    className="md:w-[170px] w-[120px]"
                    alt=""
                />
            </div>

            <div className=" w-full px-4 bg-[#F5FAFE] min-h-[50vh] ">
                <motion.div
                    ref={ref}
                    variants={itemVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : ""}
                    className="  flex justify-center items-center gap-12 "
                >
                    <div className=" ">
                        <div className=" text-2xl font-semibold mb-6 mt-6 md:mt-0 mr-3">
                            كيف نعمل ؟
                        </div>
                        <div className=" flex   flex-col gap-7">
                            <div className=" flex justify-center items-center gap-1 md:gap-3">
                                <div className=" text-sm">
                                    قم بالتسجيل وإنشاء ملف التعريف الخاص بك
                                </div>
                                <div className="  w-6 h-6 rounded shadow border flex items-center justify-center  bg-white text-md  font-semibold text-black_text">
                                    1
                                </div>
                            </div>
                            <div className=" flex justify-center items-center gap-1 md:gap-3">
                                <div className=" text-sm">
                                    ابحث عن المؤسسة الاستشفائية التي تريها لرؤية
                                    اطباءها و التواصل معهم{" "}
                                </div>
                                <div className="  w-6 h-6 rounded shadow border flex items-center justify-center  bg-white text-md  font-semibold text-black_text">
                                    2
                                </div>
                            </div>
                            <div className=" flex justify-center items-center gap-1 md:gap-3">
                                <div className=" text-sm">
                                    ستتلقى اشعارات عن احداث ة مقالات الاطباء و
                                    المؤسسة الاستشفائية
                                </div>
                                <div className="  w-6 h-6 rounded shadow border flex items-center justify-center  bg-white text-md  font-semibold text-black_text">
                                    3
                                </div>
                            </div>
                        </div>
                    </div>
                    <img
                        src={howWeWork_image2}
                        className=" w-[240px] relative -top-10 hidden md:block"
                        alt=""
                    />
                </motion.div>
            </div>
        </div>
    );
}

export default How_we_work;
