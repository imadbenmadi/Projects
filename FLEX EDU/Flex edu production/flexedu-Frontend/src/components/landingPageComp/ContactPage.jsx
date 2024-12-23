import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

import { FaEnvelope, FaPhone, FaPaperPlane } from "react-icons/fa";
import config from "../../config";

const ContactSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    message: Yup.string()
        .required("Message is required")
        .min(10, "Message is too short"),
});

const ContactPage = () => {
    const [isMessageSent, setIsMessageSent] = useState(false);
    const EMAIL = config.EMAIL;
    const TELEPHONE = config.TELEPHONE;
    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        fetch("https://api.flexedu-dz.com/Contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: values.email,
                message: values.message,
                Name: values.name,
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                setSubmitting(false);
                resetForm();
                setIsMessageSent(true);
            })
            .catch((error) => {
                setSubmitting(false);
                Swal.fire({
                    icon: "error",
                    text: "Something went wrong",
                });
            });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-400 to-green-800 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="md:flex">
                    <div className="md:w-1/2 bg-gray-900 text-white p-8 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-blue-500 opacity-10 transform -skew-x-12"></div>
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold mb-6">
                                Get in Touch
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4 group">
                                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                                        <FaEnvelope className="text-white" />
                                    </div>
                                    <span className="group-hover:text-blue-300 transition-colors duration-300">
                                        {EMAIL}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-4 group">
                                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                                        <FaPhone className="text-white" />
                                    </div>
                                    <span className="group-hover:text-green-300 transition-colors duration-300">
                                        {TELEPHONE}
                                    </span>
                                </div>
                                {/* <div className="flex items-center space-x-4 group">
                                    <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                                        <FaMapMarkerAlt className="text-white" />
                                    </div>
                                    <span className="group-hover:text-yellow-300 transition-colors duration-300">
                                        123 University Ave, Cityville
                                    </span>
                                </div> */}
                            </div>
                        </div>
                        <div className="mt-12 relative z-10">
                            <div className="w-32 h-32 bg-purple-500 rounded-full absolute -bottom-16 -left-16 opacity-50"></div>
                            <div className="w-24 h-24 bg-yellow-500 rounded-full absolute -top-12 -right-12 opacity-50"></div>
                        </div>
                    </div>
                    <div className="md:w-1/2 p-8">
                        <h3 className="text-2xl font-bold mb-6 text-gray-800">
                            Send us a message
                        </h3>
                        {isMessageSent ? (
                            <div className="text-center py-16">
                                <FaPaperPlane className="text-6xl text-green-500 mx-auto mb-4" />
                                <h4 className="text-2xl font-bold text-gray-800 mb-2">
                                    Message Sent!
                                </h4>
                                <p className="text-gray-600">
                                    We'll get back to you soon.
                                </p>
                                <button
                                    onClick={() => setIsMessageSent(false)}
                                    className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300"
                                >
                                    Send Another Message
                                </button>
                            </div>
                        ) : (
                            <Formik
                                initialValues={{
                                    name: "",
                                    email: "",
                                    message: "",
                                }}
                                validationSchema={ContactSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ isSubmitting }) => (
                                    <Form className="space-y-6">
                                        <div>
                                            <Field
                                                name="name"
                                                type="text"
                                                placeholder="Your Name"
                                                className="w-full px-4 py-2 rounded-full border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-300"
                                            />
                                            <ErrorMessage
                                                name="name"
                                                component="div"
                                                className="mt-1 text-red-600 text-sm"
                                            />
                                        </div>
                                        <div>
                                            <Field
                                                name="email"
                                                type="email"
                                                placeholder="Your Email"
                                                className="w-full px-4 py-2 rounded-full border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-300"
                                            />
                                            <ErrorMessage
                                                name="email"
                                                component="div"
                                                className="mt-1 text-red-600 text-sm"
                                            />
                                        </div>
                                        <div>
                                            <Field
                                                name="message"
                                                as="textarea"
                                                rows="4"
                                                placeholder="Your Message"
                                                className="w-full px-4 py-2 rounded-2xl border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-300"
                                            />
                                            <ErrorMessage
                                                name="message"
                                                component="div"
                                                className="mt-1 text-red-600 text-sm"
                                            />
                                        </div>
                                        <div>
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full flex justify-center items-center space-x-2 py-2 px-4 border border-transparent rounded-full text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
                                            >
                                                {isSubmitting ? (
                                                    <span>Sending...</span>
                                                ) : (
                                                    <>
                                                        <FaPaperPlane />
                                                        <span>
                                                            Send Message
                                                        </span>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
