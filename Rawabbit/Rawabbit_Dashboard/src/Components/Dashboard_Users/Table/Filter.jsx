
import { FaFilter } from "react-icons/fa";

function Filter({fitler , setFilter}) {
    return (
        <div className=" flex justify-center items-center px-2 py-1 gap-1 border-2 rounded shadow-md border-gray_white  cursor-pointer text-2xl text-gray">
            <div>
                <FaFilter />
            </div>
            <div>Filter</div>
        </div>
    );
}

export default Filter;
