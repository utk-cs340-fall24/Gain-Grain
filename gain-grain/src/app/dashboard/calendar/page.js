'use client';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './custom_calendar.css'; 
import ExerciseSearch from './exerciseSearch';

const Page = () => {
  const [date, setDate] = useState(new Date());
  const [workouts, setWorkouts] = useState([]); // Ensure this is initialized as an empty array
  const [showDayWindow, setShowDayWindow] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [showExerciseSearch, setShowExerciseSearch] = useState(false);

  // Handle exercise selection
  const handleSelectExercises = (exercise) => {
    setSelectedExercises((prev) => [...prev, {exercise, date}]);
  };

  // Handle date selection on calendar
  const handleDateSelect = (date) => {
    setDate(date);
    const selectedWorkouts = fetchWorkoutsForDate(date);
    setWorkouts(selectedWorkouts);
    setShowDayWindow(true);
  };

  // Fetch workouts for selected date
  const fetchWorkoutsForDate = (selectedDate) => {
    // Return an empty array if there are no workouts
    return [
      { name: 'Bench Press', sets: 3, reps: 10 },
      { name: 'Squats', sets: 4, reps: 8 },
    ];
  };

  // Handle removing exercises from the day
  const handleRemoveExercise = (exerciseToRemove) => {
    setSelectedExercises((prev) =>
      prev.filter((item) => item.exercise._id !== exerciseToRemove._id)
    );
  };

  const closeModal = () => setShowDayWindow(false);
  const toggleExerciseSearch = () => setShowExerciseSearch((prev) => !prev);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Workout Calendar</h1>
      
      <Calendar
        onChange={handleDateSelect}
        value={date}
        className="mx-auto"
      />
      <p className="mt-4 text-center">
        Selected date: <span className="font-semibold">{date.toDateString()}</span>
      </p>

      {showDayWindow && (
        <div className="day-window">
          <div className="day-window-content">
            <button onClick={toggleExerciseSearch} className="mb-4">
              {showExerciseSearch ? 'Close Exercise Search' : 'Add Exercises'}
            </button>
            {showExerciseSearch && (
              <ExerciseSearch onSelectExercise={handleSelectExercises} />
            )}
            <h2>Workouts for {date.toDateString()}</h2>
            <ul>
              {workouts.map((workout, index) => (
                <li key={index}>
                  {workout.name} - {workout.sets} sets of {workout.reps}
                </li>
              ))}
            </ul>

            <h3>Selected Exercises:</h3>
            <ul className='exercise-list'>
              {selectedExercises
                .filter((item) => item.date.toDateString() === date.toDateString())
                .map((item, index) => (
                  <li key={index}>
                    {item.exercise.name}
                    <button className='remove-btn' onClick={() => handleRemoveExercise(item.exercise)}>
                      Remove
                    </button>
                  </li>
                ))}
            </ul>

            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};


export default Page;
