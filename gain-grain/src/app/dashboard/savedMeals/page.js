'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import './savedMeals.css'; // Import the custom CSS file
import Navbar from "../../../components/Navbar";


const SavedMealsPage = () => {
    const [savedMeals, setSavedMeals] = useState([]);
    const [loadingMeals, setLoadingMeals] = useState(true);

    useEffect(() => {
        const fetchUserMeals = async () => {
            const userId = localStorage.getItem('userId'); // Retrieve userId from local storage
        
            if (!userId) {
                console.error('User ID not found in local storage');
                return [];
            }
        
            try {
                const response = await fetch('/api/meals/getSavedMeals', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId }), // Send userId in the body
                });
        
                if (response.ok) {
                    const data = await response.json();
                    if (data.success) {
                        setSavedMeals(data.meals);
                    } else {
                        console.error('Failed to fetch meals:', data.message);
                        setSavedMeals([]); // Set to empty array if not successful
                    }
                } else {
                    console.error('Failed to fetch meals:', response.statusText);
                    setSavedMeals([]); // Handle response error
                }
            } catch (error) {
                console.error('Error fetching meals:', error);
                setSavedMeals([]);
            }
            setLoadingMeals(false);
        };

        fetchUserMeals();
    }, []);

    const toggleDetails = (mealId) => {
        setSavedMeals((prevMeals) => 
            prevMeals.map((meal) =>
                meal._id === mealId ? {...meal, showDetails: !meal.showDetails } : meal
            )
        )    
    }

    return (
      <div className='navbar'>
        <Navbar/>
        <div className="saved-meals-container">
            <h1 className="page-title">Your Saved Meals</h1>
            {loadingMeals ? (
                <p>Loading meals...</p>
            ) : savedMeals.length === 0 ? (
                <p>No saved meals available.</p>
            ) : (
                <div className="meals-grid">
                    {savedMeals.map((meal) => (
                        <div key={meal._id} className="meal-card">
                            <h3>{meal.meal.name}</h3>
                            <p>Calories: {meal.meal.calories}</p>
                            {/*<h4>Ingredients:</h4>
                            <ul>
                                {meal.ingredients.map((ingredient, index) => (
                                    <li key={index}>{ingredient}</li>
                                ))}
                            </ul>*/}
                            {/* You can add interactive buttons here */}
                            <button className="meal-action-button" onClick={() => toggleDetails(meal._id)}>
                                {meal.showDetails ? 'Hide Details' : 'View Details'}
                            </button>
                            <button className="meal-action-button">Edit</button>

                            {meal.showDetails && (
                                <div className="meal-details">
                                    {/* Conditionally render the link if it's not an empty string */}
                                    {meal.meal.link && meal.meal.link.trim() !== '' && (
                                        <p>
                                            <a href={meal.meal.link} target="_blank" rel="noopener noreferrer">
                                                View Full Recipe
                                            </a>
                                        </p>
                                    )}
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

export default SavedMealsPage;
