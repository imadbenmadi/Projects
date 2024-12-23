import Swal from "sweetalert2";
import Axios from "axios";
async function handleLogin(values, { setSubmitting }) {
    try {
        let response = await Axios.post("http://localhost:3000/Login", values, {
            withCredentials: true,
            validateStatus: () => true,
        });

        if (response.status == 200) {
            if (response.data.userType == "client") {
                window.location.href = `/Client`;
            } else if (response.data.userType == "freelancer") {
                window.location.href = `/Freelancer`;
            } else window.location.href = `/Home`;
        } else if (response.status == 401) {
            setSubmitting(false);
            Swal.fire("Error!", "Username or Password isn't correct", "error");
        } else if (response.status == 409) {
            setSubmitting(false);
            Swal.fire("Error!", `${response.data.message} `, "error");
        } else if (response.status == 500) {
            setSubmitting(false);
            Swal.fire("Error!", `Internal Server Error   `, "error");
        } else {
            setSubmitting(false);
            Swal.fire("Error!", `Something Went Wrong ,`, "error");
        }
    } catch (error) {
        setSubmitting(false);
        Swal.fire("Error!", `Something Went Wrong `, "error");
    }
    // setSubmitting(false);
}
export default handleLogin;
