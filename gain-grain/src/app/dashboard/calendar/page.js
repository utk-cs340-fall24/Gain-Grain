'use client';


import React, { useEffect, useState } from 'react';
import { FaAngleLeft, FaAngleRight, FaPlus, FaTimes } from 'react-icons/fa';
import './custom_calendar.css'; 
import './style.css';
import ExerciseSearch from './exerciseSearch'; // Import ExerciseSearch

const CustomCalendar = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [eventsArr, setEventsArr] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showAddEvent, setShowAddEvent] = useState(false);
    const [newEvent, setNewEvent] = useState({ name: '', from: '', to: '' });
    const [activeDay, setActiveDay] = useState(null);
    const [days, setDays] = useState([]);
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [selectedMeals, setSelectedMeals] = useState([]);
    const [showExerciseSearch, setShowExerciseSearch] = useState(false);
    const [showMealForm, setShowMealForm] = useState(false);
    const [mealName, setMealName] = useState('');
    const [mealCalories, setMealCalories] = useState('');

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
            setShowAddEvent(false);
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

    const handleRemoveExercise = (exerciseToRemove) => {
        const updatedExercises = selectedExercises.filter(item => item._id !== exerciseToRemove._id);
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
            setShowMealForm(false);
        }
    };

    const toggleExerciseSearch = () => setShowExerciseSearch(prev => !prev);
    const toggleMealForm = () => setShowMealForm(prev => !prev);

    const handleSelectExercise = (exercise) => {
        setSelectedExercises(prev => [...prev, exercise]); // Add selected exercise
        saveExercisesToLocalStorage([...selectedExercises, exercise]); // Save to localStorage
        setShowExerciseSearch(false); // Close search after selection
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
                
                <div className="exercise-section">
                    <h3>Exercises</h3>
                    
                    {/* Always show the toggle button to add/close Exercise Search */}
                    <button onClick={toggleExerciseSearch}>
                        {showExerciseSearch ? 'Close Exercise Search' : 'Add Exercises'}
                    </button>

                    {/* Conditionally render the ExerciseSearch component based on the state */}
                    {showExerciseSearch && (
                        <ExerciseSearch onSelectExercise={handleSelectExercise} />
                    )}

                    <ul className="exercise-list">
                        {selectedExercises.map((exercise, index) => (
                        <li key={index}>
                            <span>{exercise.name}</span>
                            <button className="remove-btn" onClick={() => handleRemoveExercise(exercise)}>Remove</button>
                        </li>
                        ))}
                    </ul>
                </div>

                <div className="meal-section">
                    <h3>Meals</h3>
                    {showMealForm ? (
                        <div>
                        <input
                            type="text"
                            value={mealName}
                            onChange={(e) => setMealName(e.target.value)}
                            placeholder="Meal Name"
                        />
                        <input
                            type="number"
                            value={mealCalories}
                            onChange={(e) => setMealCalories(e.target.value)}
                            placeholder="Calories"
                        />
                        <button onClick={handleAddMeal}>Add Meal</button>
                        <button onClick={toggleMealForm}>Close</button>
                        </div>
                    ) : (
                        <button onClick={toggleMealForm}>
                        {showMealForm ? 'Close Meal Form' : 'Add Meal'}
                        </button>
                    )}

                    <ul className="meal-list">
                        {selectedMeals.map((meal, index) => (
                        <li key={index}>
                            <span>{meal.name} ({meal.calories} cal)</span>
                            <button className="remove-btn" onClick={() => handleRemoveMeal(meal)}>Remove</button>
                        </li>
                        ))}
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default CustomCalendar;