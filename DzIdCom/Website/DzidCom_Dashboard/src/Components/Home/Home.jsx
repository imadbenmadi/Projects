import React, { useEffect, useState } from "react";
import axios from "axios";
import { LiaUsersSolid } from "react-icons/lia";
import { SiFreelancer } from "react-icons/si";
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
            <div className=" w-screen h-screen flex items-center justify-center">
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
                const date = dayjs(item.createdAt).format("YYYY-MM-DD");
                if (!countByDate[date]) {
                    countByDate[date] = 0;
                }
                countByDate[date]++;
            });
            return countByDate;
        };

        // Process freelancers and clients
        const freelancersByDate = processData(data?.freelancers);
        const clientsByDate = processData(data?.clients);
        const projectsByDate = processData(data?.projects);

        const allDates = Array.from(
            new Set([
                ...Object.keys(freelancersByDate),
                ...Object.keys(clientsByDate),
                ...Object.keys(projectsByDate),
            ])
        ).sort();

        // Create datasets
        const freelancersData = allDates.map(
            (date) => freelancersByDate[date] || 0
        );
        const clientsData = allDates.map((date) => clientsByDate[date] || 0);
        const projectsData = allDates.map((date) => projectsByDate[date] || 0);
        const chart_data = {
            labels: allDates,
            datasets: [
                {
                    label: "Freelancers",
                    data: freelancersData,
                    borderColor: "rgb(255, 99, 132)",
                    backgroundColor: "rgba(255, 99, 132, 0.5)",
                },
                {
                    label: "Clients",
                    data: clientsData,
                    borderColor: "rgb(53, 162, 235)",
                    backgroundColor: "rgba(53, 162, 235, 0.5)",
                },
                {
                    label: "Projects",
                    data: projectsData,
                    borderColor: "rgb(60, 100, 235)",
                    backgroundColor: "rgba(60, 100, 235, 0.5)",
                },
            ],
        };

        return (
            <div>
                <div className=" text-perpol_b text-2xl font-semibold pt-6 pl-6">
                    Home page
                </div>
                <div className=" flex justify-center items-center flex-wrap gap-6 mx-6 my-6">
                    <div className=" border shadow-md py-6 px-6 flex flex-col items-center justify-start rounded-md md:min-w-[200px]">
                        <div className=" text-xs font-semibold pb-2 text-gray_v w-full">
                            Total users:
                        </div>
                        <div className=" flex justify-between gap-2 mx-2 w-full">
                            <div className="  font-semibold text-2xl">
                                {data?.freelancers_nbr + data?.clients_nbr}
                            </div>
                            <div className=" shrink-0 text-blue-600 border border-gray_white px-2 py-1 flex items-center justify-center rounded-lg shadow-lg">
                                <LiaUsersSolid className=" shrink-0 text-2xl" />
                            </div>
                        </div>
                    </div>
                    <div className=" border shadow-md py-6 px-6 flex flex-col items-center justify-start rounded-md md:min-w-[200px]">
                        <div className=" text-xs font-semibold pb-2 text-gray_v w-full">
                            Freelancers:
                        </div>
                        <div className=" flex justify-between gap-2 mx-2 w-full">
                            <div className="  font-semibold text-2xl">
                                {data?.freelancers_nbr}
                            </div>
                            <div className=" shrink-0 text-blue-600 border border-gray_white px-2 py-1 flex items-center justify-center rounded-lg shadow-lg">
                                <SiFreelancer className=" shrink-0 text-2xl" />
                            </div>
                        </div>
                    </div>
                    <div className=" border shadow-md py-6 px-6 flex flex-col items-center justify-start rounded-md md:min-w-[200px]">
                        <div className=" text-xs font-semibold pb-2 text-gray_v w-full">
                            Clients:
                        </div>
                        <div className=" flex justify-between gap-2 mx-2 w-full">
                            <div className="  font-semibold text-2xl">
                                {data?.clients_nbr}
                            </div>
                            <div className=" shrink-0 text-blue-600 border border-gray_white px-2 py-1 flex items-center justify-center rounded-lg shadow-lg">
                                <FaUserTie className=" shrink-0 text-2xl" />
                            </div>
                        </div>
                    </div>
                    <div className=" border shadow-md py-6 px-6 flex flex-col items-center justify-start rounded-md md:min-w-[200px]">
                        <div className=" text-xs font-semibold pb-2 text-gray_v w-full">
                            Total Projects:
                        </div>
                        <div className=" flex justify-between gap-2 mx-2 w-full">
                            <div className="  font-semibold text-2xl">
                                {data?.projects_nbr}
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
