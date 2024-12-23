const { Company_Followers } = require("../../Models/Compnay_Followers");

// Follow a Company
exports.followCompany = async (req, res) => {
    const { userId, companyId } = req.params;

    try {
        // Check if the follow relationship already exists
        const existingFollow = await Company_Followers.findOne({
            where: { maladId: userId, companyId },
        });

        if (existingFollow) {
            return res
                .status(400)
                .json({ message: "You are already following this company." });
        }

        // Create the follow relationship
        await Company_Followers.create({ maladId: userId, companyId });
        res.status(200).json({ message: "Successfully followed the company." });
    } catch (error) {
        console.error("Failed to follow the company:", error);
        res.status(500).json({
            message: "Failed to follow the company.",
            error,
        });
    }
};

// Unfollow a Company
exports.unfollowCompany = async (req, res) => {
    const { userId, companyId } = req.params;

    try {
        // Find and remove the follow relationship
        const unfollow = await Company_Followers.destroy({
            where: { maladId: userId, companyId },
        });

        if (unfollow) {
            res.status(200).json({
                message: "Successfully unfollowed the company.",
            });
        } else {
            res.status(404).json({ message: "Follow relationship not found." });
        }
    } catch (error) {
        console.error("Failed to unfollow the company:", error);
        res.status(500).json({
            message: "Failed to unfollow the company.",
            error,
        });
    }
};

// Get Followers of a Company
exports.getFollowers = async (req, res) => {
    const { companyId } = req.params;

    try {
        // Retrieve all followers for the specified company
        const followers = await Company_Followers.findAll({
            where: { companyId },
            attributes: ["maladId", "companyId", "createdAt"],
        });

        res.status(200).json(followers);
    } catch (error) {
        console.error("Failed to retrieve followers:", error);
        res.status(500).json({
            message: "Failed to retrieve followers.",
            error,
        });
    }
};

exports.isFollowing = async (req, res) => {
    const { userId, companyId } = req.params;

    try {
        // Check if a follow relationship exists between user and company
        const follow = await Company_Followers.findOne({
            where: { maladId: userId, companyId: companyId },
        });

        // Return true if following, false if not
        res.status(200).json({ isFollowing: !!follow });
    } catch (error) {
        console.error("Error checking follow status:", error);
        res.status(500).json({
            message: "Failed to check follow status.",
            error,
        });
    }
};
