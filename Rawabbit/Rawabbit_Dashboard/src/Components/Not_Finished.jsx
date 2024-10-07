
import Comming_Soon from "../../public/Comming_Soon.png";

function Not_Finished() {
    return (
        <div
            className="flex items-center justify-center 
      text-gray font-bold pt-16 "
        >
            <div className="p-8 bg-white rounded-md shadow-lg text-center">
                <h1 className="text-3xl md:text-5xl mb-4 text-gray-800">
                    Oops! This Page is Not Finished Yet
                </h1>
                <p className="text-lg mb-8 text-gray">
                    We're working hard to bring you something awesome. Check
                    back later!
                </p>
                <img
                    src={Comming_Soon}
                    alt="Under Construction"
                    className=" w-32 h-32 md:w-64 md:h-64 mx-auto mb-8"
                />
                <p className="text-sm text-gray-600">
                    Thank you for your patience!
                </p>
            </div>
        </div>
    );
}

export default Not_Finished;
