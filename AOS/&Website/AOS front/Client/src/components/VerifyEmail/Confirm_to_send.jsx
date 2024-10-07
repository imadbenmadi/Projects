import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { selectInfo } from "../../Redux/reducer";
import { useNavigate } from "react-router-dom";

function Confirm_to_send({ setConfirm_to_send_state, startResendTimer }) {
  const [loading_toSend, setloading_toSend] = useState(false);

  const { user } = useSelector(selectInfo);
  const nav = useNavigate();
  const handle_send_email = async (userId) => {
    console.log(userId);
    // setloading_toSend(true);
    try {
      const response = await axios.post(
        `https://aos.skate-consult.com/Send_Verification_Email/${userId}`,
        {},
        {
          withCredentials: true,
          validateStatus: () => true,
        }
      );

      switch (response.status) {
        case 200:
          setloading_toSend(false);
          startResendTimer(); // Assuming this function is defined elsewhere
          setConfirm_to_send_state(true); // Assuming setConfirm_to_send_state is properly declared
          Swal.fire("Success!", "Email sent successfully", "success");

          break;
        case 429:
          Swal.fire(
            "Error!",
            "Too many requests, please try again later",
            "error"
          );
          break;
        case 401:
          Swal.fire("Error!", "Unauthorized action", "error");
          break;
        case 409:
          Swal.fire(
            "Error!",
            response.data.message || "Conflict occurred",
            "error"
          );
          break;
        case 404:
          Swal.fire("Error!", "User not found", "error");
          break;
        case 400:
          Swal.fire("Error!", response.data.message || "Bad request", "error");
          break;
        case 500:
          Swal.fire("Error!", "Internal Server Error", "error");
          break;
        default:
          Swal.fire("Error!", "Unexpected error occurred", "error");
      }
    } catch (error) {
      Swal.fire("Error!", "Error sending email", "error");
    } finally {
      setloading_toSend(false);
    }
  };

  return (
    <div className=" pt-32 flex flex-col items-center justify-center text-black_text">
      <div className=" ml-5">
        <div className="text-lg font-bold mb-4 text-green">
          Welcome to the Verification Page
        </div>
        <div className="mb-2 text-gray">Your Name: {user?.FirstName}</div>
        <div className="mb-2 text-gray">Your Email: {user?.Email}</div>
        <div className="mb-4">
          Confirming your email will allow you to use the website freely.
        </div>
        <div>We will send you a code to your email. Please type it below.</div>
      </div>

      <button
        className={`mt-4 ${
          loading_toSend ? "" : "bg-green-500 hover:bg-green-700"
        }  text-white px-4 py-2 rounded-md cursor-pointer`}
        onClick={() => handle_send_email(user._id)}
        disabled={loading_toSend}
      >
        {loading_toSend ? (
          <span className="small-loader  w-full m-auto"></span>
        ) : (
          "Send Email"
        )}
      </button>
    </div>
  );
}

export default Confirm_to_send;
