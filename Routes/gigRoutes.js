// routes/gigRoutes.js
const express = require('express');
const router = express.Router();
const gigController = require('../Controllers/gigController');
const { authenticateUser } = require('../middleware/authentication');

// Create a new gig
router.post('/', authenticateUser, gigController.createGig);

// Get all gigs
router.get('/', gigController.getAllGigs);

// Get a gig grouped by category
router.get('/gig-category', gigController.getGigsByCategory);

// Update a gig by ID
router.put('/:id', authenticateUser, gigController.updateGig);

// Delete a gig by ID
router.delete('/:id', authenticateUser, gigController.deleteGig);

module.exports = router;
