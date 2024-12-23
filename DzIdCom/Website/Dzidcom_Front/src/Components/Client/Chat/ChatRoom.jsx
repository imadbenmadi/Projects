import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../../../AppContext";
import { FaArrowUp } from "react-icons/fa";
import MessageCard from "./MessageCard";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ChatRoom = () => {
    const Navigate = useNavigate();
    const { user } = useAppContext();
    const userId = user?.id;
    const { roomId } = useParams();
    const [messages, setMessages] = useState([]);
    const [room, setRoom] = useState();
    const [newMessage, setNewMessage] = useState("");
    const [isNewMessage, setIsNewMessage] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sendLoading, setSendLoading] = useState(false);
    const chatApiUrl = `http://localhost:3000/Messages/client/${userId}/rooms/${roomId}`;
    const postApiUrl = `http://localhost:3000/Messages/client/${userId}/rooms/${roomId}`;

    const messagesEndRef = useRef(null);
    const chatContainerRef = useRef(null);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        const fetchMessages = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(chatApiUrl, {
                    withCredentials: true,
                    validateStatus: () => true,
                });
                if (response.status === 200) {
                    setMessages(response.data.messages);
                    setRoom(response.data.room);
                    scrollToBottom();
                } else if (response.status === 401) {
                    Navigate("/Login");
                } else {
                    throw new Error("Failed to fetch messages");
                }
            } catch (error) {
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, [chatApiUrl]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async () => {
        if (newMessage.trim() === "") return;
        try {
            setSendLoading(true);
            const response = await axios.post(
                postApiUrl,
                {
                    message: newMessage,
                    freelancerId: room.Freelancer.id,
                },
                {
                    withCredentials: true,
                    validateStatus: () => true,
                }
            );
            if (response.status === 401) {
                Navigate("/Login");
            } else if (response.status !== 200) {
                Swal.fire({
                    icon: "error",
                    title: "Failed to send message, please try again",
                    text: response.data.message,
                });
            } else {
                const newMsg = {
                    ...response.data,
                    senderId: user?.id,
                };
                setMessages((prevMessages) => [...prevMessages, newMsg]);
                setNewMessage("");
                setIsNewMessage(true);
                setTimeout(() => setIsNewMessage(false), 500); // Reset the new message state after the transition
            }
        } catch (error) {
        } finally {
            setSendLoading(false);
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

    return (
        <div
            className="h-[calc(100vh-60px)]  flex flex-col 
        justify-between w-full"
        >
            <div
                ref={chatContainerRef}
                className="mb-2  flex-grow overflow-y-auto
                 h-[calc(100vh-60px-70px)] px-6 py-3 flex flex-col
                  gap-y-2 custom-overflow"
            >
                {!messages || messages.length === 0 ? (
                    <div className="text-center pt-12">
                        <p className="text-lg font-semibold text-gray-600 mb-4">
                            No messages here yet.
                        </p>
                        <p className="text-sm text-gray-400">
                            Start a chatting with the Client.
                        </p>
                    </div>
                ) : (
                    messages.map((msg, index) => (
                        <MessageCard
                            setIsNewMessage={setIsNewMessage}
                            key={index}
                            msg={msg}
                            userId={userId}
                            isNewMessage={isNewMessage}
                            index={index}
                            totalMessages={messages.length}
                        />
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className="flex items-center space-x-4 w-full h-[70px] overflow-auto bg-white border-t px-6">
                <textarea
                    rows={1}
                    className="text-gray outline-0  text-start rounded-lg
                                    resize-none overflow-auto max-h-[50px]
                                     w-full border px-2 py-2 shadow-md"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => {
                        const textarea = e.target;
                        textarea.style.height = "auto"; // Reset height to calculate new height
                        textarea.style.height = textarea.scrollHeight + "px"; // Set new height based on scrollHeight
                        if (textarea.scrollHeight > textarea.clientHeight) {
                            textarea.style.overflowY = "scroll";
                        } else {
                            textarea.style.overflowY = "hidden";
                        }
                        setNewMessage(e.target.value); // Call your change handler
                    }}
                ></textarea>
                <button onClick={handleSendMessage} className="  ">
                    {sendLoading ? (
                        <span className="loader"></span>
                    ) : (
                        <div className="bg-blue-500 p-2 text-white rounded-lg">
                            <FaArrowUp className="" />
                        </div>
                    )}
                </button>
            </div>
        </div>
    );
};

export default ChatRoom;
