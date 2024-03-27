const express = require("express");
const userRoute = express.Router();
const userController = require("../Controllers/userController");
const { authenticateUser } = require("../middleware/authentication");

userRoute.get("/", (req, res) => {
    return res.send("Welcome to 2Look At :)");
});

userRoute.post("/signup", userController.signup);
userRoute.post("/login", userController.login);

// User profile
userRoute.get("/profile", authenticateUser, userController.getUserProfile);
userRoute.put("/edit-profile", authenticateUser, userController.editUserProfile);
userRoute.delete("/delete-profile", authenticateUser, userController.deleteUserProfile);

// Payment methods
userRoute.post("/add-method", authenticateUser, userController.addPaymentMethod);
userRoute.delete("/delete-method/:methodId", authenticateUser, userController.deletePaymentMethod);
userRoute.put("/edit-method/:methodId", authenticateUser, userController.editPaymentMethod);


// Password reset
userRoute.post("/forgot-password", userController.forgotPassword);
userRoute.post("/reset-password/:token", userController.resetPassword);


module.exports = userRoute;
