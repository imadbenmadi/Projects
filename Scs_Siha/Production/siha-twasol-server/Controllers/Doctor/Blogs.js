const { Blog } = require("../../Models/Blog");
const { Company } = require("../../Models/Company");
const { Company_Followers } = require("../../Models/Compnay_Followers");
const { Malad_Notifications } = require("../../Models/Notifications");
const fs = require("fs");
const path = require("path");
const { Op } = require("sequelize");
// Get all blogs
const get_All = async (req, res) => {
    if (!req.params.companyId) {
        return res.status(400).json({ message: "companyId is required." });
    }

    try {
        const companyBlogs = await Blog.findAll({
            where: { companyId: req.params.companyId },
            include: [{ model: Company }],
            order: [["createdAt", "DESC"]], // Sort by creation date, newest first
        });

        const otherBlogs = await Blog.findAll({
            where: { companyId: { [Op.ne]: req.params.companyId } },
            include: [{ model: Company }],
            order: [["createdAt", "DESC"]], // Sort by creation date, newest first
        });

        const combinedBlogs = [...companyBlogs, ...otherBlogs];

        return res.status(200).json({ blogs: combinedBlogs });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

// Get blogs by companyId
const get_company_Services = async (req, res) => {
    const { companyId } = req.params;
    if (!companyId) {
        return res.status(400).json({ message: "companyId is required." });
    }

    try {
        const blogs = await Blog.findAll({
            where: { companyId },
            include: [{ model: Company }],
        });
        return res.status(200).json({ blogs });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

// Get a blog by ID
const get_by_id = async (req, res) => {
    const { blogId } = req.params;
    if (!blogId) {
        return res.status(400).json({ message: "blogId is required." });
    }

    try {
        const blog = await Blog.findOne({
            where: { id: blogId },
            include: [{ model: Company }],
        });
        if (!blog) {
            return res.status(404).json({ message: "Blog not found." });
        }
        return res.status(200).json({ blog });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

// Edit blog details
const edit_blog = async (req, res) => {
    const { blogId } = req.params;
    const { Title, Description } = req.body;
    const { image } = req.files || {}; // Destructure and handle when image is not provided
    const updates = {};

    if (Title) updates.Title = Title;
    if (Description) updates.Description = Description;

    try {
        // Fetch the blog record by ID
        const blog = await Blog.findByPk(blogId);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found." });
        }
        if (blog.ownerId !== req.decoded.userId) {
            return res.status(403).json({
                message: "You are not authorized to edit this blog.",
            });
        }
        // Handle image replacement if a new image file is provided
        if (image) {
            console.log("Uploaded image MIME type:", image.mimetype);

            // Check MIME type or file extension as a fallback
            const allowedMimeTypes = [
                "image/jpeg",
                "image/png",
                "image/jpg",
                "image/heic",
            ];
            const fileExtension = path.extname(image.name).toLowerCase();

            if (
                !allowedMimeTypes.includes(image.mimetype) &&
                ![".jpeg", ".jpg", ".png", ".heic"].includes(fileExtension)
            ) {
                return res.status(400).json({
                    message: "Only JPEG, PNG, and HEIC images are allowed!",
                });
            }

            // Delete the old image if it exists
            if (blog.image_link) {
                const previousFilename = path.basename(blog.image_link);
                const previousImagePath = path.join(
                    "public/Blog_Pics",
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

            // Create a unique filename and copy file to target location
            const uniqueFilename = `Blog_Pic-${blogId}-${Date.now()}${fileExtension}`;
            const targetPath = path.join("public/Blog_Pics", uniqueFilename);
            fs.copyFileSync(image.path, targetPath);
            fs.unlinkSync(image.path);

            // Update the blog's image_link field with the new path
            updates.image_link = `/Blog_Pics/${uniqueFilename}`;
        }

        // Apply updates to the blog record
        await blog.update(updates);
        return res.status(200).json({ message: "Blog updated successfully." });
    } catch (error) {
        console.error("Error updating blog:", error);
        return res
            .status(500)
            .json({ message: "Failed to update blog due to server error." });
    }
};

// Delete a blog
const delete_blog = async (req, res) => {
    const { blogId } = req.params;
    if (!blogId) {
        return res.status(400).json({ message: "blogId is required." });
    }

    try {
        const blog = await Blog.findOne({ where: { id: blogId } });
        if (!blog) {
            return res.status(404).json({ message: "Blog not found." });
        }
        if (blog.ownerId !== req.decoded.userId) {
            return res.status(403).json({
                message: "You are not authorized to delete this blog.",
            });
        }
        // if (blog.image_link) {
        //     const filePath = path.join(
        //         __dirname,
        //         "..",
        //         "..",
        //         "public",
        //         blog.image_link
        //     );
        //     fs.unlinkSync(filePath);
        // }
        if (blog?.image_link) {
            const previousFilename = blog?.image_link.split("/").pop();
            const previousImagePath = `public/Blog_Pics/${previousFilename}`;
            try {
                if (fs.existsSync(previousImagePath)) {
                    fs.unlinkSync(previousImagePath);
                }
            } catch (error) {
                console.error(error);
                // return res.status(400).send({
                //     message:
                //         "Could not delete Blog picture : " + error.message,
                // });
            }
        }
        await blog.destroy();
        return res.status(200).json({ message: "Blog deleted successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

// Add a new blog
const add_blog = async (req, res) => {
    const { Title, Description, ownerId, ownerType, companyId } = req.body;

    if (!Title || !ownerId || !ownerType || !companyId) {
        return res.status(400).json({ message: "Missing required fields." });
    }

    let uniqueSuffix = null;
    const { image } = req.files;
    if (image) {
        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/jpg",
            "image/heic",
        ];
        if (!allowedTypes.includes(image.type)) {
            throw new Error("Only JPEG and PNG and JPG images are allowed!");
        }

        const fileExtension = path.extname(image.name).toLocaleLowerCase();
        if (![".jpeg", ".jpg", ".png", ".heic"].includes(fileExtension)) {
            throw new Error("Invalid file extension");
        }
        uniqueSuffix = `Blog_Pic-${ownerId}-${Date.now()}${fileExtension}`;
        const targetPath = path.join("public/Blog_Pics/", uniqueSuffix);
        fs.copyFileSync(image.path, targetPath);
        fs.unlinkSync(image.path);
    }
    try {
        const blog = await Blog.create({
            Title,
            Description,
            ownerId,
            ownerType,
            companyId,
            image_link: image ? `/Blog_Pics/${uniqueSuffix}` : null,
        });

        const blogWithCompany = await Blog.findOne({
            where: { id: blog.id },
            include: [{ model: Company }],
        });
        if (!blogWithCompany || !blogWithCompany.Company) {
            if (blogWithCompany?.image_link) {
                const previousFilename = blogWithCompany?.image_link
                    .split("/")
                    .pop();
                const previousImagePath = `public/Blog_Pics/${previousFilename}`;
                try {
                    if (fs.existsSync(previousImagePath)) {
                        fs.unlinkSync(previousImagePath);
                    }
                } catch (error) {
                    console.error(error);
                    // return res.status(400).send({
                    //     message:
                    //         "Could not delete Blog picture : " + error.message,
                    // });
                }
            }
            await blogWithCompany.destroy();
            return res
                .status(404)
                .json({ message: "Company not found for the blog." });
        }

        const company_followers = await Company_Followers.findAll({
            where: { companyId },
        });
        const followerIds = company_followers.map(
            (follower) => follower.maladId
        );

        await Promise.all(
            followerIds.map((followerId) =>
                Malad_Notifications.create({
                    maladId: followerId,
                    title: "منشور جديد",
                    text: `تمت إضافة مقال جديد${
                        "من المؤسسة \n" + (blogWithCompany.Company.Name || "")
                    }.`,
                    link: `/Malad/Blogs/${blog.id}`,
                })
            )
        );

        return res.status(200).json({ blog });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

module.exports = {
    get_All,
    get_company_Services,
    get_by_id,
    edit_blog,
    delete_blog,
    add_blog,
};
