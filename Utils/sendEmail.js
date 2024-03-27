const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = (mailOptions) => {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.GMAIL_EMAIL,
            pass: process.env.GMAIL_PASSWORD,
        },
    });

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error("Error occurred while sending email:", err);
        } else {
            console.log("Email notification sent:", info.response);
        }
    });
};



module.exports = { sendEmail };
