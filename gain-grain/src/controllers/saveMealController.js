import Meal from '../utils/userMeal';

export const saveMeal = async (req, res) => {
    const {name, ingredients, calories, userId} = req.body;

    try {
        const NewMeal = new Meal({ name, ingredients, calories, userId});
        await NewMeal.save();
        res.status(201).json({ success: true, meal: newMeal });
    } catch (error) {
    res.status(500).json({ success: false, message: 'Error saving meal' });
    }
};