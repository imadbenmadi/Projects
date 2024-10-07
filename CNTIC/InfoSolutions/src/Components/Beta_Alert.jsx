import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

function Beta_Alert() {
    const [close, setClose] = useState(false);

    return (
        !close && (
            <div
                className="flex justify-between items-center w-full  md:w-[70%] m-auto bg-green-100 border-2
             px-4 border-green-600  md:text-xl   rounded-xl"
            >
                <div className="flex flex-col   py-2">
                    <div className="font-bold">ملاحظة : </div>

                    <div>
                        {" "}
                        هذه النسخة التجريبية من الموقع نحن نعمل على تحسينها
                    </div>
                </div>
                <IoClose
                    className="text-3xl h-full  cursor-pointer "
                    onClick={() => setClose(true)}
                />
            </div>
        )
    );
}

export default Beta_Alert;
