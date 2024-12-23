import React from "react";

function Benefits_card({ image, title, description }) {
    return (
        <div>
            <div className=" w-[300px] md:w-[500px]  shrink-0   rounded-xl py-4 flex items-start justify-end gap-6">
                <div className=" ">
                    <div className=" text-lg md:text-xl font-semibold mb-4">
                        {title}
                    </div>
                    <div className=" text-sm md:text-base">{description}</div>
                </div>
                <div className=" shrink-0 ">
                    <img src={image} className=" mx-auto w-[100px] " alt="" />
                </div>
            </div>
        </div>
    );
}

export default Benefits_card;
