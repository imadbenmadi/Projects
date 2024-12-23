const Teachers = require("../../Models/Teacher");
const Students = require("../../Models/Student");
const getProfile = async (req, res) => {
    const userId = req.decoded.userId;
    try {
        const user_in_db = await Teachers.findByPk(userId, {
            attributes: { exclude: ["password"] },
        });

        if (!user_in_db) {
            return res.status(404).json({ error: "user not found." });
        }
        return res.status(200).json({ User: user_in_db });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error });
    }
};
const edit_profile = async (req, res) => {
    const userId = req.decoded.userId;
    const {
        firstName,
        lastName,
        telephone,
        instgram_Link,
        linkedIn_Link,
        facebook_Link,
        email,
    } = req.body;
    try {
        const user_in_db = await Teachers.findByPk(userId);
        if (!user_in_db) {
            return res.status(404).json({ error: "user not found." });
        }
        // Update only the fields that are provided (not undefined or null)
        const updates = {};
        if (firstName !== undefined) updates.firstName = firstName;
        if (lastName !== undefined) updates.lastName = lastName;
        if (telephone !== undefined) updates.telephone = telephone;
        if (email !== undefined) updates.email = email;
        if (instgram_Link !== undefined) updates.instgram_Link = instgram_Link;
        if (linkedIn_Link !== undefined) updates.linkedIn_Link = linkedIn_Link;
        if (facebook_Link !== undefined) updates.facebook_Link = facebook_Link;
        if (user_in_db.email !== email) {
            const emailExists = await Teachers.findOne({
                where: { email: email },
            });
            const emailExistsInStudent = await Students.findOne({
                where: { email: email },
            });
            if (emailExists || emailExistsInStudent) {
                return res.status(409).json({ error: "Email already exists." });
            }
        }
        // Only update fields that exist in the 'updates' object
        await user_in_db.update(updates);
        return res
            .status(200)
            .json({ message: "Profile Updated Successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error });
    }
};
const change_CCP = async (req, res) => {
    const userId = req.decoded.userId;
    const { CCP_number } = req.body;
    try {
        const user_in_db = await Teachers.findByPk(userId);
        if (!user_in_db) {
            return res.status(404).json({ error: "user not found." });
        }

        user_in_db.CCP_number = CCP_number;
        await user_in_db.save();
        return res
            .status(200)
            .json({ message: "Password Changed Successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error });
    }
};
module.exports = { getProfile, edit_profile, change_CCP };
