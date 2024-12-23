const { Company_Followers } = require("../../Models/Compnay_Followers");
const { Company } = require("../../Models/Company");
const { Blog } = require("../../Models/Blog");
const { Worker } = require("../../Models/Worker");
const { Doctor } = require("../../Models/Doctor");
const { Director } = require("../../Models/Director");

const get_blogs = async (req, res) => {
    const { userId } = req.params;

    try {
        // Step 1: Find companies that the user follows
        const followedCompanies = await Company_Followers.findAll({
            where: { maladId: userId },
            attributes: ["companyId"],
            order: [["createdAt", "DESC"]],
        });

        // Extract company IDs from the followed companies
        const followedCompanyIds = followedCompanies.map(
            (follow) => follow.companyId
        );

        // Step 2: Retrieve blogs from followed companies, ordered by date
        const priorityBlogs = await Blog.findAll({
            where: { companyId: followedCompanyIds },
            include: [
                {
                    model: Company,
                },
            ],
            order: [["createdAt", "DESC"]],
        });

        // Manually attach owner details to each blog based on ownerType
        const blogsWithOwners = await Promise.all(
            priorityBlogs.map(async (blog) => {
                let owner = null;
                if (blog.ownerType === "Doctor") {
                    owner = await Doctor.findByPk(blog.ownerId, {
                        attributes: { exclude: ["password"] },
                    });
                } else if (blog.ownerType === "Worker") {
                    owner = await Worker.findByPk(blog.ownerId, {
                        attributes: { exclude: ["password"] },
                    });
                } else if (blog.ownerType === "Director") {
                    owner = await Director.findByPk(blog.ownerId, {
                        attributes: { exclude: ["password"] },
                    });
                }
                return {
                    ...blog.toJSON(),
                    Owner: owner ? owner.toJSON() : null,
                };
            })
        );

        // Step 3: Send response with prioritized blogs
        res.status(200).json({ blogs: blogsWithOwners });
    } catch (error) {
        console.error("Failed to retrieve blogs:", error);
        res.status(500).json({ message: "Failed to retrieve blogs.", error });
    }
};

const get_blog = async (req, res) => {
    const { blogId } = req.params;

    try {
        const blog = await Blog.findByPk(blogId, {
            include: [
                {
                    model: Company,
                },
            ],
        });

        if (!blog) {
            return res.status(404).json({ message: "Blog not found." });
        }

        // Manually fetch the owner details based on ownerType
        let owner = null;
        if (blog.ownerType === "Doctor") {
            owner = await Doctor.findByPk(blog.ownerId, {
                attributes: { exclude: ["password"] },
            });
        } else if (blog.ownerType === "Worker") {
            owner = await Worker.findByPk(blog.ownerId, {
                attributes: { exclude: ["password"] },
            });
        } else if (blog.ownerType === "Director") {
            owner = await Director.findByPk(blog.ownerId, {
                attributes: { exclude: ["password"] },
            });
        }

        const blogWithOwner = {
            ...blog.toJSON(),
            Owner: owner ? owner.toJSON() : null,
        };

        res.status(200).json(blogWithOwner);
    } catch (error) {
        console.error("Failed to retrieve blog:", error);
        res.status(500).json({
            message: "Failed to retrieve the blog.",
            error,
        });
    }
};

module.exports = { get_blogs, get_blog };
