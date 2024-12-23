import Swal from "sweetalert2";
import Axios from "axios";
async function handleRegister(values, { setSubmitting }) {
    try {
        let response = await Axios.post(
            "http://localhost:3000/Register",
            values,
            {
                withCredentials: true,
                validateStatus: () => true,
            }
        );
        if (response.status == 200) {
            try {
                let Login_response = await Axios.post(
                    "http://localhost:3000/Login",
                    values,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );
                if (Login_response.status == 200) {
                    if (Login_response.data.userType == "Director") {
                        window.location.href = `/Director`;
                    } else if (Login_response.data.userType == "Malad") {
                        window.location.href = `/Malad`;
                    } else if (Login_response.data.userType == "Doctor") {
                        window.location.href = `/Doctor`;
                    } else if (Login_response.data.userType == "Worker") {
                        window.location.href = `/Worker`;
                    } else window.location.href = `/Login`;
                } else {
                    window.location.href = "/Login";
                }
            } catch (error) {
                window.location.href = "/Login";
            }
        } else if (response.status == 400) {
            setSubmitting(false);
            Swal.fire("Error", `${response.data.message} `, "error");
        } else if (response.status == 409) {
            setSubmitting(false);
            Swal.fire("Error!", `${response.data.message} `, "error");
        } else if (response.status == 500) {
            setSubmitting(false);
            Swal.fire("Error!", `   `, "error");
        } else {
            setSubmitting(false);
            Swal.fire("Error!", ` ${response.data.message} `, "error");
        }
    } catch (error) {
        setSubmitting(false);
        Swal.fire("Error!", ` ${error.message} `, "error");
    }

    // setSubmitting(false);
}
export default handleRegister;
