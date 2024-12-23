import React from "react";
import dayjs from "dayjs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

function MeetCard({user,course,setCourse,  meet, index }) {
    const [deleteLoading, setDeleteLoading] = useState(false);
    const navigate = useNavigate();
    const handle_delete_meet = async () => {
        setDeleteLoading(true);
        try {
            const response = await axios.delete(
                `http://localhost:3000/Teachers/${user?.id}/Courses/${course?.id}/Meetings/${meet.id}`,
                {
                    withCredentials: true,
                    validateStatus: () => true,
                }
            );
            if (response.status === 200) {
                const newMeetings = course?.Course_Meets.filter(
                    (item) => item?.id !== meet.id
                );
                setCourse((prevCourse) => {
                    return {
                        ...prevCourse,
                        Course_Meets: newMeetings,
                    };
                });
                Swal.fire("Success", "Meeting Deleted Successfully", "success");
            } else if (response.status === 401) {
                Swal.fire(
                    "Unauthorized",
                    "Please You have to Login Again",
                    "error"
                );
                navigate("/Login");
            } else Swal.fire("Error", "Somthing went wrong", "error");
        } catch (err) {
            Swal.fire("Error", "Somthing went wrong", "error");
        } finally {
            setDeleteLoading(false);
        }
    };
    return (
        <div
            key={meet.id}
            className="bg-white rounded-lg shadow-md mb-4 p-4 flex justify-between items-center hover:shadow-lg transition duration-300"
        >
            <div className="flex items-center">
                <span className="text-2xl font-bold text-gray-300 mr-4">
                    {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                    <h4 className="text-lg font-semibold text-gray-500">
                        {dayjs(meet.time).format("MMMM D, YYYY h:mm A")}
                    </h4>
                    <a
                        href={meet.Link}
                        target="_blank"
                        rel="noopener noreferrer "
                        className=" font-semibold text-gray-600 text-lg"
                    >
                        {meet.Link}
                    </a>
                </div>
            </div>
            {deleteLoading ? (
                <div className=" small-loader mt-2 mr-10"></div>
            ) : (
                <div
                    className=" cursor-pointer text-white bg-red-500 px-4 py-2 rounded-lg font-semibold"
                    onClick={() => {
                        handle_delete_meet();
                    }}
                >
                    Delete
                </div>
            )}
        </div>
    );
}

export default MeetCard;
