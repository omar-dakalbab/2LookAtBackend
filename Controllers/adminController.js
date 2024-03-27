const Blog = require('../Models/Blog');
const Category = require('../Models/Category');
const Gig = require('../Models/Gig');
const Message = require('../Models/Message');
const Offer = require('../Models/Offer');
const Payment = require('../Models/Payment');
const User = require('../Models/User');

const adminController = {
    // Users
    getUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    deleteUser: async (req, res) => {
        try {
            const { id } = req.params;
            await User.findByIdAndDelete(id);
            res.status(204).end();
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    deactivateUser: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await User.findByIdAndUpdate(id, { status: 'inactive' }, { new: true });
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    hideGig: async (req, res) => {
        try {
            const { id } = req.params;
            const gig = await Gig.findByIdAndUpdate(id, { status: 'hidden' }, { new: true });
            res.status(200).json(gig);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    hideOffer: async (req, res) => {
        try {
            const { id } = req.params;
            const offer = await Offer.findByIdAndUpdate(id, { status: 'hidden' }, { new: true });
            res.status(200).json(offer);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Blogs
    getBlogs: async (req, res) => {
        try {
            const blogs = await Blog.find();
            res.status(200).json(blogs);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    deleteBlog: async (req, res) => {
        try {
            const { id } = req.params;
            await Blog.findByIdAndDelete(id);
            res.status(204).end();
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Categories
    getCategories: async (req, res) => {
        try {
            const categories = await Category.find();
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    deleteCategory: async (req, res) => {
        try {
            const { id } = req.params;
            await Category.findByIdAndDelete(id);
            res.status(204).end();
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Gigs
    getGigs: async (req, res) => {
        try {
            const gigs = await Gig.find();
            res.status(200).json(gigs);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    deleteGig: async (req, res) => {
        try {
            const { id } = req.params;
            await Gig.findByIdAndDelete(id);
            res.status(204).end();
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Messages
    getMessages: async (req, res) => {
        try {
            const messages = await Message.find();
            res.status(200).json(messages);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    deleteMessage: async (req, res) => {
        try {
            const { id } = req.params;
            await Message.findByIdAndDelete(id);
            res.status(204).end();
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Offers
    getOffers: async (req, res) => {
        try {
            const offers = await Offer.find();
            res.status(200).json(offers);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    deleteOffer: async (req, res) => {
        try {
            const { id } = req.params;
            await Offer.findByIdAndDelete(id);
            res.status(204).end();
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Payments
    getPayments: async (req, res) => {
        try {
            const payments = await Payment.find();
            res.status(200).json(payments);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    deletePayment: async (req, res) => {
        try {
            const { id } = req.params;
            await Payment.findByIdAndDelete(id);
            res.status(204).end();
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
};

module.exports = adminController;
