const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
    // Package ID: PXX-33-YYY where X is a random digit, Y is a random letter
    packageID: {
        type: String,
        required: true,
        unique: true
    },
    // Package title: string and validate package name is 3-15 alphanumeric characters
    packageTitle: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return value.match(/^[A-Za-z0-9]{3,15}$/);
            },
            message: "Package name must be 3-15 alphanumeric characters"
        }
    },
    // Package weight: number and validate package weight is a number greater than 0
    packageWeight: {
        type: Number,
        required: true,
        validate: {
            validator: function(value) {
                return !isNaN(value) && value > 0;
            },
            message: "Package weight must be a number greater than 0"
        }
    },
    // Package destination: string and validate package destination is 5-15 alphanumeric characters
    packageDestination: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return value.match(/^[A-Za-z0-9]{5,15}$/);
            },
            message: "Package destination must be 5-15 alphanumeric characters"
        }
    },
    // Description: string and validate description is a string with length between 0 and 30 inclusive
    packageDescription: {
        type: String,
        required: false,
        validate: {
            validator: function(value) {
                return value.match(/^[A-Za-z0-9!@#$%^&*()_+]{0,30}$/);
            },
            message: "Description must be a string with length between 0 and 30 inclusive"
        }
    },
    // Created at: date and validate created at is a date
    packageCreatedAt: {
        type: Date,
        required: true
    },
    // Is allocated: boolean and validate is allocated is a boolean
    packageIsAllocated: {
        type: Boolean,
        required: true,
        validate: {
            validator: function(value) {
                return typeof value === "boolean";
            },
            message: "Is allocated must be a boolean"
        }
    },
    // Driver ID: string and validate driver ID is a string with format DXX-33-YYY where X is a random digit, Y is a random letter 
    driverID: {
        type: String,
        required: false,
        validate: {
            validator: function(value) {
                return value.match(/^D[0-9]{2}-33-[A-Z]{3}$/);
            },
            message: "Driver ID must be a string with format DXX-33-YYY where X is a random digit, Y is a random letter"
        }
    }
});

module.exports = mongoose.model('Package', packageSchema);
