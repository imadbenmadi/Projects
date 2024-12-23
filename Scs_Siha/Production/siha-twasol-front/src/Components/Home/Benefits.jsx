import React from "react";
import benefits1_image from "../../../public/Home/benefits1.png";
import benefits2_image from "../../../public/Home/benefits2.png";
import benefits3_image from "../../../public/Home/benefits3.png";
import benefits4_image from "../../../public/Home/benefits4.png";
import Benefits_card from "./Benefits_card";
function Benefits() {
    return (
        <div>
            <div className=" text-center mt-24" id="Benefits">
                <div className=" text-2xl font-semibold">الفوائد</div>
                <div className=" text-sm pt-2">
                    استكشف فوائد منصتنا القوية المصممة لإبقائك على اتصال والتحكم
                    في صحتك
                </div>
            </div>
            <div
                className=" flex flex-col flex-wrap justify-center md:flex-row items-center gap-12  
            md:overflow-x-auto overflow-hidden custom-overflow md:px-12 px-2 md:py-12 py-4"
            >
                <Benefits_card
                    image={benefits1_image}
                    title="تواصل سهل وسريع مع الأطباء"
                    description="استشارات طبية عبر الرسائل ومتابعة الحالة المرضية بشكل دوري مع طبيبك"
                />
                <Benefits_card
                    image={benefits3_image}
                    title="معلومات صحية موثوقة"
                    description="مقالات ونصائح طبية موثوقة من أطباء متخصصين"
                />
                <Benefits_card
                    image={benefits2_image}
                    title="إشعارات وإعلانات"
                    description="إشعارات وتوعية حول الأيام التحسيسية والحملات الصحية"
                />
                <Benefits_card
                    image={benefits4_image}
                    title=" مشاركة آمنة للسجل الطبي"
                    description="مشاركة سجلك الطبي مع الطبيب المختص بصورة آمنة"
                />
            </div>
        </div>
    );
}

export default Benefits;
