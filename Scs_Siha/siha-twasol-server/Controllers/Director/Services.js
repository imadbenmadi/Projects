const { Director } = require("../../Models/Director");
const { Service } = require("../../Models/Company");
const { Doctor } = require("../../Models/Doctor");
const { Malad } = require("../../Models/Malad");
const { Company } = require("../../Models/Company");

const get_All = async (req, res) => {
    if (!req.params.companyId)
        return res.status(400).json({ message: "companyId is required." });
    try {
        const services = await Service.findAll({
            where: { companyId: req.params.companyId },
        });
        return res.status(200).json({ services: services });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
};
const get_compayny_Services = async (req, res) => {
    const { companyId } = req.params;
    if (!companyId)
        return res.status(400).json({ message: "companyId is required." });
    try {
        const services = await Service.findAll({
            where: { companyId: req.params.companyId },
        });
        return res.status(200).json({ Services: services });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
};
const get_by_id = async (req, res) => {
    if (!req.params.serviceId)
        return res.status(400).json({ message: "serviceId is required." });
    try {
        const service = await Service.findOne(
            { where: { id: req.params.serviceId } },
            {
                include: [{ model: Company }],
            }
        );

        if (!service) {
            return res.status(404).json({ message: "service not found." });
        }
        return res.status(200).json({ Service: service });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
};
const edit_service = async (req, res) => {
    const serviceId = req.params.serviceId;
    if (!serviceId)
        return res.status(400).json({ message: "serviceId is required." });
    const newData = req.body;
    const Name = newData.Name;

    try {
        // Find the service by their ID
        const service = await Service.findOne({
            where: { id: req.params.serviceId },
        });

        if (!service) {
            return res.status(404).json({ message: "service not found." });
        }

        await service.update({ Name });
        return res
            .status(200)
            .json({ message: "Profile updated successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};
const delet_service = async (req, res) => {
    const serviceId = req.params.serviceId;
    if (!serviceId)
        return res.status(400).json({ message: "serviceId is required." });
    try {
        const service = await Service.findOne({
            where: { id: req.params.serviceId },
        });
        if (!service) {
            return res.status(404).json({ message: "service not found." });
        }
        await service.destroy();
        return res
            .status(200)
            .json({ message: "Service deleted successfully." });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
};
const add_service = async (req, res) => {
    const { Name, companyId } = req.body;
    if (!Name || !companyId)
        return res.status(400).json({ message: "Messing Data." });
    try {
        const service = await Service.create({
            Name,
            companyId,
        });
        return res.status(200).json({ Service: service });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
};

module.exports = {
    get_All,
    get_by_id,
    edit_service,
    delet_service,
    add_service,
    get_compayny_Services,
};
