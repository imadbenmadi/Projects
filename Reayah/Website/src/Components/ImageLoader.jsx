import { useEffect, useState } from "react";
import React from "react";

function ImageLoader({ src, alt}) {
    const [isLoading, setIsLoading] = useState(true);
    const handleLoad = () => {
        setIsLoading(false);
    };
    useEffect(() => {
        const image = new Image();
        image.src = src;
        image.onload = handleLoad;
    }, [src]);
    return (
        <div className="h-full w-full">
            {isLoading ? (
                <div
                    role="status"
                    className="flex items-center justify-center h-full w-full  bg-gray_white rounded-xl animate-pulse dark:bg-image_animation"
                >
                    <span className="sr-only">Loading...</span>
                </div>
            ) : (
                <img
                    src={src}
                    alt={alt}
                    onLoad={handleLoad}
                    style={{ display: isLoading ? "none" : "block" }}
                />
            )}
        </div>
    );
}

export default ImageLoader;
