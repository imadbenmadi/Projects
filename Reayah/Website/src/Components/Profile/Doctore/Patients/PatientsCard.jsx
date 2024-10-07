import React from "react";
import user from "../../../../../public/user1.jpg";
function PatientsCard() {
    return (
        <div>
            <div className="w-80  h-56 relative bg-gradient-to-l  from-white to-purple-50 rounded-2xl">
                <div className="flex flex-col items-start py-6 pr-20 pl-6 font-semibold text-purple-700 whitespace-nowrap rounded-2xl max-w-[346px]">
                    <img
                        loading="lazy"
                        src={user}
                        className="rounded-full aspect-square w-[70px]"
                    />
                    <div className="mt-14 text-4xl">M.Adnane</div>
                    <div className="mt-3 text-sm">Online</div>
                </div>
            </div>
        </div>
    );
}

export default PatientsCard;
