import React from "react";
import Comming_Soon from "../../public/Comming_Soon.png";

function Not_Finished() {
    return (
        <div
            className="flex items-center justify-center 
            text-gray font-bold  "
        >
            <div className="p-8 bg-white rounded-md shadow-lg text-center">
                <h1 className="text-3xl md:text-5xl mb-4 text-gray-800">
                    عفوًا! هذه الصفحة لم تنتهي بعد
                </h1>
                <p className="text-lg mb-8 text-gray">
                    نحن نعمل بجد لتقديم شيء رائع لك. تحقق لاحقًا!
                </p>
                <img
                    src={Comming_Soon}
                    alt="تحت الإنشاء"
                    className=" w-32 h-32 md:w-64 md:h-64 mx-auto mb-8"
                />
                <p className="text-sm text-gray-600">
                    شكرًا لصبرك! قسم Cntic club ما زال يعمل على هذا الجزء.
                </p>
            </div>
        </div>
    );
}

export default Not_Finished;
