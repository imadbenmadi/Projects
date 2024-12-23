import { useNavigate } from "react-router";
import { useEffect } from "react";

function Client_Default() {
    const Navigate = useNavigate();
    useEffect(() => {
        Navigate("/Client/Profile");
    }, []);
}

export default Client_Default;
