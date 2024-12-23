const fs = require("fs");
const path = require("path");
const Courses = require("../../../../Models/Course");
const Course_Video = require("../../../../Models/Course_Video");
// Delete Video handler
const Delete_Course_Video = async (req, res) => {
    try {
        const userId = req.decoded.userId;
        const courseId = req.params.courseId; // Assuming courseId is passed in the route
        const videoId = req.params.videoId; // Assuming videoId is passed in the route

        // Find the course first
        const course = await Courses.findOne({
            where: { id: courseId, TeacherId: userId },
        });
        if (!course) {
            return res.status(404).send({
                message: "Course not found for the given userId",
            });
        }

        // Find the video to delete
        const courseVideo = await Course_Video.findOne({
            where: { id: videoId, CourseId: course.id },
        });
        if (!courseVideo) {
            return res.status(404).send({
                message: "Video not found for the given courseId and videoId",
            });
        }

        // Extract the video file path
        const previousVideoFilename = courseVideo.Video.split("/").pop();
        const previousVideoPath = path.join(
            "public/Courses_Videos",
            previousVideoFilename
        );

        // Delete the video file if it exists
        if (fs.existsSync(previousVideoPath)) {
            try {
                fs.unlinkSync(previousVideoPath);
            } catch (error) {
                return res.status(400).send({
                    message: "Could not delete video file: " + error.message,
                });
            }
        }

        // Remove the video entry from the Course_Video table
        await Course_Video.destroy({ where: { id: videoId } });

        // Send success response
        return res.status(200).send({
            message: "Video deleted successfully!",
        });
    } catch (error) {
        // Error handling
        console.error("Error:", error);
        return res.status(500).send({
            message: "Error deleting the video",
            error: error.message,
        });
    }
};

// Export the delete handler
module.exports = Delete_Course_Video;
