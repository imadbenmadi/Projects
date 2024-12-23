import { useState, useRef, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { motion } from "framer-motion";
import {
    FaStar,
    FaStarHalf,
    FaUsers,
    FaVideo,
    FaMoneyBillWave,
    FaRegImage,
} from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import dayjs from "dayjs";
import config from "../../../../config";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../../../../AppContext";
import Swal from "sweetalert2";
import Axios from "axios";

const Payment_not_pendingview = ({ course, Purcase, setPayment_Status }) => {
    const PAYMENT_EMAIL = config.PAYMENT_EMAIL;
    const PAYMENT_CCP = config.PAYMENT_CCP;
    const PAYMENT_CCP_NAME = config.PAYMENT_CCP_NAME;
    const PAYMENT_EMAIL_TITLE = config.PAYMENT_EMAIL_TITLE;
    const PAYMENT_CCP_CLE = config.PAYMENT_CCP_CLE;
    const PYMENT_RIP = config.PYMENT_RIP;
    const fileInputRef = useRef(null);
    const { user } = useAppContext();
    const Navigate = useNavigate();
    const location = useLocation();
    const CourseId = location.pathname.split("/")[3];
    const [imageChanged, setimageChanged] = useState(false);
    const [image_state, setimage_state] = useState(null);
    const queryParams = new URLSearchParams(location.search);
    const rejected = queryParams.get("rejected");

    useEffect(() => {
        if (image_state) setimageChanged(true);
        else if (!image_state) setimageChanged(false);
        else setimageChanged(false);
    }, [image_state]);

    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => {
            if (index < Math.floor(rating)) {
                return <FaStar key={index} className="text-yellow-400" />;
            } else if (index < Math.ceil(rating)) {
                return <FaStarHalf key={index} className="text-yellow-400" />;
            } else {
                return <FaStar key={index} className="text-gray-300" />;
            }
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden"
            >
                <div className="p-8 border-b">
                    <div className="flex flex-col md:flex-row md:items-center">
                        <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                            {course?.Image ? (
                                <img
                                    className="w-32 h-32 object-cover rounded-lg"
                                    src={`https://api.flexedu-dz.com/${course?.Image}`}
                                    alt={course?.Title}
                                />
                            ) : (
                                <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                                    <FaRegImage className="text-4xl text-gray-400" />
                                </div>
                            )}
                        </div>
                        <div className="flex-grow">
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                {course?.Title}
                            </h1>
                            <p className="text-sm text-gray-600 mb-2">
                                {course?.Category}
                            </p>
                            <div className="flex items-center mb-2">
                                <div className="flex mr-2">
                                    {renderStars(course?.Rate || 0)}
                                </div>
                                <span className="text-sm text-gray-600">
                                    ({course?.Rate || 0})
                                </span>
                            </div>
                            <div className="flex flex-wrap items-center text-sm text-gray-600 gap-4">
                                <div className="flex items-center">
                                    <FaUsers className="mr-1" />
                                    {course?.Students_count || 0} Enrollments
                                </div>
                                <div className="flex items-center">
                                    <FaVideo className="mr-1" />
                                    {course?.Course_Videos?.length || 0} Videos
                                </div>
                                <div className="flex items-center">
                                    <FaMoneyBillWave className="mr-1" />
                                    {course?.Price} DA
                                </div>
                                <div>
                                    Created:{" "}
                                    {dayjs(course?.createdAt).format(
                                        "DD MMMM YYYY"
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {rejected && (
                    <div className="text-center border text-red-500 border-red-200 mb-6 m-auto rounded shadow-sm p-4 w-fit">
                        <div className="flex items-center justify-center gap-2 text-red-500 text-lg font-semibold">
                            <IoIosWarning className=" text-2xl" />
                            <div>Payment Rejected</div>
                        </div>
                        <div className="text-sm font-semibold">
                            Please resend the Payment screenshot or contact
                            support.
                        </div>
                    </div>
                )}

                <div className="p-8 bg-gray-50">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        Payment Process
                    </h2>

                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-700 mb-4">
                            Step 1: Send Payment
                        </h3>
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <p className="mb-4">
                                Please send the screenshot of the payment via
                                email:
                            </p>
                            <ul className="space-y-2 text-gray-600">
                                {PAYMENT_EMAIL && (
                                    <li>
                                        <strong>Email:</strong> {PAYMENT_EMAIL}
                                    </li>
                                )}
                                {PAYMENT_CCP && (
                                    <li>
                                        <strong>CCP:</strong> {PAYMENT_CCP}
                                    </li>
                                )}
                                {PAYMENT_CCP_CLE && (
                                    <li>
                                        <strong>Clé:</strong> {PAYMENT_CCP_CLE}
                                    </li>
                                )}
                                {PAYMENT_CCP_NAME && (
                                    <li>
                                        <strong>CCP Name:</strong>{" "}
                                        {PAYMENT_CCP_NAME}
                                    </li>
                                )}
                                {PAYMENT_EMAIL_TITLE && (
                                    <li>
                                        <strong>Email Title:</strong>{" "}
                                        {PAYMENT_EMAIL_TITLE}
                                    </li>
                                )}
                                {PYMENT_RIP && (
                                    <li>
                                        <strong>RIP:</strong> {PYMENT_RIP}
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-4">
                            Step 2: Confirm Payment
                        </h3>
                        <div>
                            <Formik
                                initialValues={{
                                    imageLink: "",
                                    studentId: user?.id,
                                    courseId: CourseId,
                                    CCP_number: "",
                                }}
                                validate={(values) => {
                                    const errors = {};
                                    const ccpNumber = values.CCP_number;

                                    if (!ccpNumber) {
                                        errors.CCP_number = "Required";
                                    } else if (
                                        !/^\d+\/\d{2}$/.test(ccpNumber)
                                    ) {
                                        errors.CCP_number =
                                            "CCP number must be in 'xxxxx/xx' format";
                                    }

                                    return errors;
                                }}
                                onSubmit={async (values, { setSubmitting }) => {
                                    if (!values.studentId || !values.courseId) {
                                        setSubmitting(false);
                                        Swal.fire(
                                            "Error",
                                            "Unauthorized: missing userId",
                                            "error"
                                        );
                                    } else {
                                        try {
                                            if (!image_state) {
                                                setSubmitting(false);
                                                Swal.fire(
                                                    "Error",
                                                    "Please select an image",
                                                    "error"
                                                );
                                            } else {
                                                let formData = new FormData();
                                                formData.append(
                                                    "image",
                                                    image_state
                                                );
                                                formData.append(
                                                    "CCP_number",
                                                    values.CCP_number
                                                );
                                                let Image_Response =
                                                    await Axios.post(
                                                        `https://api.flexedu-dz.com/upload/Payment/Courses/${course?.id}/`,
                                                        formData,
                                                        {
                                                            withCredentials: true,
                                                            validateStatus:
                                                                () => true,
                                                        }
                                                    );

                                                if (
                                                    Image_Response.status ===
                                                    401
                                                ) {
                                                    window.location.href =
                                                        "/Login";
                                                }

                                                if (
                                                    Image_Response.status ===
                                                    200
                                                ) {
                                                    Swal.fire(
                                                        "Success",
                                                        "Payment Screen Shot uploaded successfully, our team is validating your payment. You will get a notification when it's validated.",
                                                        "success"
                                                    );
                                                    setSubmitting(false);
                                                    setPayment_Status(true);
                                                    Navigate(
                                                        `/Student/Courses/${course?.id}`
                                                    );
                                                } else if (
                                                    Image_Response.status ===
                                                    400
                                                ) {
                                                    setSubmitting(false);
                                                    Swal.fire(
                                                        "Error",
                                                        `${Image_Response.data.message}`,
                                                        "error"
                                                    );
                                                } else if (
                                                    Image_Response.status ===
                                                    409
                                                ) {
                                                    setSubmitting(false);
                                                    Swal.fire(
                                                        "Error",
                                                        `${Image_Response.data.message}`,
                                                        "error"
                                                    );
                                                } else if (
                                                    Image_Response.status ===
                                                    500
                                                ) {
                                                    setSubmitting(false);
                                                    Swal.fire(
                                                        "Error",
                                                        "Server error",
                                                        "error"
                                                    );
                                                }
                                            }
                                        } catch (error) {
                                            setSubmitting(false);
                                            Swal.fire(
                                                "Error",
                                                error.message,
                                                "error"
                                            );
                                        }
                                    }
                                }}
                            >
                                {({ isSubmitting, setFieldValue }) => (
                                    <Form>
                                        <div className="mb-4">
                                            <label
                                                htmlFor="CCP_number"
                                                className="block text-gray-700 text-sm font-bold mb-2"
                                            >
                                                CCP Number
                                            </label>
                                            <Field
                                                type="text"
                                                name="CCP_number"
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                            <ErrorMessage
                                                name="CCP_number"
                                                component="div"
                                                className="text-red-500 text-xs mt-2"
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label
                                                className="block text-gray-700 text-sm font-bold mb-2"
                                                htmlFor="image"
                                            >
                                                Payment Screenshot
                                            </label>
                                            <input
                                                type="file"
                                                id="image"
                                                name="image"
                                                accept="image/*"
                                                onChange={(event) => {
                                                    const file =
                                                        event.target.files[0];
                                                    setimage_state(file);
                                                    setFieldValue(
                                                        "image",
                                                        file
                                                    );
                                                }}
                                                ref={fileInputRef}
                                                className="border border-gray-300 p-2 rounded-md"
                                            />
                                            {image_state && (
                                                <div className="mt-4">
                                                    <img
                                                        src={URL.createObjectURL(
                                                            image_state
                                                        )}
                                                        alt="Selected screenshot"
                                                        className="w-32 h-32 object-cover rounded-md shadow-md"
                                                    />
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <button
                                                type="submit"
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting
                                                    ? "Submitting..."
                                                    : "Submit"}
                                            </button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Payment_not_pendingview;
