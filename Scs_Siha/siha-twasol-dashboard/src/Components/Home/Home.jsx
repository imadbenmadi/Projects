import React, { useEffect, useState } from "react";
import axios from "axios";
import { LiaUsersSolid } from "react-icons/lia";
import { FaUserDoctor } from "react-icons/fa6";
import { FaRegBuilding } from "react-icons/fa";

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
            <div className="w-[100vw] h-[80vh] flex flex-col items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    } else if (error) {
        return (
            <div className="w-screen h-screen flex items-center justify-center">
                <div className="text-red-600 font-semibold">
                    {error.message}
                </div>
            </div>
        );
    } else {
        // Helper function to process data
        const processData = (items) => {
            const countByDate = {};
            items.forEach((item) => {
                const date = dayjs(item?.createdAt).format("DD-MMM-YYYY");
                if (!countByDate[date]) {
                    countByDate[date] = 0;
                }
                countByDate[date]++;
            });
            return countByDate;
        };

        // Process Malads, Doctors, and Companies
        const maladByDate = processData(data?.Malads);
        const doctorsByDate = processData(data?.Doctors);
        const companiesByDate = processData(data?.Companies);

        const allDates = Array.from(
            new Set([
                ...Object.keys(maladByDate),
                ...Object.keys(doctorsByDate),
                ...Object.keys(companiesByDate),
            ])
        ).sort();

        // Create datasets
        const maladData = allDates.map((date) => maladByDate[date] || 0);
        const doctorsData = allDates.map((date) => doctorsByDate[date] || 0);
        const companiesData = allDates.map(
            (date) => companiesByDate[date] || 0
        );
        const chart_data = {
            labels: allDates,
            datasets: [
                {
                    label: "Malads",
                    data: maladData,
                    borderColor: "rgb(255, 99, 132)",
                    backgroundColor: "rgba(255, 99, 132, 0.5)",
                },
                {
                    label: "Doctors",
                    data: doctorsData,
                    borderColor: "rgb(53, 162, 235)",
                    backgroundColor: "rgba(53, 162, 235, 0.5)",
                },
                {
                    label: "institutions",
                    data: companiesData,
                    borderColor: "rgb(60, 100, 235)",
                    backgroundColor: "rgba(60, 100, 235, 0.5)",
                },
            ],
        };

        return (
            <div>
                <div className="text-blue_v text-2xl font-semibold pt-6 pl-6">
                    Home page
                </div>
                <div className="flex justify-center items-center flex-wrap gap-6 mx-6 my-6">
                    <div className="border shadow-md py-6 px-6 flex flex-col items-center justify-start rounded-md md:min-w-[200px]">
                        <div className="text-xs font-semibold pb-2 text-gray_v w-full">
                            Patients:
                        </div>
                        <div className="flex justify-between gap-2 mx-2 w-full">
                            <div className="font-semibold text-2xl">
                                {data?.Malad_nbr}
                            </div>
                            <div className="shrink-0 text-blue_v border border-gray_white px-2 py-1 flex items-center justify-center rounded-lg shadow-lg">
                                <LiaUsersSolid className="shrink-0 text-2xl" />
                            </div>
                        </div>
                    </div>
                    <div className="border shadow-md py-6 px-6 flex flex-col items-center justify-start rounded-md md:min-w-[200px]">
                        <div className="text-xs font-semibold pb-2 text-gray_v w-full">
                            Doctors:
                        </div>
                        <div className="flex justify-between gap-2 mx-2 w-full">
                            <div className="font-semibold text-2xl">
                                {data?.Doctor_nbr}
                            </div>
                            <div className="shrink-0 text-blue_v border border-gray_white px-2 py-1 flex items-center justify-center rounded-lg shadow-lg">
                                <FaUserDoctor className="shrink-0 text-2xl" />
                            </div>
                        </div>
                    </div>
                    <div className="border shadow-md py-6 px-6 flex flex-col items-center justify-start rounded-md md:min-w-[200px]">
                        <div className="text-xs font-semibold pb-2 text-gray_v w-full">
                            institutions:
                        </div>
                        <div className="flex justify-between gap-2 mx-2 w-full">
                            <div className="font-semibold text-2xl">
                                {data?.Company_nbr}
                            </div>
                            <div className="shrink-0 text-blue_v border border-gray_white px-2 py-1 flex items-center justify-center rounded-lg shadow-lg">
                                <FaRegBuilding className="shrink-0 text-2xl" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-12">
                    <Line options={options} data={chart_data} />
                </div>
            </div>
        );
    }
}

export default Home;
