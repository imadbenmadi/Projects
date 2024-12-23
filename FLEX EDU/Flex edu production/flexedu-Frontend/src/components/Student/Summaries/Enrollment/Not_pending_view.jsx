import Axios from "axios";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { FaRegImage, FaStar, FaStarHalf } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAppContext } from "../../../../AppContext";
import config from "../../../../config";
dayjs.extend(customParseFormat);

function Payment_not_pendingview({ summary, setPayment_Status }) {
    const { user } = useAppContext();
    const Navigate = useNavigate();
    const location = useLocation();
    const SummaryId = location.pathname.split("/")[3];
    const PAYMENT_EMAIL = config.PAYMENT_EMAIL;
    const PAYMENT_CCP = config.PAYMENT_CCP;
    const PAYMENT_CCP_NAME = config.PAYMENT_CCP_NAME;
    const PAYMENT_EMAIL_TITLE = config.PAYMENT_EMAIL_TITLE;
    const PAYMENT_CCP_CLE = config.PAYMENT_CCP_CLE;
    const PPYMENT_RIP = config.PYMENT_RIP;
    const fileInputRef = useRef(null);
    const [imageChanged, setimageChanged] = useState(false);
    const [image_state, setimage_state] = useState(null);
    const queryParams = new URLSearchParams(location.search);
    const rejected = queryParams.get("rejected");

    useEffect(() => {
        if (image_state) setimageChanged(true);
        else if (!image_state) setimageChanged(false);
        else setimageChanged(false);
    }, [image_state]);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg shadow-lg">
            <div className="mb-8">
                <div
                    key={summary?.id}
                    className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="w-full md:w-1/3">
                            {summary?.Image ? (
                                <img
                                    className="w-full h-48 object-cover rounded-lg shadow-md"
                                    src={`https://api.flexedu-dz.com/${summary?.Image}`}
                                    alt="summary image"
                                />
                            ) : (
                                <div className="flex items-center justify-center w-full h-48 bg-gray-100 rounded-lg">
                                    <CiImageOn className="text-4xl text-gray-400" />
                                </div>
                            )}
                        </div>
                        <div className="w-full md:w-2/3">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                {summary?.Title}
                            </h2>
                            <p className="text-sm text-gray-600 mb-2">
                                {summary?.Category}
                            </p>
                            {summary?.Price && (
                                <p className="text-lg font-semibold text-green-600 mb-2">
                                    {summary?.Price} DA
                                </p>
                            )}
                            <p className="text-sm text-gray-500 mb-4">
                                Created at:{" "}
                                {dayjs(summary?.createdAt).format(
                                    "DD MMMM YYYY"
                                )}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, index) =>
                                        index <
                                        Math.floor(summary?.Rate || 0) ? (
                                            <FaStar
                                                key={index}
                                                className="text-yellow-400"
                                            />
                                        ) : index <
                                          Math.ceil(summary?.Rate || 0) ? (
                                            <FaStarHalf
                                                key={index}
                                                className="text-yellow-400"
                                            />
                                        ) : (
                                            <FaStar
                                                key={index}
                                                className="text-gray-300"
                                            />
                                        )
                                    )}
                                </div>
                                <span>
                                    {summary?.Students_count || 0} Enrolment
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {rejected && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-md">
                    <div className="flex items-center">
                        <IoIosWarning className="text-red-500 text-2xl mr-2" />
                        <div>
                            <h3 className="text-red-800 font-semibold">
                                Payment Rejected
                            </h3>
                            <p className="text-red-700 text-sm">
                                Please resend the payment screenshot or contact
                                support.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <div className="mb-12">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Payment Instructions
                </h2>
                <div className="bg-white rounded-xl p-6 shadow-md">
                    <h3 className="text-xl font-semibold mb-4">
                        Step 1: Send Payment Screenshot
                    </h3>
                    <div className="space-y-2 text-gray-700">
                        <p>
                            Please send the screenshot of the payment via email:
                        </p>
                        {PAYMENT_EMAIL && (
                            <p className="font-medium">
                                Email: {PAYMENT_EMAIL}
                            </p>
                        )}
                        {PAYMENT_CCP && (
                            <p className="font-medium">CCP: {PAYMENT_CCP}</p>
                        )}
                        {PAYMENT_CCP_CLE && (
                            <p className="font-medium">
                                Clé: {PAYMENT_CCP_CLE}
                            </p>
                        )}
                        {PAYMENT_CCP_NAME && (
                            <p className="font-medium">
                                CCP Name: {PAYMENT_CCP_NAME}
                            </p>
                        )}
                        {PAYMENT_EMAIL_TITLE && (
                            <p className="font-medium">
                                Use this title in the email:{" "}
                                {PAYMENT_EMAIL_TITLE}
                            </p>
                        )}
                        {PPYMENT_RIP && (
                            <p className="font-medium">RIP: {PPYMENT_RIP}</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="mb-12">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Step 2: Upload Payment Proof
                </h2>
                <Formik
                    initialValues={{
                        imageLink: "",
                        studentId: user?.id,
                        summaryId: SummaryId,
                        CCP_number: "",
                    }}
                    validate={(values) => {
                        const errors = {};
                        const ccpNumber = values.CCP_number;

                        if (!ccpNumber) {
                            errors.CCP_number = "Required";
                        } else if (!/^\d+\/\d{2}$/.test(ccpNumber)) {
                            errors.CCP_number =
                                "CCP number must be in 'xxxxx/xx' format";
                        }

                        return errors;
                    }}
                    onSubmit={async (values, { setSubmitting }) => {
                        if (!values.studentId || !values.summaryId) {
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
                                    formData.append("image", image_state);
                                    formData.append(
                                        "CCP_number",
                                        values.CCP_number
                                    );
                                    let Image_Response = await Axios.post(
                                        `https://api.flexedu-dz.com/upload/Payment/Summaries/${summary.id}/`,
                                        formData,
                                        {
                                            withCredentials: true,
                                            validateStatus: () => true,
                                        }
                                    );

                                    if (Image_Response.status == 401) {
                                        window.location.href = "/Login";
                                    }

                                    if (Image_Response.status === 200) {
                                        Swal.fire(
                                            "Success",
                                            "Payment Screenshot uploaded successfully. Our team is validating your payment. You will get a notification when your payment is validated.",
                                            "success"
                                        );
                                        setSubmitting(false);
                                        setPayment_Status(true);
                                        Navigate(
                                            `/Student/Summaries/${summary.id}`
                                        );
                                    } else if (Image_Response.status === 400) {
                                        setSubmitting(false);
                                        Swal.fire(
                                            "Error",
                                            `${Image_Response.data.message}`,
                                            "error"
                                        );
                                    } else if (Image_Response.status === 409) {
                                        setSubmitting(false);
                                        Swal.fire(
                                            "Error",
                                            `${Image_Response.data.message}`,
                                            "error"
                                        );
                                    } else if (Image_Response.status === 500) {
                                        setSubmitting(false);
                                        Swal.fire(
                                            "Error",
                                            "Internal Server Error",
                                            "error"
                                        );
                                    } else {
                                        setSubmitting(false);
                                        Swal.fire(
                                            "Error",
                                            `Something Went Wrong, please try again later, ${Image_Response.data.message}`,
                                            "error"
                                        );
                                    }
                                }
                            } catch (error) {
                                setSubmitting(false);
                                Swal.fire(
                                    "Error",
                                    "Something Went Wrong, please try again later",
                                    "error"
                                );
                            }
                        }
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className="bg-white rounded-xl p-6 shadow-md">
                            <div className="mb-6">
                                <label
                                    htmlFor="CCP_number"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Your CCP or RIP Number
                                </label>
                                <Field
                                    type="text"
                                    name="CCP_number"
                                    disabled={isSubmitting}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                <ErrorMessage
                                    name="CCP_number"
                                    component="div"
                                    className="mt-1 text-sm text-red-600"
                                />
                            </div>

                            <div className="mb-6">
                                <div className="flex  justify-center items-center">
                                    <input
                                        id="image"
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(event) => {
                                            setimage_state(
                                                event.currentTarget.files[0]
                                            );
                                        }}
                                        ref={fileInputRef}
                                    />
                                    {image_state ? (
                                        <div className="relative">
                                            <img
                                                src={URL.createObjectURL(
                                                    image_state
                                                )}
                                                alt="Selected Image"
                                                className="w-64 h-40 object-cover rounded-xl"
                                            />
                                            <button
                                                type="button"
                                                className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300"
                                                onClick={() => {
                                                    setimage_state(null);
                                                    if (fileInputRef.current) {
                                                        fileInputRef.current.value =
                                                            "";
                                                    }
                                                }}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <div
                                            className="w-64 h-40 bg-gray-100 rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors duration-300"
                                            onClick={() =>
                                                document
                                                    .getElementById("image")
                                                    .click()
                                            }
                                        >
                                            <FaRegImage className="text-gray-400 text-4xl" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-center">
                                {isSubmitting ? (
                                    <div className="loader"></div>
                                ) : (
                                    <button
                                        type="submit"
                                        className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-300 font-semibold"
                                        disabled={isSubmitting}
                                    >
                                        Upload Payment Screenshot
                                    </button>
                                )}
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default Payment_not_pendingview;
