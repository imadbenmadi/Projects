import { IoWarning } from "react-icons/io5";
import { useEffect, useState } from "react";
import axios from "axios";
import ErrorPage from "../../../ErrorPage";
import { useOutletContext } from "react-router";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import Card from "./Card";
function Requests_Requests() {
    const [Requests, setRequests] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useOutletContext();
    if (!user) return null;
    const fetch_Requests = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `http://localhost:3000/Dashboard/Requests/${user._id}`,
                {
                    withCredentials: true,
                    validateStatus: () => true,
                }
            );
            if (response.status == 200) {
                setRequests(response.data);
            } else {
                setError(response.data);
            }
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetch_Requests();
    }, []);
    const handleDeleteRequest = (RequestId) => {
        setRequests((prevRequests) =>
            prevRequests.filter((Request) => Request._id !== RequestId)
        );
    };

    if (loading)
        return (
            <div className=" w-[100%] h-[200px] flex items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    if (error) {
        return <ErrorPage />;
    }
    if (!Requests || Requests.length == 0)
        return (
            <div className=" pt-4">
                <Link
                    to={`/Users/${user._id}`}
                    className="select-none mb-4 w-fit m-auto bg-green rounded cursor-pointer text-white text-xl flex items-center gap-2 px-3 py-1 "
                >
                    <IoMdArrowRoundBack />
                    <div>Back to user</div>
                </Link>
                <div className=" flex justify-center items-center gap-1 text-2xl text-gray pt-8">
                    <IoWarning />
                    No Requests from this user
                </div>
            </div>
        );
    return (
        <div className="relative shadow-md mt-[20px]">
            <Link
                to={`/Users/${user._id}`}
                className="select-none mb-4 w-fit m-auto bg-green rounded cursor-pointer text-white text-xl flex items-center gap-2 px-3 py-1 "
            >
                <IoMdArrowRoundBack />
                <div>Back to user</div>
            </Link>
            <table className="w-full text-sm rtl:text-right text-black_text relative  ">
                <thead className="text-xs uppercase text-center h-[40px] sticky top-0 bg-white">
                    <tr className="border-y-2">
                        <th scope="col" className="border">
                            User name
                        </th>
                        <th scope="col" className="border">
                            Telephone
                        </th>
                        <th scope="col" className="border">
                            Email
                        </th>
                        <th scope="col" className="border">
                            Status
                        </th>
                        <th scope="col" className=" border">
                            Request Title
                        </th>
                        <th scope="col" className=" border">
                            Request Price
                        </th>
                        <th scope="col" className="border">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Requests.length == 0 && (
                        <tr className="bg-gray_white  h-[40px] text-center">
                            <td
                                colSpan="8"
                                className="border-y-2 py-2 text-sm text-gray"
                            >
                                <div className="  flex justify-center items-center gap-1">
                                    <IoWarning />
                                    No Request found
                                </div>
                            </td>
                        </tr>
                    )}
                    {Requests.map((request, index) => (
                        <Card
                            request={request}
                            key={index}
                            onDelete={() => handleDeleteRequest(request._id)}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Requests_Requests;
