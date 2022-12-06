const mongoose = require("mongoose");
require("dotenv").config();

let db = null;
const mongooseConnection = () => {
    if (process.env.NODE_ENV === "development") {
        mongoose.connect(process.env.MONGO_URI, (err) => {
            if (err) return console.log("DB Connection refused", err);
            db = mongoose.connection;
            console.log("DB Connection Successful");
            console.log(db);
        });
    } else if (process.env.NODE_ENV === "test") {
        mongoose.connect(process.env.MONGO_TEST_URI);
        db = mongoose.connection;
    }
};

module.exports = { mongooseConnection, db };
