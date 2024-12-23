import { useState, useEffect } from "react";
import axios from "axios";
import {  useNavigate, useLocation } from "react-router-dom";
import { IoIosWarning } from "react-icons/io";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import Not_Enrolled_view from "./Not_Enrolled_view";
dayjs.extend(customParseFormat);

function Course() {
    const navigate = useNavigate(); // Fixed typo
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [course, setCourse] = useState(null); // Ensure course state is initialized
    const [isEnrolled, setIsEnrolled] = useState(false); // Fixed state naming
    const location = useLocation();
    const CourseId = location.pathname.split("/")[3];
    const [review, set_review] = useState([]);
    useEffect(() => {
        const fetchCourse = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `http://localhost:3000/Students/Courses/${CourseId}`,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );

                if (response.status === 200) {
                    const fetchedCourse = response.data.Course;
                    setCourse(fetchedCourse);

                    set_review(response.data.all_reviews);
                    setIsEnrolled(response.data.isEnrolled);
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

        fetchCourse();
    }, [CourseId, navigate]); // Ensure CourseId is a dependency

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
    if (!course) {
        return (
            <div className="flex flex-col gap-6 items-center justify-center">
                <div className="pt-24 flex justify-center items-center gap-2 text-gray_v text-base font-semibold">
                    <IoIosWarning />
                    <h1>Course Not Found</h1>
                </div>
            </div>
        );
    }
    if (isEnrolled && course) {
        navigate(`/Student/Purchased/Courses/${CourseId}`);
        return null;
    }
    if (
        !isEnrolled &&
        course &&
        (!course?.paymentStatus || course?.paymentStatus === "rejected")
    ) {
        return <Not_Enrolled_view course={course} review={review} />;
    }
    if (!isEnrolled && course && course?.paymentStatus === "pending") {
        navigate(`/Student/Courses/${CourseId}/Enrollment`);
    } else {
        return null;
    }
}

export default Course;
