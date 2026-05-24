//Requirements for express, a router, file system, path, and UUID modules
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const {v4: uuidv4} = require('uuid');

//Constant for path to json "database"
const jsonPath = path.join(__dirname, 'data', 'applications.json');

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
router.get('/', (req, res) => {
    try {
        const data = readData();
        res.json(data);
    } catch (err) {
        res.status(500).json({error: "Failed to read applications"});
    }
});

//POST method - creates a new application
router.post('/', (req, res) => {
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

    let newApplication = req.body;

    //create new fields
    newApplication.id = uuidv4();
    const currentDate = new Date()
    newApplication.lastUpdated = currentDate.toISOString();

    try{
        //reads old array and writes new array with new application
        let newArray = readData();
        newArray.push(newApplication);
        writeData(newArray);
    } catch (err) {
        return res.status(500).json({error: "Failed to read applications.json"});
    }
    
    return res.status(201).json(newApplication);
});

module.exports = router;