const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { Freelancers } = require("../../Models/Freelnacer");
const { Refresh_tokens } = require("../../Models/RefreshTokens");
const { Clients } = require("../../Models/Client");

router.get("/", async (req, res) => {
    const {
        Freelancer_ACCESS_TOKEN_SECRET,
        Freelancer_REFRESH_TOKEN_SECRET,
        Client_ACCESS_TOKEN_SECRET,
        Client_REFRESH_TOKEN_SECRET,
    } = process.env;

    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;
    if (!accessToken || !refreshToken) {
        if (accessToken)
            res.clearCookie("accessToken", {
                httpOnly: true,
                sameSite: "None",
                secure: true,
            });
        if (refreshToken)
            res.clearCookie("refreshToken", {
                httpOnly: true,
                sameSite: "None",
                secure: true,
            });
        
        return res.status(401).json({
            message: "Unauthorized : No tokens found",
        });
    }
    const verifyToken = (token, secret) => {
        return new Promise((resolve, reject) => {
            jwt.verify(token, secret, (err, decoded) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(decoded);
                }
            });
        });
    };

    const handleTokenExpired = async (
        refreshToken,
        refreshTokenSecret,
        accessTokenSecret
    ) => {
        if (!refreshToken) {
            // res.clearCookie("accessToken");
            // res.clearCookie("refreshToken");
            return res.status(401).json({
                message: "Unauthorized: Refresh token is missing",
            });
        }

        const found_in_DB = await Refresh_tokens.findOne({
            where: { token: refreshToken },
        });
        if (!found_in_DB) {
            // res.clearCookie("accessToken");
            // res.clearCookie("refreshToken");
            return res.status(401).json({
                message: "Unauthorized: Invalid refresh token",
            });
        }

        return new Promise((resolve, reject) => {
            jwt.verify(
                refreshToken,
                refreshTokenSecret,
                async (err, decoded) => {
                    if (err) {
                        // res.clearCookie("accessToken");
                        // res.clearCookie("refreshToken");
                        return res.status(401).json({
                            message: "Unauthorized: Invalid refresh token",
                        });
                    }

                    const newAccessToken = jwt.sign(
                        { userId: decoded.userId, userType: decoded.userType },
                        accessTokenSecret,
                        { expiresIn: "1h" }
                    );

                    res.cookie("accessToken", newAccessToken, {
                        httpOnly: true,
                        sameSite: "None",
                        secure: true,
                        maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
                    });

                    let user = await Freelancers.findOne({
                        where: { id: decoded.userId },
                    });
                    let userType = "freelancer";

                    if (!user) {
                        user = await Clients.findOne({
                            where: { id: decoded.userId },
                        });
                        userType = "client";
                    }

                    if (!user) {
                        // res.clearCookie("accessToken");
                        // res.clearCookie("refreshToken");
                        return res.status(404).json({
                            message: "Unauthorized: User not found",
                        });
                    }
                    resolve({ userType, userId: user.id });
                }
            );
        });
    };

    try {
        let decoded;
        let userType;
        let user;

        // First check as a freelancer
        try {
            // if (!accessToken) throw new Error("No access token found");
            decoded = await verifyToken(
                accessToken,
                Freelancer_ACCESS_TOKEN_SECRET
            );
            user = await Freelancers.findOne({ where: { id: decoded.userId } });
            userType = "freelancer";
        } catch (err) {
            if (err.name === "TokenExpiredError" || !accessToken) {
                try {
                    const result = await handleTokenExpired(
                        refreshToken,
                        Freelancer_REFRESH_TOKEN_SECRET,
                        Freelancer_ACCESS_TOKEN_SECRET
                    );
                    return res.status(200);
                    //     .json({
                    //     message:
                    //         "check auth true, Access token refreshed successfully",
                    //     // ..result,
                    // });
                } catch (err) {
                    console.log("Error refreshing freelancer token:", err);
                }
            }
        }

        // If not a freelancer, check as a client
        if (!user) {
            try {
                decoded = await verifyToken(
                    accessToken,
                    Client_ACCESS_TOKEN_SECRET
                );
                user = await Clients.findOne({ where: { id: decoded.userId } });
                userType = "client";
            } catch (err) {
                if (err.name === "TokenExpiredError" || !accessToken) {
                    try {
                        const result = await handleTokenExpired(
                            refreshToken,
                            Client_REFRESH_TOKEN_SECRET,
                            Client_ACCESS_TOKEN_SECRET
                        );
                        return res.status(200).json({
                            message:
                                "check auth true, Access token refreshed successfully",
                            // ..result,
                        });
                    } catch (err) {
                        console.log("Error refreshing client token:", err);
                    }
                }
            }
        }

        // If no user found for both freelancer and client
        if (!user) {
            // res.clearCookie("accessToken");
            // res.clearCookie("refreshToken");
            return res
                .status(401)
                .json({ message: "Unauthorized: Invalid access token" });
        }

        return res.status(200).json({
            message: "check auth: true, Access token is valid",
            userType: userType,
            userId: user.id,
        });
    } catch (err) {
        console.log(err);
        // res.clearCookie("accessToken");
        // res.clearCookie("refreshToken");
        // return res.status(500).json({ message: err.message });
    }
});

module.exports = router;
