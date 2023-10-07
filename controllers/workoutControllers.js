const Workout = require("../schema/workoutSchema");
const mongoose = require("mongoose");

// GET All Workouts
const getAllWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 });

  res.status(200).json(workouts);
};

// GET A SINGLE WORKOUT
const getWorkout = async (req, res) => {
  const id = req.params.id;

  if(!mongoose.Types.ObjectId.isValid(id)){
    res.status(404).json({error: "No such workout"})
  }

  const workout = await Workout.findById(id);
  if (!workout) {
    return res.status(404).json({ error: "no such workout" });
  }
  res.status(200).json(workout);
};

// CREATE NEW WORKOUT
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  // adding doc to DB
  try {
    const workout = await Workout.create({ title, load, reps });
    res.status(200).json(workout);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// DELETE A WORKOUT

// UPDATE A WORKOUT

module.exports = { createWorkout, getAllWorkouts, getWorkout };