const router = require("express").Router();
const Seconds = require("../models/Seconds");

router.get("/", (req, res) => {
    Seconds.find((err, seconds) => {
        if (err)
            return res.status(500).json({
                success: false,
                message: "Error while finding seconds",
                error: `${err}`,
            });
        if (seconds.length === 0)
            return res.status(200).json({
                success: true,
                message: "No Seconds found.",
                document: seconds,
            });
        return res.status(200).json({
            success: true,
            message: `Seconds found ${seconds.length}(s)`,
            document: seconds,
        });
    });
});

router.post("/", (req, res) => {
    const { title, description } = req.body;
    const second = new Seconds({ title, description });

    second.save((err, second) => {
        if (err)
            return res.status(500).json({
                success: false,
                message: "Error while adding seconds",
                error: `${err}`,
            });
        return res.status(201).json({
            success: true,
            message: "Seconds added.",
            document: second,
        });
    });
});

module.exports = router;
