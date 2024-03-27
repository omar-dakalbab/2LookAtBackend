const express = require('express');
const router = express.Router();
const paymentController = require('../Controllers/paymentController');
const { authenticateUser } = require('../middleware/authentication');

// Route to create a new payment
router.post('/', authenticateUser, paymentController.createPayment);

// Route to get all payments for a user
router.get('/payments/user/:userId', authenticateUser, paymentController.getUserPayments);
router.get('/payments', authenticateUser, paymentController.getAllPayments);

module.exports = router;
