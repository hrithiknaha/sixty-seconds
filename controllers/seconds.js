const Seconds = require("../models/Seconds");

const findSeconds = (req, res) => {
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
                documents: seconds,
            });
        return res.status(200).json({
            success: true,
            message: `Seconds found ${seconds.length}(s)`,
            documents: seconds,
        });
    });
};

const findOneSecond = (req, res) => {
    Seconds.findById(req.params.id, (err, second) => {
        if (err)
            return res.status(500).json({
                success: false,
                message: "Error while finding seconds",
                error: `${err}`,
            });
        if (second === null)
            return res.status(200).json({
                success: true,
                message: "No Seconds found.",
                documents: [],
            });
        return res.status(200).json({
            success: true,
            message: `Second found.`,
            documents: [second],
        });
    });
};

const createSecond = (req, res) => {
    const { title, description } = req.body;

    if (title === undefined && description === undefined)
        return res.status(400).json({
            success: false,
            message: "Title and Description are needed.",
        });

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
};

const updateSecond = (req, res) => {
    const { description } = req.body;

    Seconds.findByIdAndUpdate(
        req.params.id,
        { description },
        { new: true },
        (err, second) => {
            if (err)
                return res.status(500).json({
                    success: false,
                    message: "Error while updating seconds",
                    error: `${err}`,
                });
            if (second === null)
                return res.status(200).json({
                    success: true,
                    message: "No Seconds found.",
                    documents: [],
                });
            return res.status(200).json({
                success: true,
                message: `Second found and updated.`,
                documents: [second],
            });
        }
    );
};

const deleteSecond = (req, res) => {
    Seconds.findByIdAndDelete(req.params.id, (err, second) => {
        if (err)
            return res.status(500).json({
                success: false,
                message: "Error while deleting seconds",
                error: `${err}`,
            });
        if (second === null)
            return res.status(200).json({
                success: true,
                message: "No Seconds found to delete.",
                documents: [],
            });
        return res.status(200).json({
            success: true,
            message: `Second deleted.`,
        });
    });
};

module.exports = {
    findSeconds,
    findOneSecond,
    createSecond,
    updateSecond,
    deleteSecond,
};
