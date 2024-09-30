import mongoose from 'mongoose';

const mealSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  meals: [
    {
      name: { type: String, required: true },
      ingredients: { type: [String], required: true },
      calories: { type: Number, required: true }
    }
  ]
});

const Meal = mongoose.models.Meal || mongoose.model('Meal', mealSchema);

export default Meal;
