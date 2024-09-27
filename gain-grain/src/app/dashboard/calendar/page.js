'use client';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import './custom_calendar.css'; 
import ExerciseSearch from './exerciseSearch';

const Page = () => {
  const [date, setDate] = useState(new Date());
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [showDayWindow, setShowDayWindow] = useState(false);
  const [showExerciseSearch, setShowExerciseSearch] = useState(false);

  // Load saved exercises from localStorage when the component mounts
  useEffect(() => {
    const savedWorkouts = JSON.parse(localStorage.getItem('workouts')) || {};
    const exercisesForDate = savedWorkouts[date.toDateString()]?.exercises || [];
    setSelectedExercises(exercisesForDate);
  }, [date]);

  // Save exercises to localStorage
  const saveExercisesToLocalStorage = (exercises) => {
    const savedWorkouts = JSON.parse(localStorage.getItem('workouts')) || {};
    savedWorkouts[date.toDateString()] = { exercises };
    localStorage.setItem('workouts', JSON.stringify(savedWorkouts));
  };

  // Handle exercise selection
  const handleSelectExercises = (exercise) => {
    const updatedExercises = [...selectedExercises, exercise];
    setSelectedExercises(updatedExercises);
    saveExercisesToLocalStorage(updatedExercises);
  };

  // Handle date selection on calendar
  const handleDateSelect = (date) => {
    setDate(date);
    setShowDayWindow(true);
  };

  // Handle removing exercises from the day
  const handleRemoveExercise = (exerciseToRemove) => {
    const updatedExercises = selectedExercises.filter(item => item._id !== exerciseToRemove._id);
    setSelectedExercises(updatedExercises);
    saveExercisesToLocalStorage(updatedExercises);
  };

  const closeModal = () => setShowDayWindow(false);
  const toggleExerciseSearch = () => setShowExerciseSearch(prev => !prev);

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
            <h2>Selected Exercises for {date.toDateString()}:</h2>
            <ul className='exercise-list'>
              {selectedExercises.map((item, index) => (
                <li key={index}>
                  {item.name}
                  <button className='remove-btn' onClick={() => handleRemoveExercise(item)}>
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
