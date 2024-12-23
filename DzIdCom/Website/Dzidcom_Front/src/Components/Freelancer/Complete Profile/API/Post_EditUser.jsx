import Swal from "sweetalert2";
import Axios from "axios";
async function handleEdite(
    values,
    set_user,
    Link,
    image_state,
    { setSubmitting }
) {
    setSubmitting(true);
    try {
        if (image_state) {
            let formData = new FormData();
            formData.append("ProfilePic", image_state);
            let Image_Response = await Axios.post(
                `http://localhost:3000/upload/Freelancer/ProfilePic`,
                formData,
                {
                    withCredentials: true,
                    validateStatus: () => true,
                }
            );
            if (Image_Response.status == 200) {
                // set_user({
                //     profile_pic_link: Image_Response.data.profile_pic_link,
                // });
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
        }
        let response = await Axios.put(
            `http://localhost:3000/Freelancers/${values.userId}/Profile`,
            values,
            {
                withCredentials: true,
                validateStatus: () => true,
            }
        );
        if (response.status == 200) {
            set_user(response.data.user);
            if (Link) {
                window.location.href = Link;
            }
        } else if (response.status == 401) {
            window.location.href = "/Login";
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
export default handleEdite;
