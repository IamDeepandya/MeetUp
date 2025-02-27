const dotenv = require("dotenv")
dotenv.config()
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("Database Connection Failed:", error);
        process.exit(1);
    }
};

module.exports = connectDB;
