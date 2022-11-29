const mongoose = require("mongoose");
require("dotenv").config();

module.exports = mongoose.connect(
    process.env.MONGO_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (err) return console.log("MongoDB failed with error", err);
        return console.log("DB Connected");
    }
);
