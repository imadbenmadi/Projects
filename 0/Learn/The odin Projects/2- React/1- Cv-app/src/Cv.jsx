// // eslint-disable-next-line no-unused-vars
// import React from "react";
// // eslint-disable-next-line react/prop-types
// export default function Cv({ name, email, phone, title, place }) {
//   return (
//     <>
//       <span className="cv_block1 ">
//         <sapn style={{ flex: "62%" }}>
//           <div className="name">{name}</div>
//           <div className="title">{title}</div>
//         </sapn>
//         <span style={{ flex: "38%" }}>
//           <div className="place flex_center">
//             <img src="/place.png" alt="" />
//             <span
//               style={{ wordBreak: "break-word", justifyContent: "flex-start" }}
//             >
//               {place}
//             </span>
//           </div>
//           <div className="phone flex_center">
//             <img src="/call.png" alt="" />
//             <span
//               style={{ wordBreak: "break-word", justifyContent: "flex-start" }}
//             >
//               {phone}
//             </span>
//           </div>
//           <div className="email flex_center">
//             <img src="/email.png" alt="" />
//             <span
//               style={{ wordBreak: "break-word", justifyContent: "flex-start" }}
//             >
//               {email}
//             </span>
//           </div>
//         </span>
//       </span>
//       <hr />
//     </>
//   );
// }
import React from "react";

export default function Cv({ name, email, phone, title, place }) {
  return (
    <>
      <div className="cv_block1">
        <div style={{ flex: "62%" }}>
          <div className="name">{name}</div>
          <div className="title">{title}</div>
        </div>
        <div style={{ flex: "38%" }}>
          <div className="place phone-email-container">
            <img src="/place.png" alt="" />
            <span>{place}</span>
          </div>
          <div className="phone phone-email-container">
            <img src="/call.png" alt="" />
            <span>{phone}</span>
          </div>
          <div className="email phone-email-container">
            <img src="/email.png" alt="" />
            <span>{email}</span>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
}
