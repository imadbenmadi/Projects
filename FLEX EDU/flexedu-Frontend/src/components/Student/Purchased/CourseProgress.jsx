const CircularProgress = ({ totalVideos, watchedVideos, className }) => {
    // Calculate progress percentage
    const calculateProgress = () => {
        if (!totalVideos || totalVideos === 0) return 0;
        return Math.round((watchedVideos.length / totalVideos) * 100);
    };

    const progressPercentage = calculateProgress();

    // SVG circle properties
    const size = 120;
    const strokeWidth = 8;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset =
        circumference - (progressPercentage / 100) * circumference;

    return (
        <div className={`bg-white rounded-lg  p-6 ${className}`}>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-700">
                    Course Progress
                </h3>
            </div>

            <div className="flex items-center justify-center">
                <div className="relative">
                    {/* Background circle */}
                    <svg
                        width={size}
                        height={size}
                        className="transform -rotate-90"
                    >
                        <circle
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            fill="none"
                            stroke="#E5E7EB"
                            strokeWidth={strokeWidth}
                        />

                        {/* Progress circle */}
                        <circle
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            fill="none"
                            stroke="#3B82F6"
                            strokeWidth={strokeWidth}
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                            className="transition-all duration-500 ease-in-out"
                        />
                    </svg>

                    {/* Percentage text in the middle */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <span className="text-2xl font-bold text-gray-700">
                                {progressPercentage}%
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                    {/* <span>Completed Videos</span>
          <span className="font-medium">
            {watchedVideos.length } of {totalVideos}
          </span> */}
                </div>

                <div className="flex gap-2 text-sm text-gray-600">
                    <span>Remaining : </span>
                    <span className="font-medium">
                        {totalVideos - watchedVideos.length}{" "}
                        {totalVideos - watchedVideos.length === 1
                            ? "video"
                            : "videos"}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CircularProgress;
