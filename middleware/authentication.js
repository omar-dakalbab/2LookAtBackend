// middleware/authentication.js

const jwt = require("jsonwebtoken");
const UserModal = require("../Models/User");

const authenticateUser = async (req, res, next) => {
    try {
        // Extract the token from the request headers
        const token = req.header("Authorization").replace("Bearer ", "");
     
        // Verify the token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  
        // Find the user associated with the token
        const user = await UserModal.findOne({ _id: decodedToken.id });

        if (!user) {
            throw new Error();
        }

        // Attach the user object and token to the request
        req.token = token;
        req.user = user;


        // Doing Authentication for user token everytime he makes a request!

        // Move to the next middleware or route handler
        next();


    } catch (error) {
        console.log(error)
        res.status(401).send({ error: "Authentication failed. Please authenticate." });
    }
};

module.exports = {
    authenticateUser
};
