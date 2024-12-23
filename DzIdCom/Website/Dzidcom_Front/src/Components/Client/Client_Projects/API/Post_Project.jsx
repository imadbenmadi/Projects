import Swal from "sweetalert2";
import Axios from "axios";
// import { useNavigate } from "react-router";
async function handle_Add_Projects(values, { setSubmitting }) {
    // const Navigate = useNavigate();
    try {
        let response = await Axios.post(
            `http://localhost:3000/Clients/${values.userId}/Projects`,
            values,
            {
                withCredentials: true,
                validateStatus: () => true,
            }
        );
        if (response.status == 200) {
            // Swal.fire("Success", "Project Updated Successfully", "success");
            window.location.href = "/Client/Projects";
            // Navigate("/Client/Projects");
        } else if (response.status == 401) window.location.href = "Login";
        else if (response.status == 400) {
            setSubmitting(false);
            Swal.fire("Error", `${response.data.message} `, "error");
        } else if (response.status == 409) {
            setSubmitting(false);
            Swal.fire("Error!", `${response.data.message} `, "error");
        } else if (response.status == 500) {
            setSubmitting(false);
            Swal.fire("Error!", `Internal Server Error   `, "error");
        } else {
            setSubmitting(false);
            Swal.fire(
                "Error!",
                `Something Went Wrong ,please trye again latter, ${response.data.message} `,
                "error"
            );
        }
    } catch (error) {
        setSubmitting(false);
        Swal.fire(
            "Error!",
            `Something Went Wrong ,please trye again latter`,
            "error"
        );
    }
    // return null;
    // setSubmitting(false);
}
export default handle_Add_Projects;
