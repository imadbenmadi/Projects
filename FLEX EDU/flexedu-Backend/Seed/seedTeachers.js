const { faker } = require("@faker-js/faker");
const Teachers = require("../Models/Teacher");

function generateRandomNumberString(length) {
    return Array.from({ length }, () => Math.floor(Math.random() * 10)).join(
        ""
    );
}
async function seedTeachers() {
    const teachersData = [];

    for (let i = 0; i < 100; i++) {
        teachersData.push({
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            telephone: faker.phone.number(),
            instgram_Link: faker.internet.url(),
            linkedIn_Link: faker.internet.url(),
            facebook_Link: faker.internet.url(),
            profile_pic_link: faker.image.avatar(),
            Rate: parseFloat((Math.random() * 5).toFixed(1)), // Random float between 0.0 and 5.0
            CCP_number: generateRandomNumberString(10),
        });
    }

    try {
        await Teachers.bulkCreate(teachersData);
        console.log("Database seeded with 100 fake teacher records");
    } catch (error) {
        console.error("Error seeding database:", error);
    }
}

seedTeachers().catch((error) => console.error("Unexpected error:", error));
