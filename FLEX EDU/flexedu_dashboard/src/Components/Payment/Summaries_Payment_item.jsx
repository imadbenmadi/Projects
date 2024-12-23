import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";

function Payment() {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [summary, setSummary] = useState(null);
    const [acceptLoading, setAcceptLoading] = useState(false);
    const [rejectLoading, setRejectLoading] = useState(false);

    const summaryId = location.pathname.split("/")[2];

    useEffect(() => {
        setLoading(true);
        const fetchSummaryDetails = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/Admin/Payment/Summaries/${summaryId}`,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );

                if (response.status === 200) {
                    setSummary(response.data.summary_Purcase_Requests);
                } else if (response.status === 401) {
                    Swal.fire("Error", "You should login again", "error");
                    navigate("/Login");
                } else {
                    setError(response.data);
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchSummaryDetails();
    }, [summaryId, navigate]);

    const handleAccept = async () => {
        setAcceptLoading(true);
        try {
            const response = await axios.post(
                `http://localhost:3000/Admin/Payment/Summaries/${summaryId}/Accept`,
                {
                    studentId: summary.StudentId,
                },
                {
                    withCredentials: true,
                    validateStatus: () => true,
                }
            );

            if (response.status === 200) {
                Swal.fire(
                    "Success",
                    "Payment Accepted Successfully",
                    "success"
                );
                navigate("/Summaries_Payment");
            } else {
                Swal.fire(
                    "Error!",
                    `Something went wrong, please try again later. ${response.data.message}`,
                    "error"
                );
            }
        } catch (error) {
            Swal.fire(
                "Error!",
                `Something went wrong, please try again later.`,
                "error"
            );
        } finally {
            setAcceptLoading(false);
        }
    };

    const handleReject = async () => {
        setRejectLoading(true);
        try {
            const response = await axios.post(
                `http://localhost:3000/Admin/Payment/Summaries/${summaryId}/Reject`,
                {
                    studentId: summary.StudentId,
                },
                {
                    withCredentials: true,
                    validateStatus: () => true,
                }
            );

            if (response.status === 200) {
                Swal.fire(
                    "Success",
                    "Payment Rejected Successfully",
                    "success"
                );
                navigate("/Summaries_Payment");
            } else {
                Swal.fire(
                    "Error!",
                    `Something went wrong, please try again later. ${response.data.message}`,
                    "error"
                );
            }
        } catch (error) {
            Swal.fire(
                "Error!",
                `Something went wrong, please try again later.`,
                "error"
            );
        } finally {
            setRejectLoading(false);
        }
    };

    if (loading) {
        return (
            <div className=" w-screen h-[80vh] flex flex-col items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    } else if (error) {
        return (
            <div className="w-screen h-[calc(100vh-60px)] flex items-center justify-center">
                <div className="text-red-600 font-semibold">
                    {error.message}
                </div>
            </div>
        );
    }
    return (
        <div className="py-6 px-4">
            <div className="text-xl font-semibold text-green_b pb-6">
                Summary Payment Details
            </div>
            <div className="text-lg pb-2 font-semibold md:mx-20">
                Payment Information
            </div>
            <div className="text-gray_v flex justify-center md:justify-start flex-col md:flex-row items-start gap-3 md:gap-12 md:mx-24">
                <div>
                    <div className="flex flex-col gap-4">
                        <div>
                            <strong>Summary Title:</strong>{" "}
                            {summary?.Summary?.Title || "Not provided"}
                        </div>
                        <div>
                            <strong>Student Email:</strong>{" "}
                            {summary?.Student?.email || "Not provided"}
                        </div>
                        <div>
                            <strong>Summary Price:</strong> $
                            {summary?.Price + " DA" || "0"}
                        </div>
                        <div>
                            <strong>Status:</strong>{" "}
                            {summary?.status || "Unknown"}
                        </div>
                        <div>
                            <strong>Student CCP Number:</strong>{" "}
                            {summary?.CCP_number || "Not provided"}
                        </div>
                        <div>
                            <strong>Summary Description:</strong>{" "}
                            {summary?.Summary?.Description || "Not provided"}
                        </div>
                    </div>
                </div>
            </div>

            {summary?.screenShot && (
                <div className="pt-8">
                    <div className="flex justify-center w-full">
                        <a
                            href={`http://localhost:3000${summary.screenShot}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src={`http://localhost:3000${summary.screenShot}`}
                                alt="Payment screenshot"
                                className="w-[300px] h-[300px] object-cover rounded-lg"
                            />
                        </a>
                    </div>
                    <div className="py-12 flex justify-center items-center gap-12">
                        {acceptLoading ? (
                            <div className="small-loader mx-12"></div>
                        ) : (
                            <div
                                className="bg-green_v cursor-pointer py-2 px-4 rounded-xl text-white font-semibold"
                                onClick={handleAccept}
                            >
                                Accept Payment
                            </div>
                        )}
                        {rejectLoading ? (
                            <div className="small-loader mx-12"></div>
                        ) : (
                            <div
                                className="bg-red-500 cursor-pointer py-2 px-4 rounded-xl text-white font-semibold"
                                onClick={handleReject}
                            >
                                Reject Payment
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Payment;
