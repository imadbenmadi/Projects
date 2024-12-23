const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { Refresh_tokens } = require("../../../Models/RefreshTokens");

router.get("/", async (req, res) => {
    const adminAccessTokenSecret = process.env.ADMIN_ACCESS_TOKEN_SECRET;
    const adminRefreshTokenSecret = process.env.ADMIN_REFRESH_TOKEN_SECRET;
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
            res.clearCookie("accessToken");
            res.clearCookie("refreshToken");
            return res.status(401).json({
                message: "Unauthorized: Refresh token is missing",
            });
        }

        const found_in_DB = await Refresh_tokens.findOne({
            where: { token: refreshToken },
        });
        if (!found_in_DB) {
            res.clearCookie("accessToken");
            res.clearCookie("refreshToken");
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
                        { userId: decoded.userId, userType: "Admin" },
                        accessTokenSecret,
                        { expiresIn: "1h" }
                    );

                    res.cookie("accessToken", newAccessToken, {
                        httpOnly: true,
                        sameSite: "None",
                        secure: true,
                        maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
                    });

                    return res.status(200).json({
                        message:
                            "admin check auth true, Access token refreshed successfully",
                    });
                }
            );
        });
    };

    try {
        const decoded = await verifyToken(accessToken, adminAccessTokenSecret);
        return res.status(200).json({
            message: "check auth: true, Access token is valid",
        });
    } catch (err) {
        if (err.name === "TokenExpiredError" || !accessToken) {
            return await handleTokenExpired(
                refreshToken,
                adminRefreshTokenSecret,
                adminAccessTokenSecret
            );
        }
        // res.clearCookie("accessToken");
        // res.clearCookie("refreshToken");
        return res
            .status(401)
            .json({ message: "Unauthorized: Access token is invalid" });
    }
});

module.exports = router;
