import React, { useRef } from "react";
import Contact_image from "../../../public/Home/contact.png";
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
                text: "الرجاء ملء جميع الحقول",
            });
            return;
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
            Swal.fire({
                icon: "warning",
                // title: "Oops...",
                text: "الرجاء إدخال بريد إلكتروني صالح",
            });
        } else {
            setLoading(true);
            fetch("http://localhost:3000/Contact", {
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
                        text: "تم إرسال الرسالة بنجاح",
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
                        text: "حدث خطأ ما",
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
            id="Contact"
        >
            <div className=" w-[300px] md:w-[400px]  text-black">
                <div className=" text-xl md:text-3xl py-2 font-semibold">
                    نحب أن نسمع منك، تواصل معنا
                </div>
                <div className=" text-xs">أرسل لنا رسالة</div>
                <div className=" w-full flex flex-col gap-4 items-center justify-center pt-6 text-right">
                    <div>
                        <div className=" flex justify-center items-center gap-3 max-w-full text-sm ">
                            <input
                                placeholder="الاسم"
                                type="text"
                                value={firstName}
                                name="firstName"
                                onChange={(e) => handle_input_change(e)}
                                className=" bg-zinc-100 py-2 px-4 rounded-md  w-[150px] md:w-[195px] text-right"
                            />
                            <input
                                placeholder="اللقب"
                                type="text"
                                value={lastName}
                                name="lastName"
                                onChange={(e) => handle_input_change(e)}
                                className=" bg-zinc-100 py-2 px-4 rounded-md  w-[150px] md:w-[195px] text-right"
                            />
                        </div>
                    </div>

                    <input
                        type="text"
                        name="email"
                        value={email}
                        placeholder="الايمايل"
                        onChange={(e) => handle_input_change(e)}
                        className=" bg-zinc-100 py-2 px-4 rounded-md w-full text-right"
                    />

                    <div className=" w-full">
                        <textarea
                            placeholder="الرسالة"
                            name="message"
                            value={message}
                            id=""
                            rows={4}
                            onChange={(e) => handle_input_change(e)}
                            className=" bg-zinc-100 py-2 px-4 rounded-md w-full text-right"
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
                            className=" bg-blue_v w-full font-bold text-white py-2 px-4 rounded-md"
                            onClick={handleSubmit}
                        >
                            ارسال
                        </button>
                    </div>
                )}
            </div>
            <div className=" hidden md:block">
                <img src={Contact_image} alt="" className=" w-[300px] " />
            </div>
        </motion.div>
    );
}

export default Contact;
