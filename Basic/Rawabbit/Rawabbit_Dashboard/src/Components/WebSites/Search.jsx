
import { IoSearchOutline } from "react-icons/io5";

function Search({ setSearch }) {
    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    return (
        <div className="flex border-2 border-gray_white shadow-md   text-gray ml-5 mb-4">
            <input
                type="text"
                className="pl-2 py-2 w-[150px] md:w-[300px] focus:outline-none"
                onChange={handleSearch}
            />
            <button
                className="px-2 border-l-2 border-gray_white"
                onClick={() => setSearch("")}
            >
                <IoSearchOutline className="text-2xl" />
            </button>
        </div>
    );
}

export default Search;
