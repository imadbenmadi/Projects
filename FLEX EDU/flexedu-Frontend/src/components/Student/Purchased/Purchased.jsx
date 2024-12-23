import { useAppContext } from "../../../AppContext";
import { useState, useEffect } from "react";
import axios from "axios";
import { IoIosWarning } from "react-icons/io";
import Swal from "sweetalert2";
import Courses_Card from "./CourseCard";
import SummaryCard from "./SummaryCard";

function Purchased() {
    const { user } = useAppContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [Purchased, setPurchased] = useState([]);
    const [Courses, setCourses] = useState([]);
    const [Summaries, setSummaries] = useState([]);

    useEffect(() => {
        setLoading(true);
        const FetchPurchased = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/Students/${user.id}/Purchased`,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );
                if (response.status == 200) {
                    const data = response.data;
                    setPurchased(data);
                    setCourses(data.course_Purcase_Requests);
                    setSummaries(data.summary_Purcase_Requests);
                } else if (response.status === 401) {
                    Swal.fire("Error", "You should login again", "error");
                } else {
                    setError(response.data);
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        FetchPurchased();
    }, [user.id]);

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
        <div className="flex flex-col items-center justify-center py-6">
            <div className="w-[90%] mx-auto">
                <h1 className="text-5xl py-6 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-8 text-center">
                    Courses
                </h1>{" "}
                {Courses.length === 0 ? (
                    <div className="flex items-center justify-center text-gray-500">
                        <IoIosWarning />
                        <span>No courses purchased yet</span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Courses.map((course) => (
                            <Courses_Card
                                key={course?.id}
                                course={course?.Course}
                            />
                        ))}
                    </div>
                )}
            </div>

            <div className="w-[90%] mx-auto mt-8">
                <h1 className="text-5xl py-6 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-8 text-center">
                    Summaries
                </h1>{" "}
                {Summaries.length === 0 ? (
                    <div className="flex items-center justify-center text-gray-500">
                        <IoIosWarning />
                        <span>No summaries purchased yet</span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Summaries.map((summary) => (
                            <SummaryCard key={summary.id} Summary={summary} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Purchased;
