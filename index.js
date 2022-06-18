const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

app.get('/', (req, res) => {
    res.send('Running');
});

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('stage', (data) => {
        console.log('stage: ', data);
        socket.broadcast.emit('stage', data)
    })

    socket.on('message', (data) => {
        console.log('message: ' + data);
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

const PORT = process.env.PORT || 5000
server.listen(PORT, () => console.log('localhost listening on port ' + PORT));