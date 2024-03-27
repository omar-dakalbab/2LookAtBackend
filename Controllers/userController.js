const UserModal = require("../Models/User");
const { sendErrorEmail } = require("../Utils/errorEmail");
const { sendEmail } = require("../Utils/sendEmail");
const errorHandler = require("../Utils/errorHandler");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signup = async (req, res) => {
    const {
        firstName,
        lastName,
        gender,
        email,
        phoneNumber,
        password,
        confirmPassword,
        companyName,
        companyBusiness,
        companyWebsite,
        availableWhatsAppNumber,
        methodToContactWithFreelancers,
        userType,
        category,
        subCategory,
        aboutYourself,
    } = req.body;

    try {
        const existingUser = await UserModal.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: "User already exists", status: "error" });
        }

        if (!userType) {
            return res.status(400).send({ message: "Please specify the user type ('buyer' or 'freelancer')", status: "error" });
        }

        if ((userType === "buyer" && (!category || !subCategory || !aboutYourself)) ||
            (userType === "freelancer" && (!companyName || !companyBusiness || !companyWebsite || !methodToContactWithFreelancers))) {
            const missingFields = [];
            if (userType === "buyer") {
                if (!category) missingFields.push("category");
                if (!subCategory) missingFields.push("subCategory");
                if (!aboutYourself) missingFields.push("aboutYourself");
            } else if (userType === "freelancer") {
                if (!companyName) missingFields.push("companyName");
                if (!companyBusiness) missingFields.push("companyBusiness");
                if (!companyWebsite) missingFields.push("companyWebsite");
                if (!methodToContactWithFreelancers) missingFields.push("methodToContactWithFreelancers");
            }
            return res.status(400).send({ message: "Please fill all the required fields", status: "error", missingFields });
        }

        if (password !== confirmPassword) {
            return res.status(400).send({ message: "Passwords do not match", status: "error" });
        }

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).send({ message: "Please fill all the required fields", status: "error" });
        }

        const hashPass = await bcrypt.hash(password, 8);
        const reqDate = new Date();
        const result = await UserModal.create({
            firstName,
            lastName,
            gender,
            email,
            phoneNumber,
            password: hashPass,
            companyName,
            companyBusiness,
            companyWebsite,
            availableWhatsAppNumber,
            methodToContactWithFreelancers,
            createDate: reqDate,
            profileImg: "https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg",
            passwordResetToken: "",
            status: "active",
            expoPushToken: "",
            userType: userType,
            profileCoverImg: "",
            socialLinks: {
                facebook: "",
                twitter: "",
                linkedIn: "",
                instagram: "",
            },
            location: {
                country: "",
                city: "",
                address: "",
            },
            bio: "",
            jobTitle: ""
        });

        const token = jwt.sign(
            { email: result.email, id: result._id },
            process.env.JWT_SECRET
        );

        return res.status(201).send({
            user: result,
            token,
            message: "Account created successfully",
            status: "success",
        });
    } catch (error) {
        sendErrorEmail(error);
        errorHandler(error, req, res);
        return res.status(500).send({ message: "Internal server error", status: "error" });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await UserModal.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found", status: "error" });
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password", status: "error" });
        }

        const token = jwt.sign(
            { email: existingUser.email, id: existingUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200).json({ token, user: existingUser, message: "Logged in successfully", status: "success" });
    } catch (error) {
        sendErrorEmail(error);
        errorHandler(error, req, res);
        return res.status(500).json({ message: "Internal server error", status: "error" });
    }
};

const addPaymentMethod = async (req, res) => {
    const userId = req.user.id; // Assuming you're using middleware to authenticate the user and store user information in req.user

    try {
        // Retrieve the user from the database
        const user = await UserModal.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found", status: "error" });
        }

        const { paymentMethod } = req.body;

        // Add the payment method to the user
        user.paymentMethods.push(paymentMethod);

        // Save the updated user with the new payment method
        await user.save();

        return res.status(200).json({ user, message: "Payment method added successfully", status: "success" });
    } catch (error) {
        sendErrorEmail(error);
        errorHandler(error, req, res);
    }
};

const editPaymentMethod = async (req, res) => {
    const userId = req.user.id;
    const methodId = req.params.methodId;

    try {
        const user = await UserModal.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found", status: "error" });
        }

        // Find the index of the payment method to edit
        const methodIndex = user.paymentMethods.findIndex(method => method._id.toString() === methodId);

        if (methodIndex === -1) {
            return res.status(404).json({ message: "Payment method not found", status: "error" });
        }

        const { updatedMethod } = req.body;

        // Update the payment method at the found index
        user.paymentMethods[methodIndex] = updatedMethod;

        await user.save();

        return res.status(200).json({ user, message: "Payment method updated successfully", status: "success" });
    } catch (error) {
        sendErrorEmail(error);
        errorHandler(error, req, res);
    }
};

