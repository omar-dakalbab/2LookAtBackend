const Payment = require('../Models/Payment');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const paymentController = {
    // Handle payment creation
    createPayment: async (req, res) => {
        const { gigId, amount } = req.body;
        if (!req.user) {
            return res.status(400).json({ message: "User is required, Please login", status: "error" });
        }
        const userId = req.user.id;
        try {
            // Check if gigId is provided
            if (!gigId) {
                return res.status(400).json({ message: "Gig ID is required", status: "error" });
            }
            // Check if amount is a positive number
            if (typeof amount !== "number" || amount <= 0) {
                return res.status(400).json({ message: "Invalid amount", status: "error" });
            }
            // Create Payment Intent with Stripe
            const paymentIntent = await stripe.paymentIntents.create({
                amount: amount * 100, // Stripe expects the amount in cents
                currency: 'usd', // Change as per your requirements
                description: `Payment for gig ${gigId} by user ${userId}`,
                metadata: { userId, gigId }
            });
            // Send client secret to confirm payment on the client-side
            return res.status(200).json({ clientSecret: paymentIntent.client_secret });
        } catch (error) {
            console.error('Error processing payment:', error);
            return res.status(500).json({ message: 'Error processing payment', status: 'error', error: error.message });
        }
    },

    // Get all payments for a user
    getUserPayments: async (req, res) => {
        try {
            const userId = req.params.userId;
            const payments = await Payment.find({ userId }).populate('gigId');
            res.status(200).json({ success: true, payments });
        } catch (error) {
            console.error('Error fetching user payments:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    },

    // Get all payments
    getAllPayments: async (req, res) => {
        try {
            const payments = await Payment.find().populate('gigId');
            res.status(200).json({ success: true, payments });
        } catch (error) {
            console.error('Error fetching all payments:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    },
};

module.exports = paymentController;
