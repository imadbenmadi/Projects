import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";
import Card from "./Card";

function Freelancers_Feedbacks() {
    const Navigate = useNavigate();

    const [Feedbacks, setFeedbacks] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        const FetchFeedbacks = async ({
            setFeedbacks,
            setLoading,
            setError,
        }) => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `http://localhost:3000/Admin/Feedbacks/Freelancers`,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );
                if (response.status == 200) {
                    const Feedbacks = response.data.feedbacks;
                    setFeedbacks(Feedbacks);
                } else if (response.status == 401) {
                    Swal.fire("Error", "you should login again", "error");
                    Navigate("/Login");
                } else {
                    setError(response.data);
                }
            } catch (error) {
                setError(error);
            } finally {
                // setLoading(false);
            }
        };

        FetchFeedbacks({ setFeedbacks, setLoading, setError }).then(() => {
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <div className=" w-[80vw] h-[80vh] flex flex-col items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    } else if (error)
        return (
            <div className=" w-[80vw] h-screen flex items-center justify-center">
                <div className="text-red-600 font-semibold">
                    {error.message}
                </div>
            </div>
        );
    return (
        <div className=" py-6 px-4">
            <div className=" text-xl font-semibold text-perpol_b">
                {" "}
                Freelancers Feedbacks to Clients
            </div>
            {!Feedbacks ||
                (Feedbacks.length == 0 && (
                    <div className="text-md font-semibold text-gray_v text-center pt-12">
                        No Feedbacks
                    </div>
                ))}
            {Feedbacks &&
                Feedbacks.map((feedback) => {
                    return (
                        <Card
                            key={feedback.id}
                            feedback={feedback}
                            setFeedbacks={setFeedbacks}
                            Feedbacks={Feedbacks}
                            // handle_Delete_Feedback={handle_Delete_Feedback}
                        />
                    );
                })}
            {/* <div className=" mt-6 "></div>
            <div className=" py-4 px-7  border-2  border-perpol_v rounded-lg  ">
                <div></div>
                <div></div>
                <div></div>
                sdsdsd
            </div> */}
        </div>
    );
}

export default Freelancers_Feedbacks;
