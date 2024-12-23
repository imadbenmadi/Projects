import { useEffect, useRef } from "react";

function Video_Component({ videoData }) {
    const videoRef = useRef(null);

    const handleVideoError = () => {
        // You can add more error handling here if needed
    };

    useEffect(() => {
        // Reset the video when videoData changes
        if (videoRef.current) {
            videoRef.current.load();
        }
    }, [videoData]);

    if (!videoData) {
        return (
            <div className="w-full h-[80vh] flex items-center justify-center">
                <div className="text-gray-600 font-semibold h-full">
                    No video data available
                </div>
            </div>
        );
    }

    return (
        <div className="w-full md:h-[80vh] bg-black">
            <video
                ref={videoRef}
                className="w-full h-full object-cover"
                controls
                onError={handleVideoError}
                key={videoData.id} // Add a key prop to force re-render when video changes
            >
                <source
                    src={`https://api.flexedu-dz.com/${videoData.Video}`}
                    type="video/mp4"
                />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}

export default Video_Component;
