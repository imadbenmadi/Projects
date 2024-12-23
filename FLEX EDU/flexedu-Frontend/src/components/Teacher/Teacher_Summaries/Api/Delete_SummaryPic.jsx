import Swal from "sweetalert2";
import Axios from "axios";
async function Delete_Profile_Pic(
    setimageDeleteLoading,
    setSummary,
    Summary,
    setimage_state
) {
    setimageDeleteLoading(true);
    try {
        let Image_Response = await Axios.delete(
            `http://localhost:3000/upload/Summaries/${Summary?.id}/Image`,
            // {},
            {
                withCredentials: true,
                validateStatus: () => true,
            }
        );

        if (Image_Response.status == 200) {
            Swal.fire(
                "Success",
                `Profile Picture Deleted Successfully`,
                "success"
            );
            setSummary((prevSummary) => ({
                ...prevSummary,
                Image: null,
            }));
            setimage_state(null);
        } else if (Image_Response.status == 401) {
            // Swal.fire("Error", `${Image_Response.data.message} `, "error");
            window.location.href = "/Login";
        } else if (Image_Response.status == 400) {
            Swal.fire("Error", `${Image_Response.data.message} `, "error");
        } else if (Image_Response.status == 409) {
            Swal.fire("Error!", `${Image_Response.data.message} `, "error");
        } else if (Image_Response.status == 500) {
            Swal.fire("Error!", `Internal Server Error   `, "error");
        } else {
            Swal.fire(
                "Error!",
                `Something Went Wrong ,please trye again latter, ${Image_Response.data.message} `,
                "error"
            );
        }
    } catch (error) {
        Swal.fire(
            "Error!",
            `Something Went Wrong ,please trye again latter`,
            "error"
        );
    } finally {
        setimageDeleteLoading(false);
    }
}
export default Delete_Profile_Pic;
