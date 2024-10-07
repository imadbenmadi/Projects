import React from "react";
import OverviewCard from "./Overview/OverviewCard";
import image1 from "../.../../../../../public/doctor/Overview/status-up.svg";
import image2 from "../.../../../../../public/doctor/Overview/people.svg";
import image3 from "../.../../../../../public/doctor/Overview/money-recive.svg";
import image4 from "../.../../../../../public/doctor/Overview/tick-circle.svg";
import { color } from "framer-motion";

function Overview() {
    const data = [
        {
            title: "New Appointments",
            Description: "23 are waiting",
            image: image1,
            bgColor: "#D8BBFF",
            color: "#6F00FF",
            number: "183+",
        },
        {
            title: "Total Patients",
            Description: "150 increase",
            image: image2,
            bgColor: "#FFDBBB",
            color: "#FF5C00",
            number: "183+",
        },
        {
            title: "Successful Surgery",
            Description: "15 less this month",
            image: image4,
            bgColor: "#A3F4FF",
            color: "#4759FF",
            number: "603+",
        },
        {
            title: "Status",
            Description: "Total Appointments",
            image: image3,
            bgColor: "#FFBBBB",
            color: "#FF0000",
            number: "63,000 DZD",
        },
    ];
    return (
        <div className="flex px-5 pt-10 flex-col gap-5 w-full max-md:flex-wrap max-md:max-w-full">
            <div className="w-full text-4xl font-semibold text-purple-500 max-md:max-w-full">
                Overview
            </div>
            <div
                className="flex flex-wrap justify-start items-center  gap-5 py-5 mt-2.5 w-full  "
            >
                {data.map((item, index) => (
                    <OverviewCard
                        key={index}
                        title={item.title}
                        Description={item.Description}
                        image={item.image}
                        bgColor={item.bgColor}
                        color={item.color}
                    />
                ))}
            </div>
        </div>
    );
}

export default Overview;
