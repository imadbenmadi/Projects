const { Event } = require("../../Models/Event");
const { Company } = require("../../Models/Company");
const fs = require("fs");
const path = require("path");
const { Company_Followers } = require("../../Models/Compnay_Followers");
const { Malad_Notifications } = require("../../Models/Notifications");
const { Op } = require("sequelize");
// Get all events
const get_All = async (req, res) => {
    if (!req.params.companyId) {
        return res.status(400).json({ message: "companyId is required." });
    }
    try {
        const events = await Event.findAll(
            { where: { companyId: req.params.companyId } },
            {
                include: [{ model: Company }],
            },
            {
                order: [["createdAt", "DESC"]],
            }
        );
        return res.status(200).json({ events });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

// Get events by companyId
const get_company_Events = async (req, res) => {
    const { companyId } = req.params;
    if (!companyId) {
        return res.status(400).json({ message: "companyId is required." });
    }

    try {
        const events = await Event.findAll({
            where: { companyId },
            include: [{ model: Company }],
        });
        return res.status(200).json({ events });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

// Get an event by ID
const get_by_id = async (req, res) => {
    const { eventId } = req.params;
    if (!eventId) {
        return res.status(400).json({ message: "eventId is required." });
    }

    try {
        const event = await Event.findOne({
            where: { id: eventId },
            include: [{ model: Company }],
        });
        if (!event) {
            return res.status(404).json({ message: "Event not found." });
        }
        return res.status(200).json({ event });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

// Edit event details
const edit_event = async (req, res) => {
    const { eventId } = req.params;
    const { Title, Description } = req.body;
    const { image } = req.files || {}; // Destructure and handle when image is not provided
    const updates = {};

    if (Title) updates.Title = Title;
    if (Description) updates.Description = Description;

    try {
        // Fetch the event record by ID
        const event = await Event.findByPk(eventId);
        if (!event) {
            return res.status(404).json({ message: "Event not found." });
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
            if (event.image_link) {
                const previousFilename = path.basename(event.image_link);
                const previousImagePath = path.join(
                    "public/Event_Pics",
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
            const uniqueFilename = `Event_Pic-${eventId}-${Date.now()}${fileExtension}`;
            const targetPath = path.join("public/Event_Pics", uniqueFilename);
            fs.copyFileSync(image.path, targetPath);
            fs.unlinkSync(image.path);

            // Update the event's image_link field with the new path
            updates.image_link = `/Event_Pics/${uniqueFilename}`;
        }

        // Apply updates to the event record
        await event.update(updates);
        return res.status(200).json({ message: "Event updated successfully." });
    } catch (error) {
        console.error("Error updating event:", error);
        return res
            .status(500)
            .json({ message: "Failed to update event due to server error." });
    }
};

// Delete an event
const delete_event = async (req, res) => {
    const { eventId } = req.params;
    if (!eventId) {
        return res.status(400).json({ message: "eventId is required." });
    }

    try {
        const event = await Event.findOne({ where: { id: eventId } });
        if (!event) {
            return res.status(404).json({ message: "Event not found." });
        }
        if (event?.image_link) {
            const previousFilename = event?.image_link.split("/").pop();
            const previousImagePath = `public/Event_Pics/${previousFilename}`;
            try {
                if (fs.existsSync(previousImagePath)) {
                    fs.unlinkSync(previousImagePath);
                }
            } catch (error) {
                console.error(error);
                // return res.status(400).send({
                //     message:
                //         "Could not delete Event picture : " + error.message,
                // });
            }
        }
        await event.destroy();
        return res.status(200).json({ message: "Event deleted successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

// Add a new event
const add_event = async (req, res) => {
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
        uniqueSuffix = `Event_Pic-${ownerId}-${Date.now()}${fileExtension}`;
        const targetPath = path.join("public/Event_Pics/", uniqueSuffix);
        fs.copyFileSync(image.path, targetPath);
        fs.unlinkSync(image.path);
    }
    try {
        const event = await Event.create({
            Title,
            Description,
            ownerId,
            ownerType,
            companyId,
            image_link: image ? `/Event_Pics/${uniqueSuffix}` : null,
        });
        const eventWithCompany = await Event.findOne({
            where: { id: event.id },
            include: [{ model: Company }],
        });
        if (!eventWithCompany || !eventWithCompany.Company) {
            if (eventWithCompany?.image_link) {
                const previousFilename = eventWithCompany?.image_link
                    .split("/")
                    .pop();
                const previousImagePath = `public/Event_Pics/${previousFilename}`;
                try {
                    if (fs.existsSync(previousImagePath)) {
                        fs.unlinkSync(previousImagePath);
                    }
                } catch (error) {
                    console.error(error);
                    // return res.status(400).send({
                    //     message:
                    //         "Could not delete Event picture : " + error.message,
                    // });
                }
            }
            await eventWithCompany.destroy();
            return res
                .status(404)
                .json({ message: "Company not found for the event." });
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
                    title: "حدث جديد",
                    text: `تمت إضافة حدث جديد${
                        "من المؤسسة \n" + (eventWithCompany.Company.Name || "")
                    }.`,

                    link: `/Malad/Events/${event.id}`,
                })
            )
        );

        return res.status(200).json({ event });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

module.exports = {
    get_All,
    get_company_Events,
    get_by_id,
    edit_event,
    delete_event,
    add_event,
};
