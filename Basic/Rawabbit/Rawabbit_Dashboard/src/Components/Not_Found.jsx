import Not_Found_image from "../../public/NotFound.png";
import { Link } from "react-router-dom";
function Not_Found() {
    return (
        <div
            className="flex items-center justify-center 
      text-gray font-bold pt-16 "
        >
            <div className="p-8 bg-white rounded-md shadow-lg text-center">
                <h1 className="text-3xl md:text-5xl mb-4 text-gray-800">
                    Oops! This Page Not Found
                </h1>
                <p className="text-lg mb-8 text-gray">
                    The page you're looking for might be under construction or
                    has been moved.
                </p>
                <img
                    src={Not_Found_image}
                    alt="Under Construction"
                    className=" w-32 h-32 md:w-64 md:h-64 mx-auto mb-8"
                />
                <p className="text-sm text-gray-600">
                    Double-check the URL or go back to the{" "}
                    <Link to={"/"} className=" text-green select-none">
                        home page.
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Not_Found;
