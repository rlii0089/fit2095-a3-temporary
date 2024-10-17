const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
    // Driver ID: DXX-33-YYY where X is a random digit, Y is a random letter
    driverID: {
        type: String,
        required: true,
        unique: true
    },
    //Driver name: string and validate driver name is 3-20 alphabetic characters
    driverName: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return value.match(/^[A-Za-z]{3,20}$/);
            },
            message: "Driver name must be 3-20 alphabetic characters"
        }
    },
    //Driver department: string and validate driver department is either "food," "furniture," or "electronic"
    driverDepartment: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return ["food", "furniture", "electronic"].includes(value);
            },
            message: "Driver department must be either 'food,' 'furniture,' or 'electronic'"
        }
    },
    //Driver licence: string and validate driver licence is 5 alphanumeric characters
    driverLicence: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return value.match(/^[A-Za-z0-9]{5}$/);
            },
            message: "Driver licence must be 5 alphanumeric characters"
        }
    },
    // Driver is active: boolean and validate driver is active is a boolean
    driverIsActive: {
        type: Boolean,
        required: true,
        default: false,
        validate: {
            validator: function(value) {
                return typeof value === "boolean";
            },
            message: "Driver is active must be a boolean"
        }
    },
    // Driver created at: date
    driverCreatedAt: {
        type: Date,
        required: true
    },
    // Assigned packages: array of package IDs that are assigned to the driver 
    assignedPackages: {
        type: [String],
        required: true
    }
});

module.exports = mongoose.model('Driver', driverSchema); // Export Driver model
