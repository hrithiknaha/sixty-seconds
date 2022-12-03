const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
require("dotenv").config();

const app = express();

mongoose
    .connect(process.env.MONGO_URI, { family: 4 })
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log("DB Connection Failed", err));

app.use(express.json());
app.use(morgan("tiny"));

app.use("/api/seconds", require("./routes/Seconds"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
