//Requirements for express, a router, file system, path, and UUID modules
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const {v4: uuidv4} = require('uuid');

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
router.get('/', (req, res) => {
    try {
        const data = readData();
        res.json(data);
    } catch (err) {
        res.status(500).json({error: "Failed to read applications"});
    }
});

//GET method - returns the application object with the specified ID
router.get('/:id', (req, res) => {
    //reads data, looks for id in applications.json
    try{
        const data = readData();
        const application = data.find(app => app.id === req.params.id);

        //return error if no application
        if (!application){
            return res.status(404).json({error: "Application not found"});
        }

        return res.status(200).json(application);

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

//PUT method - updates an application with the given ID with the parameters in the body
router.put('/:id', (req, res) => {
    try {
        const data = readData();

        //find the index of the desired application
        const index = data.findIndex(app => app.id === req.params.id);
        if (index === -1){
            return res.status(404).json({error: "Application not found"});
        }

        //create and add updated application
        const oldApplication = data[index];
        const updatedApplication = {...oldApplication, ...req.body};
        updatedApplication.lastUpdated = new Date().toISOString();

        data[index] = updatedApplication;
        writeData(data);

        return res.status(200).json(updatedApplication);
    } catch (err){
        return res.status(500).json({error: "Failed to read applications.json"});
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