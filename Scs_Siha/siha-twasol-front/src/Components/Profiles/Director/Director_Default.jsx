import { useNavigate } from "react-router";
import { useEffect } from "react";

function Director_Default() {
    const Navigate = useNavigate();
    useEffect(() => {
        Navigate("/Director/Workers");
    }, []);
}

export default Director_Default;
