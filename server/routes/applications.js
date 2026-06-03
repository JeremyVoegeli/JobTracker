//Requirements for express, a router, file system, path, and UUID modules
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const {v4: uuidv4} = require('uuid');

//SELECT fields for SQL queries, repeatedly used
const SELECT_FIELDS = `
    id,
    job_title AS "jobTitle",
    company,
    location,
    status,
    link,
    site,
    application_date AS "applicationDate",
    notes,
    last_updated AS "lastUpdated"
`;

//Constant for path to json "database"
const jsonPath = process.env.DATA_FILE || path.join(__dirname, '..', 'data', 'applications.json');

//reads the data from the applications.json file, returns the JSON array
function readData(){
    const rawData = fs.readFileSync(jsonPath, 'utf8');
    const jsonData = JSON.parse(rawData);
    return(jsonData);
};

//takes in a JSON array, writes it to applications.json
function writeData(data){
    const jsonString = JSON.stringify(data, null, 2);
    fs.writeFileSync(jsonPath, jsonString);
};

//GET method - return all applications
router.get('/', async (req, res) => {
    try{
        const result = await pool.query(`SELECT ${SELECT_FIELDS} FROM applications;`);
        res.status(200).json(result.rows);
    } catch (err){
        res.status(500).json({error: "Failed to read database"})
    }
});

//GET method - returns the application object with the specified ID
router.get('/:id', async (req, res) => {
    try{
        const result = await pool.query(`SELECT ${SELECT_FIELDS} FROM applications WHERE id = $1`, [req.params.id]);
        const application = result.rows[0];

        if (application){
            res.status(200).json(application);
        } else {
            res.status(404).json({error: "Application not found"})
        }
    } catch (err){
        res.status(500).json({error: "Failed to read database"})
    }
});

//POST method - creates a new application
router.post('/', async (req, res) => {
    //check for any missing fields
    let missingFields = [];
    if (!req.body.jobTitle){missingFields.push('jobTitle');}
    if (!req.body.company){missingFields.push('company');}
    if (!req.body.status){missingFields.push('status');}
    if (!req.body.applicationDate){missingFields.push('applicationDate');}

    //returns error message if any fields are missing
    if (missingFields.length > 0){
        let errorMsg = "Missing required fields: " + missingFields.join(', ');
        return res.status(400).json({error: errorMsg});
    }

    const {jobTitle, company, location, status, link, site, applicationDate, notes} = req.body;

    //create new fields
    const id = uuidv4();
    const lastUpdated = new Date().toISOString();

    try{
        //SQL query
        const result = await pool.query(`INSERT INTO applications
            (id, job_title, company, location, status, link, site, application_date, notes, last_updated)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)   
            RETURNING id, job_title AS "jobTitle", company, location, status, link, site, application_date AS "applicationDate", notes, last_updated AS "lastUpdated"
        `, [id, jobTitle, company, location || null, status, link || null, site || null, applicationDate, notes || null, lastUpdated])
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({error: "Error writing to database"})
    }
});

//PUT method - updates an application with the given ID with the parameters in the body
router.put('/:id', async (req, res) => {
    //get application fields
    const {id, jobTitle, company, location, status, link, site, applicationDate, notes} = req.body;
    const lastUpdated = new Date().toISOString();
    try {
        const result = await pool.query(`
            UPDATE applications
            SET 
                job_title = COALESCE($1, job_title),
                company = COALESCE($2, company),
                location = COALESCE($3, location),
                status = COALESCE($4, status),
                link = COALESCE($5, link),
                site = COALESCE($6, site),
                application_date = COALESCE($7, application_date),
                notes = COALESCE($8, notes),
                last_updated = $9
            WHERE id = $10
            RETURNING id, job_title AS "jobTitle", company, location, status, link, site, application_date AS "applicationDate", notes, last_updated AS "lastUpdated"
        `, [jobTitle || null, company || null, location || null, status || null, link || null, site || null, applicationDate || null, notes || null, lastUpdated, req.params.id]);
        
        if (result.rows[0]){
            res.status(200).json(result.rows[0]);
        } else {
            res.status(404).json({error: "Application not found"})
        }
    } catch (err){
        return res.status(500).json({error: "Failed to read from database"});
    }
});

//DELETE method - removes an application from the file with the given id
router.delete('/:id', (req, res) => {
    try{
        const data = readData();

        //Check that application exists
        const index = data.findIndex(app => app.id === req.params.id);
        if (index === -1){
            return res.status(404).json({error: "Application not found"});
        }

        //creates new array and writes to file
        const newArray = data.filter(app => app.id !== req.params.id);
        writeData(newArray);

        return res.status(200).json({"message": "Application deleted successfully"});
    } catch (err) {
        return res.status(500).json({error: "Failed to read applications.json"});
    }
});

module.exports = router;