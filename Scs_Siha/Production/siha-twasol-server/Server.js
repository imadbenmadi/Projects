const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://scs-tawassolsihi.com/",
    "https://scs-tawassolsihi.com",
    "https://www.scs-tawassolsihi.com/",
    "https://dashboard.scs-tawassolsihi.com",
    "https://dashboard.scs-tawassolsihi.com/",
];
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error(`Not allowed by CORS , origin : ${origin}`));
        }
    },
    optionsSuccessStatus: 200,
};
const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Credentials", true);
    }
    next();
};
require("dotenv").config();

app.use(cookieParser());
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const { initializeDirectories } = require("./Helpers/Directory.helper");
initializeDirectories();
app.use("/", express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
    res.send("Hello from SCSTawassolSihi");
});
app.use("/check_Auth", require("./Routes/Auth/check_Auth"));
app.use("/Login", require("./Routes/Auth/Login"));
app.use("/Register", require("./Routes/Auth/Register"));
app.use("/Logout", require("./Routes/Auth/Logout"));

app.use("/Contact", require("./Routes/Contact"));
app.use("/Admin", require("./Routes/Admin/Admin"));
app.use("/Admin_Login", require("./Routes/Auth/Admin/Admin_Login"));
app.use("/Add_Admin", require("./Routes/Auth/Admin/Admin_Add"));
// app.use("/Admin_Logout", require("./Routes/Auth/Admin/Admin_Logout"));
app.use("/Admin_CheckAuth", require("./Routes/Auth/Admin/Admin_CheckAuth"));

app.use("/Directors", require("./Routes/Director"));
app.use("/Workers", require("./Routes/Worker"));
app.use("/Doctors", require("./Routes/Doctor"));
app.use("/Malads", require("./Routes/Malad"));

app.use("/Privacy", require("./Routes/Privacy"));
app.use("/Messages", require("./Routes/Messages"));

app.listen(3000);

module.exports = app;
