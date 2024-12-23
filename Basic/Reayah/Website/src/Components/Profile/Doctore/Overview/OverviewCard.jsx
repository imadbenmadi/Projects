import React from "react";

function OverviewCard({ title, Description, image, bgColor, color, number }) {
    return (
        <div className=" flex flex-wrap w-64 h-52 gap-5 py-5 mt-2.5 max-md:flex-wrap max-md:max-w-full">
            <div
                style={{ backgroundColor: bgColor, borderColor: color }}
                className="flex w-full flex-col px-5 pt-11 pb-3 border-solid rounded-lg border-[3px]"
            >
                <div className="flex  gap-2.5 text-base  leading-6 text-violet-700">
                    <img
                        loading="lazy"
                        src={image}
                        style={{ backgroundColor: color }}
                        className="shrink-0 w-16 p-2 h-16 rounded-full "
                    />
                    <div>
                        <div className="flex-auto self-start">{title}</div>
                        <div className="text-white text-2xl font-bold font-['Outfit'] leading-9">
                            {number}
                        </div>
                    </div>
                </div>
                <div
                    className=" mt-5 text-xs
                     text-purple-500"
                >
                    {Description}
                </div>
            </div>
        </div>
    );
}

export default OverviewCard;
