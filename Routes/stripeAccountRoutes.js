const express = require('express');
const router = express.Router();
const stripeAccountRoutes = require('../Controllers/stripeAccountController');


// flow of below api's are important, they are dependent on each other
// stripe payment flow
router.post("/createConnectAccount", stripeAccountRoutes.createConnectAccount);
router.post("/createConnectAccountLink", stripeAccountRoutes.createConnectAccountLink);
router.post("/createPaymentSheet", stripeAccountRoutes.createPaymentSheet);
router.post("/checkBalance", stripeAccountRoutes.checkBalance);

module.exports = router;
