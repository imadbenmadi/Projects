import { Field, Form, Formik } from "formik";
import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
function Feedback() {
    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        section: Yup.string().required("Feedback is required"),
    });

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.5 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <motion.div
            ref={ref}
            transition={{ duration: 5 }}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className=" w-full  md:px-16 p-5   duration-500"
        >
            <Formik
                initialValues={{
                    section: "Other",
                    email: "",
                    suggestion: "",
                }}
                validationSchema={validationSchema} // Make sure you define this
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                    console.log("hello");
                    try {
                        setSubmitting(true);
                        let response = await axios.post(
                            "https://backend.cntic-club.com/api/posts/SendMessage/",
                            values, // Make sure field names match your backend
                            {
                                withCredentials: true,
                                validateStatus: () => true,
                            }
                        );
                        console.log(response);
                        if (response.status == 201) {
                            resetForm();
                            Swal.fire(
                                "Done!",
                                "Blog has been created Successfully",
                                "success"
                            );
                        } else if (response.status == 400) {
                            Swal.fire(
                                "Error!",
                                `Internal server error : ${response.data}`,
                                "error"
                            );
                        } else {
                            Swal.fire(
                                "Error!",
                                `Something Went Wrong. Please try again , ${response.data}`,
                                "error"
                            );
                        }
                    } catch (error) {
                        Swal.fire("Error!", "Failed to add Blog.", "error");
                    } finally {
                        setSubmitting(false);
                    }
                }}
            >
                {({ isSubmitting, errors, touched }) => (
                    <Form>
                        <motion.div
                            className="flex justify-center items-center mb-3"
                            variants={itemVariants}
                        >
                            <label
                                className=" w-[20%] font-semibold ml-6 md:text-xl "
                                htmlFor="section"
                            >
                                عنوان الاقتراح
                            </label>

                            <Field
                                as="select"
                                name="section"
                                id="section"
                                className={`block w-[80%] float-left  p-4 focus:outline-none duration-300  px-5 text-gray-900 border
                                 border-gray-300 rounded-xl mt-3 bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 `}
                            >
                                <option
                                    className=" float-left"
                                    value="probability statistics"
                                >
                                    probability statistics
                                </option>
                                <option value="Systéme Machine">
                                    Systéme Machine
                                </option>
                                <option value="Programation Linéer">
                                    Programation Linéer
                                </option>
                                <option className=" float-left" value="Other">
                                    Other
                                </option>
                            </Field>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <label
                                htmlFor="email"
                                className=" font-semibold ml-6 md:text-xl "
                            >
                                الايميل
                            </label>
                            <Field
                                id="email"
                                name="email"
                                type="email"
                                className={`block w-full p-4 focus:outline-none  text-gray-900 border border-gray-300 rounded-xl mb-6 mt-3 bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 ${
                                    errors.email && touched.email
                                        ? "border-red-500"
                                        : ""
                                }`}
                                placeholder="jane@gmail.com"
                            />
                            {errors.email && touched.email && (
                                <div className="text-red-500 mb-3 pl-4">
                                    {errors.email}
                                </div>
                            )}
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <label
                                className=" font-semibold ml-6 md:text-xl "
                                htmlFor="suggestion"
                            >
                                الاقتراح
                            </label>
                            <Field
                                as="textarea"
                                rows={5}
                                id="suggestion"
                                name="suggestion"
                                className={`block w-full focus:outline-none  p-4 text-gray-900 border
                                 border-gray-300 rounded-xl mt-3 bg-gray-50 text-base focus:ring-blue-500
                                  focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 ${
                                      errors.section && touched.suggestion
                                          ? "border-red-500"
                                          : ""
                                  }`}
                                placeholder="اترك اقتراحك هنا"
                            />
                            {errors.section && touched.suggestion && (
                                <div className="text-red-500 mb-3 pl-4">
                                    {errors.section}
                                </div>
                            )}
                        </motion.div>
                        <motion.div
                            variants={itemVariants}
                            className="w-full my-5  flex justify-center "
                        >
                            <button
                                type="submit"
                                className={` ${
                                    isSubmitting
                                        ? "bg-blue-200 text-white text-lg cursor-not-allowed"
                                        : " bg-blue-500 text-white text-lg"
                                } w-fit m-auto px-4 py-2 rounded font-semibold `}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <div>loading</div>
                                ) : (
                                    " ارسل الاقتراح"
                                )}
                            </button>
                        </motion.div>
                    </Form>
                )}
            </Formik>
        </motion.div>
    );
}

export default Feedback;
