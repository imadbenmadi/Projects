const { Director } = require("../../Models/Director");
const { Worker } = require("../../Models/Worker");
const { Doctor } = require("../../Models/Doctor");
const { Malad } = require("../../Models/Malad");
const { Service } = require("../../Models/Company");
const { Company } = require("../../Models/Company");
const get_All = async (req, res) => {
    if (!req.params.companyId)
        return res.status(400).json({ message: "companyId is required." });
    try {
        const users = await Worker.findAll({
            include: [{ model: Company }, { model: Service }],
            where: { companyId: req.params.companyId },
        });
        return res.status(200).json({ Users: users });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
};
const get_by_id = async (req, res) => {
    if (!req.params.workerId)
        return res.status(400).json({ message: "userId is required." });
    try {
        const user = await Worker.findByPk(req.params.workerId, {
            include: [{ model: Company }, { model: Service }],
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
const edit_worker = async (req, res) => {
    const userId = req.params.workerId;
    const newData = req.body;
    const email = newData.email;
    const password = newData.password;
    if (!userId)
        return res.status(400).json({ message: "userId is required." });

    try {
        // Find the user by their ID
        const user = await Worker.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: "user not found." });
        }
        if (user.email != email) {
            const exist_doctor = await Doctor.findOne({
                where: { email: email },
            });
            const exist_worker = await Worker.findOne({
                where: { email: email },
            });
            const exist_malad = await Malad.findOne({
                where: { email: email },
            });
            const exist_director = await Director.findOne({
                where: { email: email },
            });
            if (exist_malad || exist_doctor || exist_director || exist_worker) {
                return res.status(400).json({
                    message: "email already exists , please use another email.",
                });
            }
        }
        await user.update({ email, password });
        return res
            .status(200)
            .json({ message: "Profile updated successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error });
    }
};
const delet_worker = async (req, res) => {
    const userId = req.params.workerId;
    if (!userId)
        return res.status(400).json({ message: "userId is required." });
    try {
        const user = await Worker.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "user not found." });
        }
        await user.destroy();
        return res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
};
const add_worker = async (req, res) => {
    const { email, password, firstName, lastName, serviceId, companyId } =
        req.body;

    if (
        !email ||
        !password ||
        !companyId ||
        !serviceId ||
        !firstName ||
        !lastName
    )
        return res.status(400).json({ message: "messing data" });
    try {
        const exist_doctor = await Doctor.findOne({
            where: { email: email },
        });
        const exist_worker = await Worker.findOne({
            where: { email: email },
        });
        const exist_malad = await Malad.findOne({
            where: { email: email },
        });
        const exist_director = await Director.findOne({
            where: { email: email },
        });
        if (exist_malad || exist_doctor || exist_director || exist_worker) {
            return res.status(400).json({
                message: "email already exists , please use another email.",
            });
        }

        const user = await Worker.create({
            email,
            password,
            companyId,
            firstName,
            lastName,
            serviceId,
        });
        return res.status(200).json({ User: user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
};
const get_Services = async (req, res) => {
    const { companyId } = req.params;
    if (!companyId)
        return res.status(400).json({ message: "companyId is required." });
    try {
        const services = await Service.findAll({ where: { companyId } });
        return res.status(200).json({ Services: services });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
};
module.exports = {
    get_All,
    get_by_id,
    edit_worker,
    delet_worker,
    add_worker,
    get_Services,
};
