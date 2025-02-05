const { Server } = require("socket.io");

const rooms = {}; 

const setupSocket = (server) => {
    const io = new Server(server, {
        cors: { origin: "*", methods: ["GET", "POST"] }
    });

    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        socket.on("join-room", ({ roomId, userId }) => {
            if (!rooms[roomId]) rooms[roomId] = [];
            rooms[roomId].push(userId);
            socket.join(roomId);
            socket.to(roomId).emit("user-connected", userId);
        });

        socket.on("signal", ({ roomId, signal, userId }) => {
            socket.to(roomId).emit("signal", { signal, userId });
        });

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
            for (let room in rooms) {
                rooms[room] = rooms[room].filter(id => id !== socket.id);
                io.to(room).emit("user-disconnected", socket.id);
            }
        });
    });

    return io;
};

module.exports = setupSocket;
