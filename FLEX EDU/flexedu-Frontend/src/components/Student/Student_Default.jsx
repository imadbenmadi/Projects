import { useNavigate } from "react-router";
import { useEffect } from "react";

function Student_Default() {
    const Navigate = useNavigate();
    useEffect(() => {
        Navigate("/Student/Profile");
    }, []);
}

export default Student_Default;
