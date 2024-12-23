import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const useFetchJobs = (query) => {
    const [Jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const Navigate = useNavigate();

    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `https://api.dzidcom.com/Freelancers/Jobs?${query}`,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );
                if (response.status === 200) {
                    setJobs(response.data.Jobs);
                } else if (response.status === 401) {
                    Swal.fire("Error", "You should log in again", "error");
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

        fetchJobs();
    }, [query, Navigate]);

    return { Jobs, loading, error };
};

export default useFetchJobs;
