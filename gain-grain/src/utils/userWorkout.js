import mongoose from 'mongoose';

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

export default Workout;
