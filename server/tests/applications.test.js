const fs = require('fs');
const path = require('path');

process.env.DATA_FILE = path.join(__dirname, 'test_applications.json');
const {app, server} = require('../server');
const request = require('supertest')(app);

//runs before any test
beforeAll(async () => {
    fs.writeFileSync(process.env.DATA_FILE, '[]');
});

//runs after all tests are complete
afterAll(async () => {
    fs.unlinkSync(process.env.DATA_FILE);
    server.close()
});

//saves id of application for tests
let testId;

// ---------------------------------- TESTS ----------------------------------

describe("GET /api/applications", () => {
    test("Should initially return empty array", async () => {
        const response = await request.get("/api/applications");

        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });
});

describe("POST /api/applications", () => {
    test("Should successfully add a new application", async () => {
        //create requests
        const response = await request.post("/api/applications")
            .set('Content-Type', 'application/json')
            .send({
                "jobTitle": "myTitle",
                "company": "myCompany",
                "location": "Hybrid",
                "status": "Applied",
                "link": "https://example.com/job",
                "site": "LinkedIn",
                "applicationDate": "2026-05-21T00:00:00.000Z",
                "notes": null
            });
        
        //set id for future tests
        testId = response.body.id;
        
        //expected json response
        const expectedResponseBody = {
            "jobTitle": "myTitle",
            "company": "myCompany",
            "location": "Hybrid",
            "status": "Applied",
            "link": "https://example.com/job",
            "site": "LinkedIn",
            "applicationDate": "2026-05-21",
            "notes": ""
        }

        //check for response status and body
        expect(response.status).toBe(201);
        expect(response.body).toEqual(expect.objectContaining(expectedResponseBody));

    });

    test("Should fail when not all required fields are included", async () => {
        //create requests (jobTitle field not included)
        const response = await request.post("/api/applications")
            .set('Content-Type', 'application/json')
            .send({
                "company": "myCompany",
                "location": "Hybrid",
                "status": "Applied",
                "link": "https://example.com/job",
                "site": "LinkedIn",
                "applicationDate": "2026-05-21",
                "notes": ""
            });
        
        const expectedResponseBody = {"error": "Missing required fields: jobTitle"};

        expect(response.status).toBe(400);
        expect(response.body).toEqual(expectedResponseBody);
    });
});

describe("GET /api/applications/:id", () => {
    test("Application object found", async () => {
        //create request
        const response = await request.get(`/api/applications/${testId}`);

        const expectedResponseBody = {
            "jobTitle": "myTitle",
            "company": "myCompany",
            "location": "Hybrid",
            "status": "Applied",
            "link": "https://example.com/job",
            "site": "LinkedIn",
            "applicationDate": "2026-05-21",
            "notes": ""
        }

        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.objectContaining(expectedResponseBody));
    });

    test("application object not found", async () => {
        //create request
        const response = await request.get(`/api/applications/invalid-id`);

        const expectedResponseBody = {"error": "Application not found"};

        expect(response.status).toBe(404);
        expect(response.body).toEqual(expectedResponseBody);
    });
});

describe("PUT /api/applications/:id", () => {
    test("2 parameters updated from request body", async () => {
        const response = await request.put(`/api/applications/${testId}`)
        .set("Content-Type", "application/json")
        .send({
            "jobTitle": "otherMyTitle",
            "site": "Indeed.com"
        });

        const expectedResponseBody = {
            "jobTitle": "otherMyTitle",
            "company": "myCompany",
            "location": "Hybrid",
            "status": "Applied",
            "link": "https://example.com/job",
            "site": "Indeed.com",
            "applicationDate": "2026-05-21",
            "notes": ""
        }

        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.objectContaining(expectedResponseBody));
    });
});

describe("DELETE /api/applications/:id", () => {
    test("Delete test application", async () => {
        const response = await request.delete(`/api/applications/${testId}`);

        const expectedResponseBody = {"message": "Application deleted successfully"}

        expect(response.status).toBe(200);
        expect(response.body).toEqual(expectedResponseBody);
    });

    test("Attempt to delete non-existant application", async () => {
        const response = await request.delete("/api/applications/invalid-id");
        
        const expectedResponseBody = {"error": "Application not found"}
        
        expect(response.status).toBe(404);
        expect(response.body).toEqual(expectedResponseBody);
    });
});