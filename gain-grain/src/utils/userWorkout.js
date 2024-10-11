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