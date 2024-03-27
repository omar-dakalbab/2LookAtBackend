require("dotenv").config();
const mongoose = require("mongoose");

const mongoURI = process.env.MONGO_URI;
const databaseName = "2LookAt"; // Specify your desired database name here


const connectToMongo = () => {
    mongoose.connect(`${mongoURI}/${databaseName}`, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log(`Connected to MongoDB database: ${databaseName}`))
        .catch((error) => console.error("Error connecting to MongoDB:", error));
};

module.exports = connectToMongo;
