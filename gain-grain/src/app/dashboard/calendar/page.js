'use client';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import './custom_calendar.css'; 
import ExerciseSearch from './exerciseSearch';

const Page = () => {
  const [date, setDate] = useState(new Date());
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [showDayWindow, setShowDayWindow] = useState(false);
  const [showExerciseSearch, setShowExerciseSearch] = useState(false);
  const [showMealForm, setShowMealForm] = useState(false);
  const [mealName, setMealName] = useState('');
  const [mealCalories, setMealCalories] = useState('');

  // Load saved data from localStorage for exercises and meals when the date changes
  useEffect(() => {
    loadExercisesForDate(date);
    loadMealsForDate(date);
  }, [date]);

  // Load exercises from localStorage
  const loadExercisesForDate = (selectedDate) => {
    const savedWorkouts = JSON.parse(localStorage.getItem('workouts')) || {};
    const exercisesForDate = savedWorkouts[selectedDate.toDateString()]?.exercises || [];
    setSelectedExercises(exercisesForDate);
  };

  // Save exercises to localStorage
  const saveExercisesToLocalStorage = (exercises) => {
    const savedWorkouts = JSON.parse(localStorage.getItem('workouts')) || {};
    savedWorkouts[date.toDateString()] = { ...savedWorkouts[date.toDateString()], exercises };
    localStorage.setItem('workouts', JSON.stringify(savedWorkouts));
  };

  // Load meals from localStorage
  const loadMealsForDate = (selectedDate) => {
    const savedWorkouts = JSON.parse(localStorage.getItem('workouts')) || {};
    const mealsForDate = savedWorkouts[selectedDate.toDateString()]?.meals || [];
    setSelectedMeals(mealsForDate);
  };

  // Save meals to localStorage
  const saveMealsToLocalStorage = (meals) => {
    const savedWorkouts = JSON.parse(localStorage.getItem('workouts')) || {};
    savedWorkouts[date.toDateString()] = { ...savedWorkouts[date.toDateString()], meals };
    localStorage.setItem('workouts', JSON.stringify(savedWorkouts));
  };

  // Handle selecting an exercise
  const handleSelectExercises = (exercise) => {
    const updatedExercises = [...selectedExercises, exercise];
    setSelectedExercises(updatedExercises);
    saveExercisesToLocalStorage(updatedExercises);
  };

  // Handle adding a meal
  const handleAddMeal = () => {
    if (mealName && mealCalories) {
      const newMeal = { name: mealName, calories: mealCalories };
      const updatedMeals = [...selectedMeals, newMeal];
      setSelectedMeals(updatedMeals);
      saveMealsToLocalStorage(updatedMeals);
      setMealName(''); // Reset meal form
      setMealCalories('');
      setShowMealForm(false); // Hide meal form
    }
  };

  // Handle date selection on the calendar
  const handleDateSelect = (selectedDate) => {
    setDate(selectedDate);
    setShowDayWindow(true);
  };

  // Handle removing an exercise
  const handleRemoveExercise = (exerciseToRemove) => {
    const updatedExercises = selectedExercises.filter(item => item._id !== exerciseToRemove._id);
    setSelectedExercises(updatedExercises);
    saveExercisesToLocalStorage(updatedExercises);
  };

  // Handle removing a meal
  const handleRemoveMeal = (mealToRemove) => {
    const updatedMeals = selectedMeals.filter(item => item.name !== mealToRemove.name);
    setSelectedMeals(updatedMeals);
    saveMealsToLocalStorage(updatedMeals);
  };

  // Toggle exercise search window
  const toggleExerciseSearch = () => setShowExerciseSearch(prev => !prev);

  // Toggle meal form
  const toggleMealForm = () => setShowMealForm(prev => !prev);

  // Close day window
  const closeModal = () => setShowDayWindow(false);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Workout Calendar</h1>
      
      {/* Calendar */}
      <Calendar
        onChange={handleDateSelect}
        value={date}
        className="mx-auto"
      />
      <p className="mt-4 text-center">
        Selected date: <span className="font-semibold">{date.toDateString()}</span>
      </p>

      {/* Day Window */}
      {showDayWindow && (
        <div className="day-window">
          <div className="day-window-content">
            {/* Exercise Section */}
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

            {/* Meal Section */}
            <button onClick={toggleMealForm} className="mb-4">
              {showMealForm ? 'Close Meal Form' : 'Add Meal'}
            </button>
            {showMealForm && (
              <div className="meal-form">
                <input 
                  type="text" 
                  placeholder="Meal Name" 
                  value={mealName} 
                  onChange={(e) => setMealName(e.target.value)} 
                />
                <input 
                  type="number" 
                  placeholder="Calories" 
                  value={mealCalories} 
                  onChange={(e) => setMealCalories(e.target.value)} 
                />
                <button onClick={handleAddMeal}>Save Meal</button>
              </div>
            )}
            <h2>Selected Meals for {date.toDateString()}:</h2>
            <ul className='meal-list'>
              {selectedMeals.map((meal, index) => (
                <li key={index}>
                  {meal.name} - {meal.calories} Calories
                  <button className='remove-btn' onClick={() => handleRemoveMeal(meal)}>
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
