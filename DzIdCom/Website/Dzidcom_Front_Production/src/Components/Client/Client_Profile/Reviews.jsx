import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAppContext } from "../../../AppContext";
import Feedback_card from "./Feedback_Card";
function Reviews() {
    const { user } = useAppContext();
    const [Loading, setLoading] = useState(false);
    const [Feedbacks, setFeedbacks] = useState([]);
    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://api.dzidcom.com/Clients/${user?.id}/Feedbacks`,
                    {
                        withCredentials: true,
                        // validateStatus: () => true,
                    }
                );
                if (response.status == 200) {
                    setFeedbacks(response.data.Feedbacks);
                } else {
                    setFeedbacks([]);
                }
            } catch (error) {
                setFeedbacks([]);
            }
        };

        // Promise.all([fetchData()]);
        // Promise.all([fetchData()])
        fetchData()
            .then(() => {
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);
    if (Loading)
        return (
            <div className=" w-screen flex items-center justify-center pb-6">
                <span className="small-loader    m-auto"></span>;
            </div>
        );
    else
        return (
            <div>
                {!Feedbacks || Feedbacks?.length == 0 ? (
                    <div className=" text-center text-sm font-semibold text-gray_v pb-6">
                        No feedbacks
                    </div>
                ) : (
                    <div className=" max-w-[90%] mx-auto pb-12">
                        {Feedbacks?.length > 0 &&
                            Feedbacks.map((feedback) => {
                                return (
                                    <Feedback_card
                                        key={feedback?.id}
                                        feedback={feedback}
                                        Feedbacks={Feedbacks}
                                        setFeedbacks={setFeedbacks}
                                    />
                                );
                            })}
                    </div>
                )}
            </div>
        );
}

export default Reviews;
