const mongoose = require("mongoose");

const secondsSchema = mongoose.Schema(
    {
        title: String,
        description: String,
        flair: String,
    },
    { timestamps: true }
);

module.exports = mongoose.model("Seconds", secondsSchema);
