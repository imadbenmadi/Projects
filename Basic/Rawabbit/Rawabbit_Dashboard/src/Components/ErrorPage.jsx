
import { IoMdRefresh } from "react-icons/io";

const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-[60vh]">
            <h1 className="text-4xl font-bold text-red-600 mb-4">
                Oops! Something went wrong
            </h1>
            <p className="text-lg text-gray">
                We are sorry, but an error occurred while fetching data. Please
                try again later.
            </p>
            <div
                className=" flex gap-1 text-gray items-end cursor-pointer"
                onClick={() => window.location.reload()}
            >
                Refresh the page
                <IoMdRefresh />
            </div>
        </div>
    );
};

export default ErrorPage;
