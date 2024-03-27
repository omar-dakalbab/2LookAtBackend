const Category = require("../Models/Category");
const { sendErrorEmail } = require("../Utils/errorEmail");
const errorHandler = require("../Utils/errorHandler");

// Create a new category
const createCategory = async (req, res) => {
    const { name, description } = req.body;

    try {
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ message: "Category already exists", status: "error" });
        }

        const newCategory = await Category.create({
            name,
            description
        });

        return res.status(201).json({
            category: newCategory,
            message: "Category created successfully",
            status: "success"
        });
    } catch (error) {
        sendErrorEmail(error);
        errorHandler(error, req, res);
        return res.status(500).json({ message: "Internal server error", status: "error" });
    }
};

// Get all categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();

        return res.status(200).json({
            categories,
            message: "Categories retrieved successfully",
            status: "success"
        });
    } catch (error) {
        sendErrorEmail(error);
        errorHandler(error, req, res);
        return res.status(500).json({ message: "Internal server error", status: "error" });
    }
};

// Update a category by ID
const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
        const updatedCategory = await Category.findByIdAndUpdate(id, { name, description }, { new: true });

        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found", status: "error" });
        }

        return res.status(200).json({
            category: updatedCategory,
            message: "Category updated successfully",
            status: "success"
        });
    } catch (error) {
        sendErrorEmail(error);
        errorHandler(error, req, res);
        return res.status(500).json({ message: "Internal server error", status: "error" });
    }
};

// Delete a category by ID
const deleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCategory = await Category.findByIdAndDelete(id);

        if (!deletedCategory) {
            return res.status(404).json({ message: "Category not found", status: "error" });
        }

        return res.status(200).json({
            category: deletedCategory,
            message: "Category deleted successfully",
            status: "success"
        });
    } catch (error) {
        sendErrorEmail(error);
        errorHandler(error, req, res);
        return res.status(500).json({ message: "Internal server error", status: "error" });
    }
};

module.exports = {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory
};
