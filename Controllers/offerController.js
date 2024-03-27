// controllers/offerController.js
const Offer = require('../models/Offer');
const { sendErrorEmail } = require('../Utils/errorEmail');
const errorHandler = require('../Utils/errorHandler');

// Create a new offer
const createOffer = async (req, res) => {
    const {
        title,
        offeredBy,
        categories,
        description,
        pricing,
        expirationDate,
        discountPercentage,
        price,
        duration,
        contact
    } = req.body;

    try {
        const newOffer = await Offer.create({
            title,
            offeredBy,
            categories,
            description,
            pricing,
            expirationDate,
            discountPercentage,
            price,
            duration,
            contact
        });

        return res.status(201).json({
            offer: newOffer,
            message: 'Offer created successfully',
            status: 'success'
        });
    } catch (error) {
        sendErrorEmail(error);
        errorHandler(error, req, res);
        return res.status(500).json({ message: 'Internal server error', status: 'error' });
    }
};

// Get all offers
const getAllOffers = async (req, res) => {
    try {
        const offers = await Offer.find();

        return res.status(200).json({
            offers,
            message: 'Offers retrieved successfully',
            status: 'success'
        });
    } catch (error) {
        sendErrorEmail(error);
        errorHandler(error, req, res);
        return res.status(500).json({ message: 'Internal server error', status: 'error' });
    }
};

const getOffersByCategory = async (req, res) => {
    try {
        const offers = await Offer.aggregate([
            {
                $group: {
                    _id: '$categories',
                    offers: { $push: '$$ROOT' }
                }
            }
        ]);

        return res.status(200).json({
            offers,
            message: 'Offers retrieved successfully',
            status: 'success'
        });
    } catch (error) {
        sendErrorEmail(error);
        errorHandler(error, req, res);
        return res.status(500).json({ message: 'Internal server error', status: 'error' });
    }
}

// Update an offer by ID
const updateOffer = async (req, res) => {
    const { id } = req.params;
    const {
        title,
        offeredBy,
        categories,
        description,
        pricing,
        expirationDate,
        discountPercentage,
        price,
        duration,
        contact
    } = req.body;

    try {
        const updatedOffer = await Offer.findByIdAndUpdate(id, {
            title,
            offeredBy,
            categories,
            description,
            pricing,
            expirationDate,
            discountPercentage,
            price,
            duration,
            contact
        }, { new: true });

        if (!updatedOffer) {
            return res.status(404).json({ message: 'Offer not found', status: 'error' });
        }

        return res.status(200).json({
            offer: updatedOffer,
            message: 'Offer updated successfully',
            status: 'success'
        });
    } catch (error) {
        sendErrorEmail(error);
        errorHandler(error, req, res);
        return res.status(500).json({ message: 'Internal server error', status: 'error' });
    }
};

// Delete an offer by ID
const deleteOffer = async (req, res) => {
    const { id } = req.params;

    const offer = await Offer.findById(id);
    
    try {
        const deletedOffer = await Offer.findByIdAndDelete(id);

        if (!deletedOffer) {
            return res.status(404).json({ message: 'Offer not found', status: 'error' });
        }

        return res.status(200).json({
            offer: deletedOffer,
            message: 'Offer deleted successfully',
            status: 'success'
        });
    } catch (error) {
        sendErrorEmail(error);
        errorHandler(error, req, res);
        return res.status(500).json({ message: 'Internal server error', status: 'error' });
    }
};

module.exports = {
    createOffer,
    getAllOffers,
    updateOffer,
    deleteOffer,
    getOffersByCategory
};
