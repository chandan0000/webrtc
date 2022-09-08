const express = require("express");
const mongoose = require("mongoose");
const app = express();
// const xyz = require("./config/app.config");
const { MONGO_DB_CONFIG } = require("./config/app.config");
const http = require("http");
const server = http.createServer(app);
const { initMeetingServer } = require("./meeting-server");
initMeetingServer(server);
 
//meeting-Server
//initMeetingServer(Server)
mongoose.Promise = global.Promise;
mongoose.connect(MONGO_DB_CONFIG.DB, {
    userNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Database Connected");
}, (error) => {
    console.log("Database Not Connected");
})
app.use(express.json());
app.use("/api", require("./routes/app.routes"));
server.listen(process.env.port || 3000, function () {
    console.log("Server is running on port 3000");
});