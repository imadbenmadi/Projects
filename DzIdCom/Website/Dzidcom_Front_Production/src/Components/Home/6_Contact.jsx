import React, { useRef } from "react";
import Contact_image from "../../../public/Home/Contact/contact_image.png";
import { useState } from "react";
import Swal from "sweetalert2";
import { useInView, motion } from "framer-motion";
function Contact() {
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const handle_input_change = (e) => {
        const { name, value } = e.target;
        if (name === "firstName") {
            setfirstName(value);
        } else if (name === "lastName") {
            setlastName(value);
        } else if (name === "email") {
            setEmail(value);
        } else if (name === "message") {
            setMessage(value);
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!firstName || !lastName || !email || !message) {
            Swal.fire({
                icon: "warning",
                // title: "Oops...",
                text: "Please fill all the message fields",
            });
            return;
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
            Swal.fire({
                icon: "warning",
                // title: "Oops...",
                text: "Please enter a valid email address",
            });
        } else {
            setLoading(true);
            fetch("https://api.dzidcom.com/Contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    message: message,
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    setLoading(false);
                    Swal.fire({
                        icon: "success",
                        // title: "Oops...",
                        text: "Message sent successfully",
                    });

                    setfirstName("");
                    setlastName("");
                    setEmail("");
                    setMessage("");
                })
                .catch((error) => {
                    setLoading(false);
                    Swal.fire({
                        icon: "error",
                        // title: "Oops...",
                        text: "Something went wrong",
                    });
                });
        }
    };
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const itemVariants = {
        hidden: { opacity: 0, y: -50, scale: 0.8 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1 } },
    };

    return (
        <motion.div
            ref={ref}
            variants={itemVariants}
            initial="hidden"
            animate={isInView ? "visible" : ""}
            className=" flex  justify-center p-2  lg-h-screen minContact_us  items-center my-20 lg:min-h-fit  gap-6 lg:gap-24"
        >
            <div className=" w-[300px] md:w-[400px] dark:text-white text-black_text">
                <div className=" text-base">Connect</div>
                <div className=" text-3xl py-2">Contact Support</div>
                <div className=" text-sm">
                    Have a question? need assistance? get in touch with our
                    support team
                </div>
                <div className=" w-full flex flex-col gap-4 items-center justify-center pt-6">
                    <div>
                        <div className=" flex justify-center items-center gap-3 max-w-full text-sm ">
                            <input
                                placeholder="First Name"
                                type="text"
                                value={firstName}
                                name="firstName"
                                onChange={(e) => handle_input_change(e)}
                                className=" bg-zinc-100 py-2 px-4 rounded-md  w-[150px] md:w-[195px]"
                            />
                            <input
                                placeholder="Last Name"
                                type="text"
                                value={lastName}
                                name="lastName"
                                onChange={(e) => handle_input_change(e)}
                                className=" bg-zinc-100 py-2 px-4 rounded-md  w-[150px] md:w-[195px]"
                            />
                        </div>
                    </div>

                    <input
                        type="text"
                        name="email"
                        value={email}
                        placeholder="Email"
                        onChange={(e) => handle_input_change(e)}
                        className=" bg-zinc-100 py-2 px-4 rounded-md w-full"
                    />

                    <div className=" w-full">
                        <textarea
                            placeholder="Message"
                            name="message"
                            value={message}
                            id=""
                            rows={4}
                            onChange={(e) => handle_input_change(e)}
                            className=" bg-zinc-100 py-2 px-4 rounded-md w-full"
                        ></textarea>
                    </div>
                </div>
                {loading ? (
                    <div className="w-full flex justify-center items-center pt-8">
                        <span className="small-loader  w-full m-auto "></span>
                    </div>
                ) : (
                    <div className=" w-full flex justify-center items-center pt-3">
                        <button
                            className=" bg-perpol_v text-white py-2 px-4 rounded-md"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                )}
            </div>
            <div className=" hidden md:block">
                <img
                    src={Contact_image}
                    alt=""
                    className=" w-[300px] h-[300px] "
                />
            </div>
        </motion.div>
    );
}

export default Contact;
