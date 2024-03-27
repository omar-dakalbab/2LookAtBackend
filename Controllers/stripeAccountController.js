require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


const createConnectAccount = async (req, res) => {
    try {
        const account = await stripe.accounts.create({
            type: "express",
        });
        return res.send(account);
    } catch (error) {
        return error.message;
    }
};

const createConnectAccountLink = async (req, res) => {
    const paymentId = req.body.paymentId;
    const returnUrl = req.body.returnUrl;
    const refreshUrl = req.body.refreshUrl;
    if (paymentId?.length > 0) {
        try {
            const accountLink = await stripe.accountLinks.create({
                account: paymentId, // seller account id
                refresh_url: refreshUrl,
                return_url: returnUrl,
                type: "account_onboarding",
            });
            return res.status(201).send(accountLink);
        } catch (error) {
            return res.status(500).send(error);
        }
    } else {
        return res.status(400).send("paymentId is required");
    }
};

const createPaymentSheet = async (req, res) => {
    const amount = req.body.amount;
    const paymentId = req.body.paymentId;

    // fee for platform
    const stripePlatformAmount = req.body.stripePlatformAmount;

    try {
        // Use an existing Customer ID if this is a returning customer.
        const customer = await stripe.customers.create();
        const ephemeralKey = await stripe.ephemeralKeys.create(
            { customer: customer.id },
            { apiVersion: "2023-10-16" }
        );

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount, //  1099 to $10.99
            currency: "usd",
            customer: customer.id,
            automatic_payment_methods: {
                enabled: true,
            },
            application_fee_amount: stripePlatformAmount, // will be store as collection fee for each transaction
            transfer_data: {
                destination: paymentId, // destination
            },
        });

        return res.json({
            paymentIntent: paymentIntent.client_secret,
            ephemeralKey: ephemeralKey.secret,
            customer: customer.id,
            publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
        });
    } catch (error) {
        console.log(error)
        return res.send(error);
    }
};
const checkBalance = async (req, res) => {
    const paymentId = req.body.paymentId; // stripe account id
    try {
        const balance = await stripe.balance.retrieve({
            stripeAccount: paymentId,
        });
        return res.send(balance);
    } catch (error) {
        return res.send(error);
    }
};

module.exports = { createConnectAccount, createConnectAccountLink, createPaymentSheet, checkBalance };