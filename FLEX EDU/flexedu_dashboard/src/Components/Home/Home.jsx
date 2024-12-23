import React, { useEffect, useState } from "react";
import axios from "axios";
import { LiaUsersSolid } from "react-icons/lia";
import { MdOutlineWork } from "react-icons/md";
import { FaUserTie } from "react-icons/fa6";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { PiStudentBold } from "react-icons/pi";

import { Line } from "react-chartjs-2";
import dayjs from "dayjs";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: "Statistics Over Time",
        },
    },
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                stepSize: 1,
            },
        },
    },
};

function Home() {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    "http://localhost:3000/Admin/Home",
                    {
                        withCredentials: true,
                    }
                );

                if (response.status === 200) {
                    setData(response.data);
                } else {
                    setError(response.data);
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className=" w-[80vw] h-[80vh] flex flex-col items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    } else if (error) {
        return (
            <div className=" w-full h-screen flex items-center justify-center">
                <div className="text-red-600 font-semibold">
                    {error.message}
                </div>
            </div>
        );
    } else {
        // Helper function to process data
        const processData = (items) => {
            const countByDate = {};
            if (!items) return countByDate;
            else if (items.length === 0) return countByDate;
            else {
                items.forEach((item) => {
                    const date = dayjs(item.createdAt).format("YYYY-MM-DD");
                    if (!countByDate[date]) {
                        countByDate[date] = 0;
                    }
                    countByDate[date]++;
                });
                return countByDate;
            }
        };

        // Process Students and Teachers
        const StudentsByDate = processData(data?.Students);
        const TeachersByDate = processData(data?.Teachers);
        const coursesByDate = processData(data?.courses);

        const allDates = Array.from(
            new Set([
                ...Object.keys(StudentsByDate),
                ...Object.keys(TeachersByDate),
                ...Object.keys(coursesByDate),
            ])
        ).sort();

        // Create datasets
        const StudentsData = allDates.map((date) => StudentsByDate[date] || 0);
        const TeachersData = allDates.map((date) => TeachersByDate[date] || 0);
        const coursesData = allDates.map((date) => coursesByDate[date] || 0);
        const chart_data = {
            labels: allDates,
            datasets: [
                {
                    label: "Students",
                    data: StudentsData,
                    borderColor: "rgb(255, 99, 132)",
                    backgroundColor: "rgba(255, 99, 132, 0.5)",
                },
                {
                    label: "Teachers",
                    data: TeachersData,
                    borderColor: "rgb(53, 162, 235)",
                    backgroundColor: "rgba(53, 162, 235, 0.5)",
                },
                {
                    label: "Courses",
                    data: coursesData,
                    borderColor: "rgb(60, 100, 235)",
                    backgroundColor: "rgba(60, 100, 235, 0.5)",
                },
            ],
        };

        return (
            <div>
                <div className=" text-green_b text-2xl font-semibold pt-6 pl-6">
                    Home page
                </div>
                <div className=" flex justify-center items-center flex-wrap gap-6 mx-6 my-6">
                    <div className=" border shadow-md py-6 px-6 flex flex-col items-center justify-start rounded-md md:min-w-[200px]">
                        <div className=" text-xs font-semibold pb-2 text-gray_v w-full">
                            Total users:
                        </div>
                        <div className=" flex justify-between gap-2 mx-2 w-full">
                            <div className="  font-semibold text-2xl">
                                {data?.Students_nbr + data?.Teachers_nbr}
                            </div>
                            <div className=" shrink-0 text-blue-600 border border-gray_white px-2 py-1 flex items-center justify-center rounded-lg shadow-lg">
                                <LiaUsersSolid className=" shrink-0 text-2xl" />
                            </div>
                        </div>
                    </div>
                    <div className=" border shadow-md py-6 px-6 flex flex-col items-center justify-start rounded-md md:min-w-[200px]">
                        <div className=" text-xs font-semibold pb-2 text-gray_v w-full">
                            Students:
                        </div>
                        <div className=" flex justify-between gap-2 mx-2 w-full">
                            <div className="  font-semibold text-2xl">
                                {data?.Students_nbr}
                            </div>
                            <div className=" shrink-0 text-blue-600 border border-gray_white px-2 py-1 flex items-center justify-center rounded-lg shadow-lg">
                                <PiStudentBold className=" shrink-0 text-2xl" />
                            </div>
                        </div>
                    </div>
                    <div className=" border shadow-md py-6 px-6 flex flex-col items-center justify-start rounded-md md:min-w-[200px]">
                        <div className=" text-xs font-semibold pb-2 text-gray_v w-full">
                            Teachers:
                        </div>
                        <div className=" flex justify-between gap-2 mx-2 w-full">
                            <div className="  font-semibold text-2xl">
                                {data?.Teachers_nbr}
                            </div>
                            <div className=" shrink-0 text-blue-600 border border-gray_white px-2 py-1 flex items-center justify-center rounded-lg shadow-lg">
                                <FaUserTie className=" shrink-0 text-2xl" />
                            </div>
                        </div>
                    </div>
                    <div className=" border shadow-md py-6 px-6 flex flex-col items-center justify-start rounded-md md:min-w-[200px]">
                        <div className=" text-xs font-semibold pb-2 text-gray_v w-full">
                            Total Courses:
                        </div>
                        <div className=" flex justify-between gap-2 mx-2 w-full">
                            <div className="  font-semibold text-2xl">
                                {data?.courses_nbr}
                            </div>
                            <div className=" shrink-0 text-blue-600 border border-gray_white px-2 py-1 flex items-center justify-center rounded-lg shadow-lg">
                                <MdOutlineWork className=" shrink-0 text-2xl" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" py-12">
                    <Line options={options} data={chart_data} />
                </div>
            </div>
        );
    }
}

export default Home;
