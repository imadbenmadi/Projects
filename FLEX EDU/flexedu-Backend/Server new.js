const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const fs = require("fs");

const allowedOrigins = [
    "http://api.flexedu-dz.com",
    "https://api.flexedu-dz.com",
    "https://dashboard.flexedu-dz.com",
    "http://dashboard.flexedu-dz.com",
    "https://flexedu-dz.com",
    "http://flexedu-dz.com",
];

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error(`Not allowed by CORS, origin: ${origin}`));
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

const ensureDirectoryExists = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
};

const directories = [
    "public/Courses_Pictures",
    "public/Courses_Videos",
    "public/Payment",
    "public/ProfilePics",
    "public/Summaries",
    "public/Summaries_Pictures",
];
directories.forEach((dir) => {
    ensureDirectoryExists(path.join(__dirname, dir));
});

// Serve static files with CORS headers from the public directory
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin);
        res.header("Access-Control-Allow-Credentials", "true");
    }
    next();
});

app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
    res.send("Hello from flexEducation");
});
app.use("/check_Auth", require("./Routes/Auth/check_Auth"));
app.use("/Login", require("./Routes/Auth/Login"));
app.use("/Register", require("./Routes/Auth/Register"));
app.use("/Logout", require("./Routes/Auth/Logout"));
app.use("/Contact", require("./Routes/Contact"));

// _________________________________________________________
app.use("/Students", require("./Routes/Students"));
app.use("/Teachers", require("./Routes/Teachers"));
app.use("/upload", require("./Routes/Uploads/Upload"));
app.use("/Geust", require("./Routes/Geust"));
// _________________________________________________________
app.use("/Admin", require("./Routes/Admin/Admin"));
app.use("/Admin_Login", require("./Routes/Auth/Admin/Admin_Login"));
app.use("/Add_Admin", require("./Routes/Auth/Admin/Admin_Add"));
app.use("/Admin_Logout", require("./Routes/Auth/Admin/Admin_Logout"));
app.use("/Admin_CheckAuth", require("./Routes/Auth/Admin/Admin_CheckAuth"));

app.listen(3000, () => console.log("Server running on port 3000"));

module.exports = app;
