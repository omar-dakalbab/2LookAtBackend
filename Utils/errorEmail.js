const nodemailer = require("nodemailer");
require("dotenv").config();
// Define function to send email notification
const sendErrorEmail = (error) => {
    // // Create a transporter using Gmail's SMTP server
    // const transporter = nodemailer.createTransport({
    //     service: "Gmail",
    //     host: "smtp.gmail.com",
    //     port: 465,
    //     secure: true,
    //     auth: {
    //         user: process.env.GMAIL_EMAIL,
    //         pass: process.env.GMAIL_PASSWORD,
    //     },
    // });
    // const mailOptions = {
    //     from: process.env.GMAIL_EMAIL,
    //     to: 'omar.frontend@gmail.com',
    //     subject: '2LOOKAT - 500 Internal Server Error Occurred',
    //     text: `A 500 Internal Server Error occurred in your application:\n${error.stack}`
    // };
    // transporter.sendMail(mailOptions, (err, info) => {
    //     if (err) {
    //         console.error("Error occurred while sending email:", err);
    //     } else {
    //         console.log("Email notification sent:", info.response);
    //     }
    // });
};



module.exports = { sendErrorEmail };
