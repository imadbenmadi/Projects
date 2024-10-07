

const ForbiddenRoute = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-red-600 mb-4">
                    Forbidden
                </h1>
                <p className="text-lg text-gray">
                    You cannot access this route.
                </p>
            </div>
        </div>
    );
};

export default ForbiddenRoute;
