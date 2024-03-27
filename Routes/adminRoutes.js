const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/adminController');

// Users
router.get('/users', adminController.getUsers);
router.delete('/users/:id', adminController.deleteUser);

// Blogs
router.get('/blogs', adminController.getBlogs);
router.delete('/blogs/:id', adminController.deleteBlog);

// Categories
router.get('/categories', adminController.getCategories);
router.delete('/categories/:id', adminController.deleteCategory);

// Gigs
router.get('/gigs', adminController.getGigs);
router.delete('/gigs/:id', adminController.deleteGig);

// Messages
router.get('/messages', adminController.getMessages);
router.delete('/messages/:id', adminController.deleteMessage);

// Offers
router.get('/offers', adminController.getOffers);
router.delete('/offers/:id', adminController.deleteOffer);

// Payments
router.get('/payments', adminController.getPayments);
router.delete('/payments/:id', adminController.deletePayment);

module.exports = router;
