const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
const User = require("../models/userModel");

const getGoal = asyncHandler(async (req, res) => {
  const fetchGoal = await Goal.find({ user: req.user._id });
  res.status(200).json({
    message: "All goals fetched",
    data: fetchGoal,
  });
});

const setGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.create({ text: req.body.text, user: req.user._id });
  res.status(201).json({
    message: "Goal created",
    data: goal,
  });
});

const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(404);
    throw new Error("Goal not found");
  }
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (goal.user.toString() !== user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized to update this goal");
  }
  const goalToUpdate = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({
    message: "Goal updated",
    data: goalToUpdate,
  });
});




const deleteGoal = asyncHandler(async (req, res) => {
  const goalToDelete = await Goal.findByIdAndDelete(req.params.id);
  if (!goalToDelete) {
    res.status(404);
    throw new Error("Goal not found");
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (goalToDelete.user.toString() !== user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized to delete this goal");
  }
  res.status(200).json({
    message: "Below goal is deleted successfully",
    data: goalToDelete,
  });
});

module.exports = {
  getGoal,
  setGoal,
  updateGoal,
  deleteGoal,
};
