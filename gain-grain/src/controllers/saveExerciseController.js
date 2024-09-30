import Exercise from '../utils/userWorkout'

export const saveExercise = async (req, res) => {

    const {name, sets, reps, userId} = req.body;
    try {
        const newExercise = new Exercise({ name, sets, reps, userId});

        await newExercise.save();
        res.status(201).json({ success: true, exercise: newExercise });
    } catch (error) {
        console.error('Error saving exercise:', error);
        res.status(500).json({ success: false, message: 'Error saving exercise' });
    }
};