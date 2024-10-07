const express = require('express');
const router = express.Router();
const packageController = require('../controllers/package-controller');

// List all packages
router.get('/', packageController.listPackages);

// Insert new package
router.post('/add', packageController.insertNewPackage);

// Delete package by package ID
router.delete('/remove', packageController.deletePackageByID);

// Update package destination by ID
router.put('/update', packageController.updatePackageDestination);

module.exports = router;
