import Swal from "sweetalert2";
import Axios from "axios";
async function handleRegister(values, { setSubmitting }) {
    try {
        let response = await Axios.put(
            `https://api.flexedu-dz.com/Teachers/${values.TeacherId}/Courses/${values.CourseId}`,
            values,

            {
                withCredentials: true,
                validateStatus: () => true,
            }
        );
        if (response.status == 200) {
            window.location.href = `/Teacher/Courses/${values.CourseId}`;
        } else if (response.status == 400) {
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

    // setSubmitting(false);
}
export default handleRegister;