const deletePaymentMethod = async (req, res) => {
    const userId = req.user.id;
    const methodId = req.params.methodId;

    try {
        const user = await UserModal.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found", status: "error" });
        }

        // Find the index of the payment method to delete
        const methodIndex = user.paymentMethods.findIndex(method => method._id.toString() === methodId);

        if (methodIndex === -1) {
            return res.status(404).json({ message: "Payment method not found", status: "error" });
        }

        // Remove the payment method from the array
        user.paymentMethods.splice(methodIndex, 1);

        await user.save();

        return res.status(200).json({ user, message: "Payment method deleted successfully", status: "success" });
    } catch (error) {
        sendErrorEmail(error);
        errorHandler(error, req, res);
    }
};

const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await UserModal.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found", status: "error" });
        }

        // Generate a unique password reset token
        const resetToken = crypto.randomBytes(20).toString('hex');
    
        // Calculate token expiration time (now + 1 day)
        const tokenExpiration = Date.now() + (24 * 60 * 60 * 1000);
        // Update user's password reset token and expiration in the database
        user.passwordResetToken = resetToken;
        user.passwordResetExpires = tokenExpiration;
        await user.save();

        // Send email to user with password reset link
        const resetURL = `http://example.com/reset/${resetToken}`;
        const mailOptions = {
            to: user.email,
            from: 'support@2lookAt.com',
            subject: 'Password Reset',
            text: `You are receiving this email because you (or someone else) has requested the reset of the password for your account.\n\n`
                + `Please click on the following link, or paste this into your browser to complete the process:\n\n`
                + `${resetURL}\n\n`
                + `If you did not request this, please ignore this email and your password will remain unchanged.\n`
        };

        // Assuming you have a function to send emails
        await sendEmail(mailOptions);

        return res.status(200).json({ message: "Password reset instructions sent to your email", status: "success" });
    } catch (error) {
        sendErrorEmail(error);
        errorHandler(error, req, res);
        return res.status(500).json({ message: "Internal server error", status: "error" });
    }
};

const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;
    try {
        const user = await UserModal.findOne({
            passwordResetToken: token,
            passwordResetExpires: { $gt: Date.now() }
        });
        if (!user) {
            return res.status(400).json({ message: "Password reset token is invalid or has expired", status: "error" });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match", status: "error" });
        }
        const newPasswordHash = await bcrypt.hash(password, 8);
        // Update user's password
        user.password = newPasswordHash;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();
        return res.status(200).json({ message: "Password reset successful", status: "success" });
    } catch (error) {
        sendErrorEmail(error);
        errorHandler(error, req, res);
        return res.status(500).json({ message: "Internal server error", status: "error" });
    }
}

// User profile operations
const getUserProfile = async (req, res) => {
    const userId = req.user.id;

    try {
        const user = await UserModal.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found", status: "error" });
        }

        return res.status(200).json({ user, status: "success" });
    } catch (error) {
        sendErrorEmail(error);
        errorHandler(error, req, res);
    }
}


// Edit user profile
const editUserProfile = async (req, res) => {
    const userId = req.user.id;

    const updatedFields = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        companyName: req.body.companyName,
        companyBusiness: req.body.companyBusiness,
        companyWebsite: req.body.companyWebsite,
        availableWhatsAppNumber: req.body.availableWhatsAppNumber,
        methodToContactWithFreelancers: req.body.methodToContactWithFreelancers,
        profileImg: req.body.profileImg,
        phoneNo: req.body.phoneNo,
        address: req.body.address,
        status: req.body.status,
        expoPushToken: req.body.expoPushToken,
        paymentMethods: req.body.paymentMethods,
        socialLinks: req.body.socialLinks,
        location: req.body.location,
        bio: req.body.bio,
        jobTitle: req.body.jobTitle
    };

    try {
        const user = await UserModal.findByIdAndUpdate(userId, updatedFields, { new: true });
        if (!user) {
            return res.status(404).json({ message: "User not found", status: "error" });
        }
        return res.status(200).json({ user, message: "User profile updated successfully", status: "success" });
    } catch (error) {
        sendErrorEmail(error);
        errorHandler(error, req, res);
    }
}


const deleteUserProfile = async (req, res) => {
    const userId = req.user.id;

    try {
        const deletedUser = await UserModal.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found", status: "error" });
        }

        return res.status(200).json({ message: "User profile deleted successfully", status: "success" });
    } catch (error) {
        sendErrorEmail(error);
        errorHandler(error, req, res);
    }
}

module.exports = {
    signup,
    login,
    addPaymentMethod,
    editPaymentMethod,
    deletePaymentMethod,
    forgotPassword,
    resetPassword,
    getUserProfile,
    editUserProfile,
    deleteUserProfile
};
