const { GenericContainer } = require("testcontainers");
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../src/app")

describe("User Creation Integration Test", () => {
    let mongoContainer;
    let mongoUri;

    beforeAll(async () => {
        mongoContainer = await new GenericContainer("mongo")
            .withExposedPorts(27017)
            .start();

        const port = mongoContainer.getMappedPort(27017);
        const host = mongoContainer.getHost();
        mongoUri = `mongodb://${host}:${port}/test`;

        await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    }, 180000);

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoContainer.stop();
    });

    test("It should create a user successfully", async () => {
        const userData = {
            name: "Test User",
            email: "test@example.com",
            password: "password123"
        };

        const response = await request(app)
            .post("/user")
            .send(userData);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("id");
    });
});
