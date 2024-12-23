import { useState, useEffect } from "react";

function ImageComponent({ src, alt = "image", ...props }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [image, setImage] = useState(null);

    useEffect(() => {
        const img = new Image();
        img.src = src;

        const handleLoad = () => {
            setLoading(false);
            setImage(src);
        };

        const handleError = () => {
            setLoading(false);
            setError("Failed to load image");
        };

        img.onload = handleLoad;
        img.onerror = handleError;

        return () => {
            img.onload = null;
            img.onerror = null;
        };
    }, [src]);

    if (loading) {
        return (
            <div className=" w-screen h-[80vh] flex flex-col items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    } else if (error) {
        return (
            <div className="w-screen h-[calc(100vh-60px)] flex items-center justify-center">
                <div className="text-red-600 font-semibold">
                    {error.message}
                </div>
            </div>
        );
    }
    return <img src={image} alt={alt} {...props} />;
}

export default ImageComponent;
