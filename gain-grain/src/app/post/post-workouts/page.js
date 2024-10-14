"use client";
import { useState } from 'react';
export default function PostWorkouts() {
    const [exercises, setExercises] = useState([
        { id: 1, name: '', repetitions: '', set: '' },
    ]);
    const handleChange = (id, field, value) => {
        setExercises((prev) =>
            prev.map((exercise) =>
                exercise.id === id ? { ...exercise, [field]: value } : exercise
            )
        );
    };
    const addExercise = () => {
        setExercises((prev) => [
            ...prev,
            { id: prev.length + 1, name: '', repetitions: '', set: '' },
        ]);
    };
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-4xl">
                <h1 className="text-3xl font-bold mb-6 text-center">Post Workouts</h1>
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Exercise</th>
                            <th className="border px-4 py-2">Sets</th>
                            <th className="border px-4 py-2">Repetitions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {exercises.map((exercise) => (
                            <tr key={exercise.id}>
                                <td className="border px-4 py-2">
                                    <input
                                        type="text"
                                        value={exercise.name}
                                        onChange={(e) => handleChange(exercise.id, 'name', e.target.value)}
                                        className="border w-full px-2 py-1 rounded"
                                        placeholder="Enter exercise"
                                    />
                                </td>
                                <td className="border px-4 py-2">
                                    <input
                                        type="number"
                                        value={exercise.repetitions}
                                        onChange={(e) => handleChange(exercise.id, 'repetitions', e.target.value)}
                                        className="border w-full px-2 py-1 rounded"
                                        placeholder="Enter sets"
                                    />
                                </td>
                                <td className="border px-4 py-2">
                                    <input
                                        type="number"
                                        value={exercise.set}
                                        onChange={(e) => handleChange(exercise.id, 'set', e.target.value)}
                                        className="border w-full px-2 py-1 rounded"
                                        placeholder="Enter reps"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button
                    onClick={addExercise}
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                    Add Exercise
                </button>
            </div>
        </div>
    );
}