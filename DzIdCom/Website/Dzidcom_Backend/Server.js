const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5173/",
    "http://localhost:5174",
    "http://localhost:5174/",
    // "http://localhost:3500",
    "https://dzidcom-front.vercel.app",
    "https://dashboard.dzidcom.skate.dz",
    "https://dashboard.dzidcom.skate.dz/",
    "https://dzidcom.skate.dz",
    "https://dzidcom.skate.dz/",
    "http://dzidcom-ensm.dz/",
    "http://api.dzidcom-ensm.dz/",
    "https://api.dzidcom-ensm.dz/",
    "https://dashboard.dzidcom-ensm.dz/",
    "http://dashboard.dzidcom-ensm.dz/",
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

app.use("/", express.static(path.join(__dirname, "/public")));
app.use("/", express.static(path.join(__dirname, "/public/ProfilePics")));
app.use("/", express.static(path.join(__dirname, "/public/Work")));
app.use("/", express.static(path.join(__dirname, "/Public/Portfolio")));

app.get("/", (req, res) => {
    res.send("Hello from DzidCom");
});
app.use("/check_Auth", require("./Routes/Auth/check_Auth"));
app.use("/Login", require("./Routes/Auth/Login"));
app.use("/Register", require("./Routes/Auth/Register"));
app.use("/Logout", require("./Routes/Auth/Logout"));

app.use("/Contact", require("./Routes/Contact"));
app.use("/Privacy", require("./Routes/Privacy"));
app.use("/Freelancers", require("./Routes/Freelancers"));
app.use("/Clients", require("./Routes/Clients"));
app.use("/upload", require("./Routes/Uploads/Upload"));

app.use("/Admin", require("./Routes/Admin/Admin"));
app.use("/Admin_Login", require("./Routes/Auth/Admin/Admin_Login"));
app.use("/Add_Admin", require("./Routes/Auth/Admin/Admin_Add"));
// app.use("/Admin_Logout", require("./Routes/Auth/Admin/Admin_Logout"));
app.use("/Admin_CheckAuth", require("./Routes/Auth/Admin/Admin_CheckAuth"));
app.use("/Messages", require("./Routes/Messages"));
const { Home_Feedbacks } = require("./Models/Feedbacks");
const { Clients } = require("./Models/Client");
const { Freelancers } = require("./Models/Freelnacer");
app.get("/Home_Feedbacks", async (req, res) => {
    const Feedbacks = await Home_Feedbacks.findAll({
        where: {},
        // include: [
        //     { model: Freelancers, as: "Freelancer" },
        //     { model: Clients, as: "Client" },
        // ],
        order: [["createdAt", "DESC"]],
    });

    res.status(200).json(Feedbacks);
});

app.listen(3000);

module.exports = app;
