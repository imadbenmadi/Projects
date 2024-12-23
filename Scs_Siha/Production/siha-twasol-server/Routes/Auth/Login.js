const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { Malad } = require("../../Models/Malad");
const { Director } = require("../../Models/Director");
const { Doctor } = require("../../Models/Doctor");
const { Worker } = require("../../Models/Worker");
const { Refresh_tokens } = require("../../Models/RefreshTokens");

const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(409).json({ message: "Missing Data" });
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
            return res.status(409).json({ message: "Invalid email" });
        }
        let user = null;
        let userType = null;
        user = await Director.findOne({ where: { email: email } });
        userType = "Director";
        if (!user) {
            user = await Malad.findOne({ where: { email: email } });
            userType = "Malad";
        }
        if (!user) {
            user = await Doctor.findOne({ where: { email: email } });
            userType = "Doctor";
        }
        if (!user) {
            user = await Worker.findOne({ where: { email: email } });
            userType = "Worker";
        }
        if (!user) {
            return res.status(401).json({
                message: "Username or password isn't correct",
            });
        } else if (user && userType && user.password === password) {
            const Access_Secrute =
                userType == "Director"
                    ? process.env.Director_ACCESS_TOKEN_SECRET
                    : userType == "Malad"
                    ? process.env.Malad_ACCESS_TOKEN_SECRET
                    : userType == "Doctor"
                    ? process.env.Doctor_ACCESS_TOKEN_SECRET
                    : userType == "Worker"
                    ? process.env.Worker_ACCESS_TOKEN_SECRET
                    : null;
            const Refresh_Secrute =
                userType == "Director"
                    ? process.env.Director_REFRESH_TOKEN_SECRET
                    : userType == "Malad"
                    ? process.env.Malad_REFRESH_TOKEN_SECRET
                    : userType == "Doctor"
                    ? process.env.Doctor_REFRESH_TOKEN_SECRET
                    : userType == "Worker"
                    ? process.env.Worker_REFRESH_TOKEN_SECRET
                    : null;

            const accessToken = jwt.sign(
                { userId: user.id, userType: userType },
                Access_Secrute,
                { expiresIn: "1h" }
            );
            const refreshToken = jwt.sign(
                { userId: user.id, userType: userType },
                Refresh_Secrute,
                { expiresIn: "1d" }
            );

            try {
                await Refresh_tokens.create({
                    userId: user.id,
                    userType: userType,
                    token: refreshToken,
                });
            } catch (err) {
                console.log(err);
                return res.status(500).json({
                    message: err,
                });
            }
            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                sameSite: "None",
                secure: true,
                maxAge: 60 * 60 * 1000,
            });
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                sameSite: "None",
                secure: true,
                maxAge: 24 * 60 * 60 * 1000,
            });

            return res.status(200).json({
                message: "Logged In Successfully",
                userId: user.id,
                userType: userType,
            });
        } else {
            return res.status(401).json({
                message: "Username or password isn't correct",
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err });
    }
};
router.post("/", handleLogin);

module.exports = router;
