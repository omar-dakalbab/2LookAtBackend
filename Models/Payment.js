// models/Payment.js

const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    gigId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Gig",
        required: true
    },
    paymentIntentId: {
        type: String,
        required: true
    },
    stripeObject: {
        type: Object

    },
    amount: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: "pending"
    },

});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
