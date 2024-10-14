// CustomCalendar.js
'use client';

import React, { useEffect, useState } from 'react';
import { FaAngleLeft, FaAngleRight, FaPlus } from 'react-icons/fa';
import './custom_calendar.css'; 
import './style.css';
import ExerciseSearch from './exerciseSearch';
import Modal from './modal';
import Navbar from "../../../components/Navbar";

const CustomCalendar = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [eventsArr, setEventsArr] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showModal, setShowModal] = useState(false);
    const [activeDay, setActiveDay] = useState(null);
    const [days, setDays] = useState([]);
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [selectedMeals, setSelectedMeals] = useState([]);
    const [showExerciseSearch, setShowExerciseSearch] = useState(false);
    const [mealName, setMealName] = useState('');
    const [mealCalories, setMealCalories] = useState('');
    const [mealIngredients, setMealIngredients] = useState([]); // New state for ingredients
    const [addingType, setAddingType] = useState('');
    const [activeButton, setActiveButton] = useState('');
    const [showExerciseDropdown, setShowExerciseDropdown] = useState(false);
    const [exerciseOption, setExerciseOption] = useState('');
    const [showMealDropdown, setShowMealDropdown] = useState(false);
    const [mealOption, setMealOption] = useState('');
    const [mealUrl, setMealUrl] = useState(''); // State to hold the meal URL
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          // If the user is not logged in, redirect them to the login page
          window.location.href = '/login';
        }
      }, []);      

    useEffect(() => {
        initCalendar();
        loadExercisesForDate(selectedDate);
        loadMealsForDate(selectedDate);
    }, [currentMonth, selectedDate]);

    const initCalendar = () => {
        const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
        const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
        const prevLastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 0);
        const prevDays = prevLastDay.getDate();
        const lastDate = lastDay.getDate();
        const dayOfWeek = firstDay.getDay();
        const nextDays = 7 - lastDay.getDay() - 1;

        let calendarDays = [];

        for (let x = dayOfWeek; x > 0; x--) {
            calendarDays.push({ day: prevDays - x + 1, isPrevMonth: true });
        }

        for (let i = 1; i <= lastDate; i++) {
            const hasEvent = eventsArr.some(event =>
                event.day === i &&
                event.month === currentMonth.getMonth() + 1 &&
                event.year === currentMonth.getFullYear());
            calendarDays.push({ day: i, isActive: i === activeDay, hasEvent });
        }

        for (let j = 1; j <= nextDays; j++) {
            calendarDays.push({ day: j, isNextMonth: true });
        }

        setDays(calendarDays);
    };

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)));
    };

    const handlePrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)));
    };

    const loadExercisesForDate = (selectedDate) => {
        const savedWorkouts = JSON.parse(localStorage.getItem('workouts')) || {};
        const exercisesForDate = savedWorkouts[selectedDate.toDateString()]?.exercises || [];
        setSelectedExercises(exercisesForDate);
    };

    const loadMealsForDate = (selectedDate) => {
        const savedWorkouts = JSON.parse(localStorage.getItem('workouts')) || {};
        const mealsForDate = savedWorkouts[selectedDate.toDateString()]?.meals || [];
        setSelectedMeals(mealsForDate);
    };

    const handleDayClick = (day, isPrevMonth, isNextMonth) => {
        if (isPrevMonth) {
            handlePrevMonth();
        } else if (isNextMonth) {
            handleNextMonth();
        } else {
            setActiveDay(day);
            setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
        }
    };

    const handleRemoveExercise = (exerciseIndex) => {
        const updatedExercises = selectedExercises.filter((_, index) => index !== exerciseIndex);
        setSelectedExercises(updatedExercises);
        saveExercisesToLocalStorage(updatedExercises);
    };
    
    const handleRemoveMeal = (mealIndex) => {
        const updatedMeals = selectedMeals.filter((_, index) => index !== mealIndex);
        setSelectedMeals(updatedMeals);
        saveMealsToLocalStorage(updatedMeals);
    };

    const saveExercisesToLocalStorage = (exercises) => {
        const savedWorkouts = JSON.parse(localStorage.getItem('workouts')) || {};
        savedWorkouts[selectedDate.toDateString()] = { ...savedWorkouts[selectedDate.toDateString()], exercises };
        localStorage.setItem('workouts', JSON.stringify(savedWorkouts));
    };

    const saveMealsToLocalStorage = (meals) => {
        const savedWorkouts = JSON.parse(localStorage.getItem('workouts')) || {};
        savedWorkouts[selectedDate.toDateString()] = { ...savedWorkouts[selectedDate.toDateString()], meals };
        localStorage.setItem('workouts', JSON.stringify(savedWorkouts));
    };

    const handleAddMeal = () => {
        if (mealName && mealCalories && mealIngredients) {
            const newMeal = { name: mealName, calories: mealCalories, ingredients: mealIngredients };
            const updatedMeals = [...selectedMeals, newMeal];
            setSelectedMeals(updatedMeals);
            saveMealsToLocalStorage(updatedMeals);
            setMealName('');
            setMealCalories('');
            setMealIngredients([]);
            setShowModal(false);
        }
    };

    const handleIngredientsChange = (e) => {
        const value = e.target.value;
        setMealIngredients(value.split(',').map(ingredient => ingredient.trim())); // Split by comma and trim spaces
    };

    const handleSelectExercise = (exercise) => {

        const newExercise = {
            name: exercise.name,
            sets: exercise.sets,
            reps: exercise.reps,
        }

        setSelectedExercises(prev => [...prev, newExercise]); // Add selected exercise
        saveExercisesToLocalStorage([...selectedExercises, newExercise]); // Save to localStorage
        setShowExerciseSearch(false); // Close search after selection
        setShowModal(false); // Close modal
    };

    const toggleModal = () => {
        if (showModal) {
            setMealName('');
            setMealCalories('');
            setMealIngredients([]);
            setMealUrl('');
        }
        setShowModal(!showModal);
    };

    const handleImportUrl = async () => {
        if (!mealUrl) return; // Ensure URL is entered
    
        try {
            const response = await fetch('/api/meals/recipes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url: mealUrl }), // Use the mealUrl state variable
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                alert(errorData.message);
                return;
            }
    
            const data = await response.json();
            if (data.success) {
                setMealName(data.name);
                setMealCalories(data.calories);
                setMealIngredients(data.ingredients);
            }
        } catch (error) {
            console.error('Error fetching the recipe:', error);
        }
    };

    const saveWorkoutToProfile = async () => {
        const userId = localStorage.getItem('userId'); // Retrieve the userId from localStorage (adjust as needed)

        if (!userId) {
            alert('User not logged in');
            return;
        }

        console.log('UserId retrieved from localStorage:', userId); // Log userId for debugging

        try {
            const response = await fetch('/api/workouts/saveToProfile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    userId, 
                    exercises: selectedExercises,
                    date: selectedDate,   
                }),
            });

            const data = await response.json();
            if (data.success) {
                alert('Workout saved successfully!');
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error saving workout:', error);
            alert('Failed to save workout');
        }
    };

    const saveMealToProfile = async (meal) => {
        const userId = localStorage.getItem('userId'); // Retrieve the userId from localStorage (adjust as needed)
    
        if (!userId) {
            alert('User not logged in');
            return;
        }
    
        console.log('UserId retrieved from localStorage:', userId); // Log userId for debugging
    
        try {
            const MealData = {
                name: meal.name,
                ingredients: meal.ingredients,
                calories: meal.calories,
            };
    
            const response = await fetch('/api/meals/saveToProfile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    userId, 
                    meal: MealData, 
                    date: selectedDate // Ensure selectedDate is defined in the scope
                }),
            });
    
            const data = await response.json();
            if (data.success) {
                alert('Meal saved successfully!');
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error saving meal:', error);
            alert('Failed to save meal');
        }
    };
    
    
    const renderDays = () => {
        return days.map((dayObj, index) => (
            <div
                key={index}
                className={`day ${dayObj.isPrevMonth ? 'prev-date' : ''} ${dayObj.isNextMonth ? 'next-date' : ''} ${dayObj.isActive ? 'active' : ''} ${dayObj.hasEvent ? 'event' : ''}`}
                onClick={() => handleDayClick(dayObj.day, dayObj.isPrevMonth, dayObj.isNextMonth)}
            >
                {dayObj.day}
            </div>
        ));
    };

    return (
        <>
            {/* <Navbar/> */}
            <div className="container">
                
<<<<<<< HEAD
                <div className="left">
                    <div className="calendar">
                        <div className="month">
                            <FaAngleLeft className="prev" onClick={handlePrevMonth} />
                            <div className="date">
                                {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
=======
                <div className="exercise-section">
                    <h3>Exercises</h3>
                    <button className='remove-btn' onClick={saveWorkoutToProfile}>Save Workout To Profile</button>
                    <ul className="exercise-list">
                        {selectedExercises.map((exercise, index) => (
                            <li key={index}>
                            <div>
                                <span>{exercise.name}</span>
                                <div className="exercise-details">
                                    {exercise.sets} sets x {exercise.reps} reps
                                </div>
>>>>>>> b4c17058cc8b3b9fa6f48414f3395134569f674a
                            </div>
                            <FaAngleRight className="next" onClick={handleNextMonth} />
                        </div>
                        <div className="weekdays">
                            <div>Sun</div>
                            <div>Mon</div>
                            <div>Tue</div>
                            <div>Wed</div>
                            <div>Thu</div>
                            <div>Fri</div>
                            <div>Sat</div>
                        </div>
                        <div className="days">
                            {renderDays()}
                        </div>
                    </div>
                </div>
<<<<<<< HEAD
                <div className="right">
                    <div className="today-date">
                        <div className="event-day">{selectedDate.toLocaleDateString('default', { weekday: 'long' })}</div>
                        <div className="event-date">{selectedDate.toDateString()}</div>
                    </div>
                    
                    <div className="exercise-section">
                        <h3>Exercises</h3>
                        <ul className="exercise-list">
                            {selectedExercises.map((exercise, index) => (
                                <li key={index}>
                                <div>
                                    <span>{exercise.name}</span>
                                    <div className="exercise-details">
                                        {exercise.sets} sets x {exercise.reps} reps
                                    </div>
                                </div>
                                <button className="remove-btn" onClick={() => handleRemoveExercise(index)}>Remove</button>
=======
                
                <div className="meal-section">
                    <h3>Meals</h3>
                    <ul className="meal-list">
                        {selectedMeals.map((meal, index) => (
                            <li key={index}>
                                <span>{meal.name} ({meal.calories} cal)</span>
                                <button 
                                    className='remove-btn' 
                                    onClick={() => saveMealToProfile(meal)} // Pass the specific meal
                                >
                                    Save Meal To Profile
                                </button>
                                <button className="remove-btn" onClick={() => handleRemoveMeal(index)}>Remove</button>
>>>>>>> b4c17058cc8b3b9fa6f48414f3395134569f674a
                            </li>
                            ))}
                        </ul>
                    </div>
                    
                    <div className="meal-section">
                        <h3>Meals</h3>
                        <ul className="meal-list">
                            {selectedMeals.map((meal, index) => (
                                <li key={index}>
                                    <span>{meal.name} ({meal.calories} cal)</span>
                                    <button className="remove-btn" onClick={() => handleRemoveMeal(index)}>Remove</button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="add-section">
                        <button className="add-button" onClick={toggleModal}>
                            <FaPlus />
                        </button>
                    </div>
                </div>

<<<<<<< HEAD
                <Modal show={showModal} onClose={toggleModal}>
                    <div className="modal-body">
                        <div className="add-options">
                            <div className="dropdown">
                                <button
                                    onClick={() => setShowExerciseDropdown(!showExerciseDropdown)}
                                    className={activeButton === 'exercise' ? 'active' : ''}
                                >
                                    Add Exercise
                                </button>
                                {showExerciseDropdown && (
                                    <div className="dropdown-options">
                                        <button
                                            onClick={() => {
                                                setExerciseOption('create-new');
                                                setMealOption('');
                                                setAddingType('exercise');
                                                setShowExerciseSearch(true);
                                                setActiveButton('exercise');
                                                setShowExerciseDropdown(false);
                                            }}
                                        >
                                            Create New
                                        </button>
                                        <button
                                            onClick={() => {
                                                setExerciseOption('import-saved');
                                                setMealOption('');
                                                setAddingType('exercise');
                                                setShowExerciseSearch(false);
                                                setActiveButton('exercise');
                                                setShowExerciseDropdown(false);
                                            }}
                                        >
                                            Import from Saved
                                        </button>
                                    </div>
=======
                        {exerciseOption === 'import-saved' && (
                            <div className="coming-soon">
                                <p>Coming Soon: Import from Saved Exercises!</p>
                            </div>
                        )}

                        {addingType === 'meal' && mealOption === 'create-new' && (
                            <div className="meal-form">
                                <input
                                    type="text"
                                    value={mealName}
                                    onChange={(e) => setMealName(e.target.value)}
                                    placeholder="Meal Name"
                                />
                                <input
                                    className="meal-number"
                                    type="number"
                                    value={mealCalories}
                                    onChange={(e) => setMealCalories(e.target.value)}
                                    placeholder="Calories"
                                />
                                <input
                                    type="text"
                                    value={mealIngredients.join(', ')}
                                    onChange={handleIngredientsChange}
                                    placeholder="Ingredients (optional)"
                                />
                                <button onClick={handleAddMeal}>Add Meal</button>
                            </div>
                        )}

                        {mealOption === 'import-saved' && (
                            <div className="coming-soon">
                                <p>Coming Soon: Import from Saved Meals!</p>
                            </div>
                        )}

                        {mealOption === 'import-url' && (
                            <div className="meal-form">
                                <h3>Import Meal from URL</h3>
                                <input
                                    type="text"
                                    value={mealUrl} // New state variable to hold the URL
                                    onChange={(e) => setMealUrl(e.target.value)} // Update state on input change
                                    placeholder="Enter Recipe URL"
                                />
                                <button onClick={handleImportUrl}>Fetch Meal Details</button> {/* Button to fetch meal details */}
                                
                                {/* Display fetched meal details after the URL is processed */}
                                {mealName && (
                                    <>
                                        <h3>Imported Meal Details</h3>
                                        <input
                                            type="text"
                                            value={mealName}
                                            onChange={(e) => setMealName(e.target.value)}
                                            placeholder="Meal Name"
                                        />
                                        <input
                                            className="meal-number"
                                            type="number"
                                            value={mealCalories}
                                            onChange={(e) => setMealCalories(e.target.value)}
                                            placeholder="Calories"
                                        />
                                        <button onClick={handleAddMeal}>Add Meal</button>
                                    </>
>>>>>>> b4c17058cc8b3b9fa6f48414f3395134569f674a
                                )}
                            </div>

                            <div className="dropdown">
                                <button
                                    onClick={() => setShowMealDropdown(!showMealDropdown)}
                                    className={activeButton === 'meal' ? 'active' : ''}
                                >
                                    Add Meal
                                </button>
                                {showMealDropdown && (
                                    <div className="dropdown-options">
                                        <button
                                            onClick={() => {
                                                setMealOption('create-new');
                                                setExerciseOption('');
                                                setAddingType('meal');
                                                setActiveButton('meal');
                                                setShowMealDropdown(false);
                                            }}
                                        >
                                            Create New
                                        </button>
                                        <button
                                            onClick={() => {
                                                setMealOption('import-saved');
                                                setExerciseOption('');
                                                setShowMealDropdown(false);
                                            }}
                                        >
                                            Import from Saved
                                        </button>
                                        <button
                                            onClick={() => {
                                                handleImportUrl();
                                                setMealOption('import-url');
                                                setExerciseOption('');
                                                setShowMealDropdown(false);
                                            }}
                                        >
                                            Import from URL
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="add-forms">
                            {exerciseOption === 'create-new' && addingType === 'exercise' && showExerciseSearch && (
                                <ExerciseSearch onSelectExercise={handleSelectExercise} />
                            )}

                            {exerciseOption === 'import-saved' && (
                                <div className="coming-soon">
                                    <p>Coming Soon: Import from Saved Exercises!</p>
                                </div>
                            )}

                            {addingType === 'meal' && mealOption === 'create-new' && (
                                <div className="meal-form">
                                    <input
                                        type="text"
                                        value={mealName}
                                        onChange={(e) => setMealName(e.target.value)}
                                        placeholder="Meal Name"
                                    />
                                    <input
                                        className="meal-number"
                                        type="number"
                                        value={mealCalories}
                                        onChange={(e) => setMealCalories(e.target.value)}
                                        placeholder="Calories"
                                    />
                                    <input
                                        type="text"
                                        value={mealIngredients}
                                        onChange={(e) => setMealIngredients(e.target.value)}
                                        placeholder="Ingredients (optional)"
                                    />
                                    <button onClick={handleAddMeal}>Add Meal</button>
                                </div>
                            )}

                            {mealOption === 'import-saved' && (
                                <div className="coming-soon">
                                    <p>Coming Soon: Import from Saved Meals!</p>
                                </div>
                            )}

                            {mealOption === 'import-url' && (
                                <div className="meal-form">
                                    <h3>Import Meal from URL</h3>
                                    <input
                                        type="text"
                                        value={mealUrl} // New state variable to hold the URL
                                        onChange={(e) => setMealUrl(e.target.value)} // Update state on input change
                                        placeholder="Enter Recipe URL"
                                    />
                                    <button onClick={handleImportUrl}>Fetch Meal Details</button> {/* Button to fetch meal details */}
                                    
                                    {/* Display fetched meal details after the URL is processed */}
                                    {mealName && (
                                        <>
                                            <h3>Imported Meal Details</h3>
                                            <input
                                                type="text"
                                                value={mealName}
                                                onChange={(e) => setMealName(e.target.value)}
                                                placeholder="Meal Name"
                                            />
                                            <input
                                                className="meal-number"
                                                type="number"
                                                value={mealCalories}
                                                onChange={(e) => setMealCalories(e.target.value)}
                                                placeholder="Calories"
                                            />
                                            <button onClick={handleAddMeal}>Add Meal</button>
                                        </>
                                    )}
                                </div>
                            )}

                        </div>
                    </div>
                </Modal>
            </div>
        </>
    );
};

export default CustomCalendar;