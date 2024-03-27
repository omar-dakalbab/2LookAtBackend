const mongoose = require('mongoose');

const gigSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    tags: [String],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    addOns: [String],
    startingFromPrice: {
        type: Number,
        required: true
    },
    gigImages: [String],
    gigMainImage: String,
    status: {
        type: String,
        enum: ['pending', 'in_progress', 'completed', 'canceled'],
        default: 'pending'
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

const Gig = mongoose.model('Gig', gigSchema);

module.exports = Gig;
