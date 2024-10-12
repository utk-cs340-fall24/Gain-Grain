import mongoose from 'mongoose';
import clientPromise from './mongodb';

const workoutSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  exercises: [
    {
      name: { type: String, required: true },
      Sets: { type: Number },
      Reps: { type: Number },
    }
  ]
});

const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema);

// Function to create a workout
export const createWorkout = async (userId, exercises) => {
  const client = await clientPromise; // Use the MongoDB client
  const db = client.db(); // Access the database
  const workoutsCollection = db.collection('workouts'); // Access the workouts collection

  const result = await workoutsCollection.insertOne({ userId, exercises, date: new Date() }); // Insert the workout
  return result; // Return the result of the insert operation
};




// Function to find workouts by userId
export const findWorkoutsByUserId = async (userId) => {
  const client = await clientPromise; // Use the MongoDB client
  const db = client.db(); // Access the database
  const workoutsCollection = db.collection('workouts'); // Access the workouts collection

  const workouts = await workoutsCollection.find({ userId }).toArray(); // Find workouts by userId
  return workouts; // Return the list of workouts
};

// Function to delete a workout by ID
export const deleteWorkoutById = async (workoutId) => {
  const client = await clientPromise; // Use the MongoDB client
  const db = client.db(); // Access the database
  const workoutsCollection = db.collection('workouts'); // Access the workouts collection

  // if workoutID is number, convert to ObjectId
  const objectId = Number.isInteger(workoutId) ? mongoose.Types.ObjectId.createFromTime(workoutId) : new mongoose.Types.ObjectId(workoutId);

  const result = await workoutsCollection.deleteOne({ _id: objectId}); // Delete the workout by ID
  return result; // Return the result of the delete operation
};

export default Workout;
