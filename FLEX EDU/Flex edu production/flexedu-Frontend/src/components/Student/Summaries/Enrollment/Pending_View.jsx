import { CiImageOn } from "react-icons/ci";
import { FaStar, FaStarHalf, FaUsers, FaVideo } from "react-icons/fa";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

function Not_pending_view({ summary, Purcase }) {
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <div className="mb-8">
                <div
                    key={summary?.id}
                    className="flex flex-col md:flex-row items-start gap-6 border-b pb-6"
                >
                    <div className="w-full md:w-1/3">
                        {summary?.Image ? (
                            <img
                                className="w-full h-48 object-cover rounded-lg shadow-md"
                                src={`https://api.flexedu-dz.com/${summary?.Image}`}
                                alt="summary image"
                            />
                        ) : (
                            <div className="flex items-center justify-center w-full h-48 bg-gray-100 rounded-lg shadow-md">
                                <CiImageOn className="text-4xl text-gray-400" />
                            </div>
                        )}
                    </div>
                    <div className="w-full md:w-2/3">
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">
                            {summary?.Title}
                        </h1>
                        <p className="text-lg text-gray-600 mb-2">
                            {summary?.Category}
                        </p>
                        {summary?.Price && (
                            <p className="text-xl font-semibold text-green-600 mb-4">
                                {summary?.Price} DA
                            </p>
                        )}

                        <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, index) =>
                                    index < Math.floor(summary?.Rate || 0) ? (
                                        <FaStar
                                            key={index}
                                            className="text-yellow-400"
                                        />
                                    ) : index <
                                      Math.ceil(summary?.Rate || 0) ? (
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
                                <span className="ml-1">
                                    ({summary?.Rate?.toFixed(1) || null})
                                </span>
                            </div>
                            <div className="flex items-center gap-1">
                                <FaUsers className="text-blue-500" />
                                <span>
                                    {summary?.Students_count || 0} Enrolment
                                </span>
                            </div>
                            <div className="flex items-center gap-1">
                                <FaVideo className="text-blue-500" />
                                <span>
                                    {summary?.Summary_Video
                                        ? `${summary?.Summary_Video.length} Videos`
                                        : "No Videos"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-2xl font-semibold text-center py-6 text-yellow-600 bg-yellow-100 rounded-lg mb-8">
                Please wait while our team validates your payment
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Purchase Information
                </h2>
                <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="w-full md:w-1/2">
                        <p className="font-semibold text-sm text-gray-600 mb-2">
                            Your CCP Number:
                        </p>
                        <div className="bg-white border border-gray-200 px-4 py-3 rounded-lg text-gray-800">
                            {Purcase?.CCP_number || "N/A"}
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 flex flex-col items-center">
                        <p className="font-semibold text-sm text-gray-600 mb-2">
                            Payment Screenshot:
                        </p>
                        <img
                            src={
                                "https://api.flexedu-dz.com" +
                                Purcase?.screenShot
                            }
                            alt="Screenshot"
                            className="w-40 h-20 object-cover rounded-xl border-4 border-white shadow-lg"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Not_pending_view;
