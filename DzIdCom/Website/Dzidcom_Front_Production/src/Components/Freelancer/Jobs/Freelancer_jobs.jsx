import React, { useState } from "react";
import searchIcon from "../../../../public/search.png";
import useFetchJobs from "./Hooks/useFetchJobs"; // Adjust the import path accordingly
import JobsList from "./JobList"; // Adjust the import path accordingly
import { useAppContext } from "../../../AppContext";
import Alert_Complete_Profile from "../Alerts/Alert_Complete_Profile";
function Freelancer_jobs() {
    const [search, setSearch] = useState("");
    const [filter_ContentCreation, setFilter_ContentCreation] = useState(false);
    const [filter_SEO_SIM, setFilter_SEO_SIM] = useState(false);
    const [filter_Graphic_Design, setFilter_Graphic_Design] = useState(false);
    const { show_Alert_completeProfile } = useAppContext();

    const buildQuery = () => {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (filter_ContentCreation) params.append("Content_creation", true);
        if (filter_SEO_SIM) params.append("SEO_SIM", true);
        if (filter_Graphic_Design) params.append("Graphic_design", true);
        return params.toString();
    };

    const query = buildQuery();
    const { Jobs, loading } = useFetchJobs(query);

    return (
        <>
            {show_Alert_completeProfile && <Alert_Complete_Profile />}
            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-[250px] shrink-0 pt-6 pl-3 pb-2 md:pb-0 text-gray_v pr-2  h-fit border-b md:border-b-0  md:h-[calc(100vh-60px)]">
                    <div>
                        <div className="border rounded-xl flex items-center gap-2 px-2 py-2">
                            <img
                                src={searchIcon}
                                alt=""
                                className="cursor-pointer w-[15px] shrink-0"
                                onClick={() => setSearch(search)}
                            />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <div className="text-gray_v pt-4 md:pt-8">
                            <div className="text-lg font-semibold">Filter</div>
                            <div className="text-sm pt-4">
                                <div className="font-semibold">Job Title</div>
                                <div className="pt-2 flex flex-col gap-2 mb-4">
                                    <div className="flex gap-2">
                                        <input
                                            type="checkbox"
                                            checked={filter_ContentCreation}
                                            onChange={() =>
                                                setFilter_ContentCreation(
                                                    !filter_ContentCreation
                                                )
                                            }
                                        />
                                        <div>Content creation</div>
                                    </div>
                                    <div className="flex gap-2">
                                        <input
                                            type="checkbox"
                                            checked={filter_SEO_SIM}
                                            onChange={() =>
                                                setFilter_SEO_SIM(
                                                    !filter_SEO_SIM
                                                )
                                            }
                                        />
                                        <div>SEO / SMM</div>
                                    </div>
                                    <div className="flex gap-2">
                                        <input
                                            type="checkbox"
                                            checked={filter_Graphic_Design}
                                            onChange={() =>
                                                setFilter_Graphic_Design(
                                                    !filter_Graphic_Design
                                                )
                                            }
                                        />
                                        <div>Graphic designer</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="hidden md:block bg-perpol_v w-fit mx-auto py-1 px-2 rounded-lg text-white font-semibold cursor-pointer text-lg"
                        onClick={() => setSearch(search)}
                    >
                        Filter
                    </div>
                </div>
                <div className="w-full px-6 py-6 min-h-[calc(100vh-60px)] border-l">
                    <JobsList jobs={Jobs} loading={loading} />
                </div>
            </div>
        </>
    );
}

export default Freelancer_jobs;
