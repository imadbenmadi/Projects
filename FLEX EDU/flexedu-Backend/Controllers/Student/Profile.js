const Students = require("../../Models/Student");
const Teachers = require("../../Models/Teacher");
const getProfile = async (req, res) => {

    try {
        const user_in_db = await Students.findByPk(req.decoded.userId, {
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
    const { firstName, lastName, email } = req.body;
    try {
        const user_in_db = await Students.findByPk(userId);
        if (!user_in_db) {
            return res.status(404).json({ error: "user not found." });
        }
        // Update only the fields that are provided (not undefined or null)
        const updates = {};
        if (firstName !== undefined) updates.firstName = firstName;
        if (lastName !== undefined) updates.lastName = lastName;
        if (email !== undefined) updates.email = email;
        if (user_in_db.email !== email) {
            const emailExists = await Students.findOne({
                where: { email: email },
            });
            const emailExistsInTeacher = await Teachers.findOne({
                where: { email: email },
            });
            if (emailExists || emailExistsInTeacher) {
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

module.exports = { getProfile, edit_profile };
