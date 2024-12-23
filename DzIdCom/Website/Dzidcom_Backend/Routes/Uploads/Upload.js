const express = require("express");
const router = express.Router();
const Upload_Client_ProfilePic = require("./ProfilePic/Client_ProfilePic");
const Delete_Client_ProfilePic = require("./ProfilePic/Client_ProfilePic_Delete");
const Upload_Freelancer_ProfilePic = require("./ProfilePic/Freelancer_ProfilePic");
const Delete_Freelancer_ProfilePic = require("./ProfilePic/Freelancer_ProfilePic_Delete");
const Upload_Payment_ScreenShot = require("./Payment_screenShots/Payment_screenShots");
const Delete_Payment_ScreenShot = require("./Payment_screenShots/Payment_screenShots_Delete");
const Upload_Freelancer_PortfolioItem = require("./PortfolioItems/Portfolioitem");
const Delete_Freelancer_PortfolioItem = require("./PortfolioItems/Portfolioitem_Delete");
const Upload_Work = require("./Work/Work");
const Freelancer_Middlware = require("../../Middlewares/Freelancer");
const Client_Middlware = require("../../Middlewares/Client");
const cookieParser = require("cookie-parser");
const formidableMiddleware = require("express-formidable");
router.use(cookieParser());
router.use(formidableMiddleware());

router.post(
    "/Client/ProfilePic",
    // (req, res, next) => {
    //     req.body = req.fields;
    //     next();
    // },
    Client_Middlware,
    Upload_Client_ProfilePic
);
router.post(
    "/Freelancer/ProfilePic",
    // (req, res, next) => {
    //     req.body = req.fields;
    //     next();
    // },
    Freelancer_Middlware,
    Upload_Freelancer_ProfilePic
);
router.delete(
    "/Client/ProfilePic",
    // (req, res, next) => {
    //     req.body = req.fields;
    //     next();
    // },
    Client_Middlware,
    Delete_Client_ProfilePic
);
router.delete(
    "/Freelancer/ProfilePic",
    // (req, res, next) => {
    //     req.body = req.fields;
    //     next();
    // },
    Freelancer_Middlware,
    Delete_Freelancer_ProfilePic
);

router.post(
    "/Payment",
    (req, res, next) => {
        req.body = req.fields;
        next();
    },
    Client_Middlware,
    Upload_Payment_ScreenShot
);
router.delete(
    "/Payment/:projectId",
    // (req, res, next) => {
    //     req.body = req.fields;
    //     next();
    // },
    Client_Middlware,
    Delete_Payment_ScreenShot
);
router.post(
    "/Work",
    (req, res, next) => {
        req.body = req.fields;
        next();
    },
    Freelancer_Middlware,
    Upload_Work
);
router.post(
    "/Freelancer/PortfolioItem",
    // (req, res, next) => {
    //     req.body = req.fields;
    //     next();
    // },
    Freelancer_Middlware,
    Upload_Freelancer_PortfolioItem
);
router.delete(
    "/Freelancer/PortfolioItem",
    // (req, res, next) => {
    //     req.body = req.fields;
    //     next();
    // },
    Freelancer_Middlware,
    Delete_Freelancer_PortfolioItem
);

module.exports = router;
