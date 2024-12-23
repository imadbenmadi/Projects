const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { Freelancers } = require("../../Models/Freelnacer");
const { Clients } = require("../../Models/Client");
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
        user = await Clients.findOne({ where: { email: email } });
        userType = "client";
        if (!user) {
            user = await Freelancers.findOne({ where: { email: email } });
            userType = "freelancer";
        }
        if (!user) {
            return res.status(401).json({
                message: "Username or password isn't correct",
            });
        } else if (user && userType && user.password === password) {
            const Access_Secrute =
                userType == "client"
                    ? process.env.Client_ACCESS_TOKEN_SECRET
                    : userType == "freelancer"
                    ? process.env.Freelancer_ACCESS_TOKEN_SECRET
                    : null;
            const Refresh_Secrute =
                userType == "client"
                    ? process.env.Client_REFRESH_TOKEN_SECRET
                    : userType == "freelancer"
                    ? process.env.Freelancer_REFRESH_TOKEN_SECRET
                    : null;

            const accessToken = jwt.sign(
                { userId: user.id, userType: userType },
                // userType == "client"
                //     ? process.env.Client_ACCESS_TOKEN_SECRET
                //     : process.env.Freelancer_ACCESS_TOKEN_SECRET,
                Access_Secrute,
                { expiresIn: "1h" }
            );
            const refreshToken = jwt.sign(
                { userId: user.id, userType: userType },
                // userType == "client"
                // ? process.env.Client_REFRESH_TOKEN_SECRET
                // : process.env.Freelancer_REFRESH_TOKEN_SECRET,
                Refresh_Secrute,
                { expiresIn: "1d" }
            );

            try {
                await Refresh_tokens.create({
                    userId: user.id,
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
