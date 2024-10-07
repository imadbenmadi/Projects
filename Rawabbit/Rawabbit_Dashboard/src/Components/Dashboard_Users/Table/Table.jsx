import Search from "./Search";
import Filter from "./Filter";
import { FaPlus } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

import Users_Table from "./Users_Table";
import axios from "axios";
import { Link } from "react-router-dom";
import ErrorPage from "../../../Components/ErrorPage";
function Table() {
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");

    const fetch_users = async () => {
        setLoading(true);

        try {
            const response = await axios.get(
                "http://localhost:3000/Dashboard/Users",
                {
                    withCredentials: true,
                    validateStatus: () => true,
                }
            );

            if (response.status == 200) {
                setUsers(response.data);
            } else {
                setError(response.data);
            }
        } catch (error) {
            setError(error);
        }
        setLoading(false);
    };
    useEffect(() => {
        fetch_users();
    }, []);
    if (loading)
        return (
            <div className=" w-[100%] h-[200px] flex items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    if (error) {
        return <ErrorPage />;
    }
    return (
        <div className="">
            <div className=" ">
                <div className=" flex flex-wrap gap-4 md:gap-0  justify-around">
                    <div className=" flex  items-center">
                        {/* <Filter filter={filter} setFilter={setFilter} /> */}
                        <Search setSearch={setSearch} />
                    </div>
                    <Link
                        className="select-none bg-green rounded cursor-pointer text-white text-xl flex items-center gap-2 px-3 py-1 "
                        to={"/Users/Add"}
                    >
                        <>
                            <FaPlus />
                            <div>Add User</div>
                        </>
                    </Link>
                </div>
                {!search && <Users_Table users={users} />}
                {search && (
                    <Users_Table
                        users={users.filter(
                            (user) =>
                                user.FirstName.toLowerCase().includes(
                                    search.toLowerCase()
                                ) ||
                                user.LastName.toLowerCase().includes(
                                    search.toLowerCase()
                                ) ||
                                user.Email.toLowerCase().includes(
                                    search.toLowerCase()
                                ) ||
                                user.Telephone.toLowerCase().includes(
                                    search.toLowerCase()
                                )
                        )}
                    />
                )}
            </div>
        </div>
    );
}

export default Table;
