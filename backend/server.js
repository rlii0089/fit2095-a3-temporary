// Import required modules
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const driverController = require('./controllers/driver-controller');
const packageController = require('./controllers/package-controller');

const PORT_NUMBER = 8080;

app.use(express.json()); // Parse JSON bodies
app.use(express.static('./dist/package-delivery-management-application/browser'));

// Connect to MongoDB
const URL = "mongodb://127.0.0.1:27017/assignment3";

async function connectDB() {
    try {
        await mongoose.connect(URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
    }
}

connectDB(URL).then(console.log).catch(err => console.log(err));

// Start server
app.listen(PORT_NUMBER, function(err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`Server is runnning on port ${PORT_NUMBER}`);
});

// List all drivers
app.get('/drivers', function(req, res) {
    driverController.listDrivers(req, res);
});

// Insert new driver
app.post('/drivers/add', function(req, res) {
    driverController.insertNewDriver(req, res);
});

// Delete driver by driver ID
app.delete('/drivers/remove/:driverID', function(req, res) {
    driverController.deleteDriverByID(req, res);
});

// Update driver licence and department by ID
app.put('/drivers/update', function(req, res) {
    driverController.updateDriver(req, res);
});

// List all packages
app.get('/packages', function(req, res) {
    packageController.listPackages(req, res);
});

// Insert new package
app.post('/packages/add', function(req, res) {
    packageController.insertNewPackage(req, res);
});

// Delete package by package ID
app.delete('/packages/remove/:packageID', function(req, res) {
    packageController.deletePackageByID(req, res);
});

// Update package status by ID
app.put('/packages/update', function(req, res) {
    packageController.updatePackageDestination(req, res);
});

app.get('*', function(req, res) {
    res.sendFile('index.html', { root: './dist/package-delivery-management-application/browser' });
});

app.get('/packages/:driverID', function(req, res) {
    packageController.getPackagesByDriverID(req, res);
});

app.get('/drivers/:driverID', function(req, res) {
    driverController.getDriverByID(req, res);
});
