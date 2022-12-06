const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

require("dotenv").config();

const app = express();

if (process.env.NODE_ENV === "development") {
    mongoose.connect(process.env.MONGO_URI, (err) => {
        if (err) return console.log("DB Connection refused", err);
        return console.log("DB Connection successful");
    });
} else if (process.env.NODE_ENV === "test")
    mongoose.connect(process.env.MONGO_TEST_URI);

app.use(express.json());
app.use(morgan("tiny"));

app.use("/api/seconds", require("./routes/Seconds"));

module.exports = { app, mongoose };
