import { useState, useEffect } from "react";

import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { IoIosWarning } from "react-icons/io";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import Not_pending_view from "./Not_pending_view";
import Pending_View from "./Pending_View";
dayjs.extend(customParseFormat);
function Enrollment() {
    const navigate = useNavigate(); // Fixed typo
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [summary, setSummary] = useState(null); // Ensure summary state is initialized
    const [isEnrolled, setIsEnrolled] = useState(false); // Fixed state naming
    const [Payment_Status, setPayment_Status] = useState(false); // Fixed state naming
    const [Purcase, setPurcase] = useState(null);
    const location = useLocation();
    const SummaryId = location.pathname.split("/")[3];

    useEffect(() => {
        const fetchSummary = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `https://api.flexedu-dz.com/Students/Summaries/${SummaryId}`,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );

                if (response.status === 200) {
                    const fetchedSummary = response.data.Summary;
                    setSummary(fetchedSummary);
                    setIsEnrolled(response.data.isEnrolled);
                    setPayment_Status(response.data.paymentStatus);
                    setPurcase(response.data.purcase);
                } else if (response.status === 401) {
                    Swal.fire("Error", "You should log in again", "error");
                    navigate("/Login"); // Fixed typo
                } else {
                    setError(response.data);
                }
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchSummary();
    }, [SummaryId, navigate]); // Ensure SummaryId is a dependency
    if (loading) {
        return (
            <div className="w-screen h-[80vh] flex flex-col items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-screen h-[calc(100vh-60px)] flex items-center justify-center">
                <div className="text-red-600 font-semibold">
                    {error.message}
                </div>
            </div>
        );
    }
    if (!summary) {
        return (
            <div className="flex flex-col gap-6 items-center justify-center">
                <div className="pt-24 flex justify-center items-center gap-2 text-gray_v text-base font-semibold">
                    <IoIosWarning />
                    <h1>Summary Not Found</h1>
                </div>
            </div>
        );
    }

    if (Payment_Status == "accepted") {
        navigate(`/Student/Purchased/Summaries/${SummaryId}`);
        return null;
    }
    if (!Payment_Status || Payment_Status == "rejected")
        return (
            <Not_pending_view
                summary={summary}
                Purcase={Purcase}
                setPayment_Status={setPayment_Status}
            />
        );
    if (Payment_Status == "pending")
        return <Pending_View summary={summary} Purcase={Purcase} />;
}

export default Enrollment;
