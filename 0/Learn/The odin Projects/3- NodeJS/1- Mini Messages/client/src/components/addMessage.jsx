import { Form, redirect, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
export default function AddMessage() {
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async function (e) {
        // e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/messages", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user: name, text: message }),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            navigate("/");
        } catch (error) {
            console.error("Error adding message:", error);
        }
    };
    return (
        <>
            <Form
                onSubmit={handleSubmit}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: "30px",
                    width: "80%",
                    margin: "auto",
                }}
            >
                <input
                    type="text"
                    id="Name"
                    placeholder="Your Name"
                    name="Name"
                    onChange={(e) => setName(e.target.value)}
                />
                <textarea
                    name="message"
                    id="message"
                    cols="30"
                    rows="10"
                    placeholder="Your Message"
                    onChange={(e) => setMessage(e.target.value)}
                ></textarea>
                <button
                    type="submit"
                    style={{
                        display: "block",
                        width: "fit-content",
                        margin: "auto",
                        border: "1px solid black",
                        padding: "10px 15px",
                        borderRadius: "5px",
                        background: "#00ff00",
                    }}
                >
                    Add
                </button>
            </Form>
            <Link
                to="/messages"
                style={{
                    textAlign: "center",
                    display: "block",
                    marginTop: "30px",
                }}
            >
                Back to Messages
            </Link>
        </>
    );
}
