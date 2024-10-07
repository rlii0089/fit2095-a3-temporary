// Import required modules
const express = require('express');
const app = express();
const ejs = require('ejs');
const mongoose = require('mongoose');

// Import models
const driverSchema = require('./models/driver-schema');
const packageSchema = require('./models/package-schema');
const utils = require('./utils');

const PORT_NUMBER = 8080;

app.use(express.static("images")); // Serve static files from images directory
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.engine('html', ejs.renderFile); // Set ejs as the view engine
app.set('view engine', 'html'); // Set view engine to html
app.use(express.json()); // Parse JSON bodies

// Connect to MongoDB
const URL = "mongodb://127.0.0.1:27017/assignment2";

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

/* Routes */

// GET route for home page
app.get(["/", "/33119937/raymond"], async function(req, res) {
    let drivers = await driverSchema.find();
    let packages = await packageSchema.find();
    res.render("index", { drivers: drivers, packages: packages });
});

// GET route for listing all drivers
app.get("/33119937/raymond/drivers", async function(req, res) {
    let drivers = await driverSchema.find();
    res.render("list-drivers", { drivers: drivers });
});

// GET route for listing all packages
app.get("/33119937/raymond/packages", async function(req, res) {
    let packages = await packageSchema.find();
    res.render("list-packages", { packages: packages });
});

// GET routes for adding drivers
app.get("/33119937/raymond/drivers/add", function(req, res) {
    res.render("add-driver");
});

// GET routes for adding packages
app.get("/33119937/raymond/packages/add", async function(req, res) {
    let drivers = await driverSchema.find();
    res.render("add-package", { drivers: drivers });
});

// POST routes for adding drivers
app.post("/33119937/raymond/drivers", async function(req, res) {
    // Extract data from request body
    let { driverName, driverDepartment, driverLicence, driverIsActive } = req.body;
  
    // Validate driver data
    if (
        !/^[A-Za-z]{3,20}$/.test(driverName) || // Validate driver name (3-20 alphabetic characters)
        !["food", "furniture", "electronic"].includes(driverDepartment) || // Validate driver department
        !/^[A-Za-z0-9]{5}$/.test(driverLicence) // Validate driver licence (5 alphanumeric characters)
    ) {
        return res.render("invalid-data");
    }

    // Convert driverIsActive to boolean
    driverIsActive = driverIsActive === "on" ? true : false;

    // Create new driver object in JSON format
    let newDriver = new driverSchema({
        driverID: utils.generateDriverID(),
        driverName: driverName,
        driverLicence: driverLicence.toUpperCase(),
        driverDepartment: driverDepartment.toLowerCase(),
        driverIsActive: driverIsActive,
        driverCreatedAt: new Date()
    });

    // Insert the new driver into the database
    try {
        const result = await newDriver.save();
        res.redirect("/33119937/raymond/drivers");
    } catch (error) {
        console.error("Error adding driver:", error);
        res.status(500).send("Internal Server Error");
    }
});

// POST routes for adding packages
app.post("/33119937/raymond/packages", async function(req, res) {
    // Extract data from request body
    let { packageTitle, packageWeight, packageDestination, description, isAllocated, driverID } = req.body;

    // Validate package data
    if (
        !/^[A-Za-z0-9]{3,15}$/.test(packageTitle) || // Validate package title (5 alphanumeric characters)
        !/^\d+(\.\d+)?$/.test(packageWeight) || // Validate package weight (positive number)
        !/^[A-Za-z0-9]{5,15}$/.test(packageDestination) || // Validate package destination (5-15 alphanumeric characters)
        !/^[A-Za-z0-9!@#$%^&*()_+]{0,30}$/.test(packageDestination) // Validate package destination (0-30 alphabetic characters)
    ) {
        return res.render("invalid-data");
    }

    // If driverID selected, isAllocated is true
    isAllocated = driverID ? true : false;

    // Create new package object in JSON format
    let newPackage = new packageSchema({
        packageID: utils.generatePackageID(),
        packageTitle: packageTitle,
        packageWeight: packageWeight,
        packageDestination: packageDestination,
        description: description,
        packageCreatedAt: new Date(),
        isAllocated: isAllocated,
        driverID: driverID
    });

    // Insert the new package into the database
    try {
        const result = await newPackage.save();
        if (driverID) {
            await driverSchema.updateOne({ driverID: driverID }, { $push: { assignedPackages: result.packageID } });
        }
        res.redirect("/33119937/raymond/packages");
    } catch (error) {
        console.error("Error adding package:", error);
        res.status(500).send("Internal Server Error");
    }
});

// GET route for deleting drivers
app.get("/33119937/raymond/drivers/delete", function(req, res) {
    res.render("delete-driver");
});

// GET route for deleting packages
app.get("/33119937/raymond/packages/delete", function(req, res) {
    res.render("delete-package");
});

// POST routes for deleting drivers
app.post("/33119937/raymond/drivers/delete", async function(req, res) {
    let driverID = req.body.driverID;
    let driverToFind = await driverSchema.findOne({ driverID: driverID });
    if (!driverToFind) {
        res.status(404).render("invalid-data");
    } else {
        await driverSchema.deleteOne({ driverID: driverID });
    }
    res.redirect("/33119937/raymond/drivers");
});

// POST routes for deleting packages
app.post("/33119937/raymond/packages/delete", async function(req, res) {
    let packageID = req.body.packageID;
    let packageToFind = await packageSchema.findOne({ packageID: packageID });
    if (!packageToFind) {
        res.status(404).render("invalid-data");
    } else {
        await packageSchema.deleteOne({ packageID: packageID });
        await driverSchema.updateOne({ driverID: packageToFind.driverID }, { $pull: { assignedPackages: packageID } });
    }
    res.redirect("/33119937/raymond/packages");
});

// Route for invalid routes
app.use(function(req, res) {
    res.status(404).render("invalid-route");
});
