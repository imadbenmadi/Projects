const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { Director } = require("../../Models/Director");
const { Malad } = require("../../Models/Malad");
const { Doctor } = require("../../Models/Doctor");
const { Worker } = require("../../Models/Worker");
const { Refresh_tokens } = require("../../Models/RefreshTokens");

// Mapping object for user types and their respective secrets
const userTypeMap = {
    Director: {
        model: Director,
        accessSecret: process.env.Director_ACCESS_TOKEN_SECRET,
        refreshSecret: process.env.Director_REFRESH_TOKEN_SECRET,
    },
    Malad: {
        model: Malad,
        accessSecret: process.env.Malad_ACCESS_TOKEN_SECRET,
        refreshSecret: process.env.Malad_REFRESH_TOKEN_SECRET,
    },
    Doctor: {
        model: Doctor,
        accessSecret: process.env.Doctor_ACCESS_TOKEN_SECRET,
        refreshSecret: process.env.Doctor_REFRESH_TOKEN_SECRET,
    },
    Worker: {
        model: Worker,
        accessSecret: process.env.Worker_ACCESS_TOKEN_SECRET,
        refreshSecret: process.env.Worker_REFRESH_TOKEN_SECRET,
    },
};

// Function to verify tokens
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

// Function to handle expired access tokens
const handleTokenExpired = async (res, refreshToken, userType) => {
    const userSecrets = userTypeMap[userType];
    const found_in_DB = await Refresh_tokens.findOne({
        where: { token: refreshToken, userType },
    });

    if (!found_in_DB) {
        throw new Error("Invalid refresh token");
    }

    return new Promise((resolve, reject) => {
        jwt.verify(
            refreshToken,
            userSecrets.refreshSecret,
            async (err, decoded) => {
                if (err) {
                    reject(new Error("Invalid refresh token"));
                }

                const newAccessToken = jwt.sign(
                    { userId: decoded.userId, userType: decoded.userType },
                    userSecrets.accessSecret,
                    { expiresIn: "1h" }
                );

                res.cookie("accessToken", newAccessToken, {
                    httpOnly: true,
                    sameSite: "None",
                    secure: true,
                    maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
                });

                let user = await userSecrets.model.findOne({
                    where: { id: decoded.userId },
                });
                if (!user) {
                    reject(new Error("User not found"));
                }

                resolve({ userType, userId: user.id });
            }
        );
    });
};

router.get("/", async (req, res) => {
    const { accessToken, refreshToken } = req.cookies;

    if (!accessToken || !refreshToken) {
        res.clearCookie("accessToken", {
            httpOnly: true,
            sameSite: "None",
            secure: true,
        });
        res.clearCookie("refreshToken", {
            httpOnly: true,
            sameSite: "None",
            secure: true,
        });
        return res
            .status(401)
            .json({ message: "Unauthorized: No tokens found" });
    }

    try {
        let decoded;
        let userType;
        let user;

        for (const type in userTypeMap) {
            const userSecrets = userTypeMap[type];

            try {
                decoded = await verifyToken(
                    accessToken,
                    userSecrets.accessSecret
                );
                user = await userSecrets.model.findOne({
                    where: { id: decoded.userId },
                });
                userType = type;
                break;
            } catch (err) {
                if (err.name === "TokenExpiredError") {
                    try {
                        const result = await handleTokenExpired(
                            res,
                            refreshToken,
                            type
                        );
                        return res.status(200).json({
                            message:
                                "check auth true, Access token refreshed successfully",
                            userType: result.userType,
                            userId: result.userId,
                        });
                    } catch (refreshErr) {
                        console.log(
                            `Error refreshing ${type} token:`,
                            refreshErr
                        );
                    }
                }
            }
        }

        if (!user) {
            res.clearCookie("accessToken", {
                httpOnly: true,
                sameSite: "None",
                secure: true,
            });
            res.clearCookie("refreshToken", {
                httpOnly: true,
                sameSite: "None",
                secure: true,
            });
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
        res.clearCookie("accessToken", {
            httpOnly: true,
            sameSite: "None",
            secure: true,
        });
        res.clearCookie("refreshToken", {
            httpOnly: true,
            sameSite: "None",
            secure: true,
        });
        return res.status(500).json({ message: err.message });
    }
});

module.exports = router;
