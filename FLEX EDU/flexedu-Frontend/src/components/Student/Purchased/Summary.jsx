import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAppContext } from "../../../AppContext";
import Summary_Review_Card from "./Review/Summary_Review_Card";
import PDFReader from "../../Teacher/Teacher_Summaries/PdfReader";
// import PDFReader from "./PdfReader";
import SummaryReview from "./Review/Summary_Review";
function SummaryComponent() {
    const { user } = useAppContext();
    const location = useLocation();
    const navigate = useNavigate();
    const summaryId = location.pathname.split("/")[4];
    const [summaryData, setSummaryData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const videoId = new URLSearchParams(location.search).get("video");
    const [activeVideoIndex, setActiveVideoIndex] = useState(0);

    useEffect(() => {
        const fetchSummaryData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/Students/${user.id}/Purchased/Summaries/${summaryId}`,
                    { withCredentials: true }
                );

                if (response.status === 200) {
                    setSummaryData(response.data);
                } else if (response.status === 401) {
                    Swal.fire("Error", "You should login again", "error");
                    navigate("/login");
                } else {
                    setError(response.data);
                }
            } catch (error) {
                setError("Failed to load summary data");
            } finally {
                setLoading(false);
            }
        };
        fetchSummaryData();
    }, [summaryId, user.id, navigate]);

    useEffect(() => {
        if (videoId && summaryData?.Summary?.Summary_Videos) {
            const videoIndex = summaryData.Summary.Summary_Videos.findIndex(
                (video) => video.id === parseInt(videoId)
            );
            if (videoIndex !== -1) {
                setActiveVideoIndex(videoIndex);
            }
        }
    }, [videoId, summaryData]);

    if (loading) {
        return (
            <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-r from-red-100 to-pink-100">
                <div className="text-red-600 font-semibold text-xl bg-white p-8 rounded-lg shadow-lg">
                    {error}
                </div>
            </div>
        );
    }

    // if (summaryData?.paymentStatus !== "accepted") {
    //   return (
    //     <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-r from-yellow-100 to-orange-100">
    //       <div className="text-orange-600 font-semibold text-xl bg-white p-8 rounded-lg shadow-lg">
    //         You are not enrolled in this summary
    //       </div>
    //     </div>
    //   );
    // }

    return (
        <div>
            <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white shadow-2xl rounded-3xl overflow-hidden mb-8 transform  transition-transform duration-300">
                        <div className="p-8">
                            <h1 className="text-4xl font-bold text-gray-800 mb-4 border-b-2 border-purple-300 pb-2">
                                {summaryData?.Summary?.Title}
                            </h1>
                            <p className="text-gray-600 mb-6 italic">
                                {summaryData?.Summary?.Description}
                            </p>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="bg-blue-100 p-4 rounded-lg">
                                    <p className="font-semibold text-blue-800">
                                        Category:{" "}
                                        {summaryData?.Summary?.Category}
                                    </p>
                                </div>
                                <div className="bg-green-100 p-4 rounded-lg">
                                    <p className="font-semibold text-green-800">
                                        Price: {summaryData?.Summary?.Price} DA
                                    </p>
                                </div>
                                <div className="bg-yellow-100 p-4 rounded-lg col-span-2">
                                    <p className="font-semibold text-yellow-800">
                                        Rating:{" "}
                                        {summaryData?.Summary?.Rate.toFixed(
                                            1
                                        ) || 0}{" "}
                                        stars
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-100 p-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                                Summary Content
                            </h2>
                            {summaryData?.Summary?.file_link ? (
                                <div className="border-4 border-purple-200 rounded-lg overflow-hidden">
                                    <PDFReader
                                        fileUrl={`http://localhost:3000/${summaryData?.Summary?.file_link}`}
                                    />
                                </div>
                            ) : (
                                <div className="text-center text-gray-500 p-8 bg-gray-200 rounded-lg">
                                    No file uploaded
                                </div>
                            )}
                        </div>
                    </div>

                    {!summaryData?.isReviewed && (
                        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden p-8 transform transition-transform duration-300">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                                Your Review
                            </h2>
                            <SummaryReview
                                userId={user.id}
                                summaryId={summaryId}
                            />
                        </div>
                    )}
                </div>
                <div className=" max-w-[80vw] mx-auto py-10">
                    <h2 className="text-2xl font-bold text-gray-600 text-center mb-4">
                        Reviews
                    </h2>
                    {summaryData?.all_reviews?.map((review) => (
                        <Summary_Review_Card key={review?.id} review={review} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SummaryComponent;
