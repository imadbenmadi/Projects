import { useNavigate } from "react-router";
import { useEffect } from "react";

function Doctor_Default() {
    const Navigate = useNavigate();
    useEffect(() => {
        Navigate("/Doctor/Profile");
    }, []);
}

export default Doctor_Default;
