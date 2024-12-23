const jwt = require("jsonwebtoken");
require("dotenv").config();
const { Clients } = require("../Models/Client");
const { Refresh_tokens } = require("../Models/RefreshTokens");

const verifyUser = async (req, res, next) => {
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
    try {
        let decoded = null;
        decoded = jwt.verify(
            accessToken,
            process.env.Client_ACCESS_TOKEN_SECRET
        );

        if (!decoded.userId || !decoded.userType)
            return res.status(401).json({
                message: "unauthorized : Invalid tokens ",
            });
        else if (decoded.userType != "client") {
            return res.status(401).json({
                message: "unauthorized : Invalid tokens ",
            });
        } else if (decoded.userType == "client") {
            let client = await Clients.findOne({
                where: { id: decoded.userId },
            });
            if (!client) {
                return res.status(401).json({
                    message: "unauthorized : Invalid tokens ",
                });
            }
            // req.user = client;
        } else
            return res.status(401).json({
                message: "unauthorized : Invalid tokens ",
            });

        req.decoded = decoded;
        return next();
    } catch (err) {
        console.log(err);
        if (err.name !== "TokenExpiredError" || !refreshToken) {
            return res.status(401).json({ message: "Invalid tokens" });
        } else if (err.name === "TokenExpiredError" || !accessToken) {
            if (!refreshToken) {
                return res.status(401).json({
                    message: "unauthorized : Refresh token required",
                });
            }

            try {
                const foundInDB = await Refresh_tokens.findOne({
                    where: {
                        token: refreshToken,
                    },
                });

                if (!foundInDB) {
                    return res.status(401).json({
                        message: "unauthorized : Invalid tokens",
                    });
                }

                jwt.verify(
                    refreshToken,
                    process.env.Client_REFRESH_TOKEN_SECRET,
                    async (err, decoded) => {
                        if (err || foundInDB.userId !== decoded.userId) {
                            return res.status(401).json({
                                message: "unauthorized : Invalid tokens",
                            });
                        }
                        let newAccessToken = null;
                        if (decoded.userType == "client") {
                            newAccessToken = jwt.sign(
                                {
                                    userId: decoded.userId,
                                    userType: decoded.userType,
                                },
                                process.env.Client_ACCESS_TOKEN_SECRET,
                                { expiresIn: "1h" }
                            );
                            res.cookie("accessToken", newAccessToken, {
                                httpOnly: true,
                                sameSite: "None",
                                secure: true,
                                maxAge: 60 * 60 * 1000,
                            });

                            req.decoded = decoded;
                        } else
                            res.status(401).json({
                                message: "unauthorized  : Invalid tokens",
                            });

                        return next();
                    }
                );
            } catch (refreshErr) {
                return res.status(401).json({ message: "Invalid tokens" });
            }
        } else {
            return res.status(401).json({ message: "Invalid tokens" });
        }
    }
};

module.exports = verifyUser;
