import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './exerciseSearchStyles.css';

const ExerciseSearch = ({ onSelectExercise }) => {
  const [query, setQuery] = useState('');
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null); // To track the selected exercise
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.trim() === '') {
        setExercises([]); // Clear exercises if the input is empty
        return;
      }

      const fetchExercises = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`/api/exercises/search?q=${query}`);
          setExercises(response.data); // Set fetched exercises
        } catch (error) {
          console.error('Error fetching exercises:', error);
          setExercises([]);
        } finally {
          setLoading(false);
        }
      };

      fetchExercises();
    }, 300); // Adjust the debounce delay as needed 

    return () => clearTimeout(delayDebounceFn); // Clean up
  }, [query]); // Dependency array includes `query`

  const handleSearch = (e) => {
    setQuery(e.target.value); // Update the query on input change
  };

  const handleSelect = (exercise) => {
    setSelectedExercise(exercise); // Set the selected exercise
    setQuery(''); // Clear the input after selection
    setExercises([]); // Clear the exercise list after selection
  };

  const handleAddExercise = () => {
    if (selectedExercise && sets && reps) {
      const exerciseWithSetsAndReps = {
        ...selectedExercise,
        sets: parseInt(sets),
        reps: parseInt(reps),
      };
      onSelectExercise(exerciseWithSetsAndReps); // Pass the selected exercise with sets and reps to parent
      setSelectedExercise(null); // Reset selected exercise
      setSets(''); // Clear sets input
      setReps(''); // Clear reps input
    }
  };

  return (
    <div className="search-exercises">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search exercises..."
      />
      {loading && <p>Loading...</p>}
      <ul className="exercise-list">
        {exercises.length > 0 ? (
          exercises.map((exercise) => (
            <li key={exercise._id} onClick={() => handleSelect(exercise)}>
              {exercise.name}
            </li>
          ))
        ) : (
          <li>No exercises found</li>
        )}
      </ul>

      {/* Show sets and reps input fields only if an exercise is selected */}
      {selectedExercise && (
        <div className="exercise-inputs">
          <h4>Selected Exercise: {selectedExercise.name}</h4>
          <input
            type="number"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
            placeholder="Sets"
          />
          <input
            type="number"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            placeholder="Reps"
          />
          <button className='add-btn' onClick={handleAddExercise}>Add Exercise</button>
        </div>
      )}
    </div>
  );
};

export default ExerciseSearch;
