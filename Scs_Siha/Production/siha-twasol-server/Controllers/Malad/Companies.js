const { Company, Service } = require("../../Models/Company");
const { Blog } = require("../../Models/Blog");
const { Event } = require("../../Models/Event");
const { Doctor } = require("../../Models/Doctor");

const get_All = async (req, res) => {
    try {
        // Fetch all companies and include their services and doctors
        const companies = await Company.findAll({
            include: [
                { model: Service, as: "Services" },
                { model: Doctor, as: "Doctors" },
            ],
            order: [["createdAt", "DESC"]],
        });
        res.status(200).json(companies);
    } catch (error) {
        console.error("Failed to fetch companies:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const get_One = async (req, res) => {
    if (!req.params.companyId) {
        return res.status(400).json({ message: "Company ID is required." });
    }

    try {
        // Fetch the company with services and doctors
        const company = await Company.findByPk(req.params.companyId, {
            include: [
                { model: Service, as: "Services" },
                { model: Doctor, as: "Doctors" },
            ],
        });

        if (!company) {
            return res.status(404).json({ message: "Company not found." });
        }

        // Fetch blogs associated with this company
        const blogs = await Blog.findAll({
            where: { companyId: company.id },
        });

        // Attach owner information (Doctors) to each blog manually
        const blogsWithOwners = await Promise.all(
            blogs.map(async (blog) => {
                let owner = null;
                if (blog.ownerType === "Doctor") {
                    owner = await Doctor.findByPk(blog.ownerId);
                }
                return {
                    ...blog.toJSON(),
                    Owner: owner ? owner.toJSON() : null,
                };
            })
        );

        // Fetch events associated with this company
        const events = await Event.findAll({
            where: { companyId: company.id },
        });

        // Attach owner information (Doctors) to each event manually
        const eventsWithOwners = await Promise.all(
            events.map(async (event) => {
                let owner = null;
                if (event.ownerType === "Doctor") {
                    owner = await Doctor.findByPk(event.ownerId);
                }
                return {
                    ...event.toJSON(),
                    Owner: owner ? owner.toJSON() : null,
                };
            })
        );

        // Manually add Blogs and Events with their respective owners to the company response
        const companyWithBlogsAndEvents = {
            ...company.toJSON(),
            Blogs: blogsWithOwners,
            Events: eventsWithOwners,
        };

        res.status(200).json(companyWithBlogsAndEvents);
    } catch (error) {
        console.error("Failed to fetch company:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { get_All, get_One };
