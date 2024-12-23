import React from "react";
import Feature1_image from "../../../public/Home/Feature1.png";
import Feature2_image from "../../../public/Home/Feature2.png";
import Feature3_image from "../../../public/Home/Feature3.png";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

function Features() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const containerVariants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.5, // Delay between animations of each child
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 1.4, delay: i * 0.5 }, // Custom delay for each card
        }),
    };

    const features = [
        {
            image: Feature1_image,
            title: "تواصل سهل وسريع مع الاطباء",
            description:
                "استشارات طبية عبر الرسائل و متابعة الحالة المرضية بشكل دوري مع طبيبك و مشاركة سجلك الطبي مع الطبيب المختص بصورة آمنة",
        },
        {
            image: Feature3_image,
            title: "الاشعارات و الاعلانات  ",
            description:
                "اشعارات و إعلام المريض في الأيام التحسيسية والحملات التوعوية و كذا الإعلام عن كل مايخص العتاد الطبي و الخدمات الصيدلانية",
        },
        {
            image: Feature2_image,
            title: " معلومات صحية موثوقة",
            description:
                "مقالات و نصائح طبية موثوقة من أطباء متخصصين , معلومات عامة حول الأمراض و الأدوية ,نصائح و طرق الوقاية من الامراض ",
        },
    ];

    return (
        <div
            className="min-h-screen flex items-center justify-center "
            id="Features"
        >
            <div>
                <div className="text-center mt-24">
                    <div className="text-2xl font-semibold">ميزاتنا</div>
                    <div className="text-sm pt-2 ">
                        استكشف ميزات منصتنا القوية المصممة <br />لإبقائك على اتصال
                        وتحكم في صحتك
                    </div>
                </div>
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : ""}
                    className="flex flex-col flex-wrap justify-center md:flex-row items-center gap-12 md:overflow-x-auto overflow-hidden custom-overflow px-12 py-12"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            custom={index}
                            variants={itemVariants}
                            className="w-[300px] md:h-[250px] shrink-0 border shadow-[#2a77f147] shadow-xl rounded-xl py-4 px-3"
                        >
                            <div>
                                <img
                                    src={feature.image}
                                    className="mx-auto w-12 pb-3"
                                    alt=""
                                />
                            </div>
                            <div className="text-center">
                                <div className="text-lg md:text-xl font-semibold mb-4">
                                    {feature.title}
                                </div>
                                <div className="text-sm ">
                                    {feature.description}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}

export default Features;
