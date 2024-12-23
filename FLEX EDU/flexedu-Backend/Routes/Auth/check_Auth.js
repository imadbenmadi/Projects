const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Students = require("../../Models/Student");
const Refresh_tokens = require("../../Models/RefreshTokens");
const Teachers = require("../../Models/Teacher");

router.get("/", async (req, res) => {
    const {
        Student_ACCESS_TOKEN_SECRET,
        Student_REFRESH_TOKEN_SECRET,
        Teacher_ACCESS_TOKEN_SECRET,
        Teacher_REFRESH_TOKEN_SECRET,
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

        return res.sendStatus(401);
        //     .json({
        //     message: "Unauthorized : No tokens found",
        // });
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
            return res.sendStatus(401);
            //     .json({
            //     message: "Unauthorized: Refresh token is missing",
            // });
        }

        const found_in_DB = await Refresh_tokens.findOne({
            where: { token: refreshToken },
        });
        if (!found_in_DB) {
            // res.clearCookie("accessToken");
            // res.clearCookie("refreshToken");
            return res.sendStatus(401);
            //     .json({
            //     message: "Unauthorized: Invalid refresh token",
            // });
        }

        return new Promise((resolve, reject) => {
            jwt.verify(
                refreshToken,
                refreshTokenSecret,
                async (err, decoded) => {
                    if (err) {
                        // res.clearCookie("accessToken");
                        // res.clearCookie("refreshToken");
                        return res.sendStatus(401);
                        //     .json({
                        //     message: "Unauthorized: Invalid refresh token",
                        // });
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

                    let user = await Students.findOne({
                        where: { id: decoded.userId },
                    });
                    let userType = "student";

                    if (!user) {
                        user = await Teachers.findOne({
                            where: { id: decoded.userId },
                        });
                        userType = "teacher";
                    }

                    if (!user) {
                        // res.clearCookie("accessToken");
                        // res.clearCookie("refreshToken");
                        return res.sendStatus(404);
                        //     .json({
                        //     message: "Unauthorized: User not found",
                        // });
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

        // First check as a Student
        try {
            // if (!accessToken) throw new Error("No access token found");
            decoded = await verifyToken(
                accessToken,
                Student_ACCESS_TOKEN_SECRET
            );
            user = await Students.findOne({ where: { id: decoded.userId } });
            userType = "student";
        } catch (err) {
            if (err.name === "TokenExpiredError" || !accessToken) {
                try {
                    const result = await handleTokenExpired(
                        refreshToken,
                        Student_REFRESH_TOKEN_SECRET,
                        Student_ACCESS_TOKEN_SECRET
                    );
                    return res.sendStatus(200);
                } catch (err) {
                    console.log("Error refreshing Student token:", err);
                }
            }
        }

        // If not a Student, check as a Teacher
        if (!user) {
            try {
                decoded = await verifyToken(
                    accessToken,
                    Teacher_ACCESS_TOKEN_SECRET
                );
                user = await Teachers.findOne({
                    where: { id: decoded.userId },
                });
                userType = "teacher";
            } catch (err) {
                if (err.name === "TokenExpiredError" || !accessToken) {
                    try {
                        const result = await handleTokenExpired(
                            refreshToken,
                            Teacher_REFRESH_TOKEN_SECRET,
                            Teacher_ACCESS_TOKEN_SECRET
                        );
                        return res.sendStatus(200);
                    } catch (err) {
                        console.log("Error refreshing Teacher token:", err);
                    }
                }
            }
        }

        // If no user found for both Student and Teacher
        if (!user) {
            // res.clearCookie("accessToken");
            // res.clearCookie("refreshToken");
            return res.sendStatus(401);
            // .json({ message: "Unauthorized: Invalid access token" });
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
