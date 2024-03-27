// models/Offer.js
const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    offeredBy: {
        type: String,
        required: true
    },
    categories: [String],
    description: {
        type: String,
        required: true
    },
    pricing: {
        type: String,
        required: true
    },
    expirationDate: {
        type: Date,
        required: true
    },
    discountPercentage: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Offer = mongoose.model('Offer', offerSchema);

module.exports = Offer;
