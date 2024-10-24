"use client";
import Navbar from '../../../components/Navbar'

import { useState, useEffect } from 'react';

export default function PostWorkouts() {
    const [exercises, setExercises] = useState([
        { id: 1, name: '', repetitions: '', set: '' },
    ]);
    const [title, setTitle] = useState(''); 
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await fetch('/api/profile/get-user-from-session', {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
              },
            });
    
            const data = await response.json();
    
            if (data.success) {
              setUserId(data.user._id);
            }
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchUserData();
      }, []);

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

    const handleSubmit = async () => {
        try {
            const response = await fetch('/api/workouts/postWorkouts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, title, exercises }),
            });

            if (response.ok) {
                alert('Workout submitted successfully!');
                window.location.href = '/post';
            } else {
                alert('Failed to submit workout');
            }
        } catch (error) {
            console.error('Error submitting workout:', error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar /> {/* Navbar at the top */}
            <div className="flex-grow flex items-center justify-center bg-gray-100 p-6">
                <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-4xl">
                    <h1 className="text-3xl font-bold mb-6 text-center">Post Workouts</h1>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border w-full px-2 py-1 mb-4 rounded"
                        placeholder="Enter workout title"
                    />
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
                    <div className="flex justify-between mt-4">
                        <button
                            onClick={addExercise}
                            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                            Add Exercise
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                        >
                            Submit Workout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
