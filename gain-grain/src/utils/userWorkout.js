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

// create a workout
export const createWorkout = async (userId, exercises) => {
  const client = await clientPromise;
  const db = client.db();
  const workoutsCollection = db.collection('workouts');

  const result = await workoutsCollection.insertOne({ userId, exercises, date: new Date() });
  return result;
};

// find workouts by userId
export const findWorkoutsByUserId = async (userId) => {
  const client = await clientPromise;
  const db = client.db();
  const workoutsCollection = db.collection('workouts');

  const workouts = await workoutsCollection.find({ userId }).toArray();
  return workouts;
};

// delete a workout by ID
export const deleteWorkoutById = async (workoutId) => {
  const client = await clientPromise;
  const db = client.db();
  const workoutsCollection = db.collection('workouts');
  const result = await workoutsCollection.deleteOne({ _id: new mongoose.Types.ObjectId(workoutId) });
  return result;
};

export default Workout;
