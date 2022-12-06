const router = require("express").Router();

const {
    findSeconds,
    findOneSecond,
    createSecond,
    updateSecond,
    deleteSecond,
} = require("../controllers/seconds");

router.get("/", findSeconds);
router.get("/:id", findOneSecond);
router.post("/", createSecond);
router.put("/:id", updateSecond);
router.delete("/:id", deleteSecond);

module.exports = router;
