const fs = require("fs");

// Define error handling middleware
const errorHandler = (err, req, res) => {
    console.error(err); // Log the error for debugging purposes

    // Write error to a log file
    fs.appendFile("error.log", `${new Date().toISOString()}: ${err.stack}\n`, (error) => {
        if (error) {
            console.error("Error writing to log file:", error);
        }
    });
};

module.exports = errorHandler;
