import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import './exerciseSearchStyles.css'

const ExerciseSearch = ({ onSelectExercise }) => {
  const [query, setQuery] = useState('');
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);

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
    onSelectExercise(exercise); // Pass the selected exercise to the parent
    setQuery(''); // Clear the input after selection
    setExercises([]); // Clear the exercise list after selection
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search exercises..."
      />
      {loading && <p>Loading...</p>}
      <ul className='exercise-list'>
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
    </div>
  );
};

export default ExerciseSearch;
