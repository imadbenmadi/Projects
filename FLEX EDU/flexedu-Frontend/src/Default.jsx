import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAppContext } from "./AppContext";

function Default() {
    const { isAuth, userType } = useAppContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth || !userType) {
            navigate("/Home"); // If not authenticated or userType is missing, go to Home.
        } else if (userType === "teacher") {
            navigate("/Teacher"); // Navigate to the Teacher dashboard.
        } else if (userType === "student") {
            navigate("/Student"); // Navigate to the Student dashboard.
        } else {
            navigate("/Home"); // Default fallback to Home if conditions are unclear.
        }
    }, [isAuth, userType, navigate]); // Make sure to include dependencies here.

    return null; // No need to return anything from this component.
}

export default Default;
