import { Link } from "react-router-dom";
import { CiImageOn } from "react-icons/ci";
import { FaStar, FaStarHalf, FaUserGraduate, FaBook } from "react-icons/fa";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

function Student_Summaries_Card({ Summary }) {
    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 my-6">
            <div className="relative">
                {Summary?.Image ? (
                    <img
                        className="w-full h-48 object-cover"
                        src={`https://api.flexedu-dz.com/${Summary?.Image}`}
                        alt="Summary"
                    />
                ) : (
                    <div className="flex items-center justify-center w-full h-48 bg-gradient-to-r from-purple-100 to-indigo-100">
                        <CiImageOn className="text-6xl text-gray-400" />
                    </div>
                )}
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-purple-600 shadow">
                    {Summary?.Category}
                </div>
            </div>

            <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {Summary?.Title}
                </h2>

                <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, index) =>
                        index < Math.floor(Summary?.Rate || 0) ? (
                            <FaStar key={index} className="text-yellow-400" />
                        ) : index < Math.ceil(Summary?.Rate || 0) ? (
                            <FaStarHalf
                                key={index}
                                className="text-yellow-400"
                            />
                        ) : (
                            <FaStar key={index} className="text-gray-300" />
                        )
                    )}
                    <span className="ml-2 text-gray-600 text-sm">
                        {Summary?.Rate.toFixed(1) || 0} stars
                    </span>
                </div>

                <div className="flex flex-wrap justify-between items-center text-sm text-gray-600 mb-4">
                    <div className="flex items-center mr-4 mb-2">
                        <FaUserGraduate className="mr-2 text-indigo-500" />
                        <span>{Summary?.Students_count || 0} Enrollments</span>
                    </div>
                    <div className="flex items-center mb-2">
                        <FaBook className="mr-2 text-indigo-500" />
                        <span>{Summary?.Pages_Count || 0} Pages</span>
                    </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                    {Summary?.Price === 0 ? (
                        <p className="text-lg font-semibold text-green-600">
                            Free
                        </p>
                    ) : (
                        <p className="text-lg font-semibold text-green-600">
                            {Summary?.Price} DA
                        </p>
                    )}
                    <div className="text-xs text-gray-500">
                        Created:{" "}
                        {dayjs(Summary?.createdAt).format("DD MMM YYYY")}
                    </div>
                </div>

                <Link
                    to={`/Student/Summaries/${Summary?.id}`}
                    className="block w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-center px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:from-purple-700 hover:to-indigo-700 hover:shadow-lg"
                >
                    View
                </Link>
            </div>
        </div>
    );
}

export default Student_Summaries_Card;
