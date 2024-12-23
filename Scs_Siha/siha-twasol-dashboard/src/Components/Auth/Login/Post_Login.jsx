import Swal from "sweetalert2";
import Axios from "axios";
async function handleLogin(values, { setSubmitting }) {
    try {
        let response = await Axios.post(
            "http://localhost:3000/Admin_Login",
            values,
            {
                withCredentials: true,
                validateStatus: () => true,
            }
        );

        if (response.status == 200) {
            window.location.href = `/`;
        } else if (response.status == 401) {
            setSubmitting(false);
            Swal.fire("خطأ!", "اسم المستخدم أو كلمة المرور غير صحيحة", "error");
        } else if (response.status == 409) {
            setSubmitting(false);
            Swal.fire("خطأ!", `${response.data.message} `, "error");
        } else if (response.status == 500) {
            setSubmitting(false);
            Swal.fire("خطأ!", `خطأ في الخادم الداخلي   `, "error");
        } else if (response.status == 429) {
            setSubmitting(false);
            Swal.fire(
                "خطأ!",
                `عدد كبير جدًا من الطلبات، حاول مرة أخرى لاحقًا\n  `,
                "error"
            );
        } else {
            setSubmitting(false);
            Swal.fire("خطأ!", `حدث خطأ ما ,`, "error");
        }
    } catch (error) {
        setSubmitting(false);
        Swal.fire("خطأ!", `حدث خطأ ما `, "error");
    }

    // setSubmitting(false);
}
export default handleLogin;
