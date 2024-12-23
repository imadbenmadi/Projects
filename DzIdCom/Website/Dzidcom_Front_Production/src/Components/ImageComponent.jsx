import React, { useState, useEffect } from "react";

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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    return <img src={image} alt={alt} {...props} />;
}

export default ImageComponent;
