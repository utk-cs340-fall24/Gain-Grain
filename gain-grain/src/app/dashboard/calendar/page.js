// CustomCalendar.js
'use client';

import React, { useEffect, useState } from 'react';
import { FaAngleLeft, FaAngleRight, FaPlus } from 'react-icons/fa';
import './custom_calendar.css'; 
import './style.css';
import ExerciseSearch from './exerciseSearch'; // Import ExerciseSearch
import Modal from './modal'; // Import the Modal component

const CustomCalendar = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [eventsArr, setEventsArr] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showModal, setShowModal] = useState(false); // State for modal visibility
    const [newEvent, setNewEvent] = useState({ name: '', from: '', to: '' });
    const [activeDay, setActiveDay] = useState(null);
    const [days, setDays] = useState([]);
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [selectedMeals, setSelectedMeals] = useState([]);
    const [showExerciseSearch, setShowExerciseSearch] = useState(false);
    const [mealName, setMealName] = useState('');
    const [mealCalories, setMealCalories] = useState('');
    const [addingType, setAddingType] = useState(''); // Track adding type ('exercise' or 'meal')
    const [activeButton, setActiveButton] = useState('');
    const [showExerciseDropdown, setShowExerciseDropdown] = useState(false); // Track the dropdown visibility
    const [exerciseOption, setExerciseOption] = useState(''); // Track which option is selected
    const [showMealDropdown, setShowMealDropdown] = useState(false);
    const [mealOption, setMealOption] = useState(''); // Track which meal option is selected
    const [showMealForm, setShowMealForm] = useState(false); // To toggle the meal form
    

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

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

    const handleAddEvent = () => {
        if (activeDay) {
            const dayEvents = eventsArr.find(event =>
                event.day === activeDay &&
                event.month === currentMonth.getMonth() + 1 &&
                event.year === currentMonth.getFullYear());

            if (dayEvents) {
                dayEvents.events.push(newEvent);
            } else {
                setEventsArr([...eventsArr, {
                    day: activeDay,
                    month: currentMonth.getMonth() + 1,
                    year: currentMonth.getFullYear(),
                    events: [newEvent],
                }]);
            }

            setNewEvent({ name: '', from: '', to: '' });
        }
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
    

    const handleRemoveMeal = (mealToRemove) => {
        const updatedMeals = selectedMeals.filter(item => item.name !== mealToRemove.name);
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
        if (mealName && mealCalories) {
            const newMeal = { name: mealName, calories: mealCalories };
            const updatedMeals = [...selectedMeals, newMeal];
            setSelectedMeals(updatedMeals);
            saveMealsToLocalStorage(updatedMeals);
            setMealName('');
            setMealCalories('');
            setShowModal(false); // Close modal
        }
    };

    const toggleModal = () => {
        setShowModal(!showModal);
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
        <div className="container">
            <div className="left">
                <div className="calendar">
                    <div className="month">
                        <FaAngleLeft className="prev" onClick={handlePrevMonth} />
                        <div className="date">
                            {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
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
            <div className="right">
                <div className="today-date">
                    <div className="event-day">{selectedDate.toLocaleDateString('default', { weekday: 'long' })}</div>
                    <div className="event-date">{selectedDate.toLocaleDateString()}</div>
                </div>

                {/*Display exercises*/}
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
                        </li>
                        ))}
                    </ul>
                </div>
                
                {/*Display meals*/}
                <div className="meal-section">
                    <h3>Meals</h3>
                    <ul className="meal-list">
                        {selectedMeals.map((meal, index) => (
                            <li key={index}>
                                <span>{meal.name} ({meal.calories} cal)</span>
                                <button className="remove-btn" onClick={() => handleRemoveMeal(meal)}>Remove</button>
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

            {/* Modal for adding exercises and meals to the day*/}
            <Modal show={showModal} onClose={toggleModal}>
                <div className="modal-body">
                    <div className="add-options">
                        {/* Exercise Dropdown */}
                        <div className="dropdown">
                            <button
                                onClick={() => setShowExerciseDropdown(!showExerciseDropdown)} // Toggle dropdown
                                className={activeButton === 'exercise' ? 'active' : ''}
                            >
                                Add Exercise
                            </button>
                            {showExerciseDropdown && (
                                <div className="dropdown-options">
                                    <button
                                        onClick={() => {
                                            setExerciseOption('create-new');
                                            setMealOption(''); // Reset meal option
                                            setAddingType('exercise');
                                            setShowExerciseSearch(true);
                                            setActiveButton('exercise');
                                            setShowExerciseDropdown(false); // Close dropdown after selection
                                        }}
                                    >
                                        Create New
                                    </button>
                                    <button
                                        onClick={() => {
                                            setExerciseOption('import-saved');
                                            setMealOption(''); // Reset meal option
                                            setAddingType('exercise');
                                            setShowExerciseSearch(false);
                                            setActiveButton('exercise');
                                            setShowExerciseDropdown(false); // Close dropdown after selection
                                        }}
                                    >
                                        Import from Saved
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Meal Dropdown */}
                        <div className="dropdown">
                            <button
                                onClick={() => setShowMealDropdown(!showMealDropdown)} // Toggle dropdown
                                className={activeButton === 'meal' ? 'active' : ''}
                            >
                                Add Meal
                            </button>
                            {showMealDropdown && (
                                <div className="dropdown-options">
                                    <button
                                        onClick={() => {
                                            setMealOption('create-new');
                                            setExerciseOption(''); // Reset exercise option
                                            setAddingType('meal');
                                            setActiveButton('meal');
                                            setShowMealDropdown(false); // Close dropdown after selection
                                        }}
                                    >
                                        Create New
                                    </button>
                                    <button
                                        onClick={() => {
                                            setMealOption('import-saved');
                                            setExerciseOption(''); // Reset exercise option
                                            setShowMealDropdown(false); // Close dropdown after selection
                                        }}
                                    >
                                        Import from Saved
                                    </button>
                                    <button
                                        onClick={() => {
                                            setMealOption('import-url');
                                            setExerciseOption(''); // Reset exercise option
                                            setShowMealDropdown(false); // Close dropdown after selection
                                        }}
                                    >
                                        Import from URL
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Conditionally render content based on the selected options */}
                    <div className="add-forms">
                        {/* Show exercise search form if 'Create New' is selected */}
                        {exerciseOption === 'create-new' && addingType === 'exercise' && showExerciseSearch && (
                            <ExerciseSearch onSelectExercise={handleSelectExercise} />
                        )}

                        {/* Show 'Coming Soon' message if 'Import from Saved' is selected */}
                        {exerciseOption === 'import-saved' && (
                            <div className="coming-soon">
                                <p>Coming Soon: Import from Saved Exercises!</p>
                            </div>
                        )}

                        {/* Show meal form when adding a meal */}
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
                                <button onClick={handleAddMeal}>Add Meal</button>
                            </div>
                        )}

                        {/* Show 'Coming Soon' message for meal options */}
                        {mealOption === 'import-saved' && (
                            <div className="coming-soon">
                                <p>Coming Soon: Import from Saved Meals!</p>
                            </div>
                        )}

                        {mealOption === 'import-url' && (
                            <div className="coming-soon">
                                <p>Coming Soon: Import Meals from URL!</p>
                            </div>
                        )}
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default CustomCalendar;
