import React from "react";
import Rating from "react-rating";
import start from "../../../../public/Home/Client said/start.png";
import user from "../../../../public/Home/Client said/user.png";
import { IoIosStar } from "react-icons/io";

function ClientsSaidCard({ image, user, text, Rate }) {
    return (
        <div className=" text-black slide w-[100%] min-h-[250px] my-5 px-5 py-4 bg-white rounded-3xl shadow flex-col justify-start items-start gap-5 inline-flex">
            <div className="flex justify-start items-center gap-4">
                <div className="w-20 h-20 rounded-full">
                    <img
                        src={"http://localhost:3000" + image}
                        alt=""
                        className="w-full h-full rounded-full"
                    />
                </div>
                <div className="flexjustify-start items-center gap-2.5">
                    <div> {user}</div>
                    {/* <Rating
                        className="w-full"
                        fullSymbol={
                            <img src={start} className="icon w-7 h-fit" />
                        }
                        initialRating={3}
                        stop={3}
                        // direction="rtl"
                        readonly
                    />{" "} */}
                    <div className=" flex gap-1">
                        <IoIosStar
                            className={` cursor-pointer ${
                                Rate >= 1 ? "text-yallow_v" : "text-white"
                            }`}
                        />
                        <IoIosStar
                            className={`  cursor-pointer ${
                                Rate >= 2 ? "text-yallow_v" : "text-white"
                            }`}
                        />
                        <IoIosStar
                            className={`  cursor-pointer ${
                                Rate >= 3 ? "text-yallow_v" : "text-white"
                            }`}
                        />
                        <IoIosStar
                            className={`  cursor-pointer ${
                                Rate >= 4 ? "text-yallow_v" : "text-white"
                            }`}
                        />
                        <IoIosStar
                            className={`  cursor-pointer ${
                                Rate == 5 ? "text-yallow_v" : "text-white"
                            }`}
                        />
                    </div>
                </div>
            </div>
            <div className="text-sm">{text}</div>
        </div>
    );
}

export default ClientsSaidCard;
