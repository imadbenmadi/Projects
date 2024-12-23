import React from "react";
import logo_img from "../../../../../public/logo.png";

const MessageCard = ({
    msg,
    userId,
    isNewMessage,
    setIsNewMessage,
    index,
    totalMessages,
}) => {
    const breakTheWordStyle = {
        wordBreak: "break-word",
        overflowWrap: "break-word",
    };

    return (
        <div>
            <div>
                {msg.senderType === "admin" && (
                    <div
                        key={index}
                        className={`rounded-lg transition-transform duration-300 flex text-sm  font-semibold gap-1 justify-start my-2`}
                    >
                        <img
                            loading="lazy"
                            src={logo_img}
                            alt=""
                            className=" w-[70px] h-fit  rounded-full shrink-0 "
                        />

                        <div className={`rounded-lg bg-perpol_v text-white`}>
                            <p
                                className="break-words p-2 text-sm leading-6"
                                style={breakTheWordStyle}
                            >
                                {msg.message}
                            </p>
                        </div>
                    </div>
                )}
            </div>
            <div
                key={index}
                className={`rounded-lg transition-transform duration-300 flex text-sm  font-semibold ${
                    msg.senderType === "doctor"
                        ? "justify-end"
                        : "justify-start"
                } ${
                    isNewMessage && index === totalMessages - 1
                        ? "transform translate-y-[-10px] opacity-0"
                        : ""
                }`}
                onAnimationEnd={() => {
                    if (index === totalMessages - 1) {
                        setIsNewMessage(false);
                    }
                }}
            >
                <div
                    className={`rounded-lg ${
                        msg.senderType === "doctor"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-black_text"
                    }`}
                >
                    <p
                        className="break-words p-2 text-sm leading-6"
                        style={breakTheWordStyle}
                    >
                        {msg.message}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MessageCard;
