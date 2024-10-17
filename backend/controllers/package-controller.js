const packageSchema = require("../models/package-schema");
const driverSchema = require("../models/driver-schema");
const utils = require("../utils");

/**
 * Insert a new package into the database.
 * @param {*} req The request object
 * @param {*} res The response object
 * @returns {JSON} The JSON object containing the package ID and MongoDB ID
 */
async function insertNewPackage(req, res) {
    let packageDetails = req.body;
    const newPackage = new packageSchema({
        packageID: utils.generatePackageID(),
        packageTitle: packageDetails.packageTitle,
        packageWeight: packageDetails.packageWeight,
        packageDestination: packageDetails.packageDestination,
        packageDescription: packageDetails.packageDescription,
        packageCreatedAt: new Date(),
        packageIsAllocated: packageDetails.packageIsAllocated,
        driverID: packageDetails.driverID
    });

    console.log(newPackage);
    try {
        const result = await newPackage.save();
        if (packageDetails.driverID) {
            await driverSchema.updateOne({ driverID: packageDetails.driverID }, { $push: { assignedPackages: result.packageID } });
        }
        res.status(201).send({
            id: result._id,
            packageID: result.packageID
        });

        console.log(result);
    } catch (err) {
        res.status(400).send(err);
        console.log(err);
    }
};

/**
 * List all packages in the database.
 * @param {*} req The request object
 * @param {*} res The response object
 * @returns {JSON} The JSON object containing all the packages in the database
 */
async function listPackages(req, res) {
    let packages = await packageSchema.find().populate('driverID');
    res.status(200).send(packages);
};

/**
 * Delete a package by package ID.
 * @param {*} req The request object
 * @param {*} res The response object
 * @returns {JSON} The JSON object containing the status of the deletion
 */
async function deletePackageByID(req, res) {
    let package = req.params.packageID;
    let packageToFind = await packageSchema.findOne({ packageID: package });
    if (!packageToFind) {
        res.status(404).send({ message: "Package not found" });
    } else {
        await packageSchema.deleteOne({ packageID: package });
        await driverSchema.updateMany({ assignedPackages: package }, { $pull: { assignedPackages: package } });
        res.status(200).send({
            "acknowledged": true,
            "deletedCount": 1
        });
    }
};

/**
 * Update a package's destination by package ID.
 * @param {*} req The request object
 * @param {*} res The response object
 * @returns {JSON} The JSON object containing the status of the update
 */
async function updatePackageDestination(req, res) {
    let package = req.body;
    let packageToFind = await packageSchema.findOne({ packageID: package.packageID });
    if (!packageToFind) {
        res.status(404).send({ message: "Package not found" });
    } else {
        await packageSchema.updateOne({ packageID: package.packageID }, { packageDestination: package.packageDestination });
        res.status(200).send({
            "status": "updated successfully"
        });
    }
};

// get packages by driver ID
async function getPackagesByDriverID(req, res) {
    let driverID = req.params.driverID;
    let driver = await driverSchema.findOne({ driverID: driverID });

    console.log(driver);
    if (!driver) {
        res.status(404).send({ message: "Driver not found" });

        console.log("Driver not found");
    } else {
        let packages = await packageSchema.find({ driverID: driverID });
        res.status(200).send(packages);

        console.log(packages);
    }
};

module.exports = {
    insertNewPackage,
    listPackages,
    deletePackageByID,
    updatePackageDestination,

    getPackagesByDriverID
};