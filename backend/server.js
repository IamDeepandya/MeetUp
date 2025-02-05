const getEnv = require('dotenv')
getEnv.config()
const express = require("express");
const http = require("http");
const cors = require("cors");
const connectDB = require("./config/db");
const meetingRoutes = require("./routes/meetingRoutes");
const setupSocket = require("./config/socket");

const app = express();
const server = http.createServer(app);

// Database Connection
connectDB();


// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", meetingRoutes);

// WebSocket Setup
setupSocket(server);

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
