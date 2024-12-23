import { useNavigate } from "react-router";
import { useEffect } from "react";

function Teacher_Default() {
    const Navigate = useNavigate();
    useEffect(() => {
        Navigate("/Teacher/Profile");
    }, []);
}

export default Teacher_Default;
