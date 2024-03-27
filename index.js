const connectToMongo = require("./database");
connectToMongo();

const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

const http = require("http");

const server = http.createServer(app);

const userRoutes = require("./Routes/userRoutes");
const blogRoutes = require("./Routes/blogRoutes");
const offerRoutes = require("./Routes/offerRoutes");
const categoryRoutes = require("./Routes/categoryRoutes");
const gigRoutes = require("./Routes/gigRoutes");
const paymentRoutes = require("./Routes/paymentRoutes");
const stripeRoutes = require("./Routes/stripeAccountRoutes");
const Payment = require("./Models/Payment");

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// to use req.body as json we need to use middle ware
app.use(
    fileUpload({
        useTempFiles: true,
    })
);
app.use(cors());

app.use(express.json());

app.use("/", userRoutes);
app.use("/blog", blogRoutes);
app.use("/offer", offerRoutes);
app.use("/category", categoryRoutes);
app.use("/gig", gigRoutes);
app.use("/payment", paymentRoutes);
app.use("/stripe", stripeRoutes)


// WEEBHOOK FOR STRIPE

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_823a4f18862adae53019769c557b9f3f718fecb034d19601e67f18e5dc396d9d";



app.post("/webhook", async (req, res) => {
    const event = req.body;
    console.log(event)
    // Handle charge.succeeded event
    if (event.type === "charge.succeeded") {
        const charge = event.data.object;
        const paymentIntentId = charge.payment_intent;
        // Handle successful charge
    }
    // Handle payment_intent.succeeded event
    if (event.type === "payment_intent.succeeded") {
        const paymentIntent = event.data.object;
        const payment = new Payment({
            userId: paymentIntent.metadata.userId,
            gigId: paymentIntent.metadata.gigId,
            amount: paymentIntent.amount / 100,
            paymentMethod: 'Stripe',
            paymentIntentId: paymentIntent.id,
            status: "succeeded",
            stripeObject: paymentIntent
        });
        await payment.save();
    }

    // Handle payment_intent.payment_failed event
    if (event.type === "payment_intent.payment_failed") {
        const paymentIntent = event.data.object;
        // Handle failed payment intent in Payment Model
        const payment = new Payment({
            userId: paymentIntent.metadata.userId,
            gigId: paymentIntent.metadata.gigId,
            amount: paymentIntent.amount / 100,
            paymentMethod: 'Stripe',
            paymentIntentId: paymentIntent.id,
            status: "failed",
            stripeObject: paymentIntent
        });

        await payment.save();
    }
    if (event.type === "charge.refund.updated") {
        console.log("Refund updated")
        const refund = event.data.object;
        const paymentId = refund.payment_intent;

        const payment = await Payment.findOne({ paymentIntentId: paymentId });
        payment.stripeObject = refund;
        payment.status = "refunded";
        await payment.save();
        // update database
    }
    if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        console.log("Session completed")

    }
    return res.status(200).end();
});



server.listen(port, () => {
    console.log(`2LookAt backend app listening at http://localhost:${port}`);
});
