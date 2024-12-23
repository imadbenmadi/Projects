import { CiImageOn } from "react-icons/ci";
import { FaStar, FaStarHalf } from "react-icons/fa";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

function Not_pending_view({ course, Purcase }) {
    

    return (
        <div className="px-8 py-10 bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl shadow-2xl">
            {/* Course Header */}
            <div className="bg-white rounded-2xl p-6 shadow-lg flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex gap-6 items-center">
                    {course?.Image ? (
                        <img
                            className="w-[130px] h-[130px] object-cover rounded-xl shadow-md"
                            src={`http://localhost:3000/${course?.Image}`}
                            alt="Course"
                        />
                    ) : (
                        <div className="w-[130px] h-[130px] flex items-center justify-center bg-gray-200 rounded-xl shadow-md">
                            <CiImageOn className="text-6xl text-gray-500" />
                        </div>
                    )}

                    <div className="flex flex-col">
                        <div className="text-2xl font-bold text-blue-900">
                            {course?.Title}
                        </div>
                        <div className="text-md font-medium text-gray-500">
                            {course?.Category}
                        </div>
                        <div className="text-lg text-blue-600 font-semibold mt-2">
                            {course?.Price && `${course?.Price} DA`}
                        </div>
                    </div>
                </div>

                {/* Rating and Enrollments */}
                <div className="flex gap-8 items-center">
                    <div className="flex gap-1 items-center">
                        {[...Array(5)].map((_, index) =>
                            index < Math.floor(course?.Rate || 0) ? (
                                <FaStar
                                    key={index}
                                    className="text-yellow-400 text-lg"
                                />
                            ) : index < Math.ceil(course?.Rate || 0) ? (
                                <FaStarHalf
                                    key={index}
                                    className="text-yellow-400 text-lg"
                                />
                            ) : (
                                <FaStar
                                    key={index}
                                    className="text-gray-300 text-lg"
                                />
                            )
                        )}
                    </div>

                    <div className="text-md font-medium text-gray-600">
                        {course?.Students_count
                            ? `${course?.Students_count} Enrolments`
                            : "0 Enrolments"}
                    </div>

                    <div className="text-md font-medium text-gray-600">
                        {course?.Course_Videos?.length || 0} Videos
                    </div>
                </div>
            </div>

            {/* Course Details */}
            <div className="text-center text-gray-700 text-xl py-8 mt-6 bg-white rounded-2xl shadow-lg">
                Please wait while our team validates your payment.
            </div>

            {/* Payment Details */}
            <div className="flex flex-col items-center gap-6 text-sm mt-8">
                <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6">
                    <div className="font-semibold text-gray-700">
                        Your CCP Number:
                    </div>
                    <div className="border border-gray-300 px-4 py-3 rounded-lg mt-2 bg-gray-50">
                        {Purcase?.CCP_number || "N/A"}
                    </div>
                </div>

                <div className="relative">
                    {Purcase?.screenShot ? (
                        <img
                            src={`http://localhost:3000${Purcase.screenShot}`}
                            alt="Screenshot"
                            className="w-[300px] h-[180px] object-cover rounded-xl border-4 border-blue-200 shadow-lg"
                        />
                    ) : (
                        <div className="w-[180px] h-[180px] flex items-center justify-center bg-gray-200 rounded-full border-4 border-blue-200 shadow-lg">
                            No screenshot
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Not_pending_view;
