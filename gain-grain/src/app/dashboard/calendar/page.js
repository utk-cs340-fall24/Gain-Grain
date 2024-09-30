'use client';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import './custom_calendar.css'; 
import ExerciseSearch from './exerciseSearch';


const Page = () => {
  // State variables to manage selected date, exercises, meals, and visibility of forms
  const [date, setDate] = useState(new Date()); // Current selected date
  const [selectedExercises, setSelectedExercises] = useState([]); // List of selected exercises for the date
  const [selectedMeals, setSelectedMeals] = useState([]); // List of selected meals for the date
  const [showDayWindow, setShowDayWindow] = useState(false); // Controls visibility of the day's details window
  const [showExerciseSearch, setShowExerciseSearch] = useState(false); // Controls visibility of the exercise search component
  const [showMealForm, setShowMealForm] = useState(false); // Controls visibility of the meal input form
  const [mealName, setMealName] = useState(''); // State for meal name input
  const [mealCalories, setMealCalories] = useState(''); // State for meal calories input

  // Load saved exercises and meals when the date changes
  useEffect(() => {
    loadExercisesForDate(date); // Load exercises for the selected date
    loadMealsForDate(date); // Load meals for the selected date
  }, [date]);

  // Function to load exercises from localStorage for the selected date
  const loadExercisesForDate = (selectedDate) => {
    const savedWorkouts = JSON.parse(localStorage.getItem('workouts')) || {}; // Retrieve saved workouts
    const exercisesForDate = savedWorkouts[selectedDate.toDateString()]?.exercises || []; // Get exercises for the date
    setSelectedExercises(exercisesForDate); // Update state with exercises
  };

  // Function to save exercises to localStorage for the selected date
  const saveExercisesToLocalStorage = (exercises) => {
    const savedWorkouts = JSON.parse(localStorage.getItem('workouts')) || {}; // Retrieve saved workouts
    savedWorkouts[date.toDateString()] = { ...savedWorkouts[date.toDateString()], exercises }; // Update the date entry with new exercises
    localStorage.setItem('workouts', JSON.stringify(savedWorkouts)); // Save updated workouts back to localStorage
  };

  // Function to load meals from localStorage for the selected date
  const loadMealsForDate = (selectedDate) => {
    const savedWorkouts = JSON.parse(localStorage.getItem('workouts')) || {}; // Retrieve saved workouts
    const mealsForDate = savedWorkouts[selectedDate.toDateString()]?.meals || []; // Get meals for the date
    setSelectedMeals(mealsForDate); // Update state with meals
  };

  // Function to save meals to localStorage for the selected date
  const saveMealsToLocalStorage = (meals) => {
    const savedWorkouts = JSON.parse(localStorage.getItem('workouts')) || {}; // Retrieve saved workouts
    savedWorkouts[date.toDateString()] = { ...savedWorkouts[date.toDateString()], meals }; // Update the date entry with new meals
    localStorage.setItem('workouts', JSON.stringify(savedWorkouts)); // Save updated workouts back to localStorage
  };

  // Function to handle selecting an exercise
  const handleSelectExercises = (exercise) => {
    const updatedExercises = [...selectedExercises, exercise]; // Add new exercise to the list
    setSelectedExercises(updatedExercises); // Update state
    saveExercisesToLocalStorage(updatedExercises); // Save updated exercises to localStorage
  };

  // Function to handle adding a new meal
  const handleAddMeal = () => {
    if (mealName && mealCalories) { // Ensure both fields are filled
      const newMeal = { name: mealName, calories: mealCalories }; // Create new meal object
      const updatedMeals = [...selectedMeals, newMeal]; // Add new meal to the list
      setSelectedMeals(updatedMeals); // Update state
      saveMealsToLocalStorage(updatedMeals); // Save updated meals to localStorage
      setMealName(''); // Reset meal name input
      setMealCalories(''); // Reset meal calories input
      setShowMealForm(false); // Hide meal form
    }
  };

  // Function to handle date selection on the calendar
  const handleDateSelect = (selectedDate) => {
    setDate(selectedDate); // Update the selected date
    setShowDayWindow(true); // Show the day's details window
  };

  // Function to handle removing an exercise from the list
  const handleRemoveExercise = (exerciseToRemove) => {
    const updatedExercises = selectedExercises.filter(item => item._id !== exerciseToRemove._id); // Filter out the removed exercise
    setSelectedExercises(updatedExercises); // Update state
    saveExercisesToLocalStorage(updatedExercises); // Save updated exercises to localStorage
  };

  // Function to handle removing a meal from the list
  const handleRemoveMeal = (mealToRemove) => {
    const updatedMeals = selectedMeals.filter(item => item.name !== mealToRemove.name); // Filter out the removed meal
    setSelectedMeals(updatedMeals); // Update state
    saveMealsToLocalStorage(updatedMeals); // Save updated meals to localStorage
  };

  // Function to toggle the exercise search window
  const toggleExerciseSearch = () => setShowExerciseSearch(prev => !prev);

  // Function to toggle the meal input form
  const toggleMealForm = () => setShowMealForm(prev => !prev);

  // Function to close the day's details window
  const closeModal = () => setShowDayWindow(false);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Workout Calendar</h1>
      
      {/* Calendar Component */}
      <Calendar
        onChange={handleDateSelect} // Handle date selection
        value={date} // Controlled component with selected date
        className="mx-auto"
      />
      <p className="mt-4 text-center">
        Selected date: <span className="font-semibold">{date.toDateString()}</span>
      </p>

      {/* Day Window for selected date's exercises and meals */}
      {showDayWindow && (
        <div className="day-window">
          <div className="day-window-content">
            {/* Exercise Section */}
            <button onClick={toggleExerciseSearch} className="mb-4">
              {showExerciseSearch ? 'Close Exercise Search' : 'Add Exercises'}
            </button>
            {showExerciseSearch && (
              <ExerciseSearch onSelectExercise={handleSelectExercises} /> // Render ExerciseSearch component
            )}
            <h2>Selected Exercises for {date.toDateString()}:</h2>
            <ul className='exercise-list'>
              {selectedExercises.map((item, index) => (
                <li key={index}>
                  {item.name} {/* Display exercise name */}
                  <button className='remove-btn' onClick={() => handleRemoveExercise(item)}>
                    Remove {/* Button to remove the exercise */}
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
                  onChange={(e) => setMealName(e.target.value)} // Handle meal name input
                />
                <input 
                  type="number" 
                  placeholder="Calories" 
                  value={mealCalories} 
                  onChange={(e) => setMealCalories(e.target.value)} // Handle meal calories input
                />
                <button onClick={handleAddMeal}>Save Meal</button> {/* Button to save meal */}
              </div>
            )}
            <h2>Selected Meals for {date.toDateString()}:</h2>
            <ul className='meal-list'>
              {selectedMeals.map((meal, index) => (
                <li key={index}>
                  {meal.name} - {meal.calories} Calories {/* Display meal name and calories */}
                  <button className='remove-btn' onClick={() => handleRemoveMeal(meal)}>
                    Remove {/* Button to remove the meal */}
                  </button>
                </li>
              ))}
            </ul>

            <button onClick={closeModal}>Close</button> {/* Button to close the day window */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
