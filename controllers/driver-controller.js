const driverSchema = require('../models/driver-schema');
const utils = require('../utils');

/**
 * Insert a new driver into the database.
 * @param {*} req The request object
 * @param {*} res The response object
 * @returns {JSON} The JSON object containing the driver ID and MongoDB ID
 */
async function insertNewDriver(req, res) {
    let driverDetails = req.body;
    const newDriver = new driverSchema({
        driverID: utils.generateDriverID(),
        driverName: driverDetails.driverName,
        driverLicence: driverDetails.driverLicence.toUpperCase(),
        driverDepartment: driverDetails.driverDepartment.toLowerCase(),
        driverIsActive: driverDetails.driverIsActive,
        driverCreatedAt: new Date()
    });
    try {
        const result = await newDriver.save();
        // The endpoint must respond with a JSON object containing the driver ID and MongoDB ID
        res.status(201).send({
            id: result._id,
            driverID: result.driverID
        });
    } catch (err) {
        res.status(400).send(err);
    }
};

/**
 * List all drivers in the database.
 * @param {*} req The request object 
 * @param {*} res The response object
 * @returns {JSON} The JSON object containing all the drivers in the database
 */
async function listDrivers(req, res) {
    let drivers = await driverSchema.find().populate('assignedPackages');
    res.status(200).send(drivers);
};

/**
 * Delete a driver by driver ID.
 * @param {*} req The request object
 * @param {*} res The response object
 * @returns {JSON} The JSON object containing the status of the deletion
 */
async function deleteDriverByID(req, res) {
    let driverID = req.body.driverID;
    let driverToFind = await driverSchema.findOne({ driverID: driverID });
    if (!driverToFind) {
        res.status(404).send({ message: "Driver not found" });
    } else {
        await driverSchema.deleteOne({ driverID: driverID });
        res.status(200).send({
            acknowledged: true,
            deletedCount: 1,
        });
    }
};

/**
 * Update a driver's licence and department by driver ID.
 * @param {*} req The request object
 * @param {*} res The response object
 * @returns {JSON} The JSON object containing the status of the update
 */
async function updateDriver(req, res) {
    let driver = req.body;
    let driverToFind = await driverSchema.findOne({ _id: driver.id });
    if (!driverToFind) {
        res.status(404).send({ message: "ID not found" });
    } else {
        await driverSchema.updateOne({ _id: driver.id }, {
            driverLicence: driver.driverLicence.toUpperCase(),
            driverDepartment: driver.driverDepartment.toLowerCase()
        });
        res.status(200).send({ message: "Driver updated successfully" });
    }
};

module.exports = {
    insertNewDriver,
    listDrivers,
    deleteDriverByID,
    updateDriver
};
