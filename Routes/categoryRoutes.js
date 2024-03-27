// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../Controllers/categoryController');

// Create a new category
router.post('/', categoryController.createCategory);

// Get all categories
router.get('/', categoryController.getAllCategories);

// Update a category by ID
router.put('/:id', categoryController.updateCategory);

// Delete a category by ID
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
