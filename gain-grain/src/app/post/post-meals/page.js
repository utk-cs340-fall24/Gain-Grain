"use client";
import { useState } from 'react';

export default function PostMeals() {
    const [meals, setMeals] = useState([
        { id: 1, name: '', calories: '', proteins: '', carbs: '', fats: '' },
    ]);

    const handleChange = (id, field, value) => {
        setMeals((prev) =>
            prev.map((meal) =>
                meal.id === id ? { ...meal, [field]: value } : meal
            )
        );
    };

    // Placeholder function for submitting the meal data
    const handleSubmitMeal = () => {
        const meal = meals[0]; 
        console.log("Meal submitted:", meal);
        // Placeholder: Add backend submission logic here in the future
        alert('Meal submitted (placeholder)!');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-4xl">
                <h1 className="text-3xl font-bold mb-6 text-center">Post Meals / Recipes</h1>
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Meal / Recipe</th>
                            <th className="border px-4 py-2">Calories</th>
                            <th className="border px-4 py-2">Proteins (g)</th>
                            <th className="border px-4 py-2">Carbohydrates (g)</th>
                            <th className="border px-4 py-2">Fats (g)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {meals.map((meal) => (
                            <tr key={meal.id}>
                                <td className="border px-4 py-2">
                                    <input
                                        type="text"
                                        value={meal.name}
                                        onChange={(e) => handleChange(meal.id, 'name', e.target.value)}
                                        className="border w-full px-2 py-1 rounded"
                                        placeholder="Enter meal name"
                                    />
                                </td>
                                <td className="border px-4 py-2">
                                    <input
                                        type="number"
                                        value={meal.calories}
                                        onChange={(e) => handleChange(meal.id, 'calories', e.target.value)}
                                        className="border w-full px-2 py-1 rounded"
                                        placeholder="Enter calories"
                                    />
                                </td>
                                <td className="border px-4 py-2">
                                    <input
                                        type="number"
                                        value={meal.proteins}
                                        onChange={(e) => handleChange(meal.id, 'proteins', e.target.value)}
                                        className="border w-full px-2 py-1 rounded"
                                        placeholder="Enter proteins"
                                    />
                                </td>
                                <td className="border px-4 py-2">
                                    <input
                                        type="number"
                                        value={meal.carbs}
                                        onChange={(e) => handleChange(meal.id, 'carbs', e.target.value)}
                                        className="border w-full px-2 py-1 rounded"
                                        placeholder="Enter carbs"
                                    />
                                </td>
                                <td className="border px-4 py-2">
                                    <input
                                        type="number"
                                        value={meal.fats}
                                        onChange={(e) => handleChange(meal.id, 'fats', e.target.value)}
                                        className="border w-full px-2 py-1 rounded"
                                        placeholder="Enter fats"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button
                    onClick={handleSubmitMeal}
                    className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                >
                    Submit Meal
                </button>
            </div>
        </div>
    );
}
