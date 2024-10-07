import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function Messages() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("http://localhost:5000/messages");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setMessages(data);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        }

        fetchData();
    }, []);
    function formatDate(date) {
        const options = { year: "numeric", month: "numeric", day: "numeric" };
        return new Date(date).toLocaleDateString(undefined, options);
    }
    return (
        <>
            <Link
                style={{
                    margin: "auto",
                    display: "block",
                    textAlign: "center",
                    background: "blue",
                    width: "fit-content",
                    color: "#fff",
                    textDecoration: "none",
                    padding: "10px",
                    borderRadius: "5px",
                }}
                to="/addMessage"
            >
                Add Your Message
            </Link>
            <h1>Messages:</h1>
            {messages.length ? (
                <table className="message-table">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Text</th>
                            <th>Created Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {messages.map((message, index) => (
                            <tr key={index}>
                                <td>{message.user}</td>
                                <td>{message.text}</td>
                                <td>{formatDate(message.createdDate)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p style={{ textAlign: "center" }}>Loading...</p>
            )}
        </>
    );
}
