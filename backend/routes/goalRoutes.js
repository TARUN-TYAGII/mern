const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();
const { getGoal, setGoal, updateGoal, deleteGoal } = require("../controller/goalController");

router.route("/").get(authMiddleware, getGoal).post(authMiddleware, setGoal);
router.route("/:id").put(authMiddleware, updateGoal).delete(authMiddleware, deleteGoal);

module.exports = router;
