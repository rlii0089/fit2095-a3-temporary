const express = require('express'); // Import express module
const router = express.Router(); // Create express router
const driverController = require('../controllers/driver-controller');

// List all drivers
router.get('/', driverController.listDrivers);

// Insert new driver
router.post('/add', driverController.insertNewDriver);

// Delete driver by driver ID
router.delete('/remove', driverController.deleteDriverByID);

// Update driver licence and department by ID
router.put('/update', driverController.updateDriver);

module.exports = router;
