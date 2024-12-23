import { motion } from "framer-motion";
import worring from "../assets/icon/Profile/worring.svg";
import dangerus from "../assets/icon/Profile/dangerus.svg";
import avatar from "../assets/icon/Profile/user-2-line.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectInfo } from "../Redux/reducer";
function NotificationCard() {
  const variants = {
    hidden: { opacity: 0, y: -20, transition: { duration: 1 } },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };
  const { userProfile } = useSelector(selectInfo);
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className=" max-md:top-14 max-md:fixed max-md:left-0 max-md:w-full     absolute h-fit overflow-hidden z-30 top-[200%] left-[-50%] flex flex-col px-5 py-6 font-semibold text-black bg-white rounded-3xl md:max-w-[380px]"
    >
      <div className="flex gap-5 justify-between pr-2 text-xl">
        <div className="flex-auto">Notification </div>
      </div>
      <div className=" w-full h-1 bg-slate-400 my-auto"></div>
      {!userProfile?.IsEmailVerified ? (
        <Link
          to={`/Verify_email/${userProfile._id}`}
          className="flex gap-3.5 mt-4 text-xs "
        >
          <div className="w-16 h-16 bg-rose-500 rounded-full flex  justify-center items-center ">
            <img
              loading="lazy"
              src={dangerus}
              className="shrink-0 self-center  rounded-full aspect-square h-10 w-10"
            />
          </div>

          <div className="flex-auto my-auto">Complete your information</div>
        </Link>
      ) : (
        <div>you don't have any notification</div>
      )}
      {/* <div className="flex gap-3.5 mt-2.5 text-xs">
        <div className="w-16 h-16 bg-orange-400 rounded-full flex  justify-center items-center ">
          <img
            loading="lazy"
            src={worring}
            className="shrink-0  aspect-square h-10 w-10"
          />
        </div>

        <div className="flex-auto my-auto">Complete your information</div>
      </div> */}
    </motion.div>
  );
}

export default NotificationCard;
