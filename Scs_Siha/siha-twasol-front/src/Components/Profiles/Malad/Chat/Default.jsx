import chat_icon from "../../../../../public/chat.png";
const ChatList = () => {
    return (
        <div className="">
            <div className=" w-full ">
                <div
                    className="w-full shrink-0  flex-col 
                    items-center  justify-center
                     pt-12 hidden md:flex flex-grow  gap-6 "
                >
                    <div className="text-gray_v font-semibold text-center w-full ">
                        اختر محادثة للبدء
                    </div>
                    <img
                        loading="lazy"
                        src={chat_icon}
                        className="w-32"
                        alt="Chat Icon"
                    />
                </div>
            </div>
        </div>
    );
};

export default ChatList;
