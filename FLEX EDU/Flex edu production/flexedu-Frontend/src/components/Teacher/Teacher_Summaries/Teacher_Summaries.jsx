import { useAppContext } from "../../../AppContext";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { IoIosWarning } from "react-icons/io";
import Swal from "sweetalert2";
import { IoAdd } from "react-icons/io5";
import dayjs from "dayjs";
import Card from "./Teacher_Summaries_Card";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
function Teacher_Summaries() {
    const Navigate = useNavigate();
    const { user } = useAppContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [Summaries, setSummaries] = useState([]);
    useEffect(() => {
        setLoading(true);
        const FetchSummaries = async ({
            setSummaries,
            setLoading,
            setError,
        }) => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `https://api.flexedu-dz.com/Teachers/${user?.id}/Summaries`,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );
                if (response.status == 200) {
                    const Summaries = response.data.Summaries;
                    setSummaries(Summaries);
                } else if (response.status == 401) {
                    Swal.fire("Error", "you should login again", "error");
                    Navigate("/Login");
                } else {
                    setError(response.data);
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        FetchSummaries({ setSummaries, setLoading, setError });
    }, []);

    if (loading) {
        return (
            <div className=" w-screen h-[80vh] flex flex-col items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    } else if (error)
        return (
            <div className=" w-screen h-[calc(100vh-60px)] flex items-center justify-center">
                <div className="text-red-600 font-semibold">
                    {error.message}
                </div>
            </div>
        );
    else
        return (
            <div>
                <div>
                    {!Summaries || Summaries?.length == 0 ? (
                        <div className=" flex flex-col gap-6 items-center justify-center">
                            <div className="pt-24 flex justify-center items-center gap-2 text-gray_v text-base font-semibold">
                                <IoIosWarning />
                                <h1>No Summaries Found</h1>
                            </div>
                            <Link
                                to={"/Teacher/Summaries/Add"}
                                className=" flex items-center justify-center font-bold p-2 bg-green-600 text-white cursor-pointer  rounded-lg "
                            >
                                <IoAdd className="  font-bold text-xl" />
                                Add Summary
                            </Link>
                        </div>
                    ) : (
                        <div className=" flex flex-col items-center justify-center">
                            <Link
                                to={"/Teacher/Summaries/Add"}
                                className=" flex items-center justify-center font-bold p-2 mt-6 bg-green-600 text-white cursor-pointer  rounded-lg "
                            >
                                <IoAdd className="  font-bold text-xl" />
                                Add Summary
                            </Link>
                            <div className="w-[90%]  my-4 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {Summaries.map((Summary) => (
                                    <Card
                                        key={Summary.id}
                                        Summary={Summary}
                                        setSummaries={setSummaries}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
}

export default Teacher_Summaries;
