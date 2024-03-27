const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    gender: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    phoneNumber: {
        type: String,
    },
    password: {
        type: String,
    },
    companyName: {
        type: String,
    },
    companyBusiness: {
        type: String,
    },
    companyWebsite: {
        type: String,
    },
    availableWhatsAppNumber: {
        type: String,
    },
    methodToContactWithFreelancers: {
        type: String,
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    profileImg: {
        type: String,
        default: "https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg"
    },
    passwordResetToken: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        default: "active"
    },
    expoPushToken: {
        type: String,
        default: ""
    },
    userType: {
        type: String,
    },
    profileCoverImg: {
        type: String,
        default: ""
    },
    socialLinks: {
        facebook: {
            type: String,
            default: ""
        },
        twitter: {
            type: String,
            default: ""
        },
        linkedIn: {
            type: String,
            default: ""
        },
        instagram: {
            type: String,
            default: ""
        },
    },
    location: {
        country: {
            type: String,
            default: ""
        },
        city: {
            type: String,
            default: ""
        },
        address: {
            type: String,
            default: ""
        },
    },
    bio: {
        type: String,
        default: ""
    },
    jobTitle: {
        type: String,
        default: ""
    },
    notifications: [{
        type: String,
    }],
    paymentMethods: {
        type: [String] // Assuming payment methods are strings, modify as needed
    }
});

module.exports = mongoose.model("User", UserSchema);
