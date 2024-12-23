import { useState, useEffect } from "react";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import { IoIosWarning } from "react-icons/io";
import {  IoSearch } from "react-icons/io5";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import Card from "./Student_Summaries_Card";
dayjs.extend(customParseFormat);

function Student_Summaries() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [summaries, setSummaries] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeFilter, setActiveFilter] = useState();

    useEffect(() => {
        const fetchSummaries = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `http://localhost:3000/Students/Summaries`,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );

                if (response.status === 200) {
                    setSummaries(response.data.Summaries);
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
        fetchSummaries();
    }, [navigate]);

    const filteredSummaries = summaries.filter((summary) =>
        summary.Title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const categories = [
        "all",
        ...new Set(summaries.map((summary) => summary.Category)),
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-purple-500">
                <div className="p-8 bg-white rounded-lg shadow-lg text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600 font-semibold">
                        Loading your summaries...
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen bg-gradient-to-r from-red-400 to-pink-500">
                <div className="p-8 bg-white rounded-lg shadow-lg text-center">
                    <IoIosWarning className="text-red-500 text-5xl mb-4 mx-auto" />
                    <div className="text-red-600 font-semibold">
                        {error.message}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-8 text-center">
                    Your Knowledge Hub
                </h1>

                <div className="mb-8 relative max-w-xl mx-auto">
                    <input
                        type="text"
                        placeholder="Search your summaries..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-3 pl-12 text-gray-900 border-2 border-purple-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300 ease-in-out"
                    />
                    <IoSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 text-xl" />
                </div>
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveFilter(category)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition duration-300 ease-in-out ${
                                activeFilter === category
                                    ? "bg-purple-600 text-white"
                                    : "bg-white text-purple-600 hover:bg-purple-100"
                            }`}
                        >
                            {category.charAt(0).toUpperCase() +
                                category.slice(1)}
                        </button>
                    ))}
                </div>

                <div>
                    {!filteredSummaries || filteredSummaries?.length == 0 ? (
                        <div className=" flex flex-col gap-6 items-center justify-center">
                            <div className="text-center py-12 w-full bg-white rounded-lg shadow-lg">
                                <IoIosWarning className="text-yellow-500 text-5xl inline-block mb-4" />
                                <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                                    No Summaries Found
                                </h2>
                                {/* <p className="text-gray-500 mb-6">
                            Expand your horizons or try a different search!
                        </p> */}
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredSummaries.map((Summary) => (
                                <Card
                                    key={Summary.id}
                                    Summary={Summary}
                                    setSummaries={setSummaries}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Student_Summaries;
