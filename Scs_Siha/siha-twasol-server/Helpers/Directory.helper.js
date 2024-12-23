const fs = require("fs");
const path = require("path");

const ensureDirectoryExists = (dirPath) => {
    try {
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    } catch (error) {
        console.error(`Failed to create directory: ${dirPath}`, error);
    }
};

const initializeDirectories = () => {
    const directories = [
        "public/Blog_Pics",
        "public/Event_Pics",
        "public/ProfilePics",
        "public/Malads_Files",
        // "public/Summaries",
        // "public/Summaries_Pictures",
    ];

    directories.forEach((dir) => {
        ensureDirectoryExists(path.join(__dirname, "../", dir));
    });
};

module.exports = { initializeDirectories };
