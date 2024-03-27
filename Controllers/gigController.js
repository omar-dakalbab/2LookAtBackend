const Gig = require("../models/Gig");
const Payment = require("../Models/Payment");
const User = require("../Models/User");
const { sendErrorEmail } = require("../Utils/errorEmail");
const errorHandler = require("../Utils/errorHandler");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Create a new gig
// createdBy -> should be user email
const createGig = async (req, res) => {
    const { category, title, tags, description, deadline, addOns, startingFromPrice, gigImages, gigMainImage } = req.body;
    const createdBy = req.user.id; // Get user ID from authenticated request

    try {
        const newGig = await Gig.create({
            category,
            title,
            tags,
            description,
            deadline,
            addOns,
            startingFromPrice,
            gigImages,
            gigMainImage,
            createdBy,
            client: null, // Initially no client associated
        });

        return res.status(201).json({
            gig: newGig,
            message: "Gig created successfully",
            status: "success"
        });
    } catch (error) {
        sendErrorEmail(error);
        errorHandler(error, req, res);
        return res.status(500).json({ message: "Internal server error", status: "error" });
    }
};

// Update a gig by ID
const updateGig = async (req, res) => {
    const { id } = req.params;
    const { status, client, ...updateFields } = req.body; // Separate status and client from other update fields

    try {
        const updatedGig = await Gig.findByIdAndUpdate(id, {
            ...updateFields,
            status,
            client
        }, { new: true });

        if (!updatedGig) {
            return res.status(404).json({ message: "Gig not found", status: "error" });
        }

        return res.status(200).json({
            gig: updatedGig,
            message: "Gig updated successfully",
            status: "success"
        });
    } catch (error) {
        sendErrorEmail(error);
        errorHandler(error, req, res);
        return res.status(500).json({ message: "Internal server error", status: "error" });
    }
};

// Get all gigs
const getAllGigs = async (req, res) => {
    try {
        const gigs = await Gig.find();

        return res.status(200).json({
            gigs,
            message: "Gigs retrieved successfully",
            status: "success"
        });
    } catch (error) {
        sendErrorEmail(error);
        errorHandler(error, req, res);
        return res.status(500).json({ message: "Internal server error", status: "error" });
    }
};

// Get a gig grouped by category
const getGigsByCategory = async (req, res) => {
    try {
        const gigs = await Gig.aggregate([
            {
                $group: {
                    _id: "$category",
                    gigs: { $push: "$$ROOT" }
                }
            }
        ]);

        return res.status(200).json({
            gigs,
            message: "Gigs retrieved successfully",
            status: "success"
        });
    } catch (error) {
        sendErrorEmail(error);
        errorHandler(error, req, res);
        return res.status(500).json({ message: "Internal server error", status: "error" });
    }
}

// Delete a gig by ID
const deleteGig = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedGig = await Gig.findByIdAndDelete(id);

        if (!deletedGig) {
            return res.status(404).json({ message: "Gig not found", status: "error" });
        }

        return res.status(200).json({
            gig: deletedGig,
            message: "Gig deleted successfully",
            status: "success"
        });
    } catch (error) {
        sendErrorEmail(error);
        errorHandler(error, req, res);
        return res.status(500).json({ message: "Internal server error", status: "error" });
    }
};




module.exports = {
    createGig,
    getAllGigs,
    updateGig,
    deleteGig,
    getGigsByCategory
};
