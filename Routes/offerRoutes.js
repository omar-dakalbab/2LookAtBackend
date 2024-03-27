// routes/offerRoutes.js
const express = require('express');
const router = express.Router();
const offerController = require('../Controllers/offerController');
const { authenticateUser } = require('../middleware/authentication');

// Create a new offer
router.post('/', authenticateUser, offerController.createOffer);

// Get all offers
router.get('/', offerController.getAllOffers);
router.get('/offer-category', offerController.getOffersByCategory);

// Update an offer by ID
router.put('/:id', authenticateUser, offerController.updateOffer);

// Delete an offer by ID
router.delete('/:id', authenticateUser, offerController.deleteOffer);

module.exports = router;
