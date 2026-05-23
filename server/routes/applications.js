//Requirements for express, a router, file system, and path modules
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

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

module.exports = router;