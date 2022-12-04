// const mongoose = require("mongoose");
// const { connect, connection } = require("mongoose");
// require("dotenv/config");
// mongoose.set("autoIndex", true);
// mongoose.set("debug", false);

// const mongoConectionString = `${process.env.MONGODB_URI}${process.env.DB_NAME}`;

// connect(mongoConectionString, (err) => {
//     if (err) {
//         console.log("Failed to connect to MongoDB");
//     } else {
//         console.log("Successfully connected to MongoDB");
//     }
// });

// connection.on("connecting", function () {
//     console.log("Connecting to MongoDB");
// });

// connection.on("error", (error) => {
//     console.error("Error in MongoDb connection: " + error);
//     mongoose.disconnect();
// });
// connection.on("connected", () => {
//     console.log("MongoDB connected!");
// });

// connection.once("open", () => {
//     console.log("MongoDB connection opened!");
// });
// connection.on("reconnected", () => {
//     console.log("MongoDB reconnected!");
// });
// connection.on("disconnected", () => {
//     console.log("MongoDB disconnected!");
//     mongoose.connect(mongoConectionString);
// });

// module.exports = mongoose;