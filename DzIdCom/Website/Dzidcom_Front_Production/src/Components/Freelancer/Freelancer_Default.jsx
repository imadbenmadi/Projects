import { useNavigate } from "react-router";
import { useEffect } from "react";

function Freelancer_Default() {
    const Navigate = useNavigate();
    useEffect(() => {
        Navigate("/Freelancer/Profile");
    }, []);
}

export default Freelancer_Default;
