const { Malad } = require("../../Models/Malad");
const fs = require("fs");
const path = require("path");
const EditeProfile = async (req, res) => {
    const userId = req.decoded.userId;
    const newData = req.body;
    const { profile_pic } = req.files || {}; // Destructure and handle when image is not provided

    try {
        const user = await Malad.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Check if birthDate is a valid date and set it to null if invalid or empty
        if (newData.birthDate) {
            const birthDate = new Date(newData.birthDate);
            if (isNaN(birthDate.getTime())) {
                newData.birthDate = null; // Set to null if invalid
            } else {
                // Format date for MySQL (YYYY-MM-DD)
                newData.birthDate = birthDate.toISOString().split("T")[0];
            }
        } else {
            newData.birthDate = null; // Set to null if empty
        }

        if (profile_pic) {
            // Handle image upload and validation as described before
            const allowedMimeTypes = [
                "image/jpeg",
                "image/png",
                "image/jpg",
                "image/heic",
            ];
            const fileExtension = path.extname(profile_pic.name).toLowerCase();

            if (
                !allowedMimeTypes.includes(profile_pic.mimetype) &&
                ![".jpeg", ".jpg", ".png", ".heic"].includes(fileExtension)
            ) {
                return res.status(400).json({
                    message: "Only JPEG, PNG, and HEIC images are allowed!",
                });
            }

            if (user.profile_pic) {
                const previousFilename = path.basename(user.profile_pic);
                const previousImagePath = path.join(
                    "public/ProfilePics",
                    previousFilename
                );
                try {
                    if (fs.existsSync(previousImagePath)) {
                        fs.unlinkSync(previousImagePath);
                    }
                } catch (error) {
                    console.error("Error deleting previous image:", error);
                }
            }

            const uniqueFilename = `ProfilePic-${userId}-${Date.now()}${fileExtension}`;
            const targetPath = path.join("public/ProfilePics", uniqueFilename);
            fs.copyFileSync(profile_pic.path, targetPath);
            fs.unlinkSync(profile_pic.path);

            newData.profile_pic_link = `/ProfilePics/${uniqueFilename}`;
        }

        // Update the user's data, including any new profile image path
        await user.update(newData);

        return res.status(200).json({
            message: "Profile updated successfully.",
            user,
        });
    } catch (error) {
        console.error("Error updating profile:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

const getProfile = async (req, res) => {
    try {
        const user = await Malad.findByPk(req.decoded.userId, {
            attributes: { exclude: ["password"] },
        });

        if (!user) {
            return res.status(404).json({ message: "user not found." });
        }
        return res.status(200).json({ User: user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
};

module.exports = { getProfile, EditeProfile };
