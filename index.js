const express = require("express");
const mongoose = require("mongoose");
require("./connection/index.js");
const app = express();
// const xyz = require("./config/app.config");
// const { MONGO_DB_CONFIG } = require("./config/app.config");
mongoose.connect('mongodb+srv://chandan:chandan12345@cluster0.dhlcvij.mongodb.net/?retryWrites=true&w=majority').then(() => {
    console.log('Connected to database!');
}).catch((err) => { console.log(err); });


const http = require("http");
const server = http.createServer(app);
const { initMeetingServer } = require("./meeting-server");

initMeetingServer(server);

//meeting-Server
//initMeetingServer(Server)

app.use(express.json());
app.use("/api", require("./routes/app.routes"));
server.listen(process.env.port || 3000, function () {
    console.log("Server is running on port 3000");
});