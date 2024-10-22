'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import './savedWorkouts.css'; // Import the custom CSS file
import Navbar from "../../../components/Navbar";

const SavedWorkoutsPage = () => {
    const [savedWorkouts, setSavedWorkouts] = useState([]);
    const [loadingWorkouts, setLoadingWorkouts] = useState(true);
    const [selectedWorkout, setSelectedWorkout] = useState(null); // State to hold the selected workout
    const [showDetails, setShowDetails] = useState(false); // State to control modal visibility

    useEffect(() => {
        const fetchUserWorkouts = async () => {
            const userId = localStorage.getItem('userId'); // Retrieve userId from local storage
        
            if (!userId) {
                console.error('User ID not found in local storage');
                return [];
            }
        
            try {
                const response = await fetch('/api/workouts/getSavedWorkouts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId }), // Send userId in the body
                });
        
                if (response.ok) {
                    const data = await response.json();
                    if (data.success) {
                        setSavedWorkouts(data.workouts); // Adjust this line to use the correct response
                    } else {
                        console.error('Failed to fetch workouts:', data.message);
                        setSavedWorkouts([]); // Set to empty array if not successful
                    }
                } else {
                    console.error('Failed to fetch workouts:', response.statusText);
                    setSavedWorkouts([]); // Handle response error
                }
            } catch (error) {
                console.error('Error fetching workouts:', error);
                setSavedWorkouts([]);
            }
            setLoadingWorkouts(false);
        };

        fetchUserWorkouts();
    }, []);

    const toggleDetails = (workoutId) => {
      setSavedWorkouts((prevWorkouts) =>
          prevWorkouts.map((workout) =>
              workout._id === workoutId ? { ...workout, showDetails: !workout.showDetails } : workout
          )
      );
    };

    return (
      <div className='navbar'>
        <Navbar/>
        <div className="saved-workouts-container">
            <h1 className="page-title">Your Saved Workouts</h1>
            {loadingWorkouts ? (
                <p>Loading workouts...</p>
            ) : savedWorkouts.length === 0 ? (
                <p>No saved workouts available.</p>
            ) : (
                <div className="workouts-grid">
                    {savedWorkouts.map((workout) => (
                        <div key={workout._id} className="workout-card">
                            <h3>{workout.title}</h3>
                            <p>Exercises: {workout.exercises.length}</p>
                            <button className="workout-action-button" onClick={() => toggleDetails(workout._id)}>
                                {workout.showDetails ? 'Hide Details' : 'View Details'}
                            </button>
                            <button className='workout-action-button'>edit</button>
                            
                            {/* Show exercise details if toggleDetails is true */}
                            {workout.showDetails && (
                                <div className="exercise-details">
                                    <h4>Exercises:</h4>
                                    <ul>
                                        {workout.exercises.map((exercise, index) => (
                                            <li key={index}>
                                                <strong>{exercise.name}</strong> - {exercise.sets} sets of {exercise.reps} reps
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
      </div>
    );
};

export default SavedWorkoutsPage;
