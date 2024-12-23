import React from "react";

function ErrorElement({ error }) {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-md shadow-lg text-center max-w-md mx-auto">
                <h1 className="text-3xl md:text-4xl mb-4 text-red-600">
                    Oops! An Error Occurred
                </h1>
                <p className="text-lg mb-4 text-gray-700">
                    Something went wrong on this page.
                </p>
                {error && (
                    <div className="text-left bg-red-100 p-4 mb-4 rounded-md">
                        <h2 className="text-xl text-red-600 font-semibold">
                            Error Details:
                        </h2>
                        <pre className="text-sm text-gray-800 whitespace-pre-wrap">
                            {error.toString()}
                        </pre>
                    </div>
                )}
                <p className="text-lg">
                    Please go back to the{" "}
                    <a className="text-blue-600 hover:underline" href="/">
                        home page
                    </a>
                    .
                </p>
            </div>
        </div>
    );
}

export default ErrorElement;
