import { useAppContext } from "../../../AppContext";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { IoIosWarning } from "react-icons/io";
import Swal from "sweetalert2";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useLocation } from "react-router-dom";
dayjs.extend(customParseFormat);
import { MdAttachMoney } from "react-icons/md";
import { MdDateRange } from "react-icons/md";
import { MdPeople } from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { MdEdit } from "react-icons/md";

import { CiImageOn } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import PDFReader from "./PdfReader";
import SummaryReviewCard from "./Review/Summary_Review_Card";

function Summary() {
    const Navigate = useNavigate();
    const { user } = useAppContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [Summary, setSummary] = useState();
    const location = useLocation();
    const SummaryId = location.pathname.split("/")[3];
    const [AllReviews, setAllReviews] = useState();
    const [showDescription, setShowDescription] = useState(false);
    function toggleDescription() {
        setShowDescription(!showDescription);
    }
    useEffect(() => {
        setLoading(true);
        const FetchSummary = async ({ setSummary, setLoading, setError }) => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `https://api.flexedu-dz.com/Teachers/${user?.id}/Summaries/${SummaryId}`,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );

                if (response.status == 200) {
                    const Summary = response.data.Summary;
                    setSummary(Summary);
                    setAllReviews(Summary.Review_Summaries);
                } else if (response.status == 401) {
                    Swal.fire("Error", "you should login again", "error");
                    Navigate("/Login");
                } else {
                    setError(response.data);
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        FetchSummary({ setSummary, setLoading, setError });
    }, []);
    useEffect(() => {
        if (Summary?.file_link) {
            const img = new Image();
            img.src = `https://api.flexedu-dz.com/${Summary.file_link}`;
            img.onload = () => setLoading(false);
            img.onerror = () => setLoading(false);
        } else {
            setLoading(false);
        }
    }, [Summary]);

    if (loading) {
        return (
            <div className=" w-screen h-[80vh] flex flex-col items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    } else if (error)
        return (
            <div className=" w-screen h-[calc(100vh-60px)] flex items-center justify-center">
                <div className="text-red-600 font-semibold">
                    {error.message}
                </div>
            </div>
        );
    else
        return (
            <div>
                <div>
                    {!Summary ? (
                        <div className=" flex flex-col gap-6 items-center justify-center">
                            <div className="pt-24 flex justify-center items-center gap-2 text-gray_v text-base font-semibold">
                                <IoIosWarning />
                                <h1>Summary Not Found</h1>
                            </div>
                        </div>
                    ) : (
                        <div className=" flex flex-col items-center justify-center gap-6 p-4">
                            <div className="flex flex-col md:flex-row items-center md:items-start w-full shadow-lg mt-2 rounded-lg ">
                                <div className="md:flex-shrink-0">
                                    {Summary?.Image ? (
                                        <img
                                            className="h-48 w-full object-cover md:w-48"
                                            src={`https://api.flexedu-dz.com/${Summary?.Image}`}
                                            alt="Summary image"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-48 w-48 bg-gray-200">
                                            <CiImageOn className="text-4xl text-gray-400" />
                                        </div>
                                    )}
                                </div>

                                <div className="p-8 w-full">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h2 className="block mt-1 text-2xl leading-tight font-semibold text-black">
                                                {Summary?.Title}
                                            </h2>
                                            <p className="mt-2 text-gray-500 flex items-center">
                                                <MdCategory className="mr-2" />
                                                {Summary?.Category}
                                            </p>
                                        </div>

                                        <Link
                                            to={`/Teacher/Summaries/${Summary?.id}/Edit`}
                                            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                                        >
                                            <MdEdit className="mr-2" />
                                            Edit Summary
                                        </Link>
                                    </div>

                                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
                                        <p className="flex items-center">
                                            <MdAttachMoney className="mr-1" />
                                            {Summary?.Price
                                                ? `${Summary?.Price} DA`
                                                : "Free"}
                                        </p>
                                        <p className="flex items-center">
                                            <MdDateRange className="mr-1" />
                                            Created:{" "}
                                            {dayjs(Summary?.createdAt).format(
                                                "DD MMMM YYYY"
                                            )}
                                        </p>
                                        <p className="flex items-center">
                                            <MdPeople className="mr-1" />
                                            {Summary?.Students_count || 0}{" "}
                                            Enrollments
                                        </p>
                                        <p className="flex items-center">
                                            <FaFileAlt className="mr-1" />
                                            {Summary?.Pages_Count || 0} Pages
                                        </p>
                                    </div>

                                    <div className="mt-4 flex items-center">
                                        {[...Array(5)].map((_, index) =>
                                            index <
                                            Math.floor(Summary?.Rate || 0) ? (
                                                <FaStar
                                                    key={index}
                                                    className="text-yellow-400"
                                                />
                                            ) : index <
                                              Math.ceil(Summary?.Rate || 0) ? (
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
                                        <span className="ml-2 text-gray-600">
                                            {Summary?.Rate?.toFixed(1) || null}
                                        </span>
                                    </div>

                                    <div className="mt-4 text-gray-600 font-semibold text-sm">
                                        {showDescription ? (
                                            <div className="w-[80%] pl-8 py-4">
                                                <div
                                                    className="select-none flex gap-2 items-center justify-start underline pb-4 cursor-pointer"
                                                    onClick={toggleDescription}
                                                >
                                                    Hide Description{" "}
                                                    <FaArrowUp />
                                                </div>
                                                <div className="pb-4">
                                                    {Summary?.Description && (
                                                        <p className="text-gray text-base">
                                                            {
                                                                Summary?.Description
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="w-[80%] pl-8 py-4">
                                                <div
                                                    className="select-none flex gap-2 items-center justify-start underline pb-4 cursor-pointer"
                                                    onClick={toggleDescription}
                                                >
                                                    Show Description{" "}
                                                    <FaArrowDown />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col w-full  gap-4">
                                {loading ? (
                                    <div>Loading...</div>
                                ) : Summary?.file_link ? (
                                    <PDFReader
                                        fileUrl={`https://api.flexedu-dz.com${Summary.file_link}`}
                                    />
                                ) : (
                                    <div className="text-gray-500">
                                        No file uploaded
                                    </div>
                                )}
                            </div>
                            <div className=" w-full pl-6 py-10">
                                <h2 className="text-2xl font-bold text-gray-600 pl-6 mb-4">
                                    Reviews
                                </h2>

                                {Summary?.Review_Summaries?.map((review) => (
                                    <SummaryReviewCard
                                        key={review?.id}
                                        review={review}
                                        setAllReviews={setAllReviews}
                                        summaryId={Summary.id}
                                        userId={user?.id}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
}

export default Summary;
