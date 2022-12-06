const request = require("supertest");
const { app, mongoose } = require("../app");

jest.setTimeout(30000);
beforeAll((done) => {
    done();
});

afterAll((done) => {
    mongoose.connection.close();
    done();
});

describe("GET /seconds", () => {
    test("should respond with  200 status code", async () => {
        const response = await request(app).get("/api/seconds");
        expect(response.statusCode).toBe(200);
    });
    test("should respond with  true success message", async () => {
        const response = await request(app).get("/api/seconds");
        expect(response.body.success).toBe(true);
    });
});

describe("POST /seconds", () => {
    test("should respond with 201 status code", async () => {
        const response = await request(app).post("/api/seconds").send({
            title: "Test Database 1",
            description:
                "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio ea officiis beatae, temporibus reiciendis ipsum?",
        });
        expect(response.statusCode).toBe(201);
    });

    test("should respond with created second", async () => {
        const desiredObject = {
            title: "Test Database 1",
            description:
                "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio ea officiis beatae, temporibus reiciendis ipsum?",
        };

        const response = await request(app).post("/api/seconds").send({
            title: "Test Database 1",
            description:
                "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio ea officiis beatae, temporibus reiciendis ipsum?",
        });
        expect(response.body.document).toMatchObject(desiredObject);
    });

    test("should respond with 400 status code", async () => {
        const response = await request(app).post("/api/seconds").send({});
        expect(response.statusCode).toBe(400);
    });
});

describe("GET /seconds/{id}", () => {
    test("should respond with 200 status code for invalid id", async () => {
        const response = await request(app).get(
            "/api/seconds/6386551838afcbe1eb7ce488"
        );
        expect(response.statusCode).toBe(200);
        expect(response.body.documents).toEqual([]);
    });
    test("should respond with 200 status code for valid id", async () => {
        const response = await request(app).get(
            "/api/seconds/638f112a1e205fdd6e8bfe2c"
        );
        expect(response.statusCode).toBe(200);
        expect(response.body.documents[0]._id).toEqual(
            "638f112a1e205fdd6e8bfe2c"
        );
    });
});

describe("UPDATE /seconds/{id}", () => {
    test("should respond with 200 status code for invalid id", async () => {
        const response = await request(app)
            .put("/api/seconds/6386551838afcbe1eb7ce488")
            .send({
                description: "Update Description",
            });
        expect(response.statusCode).toBe(200);
        expect(response.body.documents).toEqual([]);
    });

    test("should respond with 200 status code for valid id and update description", async () => {
        const response = await request(app)
            .put("/api/seconds/638f112a1e205fdd6e8bfe2c")
            .send({
                description: "Update Description",
            });
        expect(response.statusCode).toBe(200);
        expect(response.body.documents[0].description).toEqual(
            "Update Description"
        );
    });
});

describe("DEETE /seconds/{id}", () => {
    test("should respond with 200 status code for invalid id", async () => {
        const response = await request(app).delete(
            "/api/seconds/6386551838afcbe1eb7ce489"
        );
        expect(response.statusCode).toBe(200);
        expect(response.body.documents).toEqual([]);
    });

    test("should respond with 200 status code for valid id and delete the second", async () => {
        const response = await request(app)
            .delete("/api/seconds/638f112a1e205fdd6e8bfe2c")
            .send({
                description: "Update Description",
            });
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toEqual("Second deleted.");
    });
});
