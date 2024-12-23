import { Outlet } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../../../AppContext";
import { useNavigate } from "react-router-dom";
const ChatList = () => {
    const Navigate = useNavigate();
    const { user } = useAppContext();
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiUrl = `http://localhost:3000/Messages/client/${user?.id}/rooms`;

    useEffect(() => {
        const fetchChats = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(apiUrl, {
                    withCredentials: true,
                    validateStatus: () => true,
                });
                if (response.status === 200) {
                    setChats(response.data.rooms);
                } else if (response.status === 401) {
                    Navigate("/Login");
                } else {
                    throw new Error("Failed to fetch chats");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchChats();
    }, [apiUrl]);

    const handleChatClick = (chatId) => {
        setChats((prevChats) =>
            prevChats.map((chat) =>
                chat.id === chatId ? { ...chat, clientUnreadMessages: 0 } : chat
            )
        );
    };

    const getRelativeTime = (date) => {
        const now = new Date();
        const diff = now - date;

        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30);
        const years = Math.floor(days / 365);

        if (seconds < 60) return `${seconds} seconds ago`;
        if (minutes < 60) return `${minutes} minutes ago`;
        if (hours < 24) return `${hours} hours ago`;
        if (days < 30) return `${days} days ago`;
        if (months < 12) return `${months} months ago`;
        return `${years} years ago`;
    };

    const getLastMessageDate = (chat) => {
        try {
            if (!chat?.Messages || chat.Messages.length === 0) {
                return "";
            }
            const lastMessage = chat.Messages[chat.Messages.length - 1];
            const date = new Date(lastMessage.createdAt);
            if (isNaN(date)) {
                return "";
            }
            return getRelativeTime(date);
        } catch (error) {
            return "";
        }
    };

    if (loading) {
        return (
            <div className="w-screen h-[80vh] flex items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-screen h-[80vh] flex items-center justify-center">
                <div className="text-red-600 font-semibold">{error}</div>
            </div>
        );
    }

    const getUnreadMessagesText = (count, chat) => {
        if (count === 1) {
            return chat?.lastMessage?.message
                ? chat?.lastMessage?.message.length > 15
                    ? chat?.lastMessage?.message.slice(0, 15) + "..."
                    : chat?.lastMessage?.message
                : "1 new message";
        }
        if (count === 2) return "2 new messages";
        if (count === 3) return "3 new messages";
        if (count > 3) return "+4 new messages";
        return "";
    };

    return (
        <div className="">
            {chats.length === 0 ? (
                <p className="text-sm font-semibold  text-center w-full text-gray_v pt-12">
                    No chats available.
                </p>
            ) : (
                <>
                    <div className="hidden md:flex">
                        <div className="flex-[30%] min-h-[calc(100vh-60px)] shrink-0 border-r border-r-gray_white">
                            <ul className="space-y-4 w-full">
                                {chats.map((chat) => (
                                    <li key={chat.id} className="">
                                        <Link
                                            className="p-4 flex items-center gap-x-4 border-y border-y-gray_white"
                                            to={`/Client/rooms/${chat.id}`}
                                            onClick={() =>
                                                handleChatClick(chat.id)
                                            }
                                        >
                                            <img
                                                className="rounded-full w-12 h-12 object-cover"
                                                src={`http://localhost:3000/${chat?.Freelancer?.profile_pic_link}`}
                                                alt=""
                                            />
                                            <div className="flex-col flex">
                                                <div className="text-sm text-gray_v font-semibold break-all">
                                                    {`${
                                                        chat?.Freelancer
                                                            ?.lastName
                                                            ? chat?.Freelancer
                                                                  ?.lastName
                                                                  .length > 10
                                                                ? chat?.Freelancer?.lastName.slice(
                                                                      0,
                                                                      10
                                                                  ) + "..."
                                                                : chat
                                                                      ?.Freelancer
                                                                      ?.lastName
                                                            : "not available"
                                                    }`}
                                                </div>
                                                <div className="text-xs text-red-600 pt-1 font-semibold">
                                                    {getUnreadMessagesText(
                                                        chat.clientUnreadMessages,
                                                        chat
                                                    )}
                                                </div>
                                                {getLastMessageDate(chat) && (
                                                    <div className="text-[10px] text-gray-500">
                                                        {getLastMessageDate(
                                                            chat
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className=" flex-[70%] shrink-0 ">
                            <Outlet context={{ chats }} />
                        </div>
                    </div>
                    <div className="block md:hidden flex-[70%] shrink-0">
                        <Outlet context={{ chats }} />
                    </div>
                </>
            )}
        </div>
    );
};

export default ChatList;
