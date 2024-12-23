const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { Director } = require("../../Models/Director");
const { Malad } = require("../../Models/Malad");
const { Doctor } = require("../../Models/Doctor");
const { Worker } = require("../../Models/Worker");
const { Refresh_tokens } = require("../../Models/RefreshTokens");

router.get("/", async (req, res) => {
    const {
        Director_ACCESS_TOKEN_SECRET,
        Director_REFRESH_TOKEN_SECRET,
        Malad_ACCESS_TOKEN_SECRET,
        Malad_REFRESH_TOKEN_SECRET,
        Doctor_ACCESS_TOKEN_SECRET,
        Doctor_REFRESH_TOKEN_SECRET,
        Worker_ACCESS_TOKEN_SECRET,
        Worker_REFRESH_TOKEN_SECRET,
    } = process.env;

    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    if (!accessToken || !refreshToken) {
        if (accessToken) {
            res.clearCookie("accessToken", {
                httpOnly: true,
                sameSite: "None",
                secure: true,
            });
        }
        if (refreshToken) {
            res.clearCookie("refreshToken", {
                httpOnly: true,
                sameSite: "None",
                secure: true,
            });
        }

        return res.status(401).json({
            message: "Unauthorized: No tokens found",
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
            return res.status(401).json({
                message: "Unauthorized: Refresh token is missing",
            });
        }

        const found_in_DB = await Refresh_tokens.findOne({
            where: { token: refreshToken },
        });

        if (!found_in_DB) {
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

                    let user;
                    if (decoded.userType === "Director") {
                        user = await Director.findOne({
                            where: { id: decoded.userId },
                        });
                    } else if (decoded.userType === "Malad") {
                        user = await Malad.findOne({
                            where: { id: decoded.userId },
                        });
                    } else if (decoded.userType === "Doctor") {
                        user = await Doctor.findOne({
                            where: { id: decoded.userId },
                        });
                    } else if (decoded.userType === "Worker") {
                        user = await Worker.findOne({
                            where: { id: decoded.userId },
                        });
                    }

                    if (!user) {
                        return res.status(404).json({
                            message: "Unauthorized: User not found",
                        });
                    }

                    resolve({ userType: decoded.userType, userId: user.id });
                }
            );
        });
    };

    try {
        let decoded;
        let userType;
        let user;

        // Check as Director
        try {
            decoded = await verifyToken(
                accessToken,
                Director_ACCESS_TOKEN_SECRET
            );
            user = await Director.findOne({ where: { id: decoded.userId } });
            userType = "Director";
        } catch (err) {
            if (err.name === "TokenExpiredError" || !accessToken) {
                try {
                    const result = await handleTokenExpired(
                        refreshToken,
                        Director_REFRESH_TOKEN_SECRET,
                        Director_ACCESS_TOKEN_SECRET
                    );
                    return res.status(200).json({
                        message:
                            "check auth true, Access token refreshed successfully",
                    });
                } catch (err) {
                    console.log("Error refreshing Director token:", err);
                }
            }
        }

        // Check as Malad
        if (!user) {
            try {
                decoded = await verifyToken(
                    accessToken,
                    Malad_ACCESS_TOKEN_SECRET
                );
                user = await Malad.findOne({ where: { id: decoded.userId } });
                userType = "Malad";
            } catch (err) {
                if (err.name === "TokenExpiredError" || !accessToken) {
                    try {
                        const result = await handleTokenExpired(
                            refreshToken,
                            Malad_REFRESH_TOKEN_SECRET,
                            Malad_ACCESS_TOKEN_SECRET
                        );
                        return res.status(200).json({
                            message:
                                "check auth true, Access token refreshed successfully",
                        });
                    } catch (err) {
                        console.log("Error refreshing Malad token:", err);
                    }
                }
            }
        }

        // Check as Doctor
        if (!user) {
            try {
                decoded = await verifyToken(
                    accessToken,
                    Doctor_ACCESS_TOKEN_SECRET
                );
                user = await Doctor.findOne({ where: { id: decoded.userId } });
                userType = "Doctor";
            } catch (err) {
                if (err.name === "TokenExpiredError" || !accessToken) {
                    try {
                        const result = await handleTokenExpired(
                            refreshToken,
                            Doctor_REFRESH_TOKEN_SECRET,
                            Doctor_ACCESS_TOKEN_SECRET
                        );
                        return res.status(200).json({
                            message:
                                "check auth true, Access token refreshed successfully",
                        });
                    } catch (err) {
                        console.log("Error refreshing Doctor token:", err);
                    }
                }
            }
        }

        // Check as Worker
        if (!user) {
            try {
                decoded = await verifyToken(
                    accessToken,
                    Worker_ACCESS_TOKEN_SECRET
                );
                user = await Worker.findOne({ where: { id: decoded.userId } });
                userType = "Worker";
            } catch (err) {
                if (err.name === "TokenExpiredError" || !accessToken) {
                    try {
                        const result = await handleTokenExpired(
                            refreshToken,
                            Worker_REFRESH_TOKEN_SECRET,
                            Worker_ACCESS_TOKEN_SECRET
                        );
                        return res.status(200).json({
                            message:
                                "check auth true, Access token refreshed successfully",
                        });
                    } catch (err) {
                        console.log("Error refreshing Worker token:", err);
                    }
                }
            }
        }

        // If no user found for any user type
        if (!user) {
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
        return res.status(500).json({ message: err.message });
    }
});

module.exports = router;
