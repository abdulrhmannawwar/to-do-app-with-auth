const mongoose = require("mongoose");
require("dotenv").config({ path: __dirname + "/../.env" });
const URI = process.env.MONGO_URI;
const connectDB = async () => {
    try {
        await mongoose.connect(URI);
        console.log("MongoDB connected");
    } catch (err) {
        console.error("MongoDB connection error:", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
